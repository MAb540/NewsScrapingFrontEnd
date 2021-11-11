import axios from "axios";
import { useCallback, useReducer } from "react";
import { useStore } from "../store";

function useAdminDeleteNews() {
  const [state, setState] = useReducer((_, action) => action, {
    isIdle: true,
  });

  const signInInfo = useStore((state) => state.signInInfo);

  let { token } = signInInfo.userInfo;

  const mutate = useCallback(async (newsId) => {
    setState({ isLoading: true });

    try {
      const { data } = await axios.delete(
        `http://localhost:5000/news/${newsId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setState({ isSuccess: true,  data:data });
    } catch (error) {
      console.error(error.response);
      setState({ isError: true, error:error.response.data.message});
    }
  }, []);

  return [mutate, state];
}

export default useAdminDeleteNews;
