import React, { Fragment } from "react";
import { Switch, Link, Route } from "react-router-dom";

import AdminNewsList from "./AdminNewsList";
import AdminChannelsList from "./AdminChannelsList";
import AdminNewsListDetails from "./AdminNewsListDetails";
import AdminChannelNewsList from "./AdminChannelNewsList";
import AdminChannelNewsListDetails from "./AdminChannelNewsListDetails";

const MainContent = () => {
  return (
    <div className="flex   flex-wrap  my-6 mx-auto  shadow-md">
      <div className="flex-shrink  m-4 ">
        <Link
          to="/admin/newslist"
          className=" text-lg border-2 border-blue-500 px-6 py-2 
            rounded-full hover:bg-blue-200"
        >
          All News List
        </Link>
      </div>

      <div className="flex-shrink m-4">
        <Link
          to="/admin/channellist"
          className="text-lg border-2 border-blue-500 px-6 py-2 
            rounded-full hover:bg-blue-200"
        >
          {" "}
          Channels List
        </Link>
      </div>
    </div>
  );
};

function Admin() {
  return (
    <Fragment>
      <MainContent />
      <Switch>
        <Route exact path="/admin"></Route>

        <Route path={"/admin/newslist/:newsId"}>
          <AdminNewsListDetails />
        </Route>

        <Route path={"/admin/newslist"}>
          <AdminNewsList />
        </Route>

        <Route path={"/admin/channellist/:channelName/:newsId"}>
          <AdminChannelNewsListDetails />
        </Route>

        <Route path={"/admin/channellist/:channelName"}>
          <AdminChannelNewsList />
        </Route>

        <Route path={"/admin/channellist"}>
          <AdminChannelsList />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default Admin;
