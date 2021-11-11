import React, { Fragment, useState } from "react";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useStore } from "../store";
import { handleLogout } from "../Utilities/Utility";

function Navbar({ NavMenuChange }) {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  let dropDown = `absolute  right-0 min-w-twelve-rem p-4 m-0 mt-2 rounded-lg  z-10 bg-white
        ${isOpen ? "block" : "hidden"}
    `;

  return (
    <nav
      className="container h-16  mx-auto  flex justify-between items-center  bg-white text-black font-serif
         shadow-md  
        "
    >
      <div className="pl-8 ">NewsWeb</div>
      <div className="px-6 cursor-pointer md:hidden" onClick={NavMenuChange}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      <div className="pr-8 md:block hidden">
        <Link to="/" className="px-4">
          Home
        </Link>

        {isLoggedIn ? (
          <div
            className="inline-block relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="5 -7 20 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>

            <ul className={dropDown}>
              <li className="p-2 hover:bg-blue-200">
                {" "}
                <Link to="/admin" className="p-4">
                  Admin
                </Link>{" "}
              </li>
              <li className="p-2 hover:bg-blue-200">
                {" "}
                <Link to="/news" className="p-4">
                  All News
                </Link>{" "}
              </li>

              <li className="p-2 hover:bg-blue-200">
                {" "}
                <Link
                  to="#"
                  className="p-4"
                  onClick={() => handleLogout(setIsLoggedIn, history)}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Fragment>
            <Link to="/news" className="p-4">
              All News
            </Link>
            <Link to="/login" className="p-4">
              Login
            </Link>
          </Fragment>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

//  <li className="p-2 hover:bg-blue-200">
// {" "}
// <Link to="/admin" className="p-4">
//       Channel List
// </Link>{" "}
// </li>

{
  /* <li className="p-2 hover:bg-blue-200">
{" "}
<Link to={`${location.pathname}/newslist`} className="p-4">
        News List
</Link>{" "}
</li> */
}
