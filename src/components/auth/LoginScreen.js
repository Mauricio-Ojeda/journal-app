
import { useDispatch } from 'react-redux';

import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

const LoginScreen = () => {
  
  const dispatch = useDispatch();

  

  const handleGoogleLogin = () =>{
    dispatch( startGoogleLogin() );
  }

  // Validation schema
  const LoginSchema = Yup.object().shape({
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string().min( 6, 'Must contain 6 characters' ).required('Required'),
  })

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={ LoginSchema }
      onSubmit={(values, { resetForm }) => {
        dispatch( startLoginEmailPassword( values.email, values.password ) );
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <>
          <h3 className="auth__title">Login</h3>

          <Form>
            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
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
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                type="password"
                className="auth__input"
                id="password"
                name="password"
                autoComplete="off"
              />
              
              { ( touched.password && errors.password ) && <p className="auth__alert-error">{ errors.password }</p> }

            </div>
            <div>
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>

            <div className="auth__social-networks">
              <p>Login with social networks</p>
              <div 
                className="google-btn"
                onClick={ handleGoogleLogin }
                >
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="google button"
                  />
                </div>
                <p className="btn-text">
                  <b>Sign in with google</b>
                </p>
              </div>
            </div>
            <Link to="/auth/register" className="link">
              Create new account
            </Link>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default LoginScreen;
