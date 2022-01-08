import  Swal  from "sweetalert2";
import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import { fileUpload } from "../helpers/fileUpload";


export const startNewNote = () =>{
    return async ( dispatch, getState ) => {
        dispatch( startLoading() );
        const uid = getState().auth.uid;
        
        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime(),
        }

        const docRef = await addDoc( collection(db, `${ uid }/journal/notes`), newNote);
        
        dispatch( activeNote( docRef.id, newNote ) );
        dispatch( finishLoading() );

    }
};

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
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
