// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from '../FirebaseConfig';


// initialize
export const initializeFirebase = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

// google sign in 
export const handelGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)

    .then(res => {
        const {displayName, email, photoURL}= res.user;
        const signInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        sucess: true
    }
    return signInUser;
    })
    .catch(error => {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.sucess = false;
    return newUserInfo;
    })
}

// facebook login
export const handelFacebookLogin= () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)

    .then(res => {
        const {displayName, email, photoURL}= res.user;
        const signInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        sucess: true
    }
    return signInUser;
    })
    .catch(error => {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.sucess = false;
    return newUserInfo;
    })
}


// create user  email and password
export const createNewUser = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
    console.log(res);
    // empty error when true result
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.sucess = true;
    updateUserName(name);
    return newUserInfo;
    })
    .catch(error => {
    // Handle Errors here.
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.sucess = false;
    return newUserInfo;
    });
}

// sign with email and password
export const signEmailPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.sucess = true;
    return newUserInfo;
    })
    .catch(error => {
    // Handle Errors here.
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.sucess = false;
    return newUserInfo;
    });
}


// update user
export const updateUserName = name => {

    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,

    }).then(function () {
        console.log('user name update');

    }).catch(function (error) {
        console.log(error);
    });
}
