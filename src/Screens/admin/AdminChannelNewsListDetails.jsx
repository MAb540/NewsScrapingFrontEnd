import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import AdminNewsDetailCard from "../../Components/AdminNewsDetailCard";
import Alert from "../../Components/Alert";
import useAdminDeleteNews from "../../hooks/useAdminDeleteNews";
import useAdminNews from "../../hooks/useAdminNews";

function AdminChannelNewsListDetails() {
  let { newsId, channelName } = useParams();

  let state = useAdminNews(newsId);

  let [deleteNews, deleteNewsState] = useAdminDeleteNews();

  let history = useHistory();

  const handleDelete = () => {
    deleteNews(newsId);
    console.log(deleteNewsState);
  };

  useEffect(() => {
    console.log(deleteNewsState);
    if (deleteNewsState.isSuccess) {
      setTimeout(() => {
        history.push(`/admin/channellist/${channelName}`);
      }, 2000);
    }
  }, [channelName, deleteNewsState, history]);

  return (
    <div
      className="flex flex-col items-center md:items-start md:flex-row md:justify-start  mx-12 my-4   
             p-2 shadow-xl"
    >
      {state.isLoading ? (
        <div>Loading...</div>
      ) : state.isError ? (
        <Alert Message={state.error} variant="red" visible={true} />
      ) : state.data == null ? (
        <div>No record Found</div>
      ) : (
        <AdminNewsDetailCard
          data={state.data}
          deleteNewsState={deleteNewsState}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default AdminChannelNewsListDetails;
