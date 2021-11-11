import React, { useEffect } from "react";
import useInput from "../../hooks/useInput";
import { emailPattern, passwordPattern } from "../../Utilities/Utility";
import { Link, useHistory } from "react-router-dom";
import useForms from "../../hooks/useForms";
import Alert from "../../Components/Alert";
import { useStore } from "../../store";

function Login() {
  const [emailValue, emailReset, emailBind] = useInput("", emailPattern);
  const [passwordValue, passwordReset, passwordBind] = useInput(
    "",
    passwordPattern
  );
  const { submitForm, state } = useForms("login");

  const submitHandler = (e) => {
    e.preventDefault();

    submitForm({ email: emailValue, password: passwordValue });

    emailReset();
    passwordReset();
  };
  const history = useHistory();

  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setSignInInfo = useStore((state) => state.setSignInInfo);

  useEffect(() => {
    if (state.isSuccess) {
      setTimeout(() => {
        let userInfo = {
          token: state.data.token,
          username: state.data.username,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setSignInInfo(userInfo);

        setIsLoggedIn(true);
        history.push("/admin");
      }, 2000);
    }
  }, [history, setIsLoggedIn, state.isSuccess, state.data, setSignInInfo]);

  return (
    <div className="   p-2 flex flex-col justify-center items-center  ">
      <form
        onSubmit={submitHandler}
        className="flex flex-col  items-center mt-4 bg-white p-10
          sm:w-full  md:w-auto  sm:border  md:border-2 border-blue-200   shadow-lg
        
          
          "
      >
        <h2 className="pb-4 text-2xl">Login</h2>

        {state.isLoading && <div>Loading...</div>}
        {state.isError && (
          <Alert Message={state.error.error} variant="red" visible={true} />
        )}
        {state.isSuccess && (
          <Alert Message={state.data.message} variant="green" visible={true} />
        )}

        <div>
          <label htmlFor="Email">Email</label>
          <br />
          <input
            type="email"
            name="Email"
            className="sm:w-11/12 md:w-80  mt-2 mb-6 px-4 py-2 border-t border-l-0 border-r-0 border-b-2 border-black 
            border-opacity-50 rounded-lg outline-none "
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
            border-opacity-50 rounded-md outline-none"
            {...passwordBind}
          />
        </div>

        <div>
          <button
            type="submit"
            className="border-2 border-blue-500 px-8 py-2 
              rounded-full hover:bg-blue-200"
          >
            Login
          </button>
        </div>

        <p className="mt-4">
          Want to Register? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
