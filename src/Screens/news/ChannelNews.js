import React, { Fragment, useCallback, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../../Components/NewsCard";

import useTest from "../../hooks/useTest";

function ChannelNews() {
  const [pageNumber, setPageNumber] = useState(1);

  const { nameOfChannel } = useParams();

  const channelNewsState = useTest(pageNumber, nameOfChannel);

  const observer = useRef();
  const lastNewsElementRef = useCallback(
    (node) => {
      if (channelNewsState.isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && channelNewsState.hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [channelNewsState.isLoading, channelNewsState.hasMore]
  );

  return (
    <Fragment>
      <div class="container px-5 py-20 mx-auto">
        {channelNewsState.isLoading ? (
          <div>loading</div>
        ) : channelNewsState.isError ? (
          <div>{channelNewsState.error.message}</div>
        ) : channelNewsState.data.length !== 0 ? (
          channelNewsState.data.map((news, index) => {
            if (channelNewsState.data.length === index + 1) {
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

export default ChannelNews;
