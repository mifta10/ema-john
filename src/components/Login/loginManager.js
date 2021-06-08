import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
  if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }
}

export  const handleGoogleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const { displayName, email, photoURL } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success : true
      }
      return signedInUser;
      //console.log(displayName, email, photoURL)
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
}

export  const  handleSignOut = () => {
  return firebase.auth().signOut()
  .then(res => {
   const signedOutUser = {
   isSignedIn: false,
   name: '',
   email: '',
   password: '',
   photo: '',
   error: '',
   success: false
   }
   return signedOutUser;
  })
  .catch(err => {
    //error message
  })
}

export const createUserWithEmailandPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((res) => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    updateUserName(name);
    return newUserInfo;
  })
  .catch((error) => {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo;
  });
}

export const signInWithEmailandPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((res) => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    return newUserInfo;
  })
  .catch((error) => {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo;
  });
}

  const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName:name
  }).then(function() {
    console.log("Update Successfully");
  }).catch(function(error) {
   console.log(error);
  });
 }