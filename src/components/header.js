import React, { useContext } from "react";
import { useUserAuth } from "../context/authContext";
import UserContext from "../context/user";

const Header = () => {
  const { user } = useContext(UserContext);
  const { logout } = useUserAuth();
  console.log("User", user);
  return <div>Header</div>;
};

export default Header;
