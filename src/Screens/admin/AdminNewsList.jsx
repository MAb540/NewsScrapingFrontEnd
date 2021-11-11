import React, { Fragment, useCallback, useRef, useState } from "react";

import useNews from "../../hooks/useNews";
import AdminNewsListItem from "../../Components/AdminNewsListItem";

function AdminNewsList() {
  const [pageNumber, setPageNumber] = useState(1);

  const newsState = useNews(pageNumber);

  const observer = useRef();
  const lastNewsElementRef = useCallback(
    (node) => {
      if (newsState.isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && newsState.hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [newsState.isLoading, newsState.hasMore]
  );

  return (
    <div className="mx-auto  border-2   shadow-md ">
      <ul className="mx-8 ">
        {newsState.isLoading ? (
          <div>loading</div>
        ) : newsState.isError ? (
          <div>{newsState.error.message}</div>
        ) : newsState.data.length !== 0 ? (
          newsState.data.map((news, index) => {
            if (newsState.data.length === index + 1) {
              return (
                <AdminNewsListItem
                  key={news._id}
                  news={news}
                  ref={lastNewsElementRef}
                />
              );
            }
            return <AdminNewsListItem key={news._id} news={news} />;
          })
        ) : (
          <Fragment>No News To Show</Fragment>
        )}
      </ul>
    </div>
  );
}

export default AdminNewsList;
