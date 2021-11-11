import React from "react";
import { Link } from "react-router-dom";
import Alert from "../../Components/Alert";
import useNewsChannels from "../../hooks/useNewsChannels";

const NewsChannelCard = ({ channel }) => {
  const { nameOfChannel, imgageOfChannel, descriptionOfChannel } = channel;

  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="h-60 md:h-36 lg:h-48  w-full object-cover object-center"
          src={imgageOfChannel}
          alt="blog"
        />
        <div className="p-6">
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {nameOfChannel}
          </h1>
          <p className="leading-relaxed mb-3">
            {descriptionOfChannel.substr(0, 60)}
          </p>
          <div className="flex items-center flex-wrap ">
            <Link
              to={`channel/${nameOfChannel}`}
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
            >
              Show News
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function Home() {
  const newsChannelsQuery = useNewsChannels("completeData");

  return (
    <div className="container px-5 py-20 mx-auto border-1 ">
      <div className="flex flex-wrap ">
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
            <NewsChannelCard key={channel._id} channel={channel} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
