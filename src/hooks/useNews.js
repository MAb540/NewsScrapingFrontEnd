import axios from "axios";
import { useEffect, useReducer } from "react";

const initState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  hasMore: false,
  data: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA_LOADING":
      return { ...state, isLoading: action.payload };

    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        isLoading: action.payload.isLoading,
        isSuccess: action.payload.isSuccess,
        data: [...state.data, ...action.payload.data],
        hasMore: action.payload.hasMore,
      };

    case "FETCH_DATA_FAIL":
      return {
        ...state,
        isLoading: action.payload.isLoading,
        isError: action.payload.isError,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default function useNews(pageNumber) {
  const [state, dispatch] = useReducer(reducer, initState);

  const loadindData = (payload) => {
    dispatch({ type: "FETCH_DATA_LOADING", payload });
  };

  const dataSuccess = (payload) => {
    dispatch({ type: "FETCH_DATA_SUCCESS", payload });
  };

  const dataFail = (payload) => {
    dispatch({ type: "FETCH_DATA_FAIL", payload });
  };

  useEffect(() => {
    loadindData(true);
    try {
      axios({
        method: "GET",
        url: "http://localhost:5000/news",
        params: { page: pageNumber, limit: 10 },
      }).then((res) => {
        dataSuccess({
          isLoading: false,
          isSuccess: true,
          data: res.data.result,
          hasMore: res.data.result.length > 0,
        });
      });
    } catch (error) {
      dataFail({
        isLoading: false,
        isError: true,
        error,
      });
    }
  }, [pageNumber]);

  return {
    ...state,
  };
}

// const [state, setState] = useReducer((_, action) => action, {
// isLoading: true,
// hasMore: false,
// data: [],
// });

// let url;

// if (whichComp === "ChannelNews") {
//   url = `http://localhost:5000/channels/${nameOfChannel}/allnews`;
// } else {
//   url = `http://localhost:5000/news`;
// }

// setState({ isError: true, error });
// setState({
//   isLoading: false,
//   isSuccess: true,
//   data: [...res.data.result],
//   hasMore: res.data.result.length > 0,
// });
// const fetch;

//useCallback(, [pageNumber]);

// const fetchData = async (pageNumber) => {
//   setState({ isLoading: true });
//   try {

//     axios({
//       method: "GET",
//       url: "http://localhost:5000/news",
//       params: { page: pageNumber, limit: 10 },
//     }).then((res) => {
//       console.log(res.data.result);
//       setState({
//         isSuccess: true,
//         data: [...[...state.data, ...res.data.result]],
//         hasMore: res.data.result.length > 0,
//         isLoading: false,
//       });
//     });
//   } catch (error) {
//     setState({ isError: true, error });
//   }
// }

// isSuccess: true,
// data: [...[...state.data, ...res.data.result]],
// hasMore: res.data.result.length > 0,
// isLoading: false,

// setState(state => ({
//   isSuccess: true,
//   isLoading: false,
//   data: [...state.data, ...res.data.result],
//   hasMore: res.data.result.length > 0,
// }));

// ?page=1&limit=10
// const {data} = await axios({
//   method:'GET',
//   url:"http://localhost:5000/news",
//   params:{page:pageNumber,limit:10}
// })
