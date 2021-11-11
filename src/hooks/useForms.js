import axios from "axios";
import { useReducer } from "react";

export default function useForms(route) {
  const [state, setState] = useReducer((_, action) => action, {
    isLoading: false,
  });

  const submitForm = async (data) => {
    setState({ isLoading: true });

    try {
      const res = await axios.post(`http://localhost:5000/api/${route}`, data);

      setState({ isSuccess: true, data: res.data });
    } catch (error) {
      setState({
        isError: true,
        error: error.response.data ? error.response.data : error,
      });
    }
  };

  return {
    submitForm,
    state,
  };
}
