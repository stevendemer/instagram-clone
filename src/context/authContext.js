import { useContext, useEffect, useState, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { Timestamp } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  async function login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  // ! Update profile not working
  async function signup(email, password) {
    const colRef = collection(db, "users");
    console.log(`Collection ref ${colRef}`);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        const user = userCreds.user;
        // user is signed in
        console.log(
          `User name: ${user.displayName} and email ${user.email} and id ${user.uid}`
        );
      })
      .catch((error) => {
        console.debug(
          `Error Code: ${error.code} and message is ${error.message}`
        );
      });
  }

  function logout() {
    return signOut(auth)
      .then(() => console.log("User logged out successfully !"))
      .catch((error) => console.log(`Error logging out ${error}`));
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(
      //   `Display name: ${currentUser.displayName} - Email: ${currentUser.email} and User ID: ${currentUser.uid}`
      // );
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
