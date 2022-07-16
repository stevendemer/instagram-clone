import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  query,
  getDoc,
  where,
  writeBatch,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { seedDatabase } from "../seed";

const firebaseConfig = {
  apiKey: "AIzaSyAvN9Jc1AM5WrTnviRPeWn36NThOwOzbYU",
  authDomain: "instagram-clone-fc7b1.firebaseapp.com",
  projectId: "instagram-clone-fc7b1",
  storageBucket: "instagram-clone-fc7b1.appspot.com",
  messagingSenderId: "419259786197",
  appId: "1:419259786197:web:99e8436c0595c984fc935c",
  measurementId: "G-GXFLD9XQX7",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

// init the cloud firestore and get a reference to the service
const db = getFirestore(app);

// user currently logged in else null
const user = auth.currentUser;

export async function addNewUser(email, username, password) {
  const docRef = await addDoc(collection(db, "users"), {
    username,
    email,
    password,
  });
  console.log(`Document written with ID: ${docRef.id}`);
}

// Searches for a user matching the username
export async function getUsername(username) {
  const userRef = collection(db, "users");
  // queries
  const q = query(userRef, where("username", "==", username));

  onSnapshot(q, (snapshot) => {
    let user = [];
    snapshot.docs.forEach((doc) => {
      user.push({ ...doc.data(), id: doc.id });
    });
    // console.log(`User called ${username} exists !`);
    return user.length > 0;
  });
}

export async function getCurrentUser() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // user is signed in
      console.log(
        `User id is ${user.uid} and the display name is ${user.displayName} and the email is ${user.email}`
      );
    } else {
      // user is signed out
      console.log("User is signed out");
    }
  });
}

export async function readFirestore(username) {
  // collection ref
  const colRef = collection(db, "users");

  getDocs(colRef)
    .then((snap) => {
      let users = [];
      snap.docs.forEach((doc) => {
        if (doc.data().username === username) {
          users.push(doc.data().username);
        }
      });
      console.log(users);
    })
    .catch((err) => console.log(err));
}

export async function searchUser(email) {
  try {
    const userRef = doc(db, "users", email);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      console.log(`Document data is ${docSnap.data()}`);
    } else {
      console.log("No such document !");
    }
  } catch (error) {
    console.log(`Error in firebase service: ${error}`);
  }
}

export async function signWithEmailAndPassword(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCreds) => {
      // Signed in
      const user = userCreds.user;
      console.log(`Current user is ${user}`);
    })
    .catch((error) => {
      console.log(`Error Message: ${error.message} Error code:  ${error.code}`);
    });
}

export async function signUpWithEmailPassword(name, email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCreds) => {
      addDoc(collection(db, "users"), {
        username: userCreds.user.displayName,
        email: userCreds.user.email,
        password: userCreds.user.password,
      });
      console.log("User created");
    })
    .catch((error) => {
      console.log(`Error: ${error.message} with ${error.code}`);
    });
}

export async function sendPasswordReset(email) {
  try {
    await sendPasswordReset(auth, email);
    console.log("Password reset link sent");
  } catch (error) {
    console.log(`Error: ${error.message} with ${error.code}`);
  }
}

export function logout() {
  signOut(auth);
}

const { FieldValue } = db;

// seedDatabase(batch, doc, db);

export { app, db, FieldValue, auth };
