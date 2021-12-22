import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const loadNotes = async ( uid ) => {
   const ref = ( collection( db, `${ uid }/journal/notes` ) );
   const notesSnap = await getDocs( ref );
   const notes = [];
   
   notesSnap.forEach( snapChildren => {
       notes.push({
           id: snapChildren.id,
           ...snapChildren.data()
       })
       console.log( notes );
   } )
  

   return notes;
}