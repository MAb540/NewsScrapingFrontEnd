import axios from "axios";
import { useEffect, useReducer } from "react";

export default function useNewsChannels(dataStatusValue) {
  const [state, setState] = useReducer((_, action) => action, {
    isLoading: true,
  });

  const fetch = async () => {
    setState({ isLoading: true });

    console.log(dataStatusValue);

    let url = `http://localhost:5000/channels?dataStatus=${dataStatusValue}`;

    try {
      const data = await axios
        .get(url) //Ary/allnews?page=1&limit=10
        .then((res) => res.data);

      setState({ isSuccess: true, data });
    } catch (error) {
      setState({ isError: true, error });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    ...state,
    fetch,
  };
}
