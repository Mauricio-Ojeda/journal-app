import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {

    // validation schema
    const RegisterSchema = Yup.object().shape({
        name: Yup.string()
          .min(2, 'Too Short!')
          .max(30, 'Too Long!')
          .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min( 6, 'Must contain 6 characters' ).required('Required'),
        passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
      });



    return (
        <Formik
            initialValues={{
                    name:'',
                    email: '',
                    password: '',
                    passwordConfirmation:'',
                    
                }}
            validationSchema = { RegisterSchema }
            onSubmit ={ ( values, { resetForm } ) => {
                    
                    resetForm();
                    console.log(values)
                  
            }} 
        >{ ( { errors, touched } ) => (
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
                            { ( touched.name && errors.name ) && <p className="auth__alert-error">{ errors.name }</p> }
                            

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
                            { ( touched.email && errors.email )&& <p className="auth__alert-error">{ errors.email }</p> }
                            
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
                            { ( touched.password && errors.password ) && <p className="auth__alert-error">{ errors.password }</p> }
                        </div>
                        <div >
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <Field 
                                type="password" 
                                className="auth__input" 
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                autoComplete="off"

                            />
                            { ( touched.passwordConfirmation && errors.passwordConfirmation ) && <p className="auth__alert-error">{ errors.passwordConfirmation }</p> }
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
