import fb from "firebase/app";
import "firebase/firestore";
import { playerId } from "./data";

const firebaseConfig = {
    apiKey: "AIzaSyBCt8CN7oQukbW20IDD3ZUciX__WiPzauI",
    authDomain: "thema3-1608728919442.firebaseapp.com",
    databaseURL:
        "https://thema3-1608728919442-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "thema3-1608728919442",
    storageBucket: "thema3-1608728919442.appspot.com",
    messagingSenderId: "443770907024",
    appId: "1:443770907024:web:b07a8a7314b8d91e4c2b15",
};

fb.initializeApp(firebaseConfig);

const db = fb.firestore();

export function addToDb(object) {
    db.collection("responses").doc(playerId).set(object, { merge: true });
}
