import { useState } from "react"

export const useForm = ( initialState = {} ) => {

    const [values, setValues] = useState(initialState);// se maneja el estado de los input

    const reset = ({newState = initialState}) => {
        setValues( newState ); // change the state to a newState
    }

    const handleInputChange = ( {target} ) => { // se destructura target del event ( e )

        setValues({
            ...values,
            [ target.name ] : target.value // se agrega el valor nuevo a los valores ya agregados
        })

    }

    return [ values, handleInputChange, reset ] 

}