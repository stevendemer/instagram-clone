import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

export async function doesUsernameExist(username) {
  const docRef = doc(db, "users", username);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(`Document data: ${docSnap.data()}`);
    alert("User already exists !");
    return docSnap.data().length > 0;
  } else {
    console.log("No such document !");
  }
}
