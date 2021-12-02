import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

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
            <>
                <h3 className="auth__title">Login</h3>
                <Form >
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
                            <button type="submit" className="btn btn-primary btn-block"  >Login</button>
                        </div>
                       
                        <div className="auth__social-networks">
                            <p>
                                Login with social networks
                            </p>
                            <div 
                                className="google-btn"
                            >
                                <div className="google-icon-wrapper">
                                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                </div>
                                <p className="btn-text">
                                    <b>Sign in with google</b>
                                </p>
                            </div>
                        </div>
                                <Link 
                                    to="/auth/register"
                                >                                    
                                    Create new account
                                </Link>
                </Form>
            </> 
        )}
        </Formik>          
    )
}

export default LoginScreen
