import React, { useCallback, useRef, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import AdminNewsListItem from "../../Components/AdminNewsListItem";
import useTest from "../../hooks/useTest";

function AdminChannelNewsList() {
  const [pageNumber, setPageNumber] = useState(1);

  const { channelName } = useParams();

  const test = useTest(pageNumber, channelName);

  const observer = useRef();
  const lastNewsElementRef = useCallback(
    (node) => {
      if (test.isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && test.hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [test.isLoading, test.hasMore]
  );

  return (
    <div className="mx-auto  border-2   shadow-md ">
      <ul className="mx-8 ">
        {test.isLoading ? (
          <div>loading</div>
        ) : test.isError ? (
          <div>{test.error.message}</div>
        ) : test.data.length !== 0 ? (
          test.data.map((news, index) => {
            if (test.data.length === index + 1) {
              return (
                <AdminNewsListItem
                  key={news._id}
                  news={news}
                  ref={lastNewsElementRef}
                />
              );
            }
            return <AdminNewsListItem key={news._id} news={news} fromChannel={'fromChannel'} channelName={channelName}  />;
          })
        ) : (
          <Fragment>No News To Show</Fragment>
        )}
      </ul>
    </div>
  );
}

export default AdminChannelNewsList;
