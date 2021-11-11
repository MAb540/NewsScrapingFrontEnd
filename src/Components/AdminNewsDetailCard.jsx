import React, { Fragment } from "react";
import Alert from "./Alert";

function AdminNewsDetailCard(props) {
  let { data, handleDelete, deleteNewsState } = props;

  return (
    <Fragment>
      <div className=" sm:3/4  md:w-2/4 p-4">
        <img
          className="h-48 w-full md:h-48 md:w-full lg:h-80 lg:w-full  object-cover object-center"
          src={data.newsImage}
          alt="blog"
        />
      </div>

      <div className=" sm:3/4 md:w-2/4 p-4 ">
        {deleteNewsState.isLoading && <div>Loading...</div>}
        {deleteNewsState.isError && (
          <Alert Message={deleteNewsState.error} variant="red" visible={true} />
        )}
        {deleteNewsState.isSuccess && (
          <Alert
            Message={deleteNewsState.data.message}
            variant="green"
            visible={true}
          />
        )}

        <h1 className="px-4  text-sm">
          Date/Time of News: <span>{"20:38:24 2021-06-16"}</span>
        </h1>
        <h1 className="p-4 text-2xl">
          Title:
          <span className="text-xl">
            {" "}
            {data.newsTitle}
            {".\t"}
            <a
              href={data.newsLink}
              target="blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Visit Main Source
            </a>
          </span>
        </h1>

        <h1 className="p-4 text-2xl">
          Description:
          <span className="text-xl">
            {" "}
            {data.newsDescription !== undefined
              ? data.newsDescription
              : "No Description"}
          </span>
        </h1>

        <h1 className="p-4 text-2xl">
          Channel:
          <span className="text-xl">
            {"  " + data.nameOfChannel.nameOfChannel}
          </span>
        </h1>

        <div className="p-4">
          <button
            className="border-2 border-red-500 px-8 py-2 
                  rounded-full hover:bg-red-300 hover:outline-none focus:outline-none"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminNewsDetailCard;
