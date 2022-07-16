import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

// collection ref
const usersRef = collection(db, "users");

export async function doesUsernameExist(username) {
  const docSnap = await getDoc(docRef);
  const docRef = doc(db, "users", username);

  if (docSnap.exists()) {
    console.log(`Document data: ${docSnap.data()}`);
    alert("User already exists !");
    return docSnap.data().length > 0;
  } else {
    console.log("No such document !");
  }
}

export async function getUserById(userID) {
  const usersRef = collection(db, "users");

  // create query against collection
  const q = query(usersRef, where("userId", "==", userID));

  const querySnapshot = await getDocs(q);

  const foundUser = querySnapshot.forEach((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return foundUser;
}
