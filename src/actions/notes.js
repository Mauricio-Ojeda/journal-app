import  Swal  from "sweetalert2";
import { collection, doc, addDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { finishLoading, finishNewEntry, startLoading, startNewEntry } from "./ui";
import { fileUpload } from "../helpers/fileUpload";


export const startNewNote = () =>{
    return async ( dispatch, getState ) => {
        dispatch( startLoading() );
        const uid = getState().auth.uid;
        const newEntry = getState().ui.newEntry;
        
        if (!newEntry) {
            const newNote = {
                title:'',
                body:'',
                date: new Date().getTime(),
            }
            
            const docRef = await addDoc( collection(db, `${ uid }/journal/notes`), newNote);
            
            dispatch( activeNote( docRef.id, newNote ) );              
            dispatch( finishLoading() );
            dispatch( startNewEntry() );
            
        } else{
            Swal.fire('Finish your Note', 'Save your note to make a new entry', 'info');
        }
                

    }
};

export const activeNote = ( id, note ) => ({
    
    type: types.notesActive,
    payload: {
        id,
        ...note,
    }
});


export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {
        const uid = getState().auth.uid;
        dispatch( finishNewEntry() );
        
        if( !note.url ){
            delete note.url;
        };
        
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        
    try{
          const noteRef = doc(db,`${uid}`, 'journal','notes',`${ note.id }`);
  
          await setDoc( noteRef, noteToFirestore );         
          dispatch( refreshNotes( note.id, noteToFirestore ) );
          Swal.fire('Saved', note.title, 'success'); 
      } catch( e ){
            console.log(e)
            Swal.fire('Error', 'please try again', 'error');
      }
    // Load Notes to appear in sideBar  
    const notes = await loadNotes( uid );
    dispatch( setNotes( notes ) );    
    }

}

export const refreshNotes = ( id, note ) => ({
    type: types.notesUpdated,
    payload:{
        id, 
        note:{
            id,
            ...note
        }
    }
});

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading Image',
            text: 'Please Wait',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
                 
        });
        Swal.showLoading();

        const fileUrl =  await fileUpload(file);
        activeNote.url = fileUrl;
        dispatch( startSaveNote( activeNote ) )
        
        Swal.close();
    }
}

export const startDeleteNote = ( id ) => {
    
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        Swal.fire({
            title: 'Do you want to delete this note?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
          }).then( async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if  (result.isConfirmed) {
              Swal.fire('Deleted!', '', 'success');
              await  deleteDoc(doc(db,`${uid}`, 'journal','notes',`${ id.current }`));
              dispatch( deleteNote( id ) );
            } else if (result.isDenied) {
              Swal.fire('Note are not deleted', '', 'info')
            }
          })

    }
};

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id 

})

export const notesLogout = () => ({
    type: types.notesLogoutCleaning,
    
})