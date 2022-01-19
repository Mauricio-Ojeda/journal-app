import { types } from "../types/types";

const initialState = {
    loading: false,
    newEntry: false,
}

export const uiReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.uiStartLoading:
            return{
                ...state,
                loading: true
            }
        case types.uiFinishLoading:
            return{
                ...state,
                loading: false
            }  
        case types.uiStartNewEntry:
            return{
                ...state,
                newEntry: true
            }
        case types.uiFinishNewEntry:
            return{
                ...state,
                newEntry: false
            }  
    
        default:
            return state;
    }
}