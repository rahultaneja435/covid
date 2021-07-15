import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBE70WtdMOP6af0yFzn2AVVR7N0lOjptWc",
  authDomain: "covidtracker-9fbe7.firebaseapp.com",
  projectId: "covidtracker-9fbe7",
  storageBucket: "covidtracker-9fbe7.appspot.com",
  messagingSenderId: "314275094169",
  appId: "1:314275094169:web:c6a9e73c44e844993a2208",
  measurementId: "G-RZCKFX2NEB",
};
// Initialize Firebase
const result = firebase.initializeApp(firebaseConfig);

export default result;
