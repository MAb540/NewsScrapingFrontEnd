import React from "react";
import { dateFormat } from "../Utilities/Utility";

const NewsCard = React.forwardRef((props, ref) => {
  const { newsTitle, newsLink, newsImage, createdAt } = props.News;

  return (
    <div
      ref={ref}
      className="px-4 py-8 flex flex-wrap md:flex-nowrap border-2 border-gray-200 shadow-lg"
    >
      <div className="  flex justify-center  lg:w-1/4   ">
        <img
          className="h-48 w-full md:h-26 md:w-3/4 lg:h-24 lg:w-3/4  object-cover object-center "
          src={newsImage}
          alt="blog"
        />
      </div>

      <div className="md:flex-grow  self-auto  ">
        <span>{dateFormat(createdAt)}</span>
        <a href={newsLink} target="blank" rel="noopener noreferrer">
          <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
            {newsTitle}
          </h2>
        </a>
        <p className="leading-relaxed">
          {props.News.newsDescription !== undefined
            ? props.News.newsDescription
            : null}
        </p>
      </div>
    </div>
  );
});

export default NewsCard;
