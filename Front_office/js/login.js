import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2BWwZWyS2MKul8iWb2LjijyFW1Pj9NJM",
  authDomain: "projetopw-e520a.firebaseapp.com",
  projectId: "projetopw-e520a",
  storageBucket: "projetopw-e520a.appspot.com",
  messagingSenderId: "18804285787",
  appId: "1:18804285787:web:ea920ba96661565250ba7e",
  measurementId: "G-ZQSG638Z9P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("button-google");
if (googleLogin) {
  googleLogin.addEventListener("click", function(event) {
    event.preventDefault();  // Evita o comportamento padrão do botão
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('User signed in:', user);
        alert('Signed in successfully!');
      })
      .catch((error) => {
        console.error('Error signing in:', error);
        alert('Error signing in. Check the console for details.');
      });
  });
} else {
  console.error('Element with id "button-google" not found.');
}
