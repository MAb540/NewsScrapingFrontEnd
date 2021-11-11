import React from "react";
import { Link } from "react-router-dom";

const AdminNewsListItem = React.forwardRef((props, ref) => {
  let news = props.news;

  let fromChannel = props.fromChannel;
  let channelName = props.channelName;

  let url;
  if (fromChannel === "fromChannel") {
    url = `/admin/channellist/${channelName}/${news._id}`;
  } else {
    url = `/admin/newslist/${news._id}`;
  }

  return (
    <li
      ref={ref}
      className="list-decimal my-6 px-4 py-4 bg-white  border rounded-md border-blue-500 shadow-xl"
    >
      <Link to={url} className="hover:underline text-xl ">
        <h2>{news.newsTitle}</h2>
      </Link>
    </li>
  );
});

export default AdminNewsListItem;
