import {  useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { createUserWithEmailandPassword, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailandPassword } from "./loginManager";

function Login() {

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true)
    }
  )}

  const signOut = () => {
    handleSignOut()
    .then(res =>{
      handleResponse(res, false)
    })
  }

 const handleSubmit = (e) =>{
  if(newUser && user.email && user.password){
    createUserWithEmailandPassword(user.name, user.email, user.password)
    .then(res => {
      handleResponse(res, true)
    })
  }
  if(!newUser){
    signInWithEmailandPassword(user.email, user.password)
    .then(res => {
      handleResponse(res, true)
    })
  }
  e.preventDefault();
 }

 const handleResponse = (res, redirect) =>{
  setUser(res);
  setLoggedInUser(res)
  if(redirect){
    history.replace(from);
  }
 }

 const handleBlur = (e) => {
  //console.log(e.target.name, e.target.value);
  let isFieldValid = true;

  if(e.target.name === 'email'){
    isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
  }
  if(e.target.name === 'password'){
    const isPasswordValid = e.target.value.length > 6;
    const passwordHasNumber = /\d/.test(e.target.value);
    isFieldValid = isPasswordValid && passwordHasNumber;
  }
  if(isFieldValid){
    const newUserInfo = {...user};
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  }
 }

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
        <button onClick={googleSignIn}>Sign In</button>
      }
      <button>Sign In With Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome,{user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our Own Authentication.</h1>
      <form onSubmit={handleSubmit}>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
        <label htmlFor="newUser">New User Sign up</label>
        <br/>
      {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your Name"/>}
      <br/>
      <input type="text" onBlur={handleBlur} name="email" placeholder="Write Your Email" required />
      <br/>
      <input type="password" onBlur={handleBlur} name="password" id="" placeholder="password" required/>
      <br/>
      <input type="submit" value="Submit" />
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {
        user.success && <p style={{color: 'green'}}>User {newUser ? 'Created':'Logged In'} Successfully</p>
      }
    </div>
  );
}

export default Login;
