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
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`Document id ${doc.id} and doc data is ${{ ...doc.data() }}`);
  });
}
