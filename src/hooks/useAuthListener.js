import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useUserAuth } from "../context/authContext";
import { auth } from "../lib/firebase";

export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (currUser) => {
      // save the current user to local storage
      if (currUser) {
        localStorage.setItem("authUser", JSON.stringify(currUser));
        setUser(currUser);
      } else {
        // we don't have a user -> clear the local storage
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener();
  }, []);

  return { user };
}
