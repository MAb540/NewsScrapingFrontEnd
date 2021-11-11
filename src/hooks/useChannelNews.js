import axios from "axios";
import { useEffect, useReducer } from "react";

export default function useChannelNews(channelname) {
  const [state, setState] = useReducer((_, action) => action, {
    isLoading: true,
  });

  const fetch = async () => {
    setState({ isLoading: true });
    try {

      // /:channelname/allnews
      console.log(channelname);

      const data = await axios
        .get(`http://localhost:5000/channels/${channelname}/allnews?page=1&limit=10`)
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
