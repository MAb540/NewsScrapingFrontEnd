import React, { useEffect, useState } from "react";
import useForms from "../../hooks/useForms";
import useInput from "../../hooks/useInput";
import Alert from "../../Components/Alert";
import { useStore } from "../../store";

import {
  emailPattern,
  namePattern,
  passwordPattern,
} from "../../Utilities/Utility";

function Signup() {
  const [nameValue, nameReset, nameBind] = useInput("", namePattern);
  const [emailValue, emailReset, emailBind] = useInput("", emailPattern);
  const [passwordValue, passwordReset, passwordBind] = useInput(
    "",
    passwordPattern
  );
  const [matchPasswordValue, matchPasswordReset, matchPasswordBind] = useInput(
    "",
    passwordPattern
  );

  const [error, setIsError] = useState(false);

  const { submitForm, state } = useForms("signup");

  const submitHandler = (e) => {
    e.preventDefault();

    if (passwordValue !== matchPasswordValue) {
      setIsError(true);
      return;
    }
    submitForm({ name: nameValue, email: emailValue, password: passwordValue });

    nameReset();
    emailReset();
    passwordReset();
    matchPasswordReset();
  };
  const setStateOfAuth = useStore((state) => state.setStateOfAuth);
  const stateOfAuth = useStore((state) => state.stateOfAuth);

  useEffect(() => {
    if (state.isSuccess) {
      setStateOfAuth(true);
    }
  }, [setStateOfAuth, state.isSuccess, stateOfAuth]);

  return (
    <div className="   p-2 flex flex-col justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="flex flex-col  items-center mt-4 bg-white p-10
        sm:w-full  md:w-auto  sm:border-0  md:border-2 border-blue-200      "
      >
        <h2 className="pb-4 text-2xl">Sign Up</h2>
        {error && (
          <Alert Message={"some errror occured"} variant="red" visible={true} />
        )}
        {state.isLoading && <div>Loading...</div>}
        {state.isError && (
          <Alert Message={state.error.error} variant="red" visible={true} />
        )}
        {state.isSuccess && (
          <Alert Message={state.data.message} variant="green" visible={true} />
        )}

        <div className="  ">
          <label htmlFor="Name">Name</label>
          <br />
          <input
            className="sm:w-11/12 md:w-80  mt-2 mb-6 px-4 py-2  border-t border-l-0 border-r-0 border-b-2 border-black 
          border-opacity-50 rounded-xl      "
            type="text"
            name="Name"
            {...nameBind}
          />
        </div>
        <div>
          <label htmlFor="Email">Email</label>
          <br />
          <input
            type="email"
            name="Email"
            className="sm:w-11/12 md:w-80  mt-2 mb-6 px-4 py-2 border-t border-l-0 border-r-0 border-b-2 border-black 
          border-opacity-50 rounded-lg  "
            {...emailBind}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            className="sm:w-11/12 md:w-80   mt-2 mb-6 px-4 py-2 border-t border-l-0 border-r-0 border-b-2 border-black 
          border-opacity-50 rounded-md "
            {...passwordBind}
          />
        </div>
        <div>
          <label htmlFor="password-match">Password-match</label>
          <br />
          <input
            type="password"
            name="password-match"
            className="sm:w-11/12 md:w-80   mt-2 mb-6 px-4 py-2 border-t border-l-0 border-r-0 border-b-2 border-black 
          border-opacity-50 rounded-md "
            {...matchPasswordBind}
          />
        </div>

        <div>
          <button
            type="submit"
            className="border-2 border-blue-500 px-8 py-2 
            rounded-full hover:bg-blue-200"
          >
            Register
          </button>
        </div>

        <p className="mt-4">
          Already have an account? <a href="/login">LogIn</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
