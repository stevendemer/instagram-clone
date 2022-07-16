import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserById } from "../services/firebase";

const useUser = (userID) => {
  const [activeUser, setActiveUser] = useState({});

  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjectId(userID) {
      // gets the user data based on the id
      const [user] = await getUserById(userID);
      setActiveUser(user || {});
    }
    if (userID) {
      getUserObjectId(userID);
    }
  }, [userID]);

  return { user: activeUser, setActiveUser };
};

export default useUser;
