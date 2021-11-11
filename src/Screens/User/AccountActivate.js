import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useForms from "../../hooks/useForms";

import Alert from "../../Components/Alert";
import { useStore } from "../../store";

function AccountActivate() {
  const { token } = useParams();
  let history = useHistory();

  const { submitForm, state } = useForms("email-activate");

  const handleSubmit = () => {
    const data = { token };
    submitForm(data);
  };

  const stateOfAuth = useStore((state) => state.stateOfAuth);
  const setStateOfAuth = useStore((state) => state.setStateOfAuth);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (state.isSuccess) {
        localStorage.setItem("AuthToken", `${state.data.token}`);

        setStateOfAuth(false);
        history.push("/");
      } 
      else if (state.isError) {
        setStateOfAuth(false);
        history.push("/signup");
      }
      localStorage.removeItem("stateOfAuth");
      clearTimeout(timer);
    }, 3000);
  }, [history, setStateOfAuth, state.data, state.isError, state.isSuccess]);

  return stateOfAuth ? (
    <div className="m-2 p-4 text-center ">
      <button
        className="
    border-2 border-blue-500 px-8 py-2 
    rounded-full hover:bg-blue-200
    "
        onClick={handleSubmit}
      >
        Activate Account
      </button>

      <div className="border-1 border-gray-900 m-4 p-2">
        {state.isLoading && <div>Loading....</div>}
        {state.isError && (
          <Alert Message={state.error.error} variant="red" visible={true} />
        )}
        {state.isSuccess && (
          <Alert Message={state.data.message} variant="green" visible={true} />
        )}
      </div>
    </div>
  ) : (
    <Alert
      Message={"Opps! 404 , no Such route exist"}
      variant="red"
      visible={true}
    />
  );
}

export default AccountActivate;
