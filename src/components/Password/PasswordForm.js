import { useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './PasswordForm.module.css';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  if(authCtx.isLoggedin === false){
    history.replace("/")
  }
  const submitHandler = event => { 
    event.preventDefault(); 

    const enteredNewPassword = newPasswordInputRef.current.value;

    //add validation

    fetch ('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCrEkL4yYJqBnlQbg20fMoy2mvUbwqy_oY', 
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: true
      }),
      headers: {
        'content-type': 'application/json'
      }
    }
    ).then(res => {

      console.log("password changed");
      history.replace('/');
    })
  }

  return (
    <form className={classes.form} onSubmit ={submitHandler}>
    <h1>Change Password</h1>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
