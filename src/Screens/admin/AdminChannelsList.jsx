import React from "react";
import { Link } from "react-router-dom";
import Alert from "../../Components/Alert";
import useNewsChannels from "../../hooks/useNewsChannels";
import { dateFormat } from "../../Utilities/Utility";

const AdminChannelListCard = (props) => {
  const { nameOfChannel, _id, lastNewsDateTime, totalNoOfNews } = props.channel;

  return (
    <li
      className=" my-6 px-4 py-4 bg-white  border rounded-md border-blue-500 shadow-xl
      lg:flex justify-between items-center
"
    >
      <Link
        to={`/admin/channellist/${nameOfChannel}`}
        className="hover:underline text-xl "
      >
        <h2>{nameOfChannel}</h2>
      </Link>
      <h2>
        Total No of News : <span>{totalNoOfNews}</span>
      </h2>
      <h2>
        Last News DateTime:{" "}
        {dateFormat(
          lastNewsDateTime !== null ? lastNewsDateTime.createdAt : null
        )}{" "}
      </h2>
    </li>
  );
};

function AdminChannelsList() {
  const newsChannelsQuery = useNewsChannels("halfData");

  return (
    <div className="mx-auto  border-2   shadow-md">
      <ul className="mx-10 list-decimal">
        {newsChannelsQuery.isLoading ? (
          <span>Loading </span>
        ) : newsChannelsQuery.isError ? (
          <Alert
            Message={newsChannelsQuery.error.message}
            variant="red"
            visible={true}
          />
        ) : (
          newsChannelsQuery.data.map((channel) => (
            <AdminChannelListCard key={channel._id} channel={channel} />
          ))
        )}
      </ul>
    </div>
  );
}

export default AdminChannelsList;
