import { useContext, useEffect, useState, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // ! Update profile not working
  function signup(username, email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile({
          displayName: username,
        });
        return result;
      })
      .catch((err) => console.log(err));
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(
        `Display name: ${currentUser.displayName} - Email: ${currentUser.email} and User ID: ${currentUser.uid}`
      );
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
