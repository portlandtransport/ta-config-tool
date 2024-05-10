/*
MIT License

Copyright (c) 2022 Portland Transport

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


import { initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithPopup, signInWithRedirect, GoogleAuthProvider, signOut } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getDocs, getFirestore, collection, getDoc, doc, setDoc, query, where, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';

const firbaseApp = initializeApp(ta_config_ui_firebase_credentials);
const auth = getAuth();
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();



const db = getFirestore();

// Detect auth state

onAuthStateChanged(auth, user => {
    if (user != null) {
        // console.log('logged in!');
        $('#accordion').css("display", "block");
        trApp.currentUser = user;
        trAppLoadMaps();
    } else {
        // console.log('No user');
        $('#accordion').css("display", "none");
        if (/iPad/i.test(navigator.userAgent)) {
            signInWithPopup(auth, provider);
        } else {
            signInWithRedirect(auth, provider);
        }

    }
});

window.trFirebaseGetConfigList = async function () {
    const configs = [];
    const q = query(collection(db, "configs"), where("author", "==", trApp.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const config = doc.data();
        if (config.hasOwnProperty('value')) {
            if (config.value.hasOwnProperty('public')) {
                if (config.value.public.hasOwnProperty('application')) {
                    configs.push(config);
                }
            }
        }
    });
    return configs;
}

window.trFirebaseGetConfig = async function(id) {
    const docRef = doc(db, "configs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document: "+id);
    }
}

window.trFirebaseSetConfig = async function(configuration) {
    if (configuration.public.hasOwnProperty('_MODIFIERS')) {
        delete configuration.public['_MODIFIERS'];
    }
    if (configuration.public.hasOwnProperty('defined')) {
        delete configuration.public['defined'];
    }
    const now = new Date();
    // const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const utcMilllisecondsSinceEpoch = now.getTime();
    const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
    const writeObject = {
        'id': configuration._id,
        'key': configuration._id,
        'value': configuration,
        'author': trApp.currentUser.uid,
        'modified': utcSecondsSinceEpoch
    }
        
    const id = configuration.private.id;
    const docRef = doc(db, "configs", id);
    return await setDoc(docRef,writeObject);

}

window.trFirebaseDeleteConfig = async function(id) {
    return await deleteDoc(doc(db, "configs", id));
}

window.trFirebaseSignout = async function() {
    return await signOut(auth);
}