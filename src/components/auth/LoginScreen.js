import { ErrorMessage, Field, Form, Formik } from 'formik';

const LoginScreen = () => {
    return (
        <Formik
            initialValues={{
                    email: '',
                    password: '',
                    
                }}
            validate = {( values ) =>{
                let error = {};
                const { email, password } = values;
                if( !email ){
                    error.email = 'Please enter your Email'
                };

                if( !password || password.trim() === ''){
                    error.password = 'Please enter your password'
                } else if ( password.length < 4 ){
                    error.password = 'Minimum length is 4 characters'
                } 

                return error;
            }}

            onSubmit ={ ( values, { resetForm } ) => {
                    resetForm();
                    
                  
            }} 
        >{ ( { errors } ) => (
            <div >
                <Form >
                        <div >
                            <label htmlFor="email" className="form-label">Email address</label>
                            <Field 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                name="email"
                                aria-describedby="emailHelp"

                            />
                            <ErrorMessage name="email" component={ () =>( <p className="bg-danger text-white mt-1 p-2">{ errors.email }</p> )} />
                            
                        </div>
                        <div >
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field 
                                type="password" 
                                className="form-control" 
                                id="password"
                                name="password"
                                autoComplete="off"

                            />
                            <ErrorMessage name="password" component={ () =>( <p>{ errors.password }</p> )} />
                        </div>
                        <div >
                            <button type="submit" >Login</button>
                        </div>
                </Form>
            </div> 
        )}
        </Formik>          
    )
}

export default LoginScreen
