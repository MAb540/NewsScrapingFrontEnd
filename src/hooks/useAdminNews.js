import axios from "axios";
import React, { useEffect, useReducer } from "react";

function useAdminNews(newsId) {
  const [state, setState] = useReducer((_, action) => action, {
    isLoading: true,
  });

  useEffect(() => {
    const fetch = async () => {
      setState({ isLoading: true });
      try {
        const { data } = await axios.get(
          `http://localhost:5000/news/${newsId}`
        );

        // console.log(data);

        setState({ isLoading: false, isSuccess: true, data });
      } catch (error) {
        setState({ isLoading: false, isError: true, error });
      }
    };
    fetch();
  }, [newsId]);

  return {
    ...state,
    fetch,
  };
}

export default useAdminNews;
