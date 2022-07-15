import { createBrowserHistory } from "history";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import {
  getUsername,
  signWithEmailAndPassword,
  readFirestore,
} from "../lib/firebase";
import * as ROUTES from "../constants/routes";
import { useUserAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUserAuth();
  let navigate = useNavigate();
  const isInvalid = password === "" || emailAddress === "";

  let history = createBrowserHistory();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await login(emailAddress, password);
      navigate(ROUTES.DASHBOARD);

      // history.push(ROUTES.DASHBOARD);
    } catch (error) {
      // the form clears up
      setError(error.message);
    }
  };

  history.listen(({ location, action }) => {});

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone with image" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border rounded border-gray-primary">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="instagram"
              className="mt-2 w-6/12"
            />
          </h1>
          {error && <p className="mb-4 text-sx text-red-primary">{error}</p>}
          <form onSubmit={(e) => handleLogin(e)} method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 "
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 "
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && ` opacity-50`
              }`}
            >
              Log in
            </button>
          </form>
        </div>
        <div className="flex justify-center rounded items-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Don't have an account ?{` `}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
