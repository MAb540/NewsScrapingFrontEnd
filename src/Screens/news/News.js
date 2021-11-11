import React, { Fragment, useRef, useCallback, useState } from "react";

import NewsCard from "../../Components/NewsCard";

import useNews from "../../hooks/useNews";

function News() {
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
    <Fragment>
      <div className="container px-5 py-24 mx-auto">
        {newsState.isLoading ? (
          <div>loading</div>
        ) : newsState.isError ? (
          <div>{newsState.error.message}</div>
        ) : newsState.data.length !== 0 ? (
          newsState.data.map((news, index) => {
            if (newsState.data.length === index + 1) {
              return (
                <NewsCard key={news._id} News={news} ref={lastNewsElementRef} />
              );
            }
            return <NewsCard key={news._id} News={news} />;
          })
        ) : (
          <Fragment>No News To Show</Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default News;
