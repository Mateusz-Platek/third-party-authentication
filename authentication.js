import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCgeVXQnw7jlKOWxTbri5fy2XNj-yj1y9Q",
    authDomain: "third-party-authenticati-f1e62.firebaseapp.com",
    projectId: "third-party-authenticati-f1e62",
    storageBucket: "third-party-authenticati-f1e62.firebasestorage.app",
    messagingSenderId: "378423461706",
    appId: "1:378423461706:web:b7928c3e222006203aa3b3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
const inputFirstName = document.querySelector("#firstName");
const inputLastName = document.querySelector("#lastName");
const inputEmail = document.querySelector("#exampleInputEmail1");


const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        const [firstName, lastName] = user.displayName.split(" ");
        const email = user.email;
        inputFirstName.value = firstName;
        inputLastName.value = lastName;
        inputEmail.value = email;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with Google");
        console.log(user);
    }
})

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
