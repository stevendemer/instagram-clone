import * as ROUTES from "../constants/routes";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useUserAuth } from "../context/authContext";
import { getUsername } from "../lib/firebase";

// TODO: Set the display name to the username

const Signup = () => {
  // displayName in the auth
  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useUserAuth();
  const isInvalid = password === "" || emailAddress === "";

  // let history = createBrowserHistory();

  let navigate = useNavigate();

  // const { firebase } = useContext(FirebaseContext);

  // history.listen(({ location, action }) => {});

  const handleSignup = async (event) => {
    event.preventDefault();

    const usernameExists = await getUsername(username);

    // debugging
    // getCurrentUser();

    if (!usernameExists) {
      try {
        await signup(username, emailAddress, password);
        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        console.log(`Error creating a new user: ${error}`);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    document.title = "Signup - Instagram";
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
          <form method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 "
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 "
              onChange={(e) => setFullname(e.target.value)}
              value={fullName}
            />

            <input
              aria-label="Enter your email"
              type="text"
              placeholder="Email"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 "
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 "
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && ` opacity-50`
              }`}
              onClick={(e) => handleSignup(e)}
            >
              Sign up
            </button>
          </form>
        </div>
        <div className="flex justify-center rounded items-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Have an account ? {` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
