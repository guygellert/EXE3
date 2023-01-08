
import classes from './UserProfile.module.css';
import { useContext, useRef,useState } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
// import { getDatabase } from "firebase/database";

const UserProfile = () => {
  const newEnteredNewName = useRef();
  const newEnteredNewID = useRef();
  const newEnteredNewPhone = useRef();
   const newEnteredNewAdress = useRef();
  const authCtx = useContext(AuthContext);
  const [formField,setFormField] = useState({
    savedId:"",
    savedEmail:"",
    savedName:"",
    savedPhone:"",
    savedAdress:"",
    isFetch:false
  })
  const history = useHistory();
  if(authCtx.isLoggedin === false){
    history.replace("/")
  }
  const getDetails = async () => {
    let result = await fetch (`https://firestore.googleapis.com/v1/projects/exe-3-23903/databases/(default)/documents/users/1/user/${authCtx.userId}?key=AIzaSyCOvCCSMaTTmfb4OXcm6P_LmTe6jb0PaOY`, 
    {
      method: 'GET',
      headers: {
        // 'Authorization': 'AIzaSyCOvCCSMaTTmfb4OXcm6P_LmTe6jb0PaOY',
        'content-type': 'application/json'
      }
    }
    ).then((res) => {
      return res.json();
    })
    let fields = result.fields;
    formField.savedId = (fields.ID.stringValue != null)?fields.ID.stringValue:"לא צוין";
    formField.savedName = (fields.name.stringValue != null)?fields.name.stringValue:"לא צוין";
    formField.savedPhone = (fields.phone.stringValue != null)?fields.phone.stringValue:"לא צוין";
    formField.savedAdress = (fields.adress.stringValue != null)?fields.adress.stringValue:"לא צוין";
    formField.savedEmail = (
                             fields.email !== undefined &&
                             fields.email.stringValue !== undefined &&
                             fields.email.stringValue !== null)?fields.email.stringValue:"לא צוין";
    // console.log(formField.searchName)
    formField.isFetch = true;
    setFormField({...formField})
    
    // return result;
  }
  if(formField.isFetch === false){
    getDetails();
    console.log("Suii")
  }
  const onChangeHandler = event =>{
    event.preventDefault();
    console.log(event)
  }
  const submitHandler = event => { 
    // var database = firebase.database();
    event.preventDefault(); 

    const enteredNewName = newEnteredNewName.current.value;
    const enterdNewID = newEnteredNewID.current.value;
    const enterdNewPhone = newEnteredNewPhone.current.value;
    const enterdNewAdress = newEnteredNewAdress.current.value;
    // const enteredNewPassword = newPasswordInputRef.current.value;

    //add validation

    console.log(authCtx)
    fetch (`https://firestore.googleapis.com/v1/projects/exe-3-23903/databases/(default)/documents/users/1/user/${authCtx.userId}?key=AIzaSyCOvCCSMaTTmfb4OXcm6P_LmTe6jb0PaOY`, 
    {
      method: 'PATCH',
      body: JSON.stringify({
        fields:{
                name:{"stringValue":enteredNewName},
                ID:{"stringValue":enterdNewID},
                phone:{"stringValue":enterdNewPhone},
                adress:{"stringValue":enterdNewAdress},
                email:{"stringValue":authCtx.email}}}),
      headers: {
        'content-type': 'application/json'
      }
    }
    ).then(res => {
      history.replace('/');
    })
    .catch(err =>{
      console.log(err)
    })
  }
  return (
    <form className={classes.form} onSubmit ={submitHandler} >
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <div className={classes.detailsSection}>
        <div className={classes.detailCard}>
        <img src="data:image/jpeg;base64,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" alt="Avatar" />
          <div className={classes.container}>
          <div className={classes.control}>
            <label htmlFor='name'>Name:</label>
            <input onChange={onChangeHandler} defaultValue={formField.savedName} type='text' id='new-name' ref={newEnteredNewName}/>
          </div>
          <div>
            <label htmlFor='id'>ID:</label>
            <input defaultValue={formField.savedId} required type='text' id='new-id' ref={newEnteredNewID}/>
          </div>
          <div>
            <label htmlFor='phone'>Phone:</label>
            <input defaultValue={formField.savedPhone} type='text' id='new-phone' ref={newEnteredNewPhone}/>
          </div>
          <div>
            <label htmlFor='adress'>Adress:</label>
            <input defaultValue={formField.savedAdress} type='text' id='new-adress' ref={newEnteredNewAdress}/>
          </div>
          <div>
            <label htmlFor='mail'>Email:</label>
            <input disabled type='email' id='new-email' value={authCtx.email}/>
          </div>
          <div className={classes.action}>
            <button className={classes.buttonSubmit}>Update Profile</button>
          </div>
          </div>
        </div>
      </div>
    </section>
    </form>
  );
};

export default UserProfile;
