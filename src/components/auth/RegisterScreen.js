import { collectionGroup } from 'firebase/firestore';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
    return (
        <Formik
            initialValues={{
                    name:'',
                    email: '',
                    password: '',
                    confirmPassword:'',
                    
                }}
            validate = {( values ) =>{
                let error = {};
                const { name, email, password, confirmPassword } = values;
                if( !name || name.trim() === ''){
                    error.name = 'Please enter your Name'
                } else if ( password.length < 3 ){
                    error.password = 'Minimum length is 3 characters'
                } 

                if( !email ){
                    error.email = 'Please enter your Email'
                };

                if( !password || password.trim() === ''){
                    error.password = 'Please enter your password'
                } else if ( password.length < 6 ){
                    error.password = 'Minimum length is 6 characters'
                }

                if( password !== confirmPassword ){
                    error.confirmPassword = 'The password are different'
                } 

                return error;
            }}

            onSubmit ={ ( values, { resetForm } ) => {
                    
                    resetForm();
                    console.log(values)
                  
            }} 
        >{ ( { errors } ) => (
            <>
                <h3 className="auth__title">Register</h3>
                          
       
                <Form >
                        <div >
                            <label htmlFor="name" className="form-label">Name</label>
                            <Field 
                                type="text" 
                                className="auth__input" 
                                id="name" 
                                name="name"
                                aria-describedby="emailHelp"
                                autoComplete="off"

                            />
                            <ErrorMessage name="name" component={ () =>( <p className="auth__alert-error">{ errors.name }</p> )} />
                            

                        </div>
                        <div >
                            <label htmlFor="email" className="form-label">Email address</label>
                            <Field 
                                type="email" 
                                className="auth__input" 
                                id="email" 
                                name="email"
                                aria-describedby="emailHelp"
                                autoComplete="off"

                            />
                            <ErrorMessage name="email" component={ () =>( <p className="auth__alert-error">{ errors.email }</p> )} />
                            
                        </div>
                        <div >
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field 
                                type="password" 
                                className="auth__input" 
                                id="password"
                                name="password"
                                autoComplete="off"

                            />
                            <ErrorMessage name="password" component={ () =>( <p className="auth__alert-error">{ errors.password }</p> )} />
                        </div>
                        <div >
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <Field 
                                type="password" 
                                className="auth__input" 
                                id="confirmPassword"
                                name="confirmPassword"
                                autoComplete="off"

                            />
                            <ErrorMessage name="confirmPassword" component={ () =>( <p className="auth__alert-error">{ errors.confirmPassword }</p> )} />
                        </div>
                        <div >
                            <button type="submit" className="btn btn-primary btn-block mb-5"  >Register</button>
                        </div>
                       
                        
                                <Link 
                                    to="/auth/login"
                                    className="link"
                                >                                    
                                    If you have an account sing in
                                </Link>
                </Form>
            </> 
        )}
        </Formik>          
    )
}

export default RegisterScreen
