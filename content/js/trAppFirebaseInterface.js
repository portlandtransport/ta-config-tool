import { initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
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
        signInWithPopup(auth, provider);
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