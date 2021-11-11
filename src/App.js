import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Fragment, useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Dropdown from "./Components/Dropdown";

import Home from "./Screens/news";
import News from "./Screens/news/News";
import ChannelNews from "./Screens/news/ChannelNews";
import Signup from "./Screens/User/Signup";
import AccountActivate from "./Screens/User/AccountActivate";
import Login from "./Screens/User/Login";
import Admin from "./Screens/admin/Admin";
import ProtectedRoute from "./Utilities/ProtectedRoute";
import { useStore } from "./store";

function App() {
  const [navMenuIsOpen, setNavMenuIsOpen] = useState(false);
  const handleNavMenuChange = () => {
    setNavMenuIsOpen(!navMenuIsOpen);
  };
  useEffect(() => {
    const hidenMenu = () => {
      if (window.innerWidth > 767 && navMenuIsOpen) {
        setNavMenuIsOpen(false);
      }
    };
    window.addEventListener("resize", hidenMenu);
    return () => {
      window.removeEventListener("resize", hidenMenu);
    };
  });
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <Router>
      <Fragment>
        <Navbar NavMenuChange={handleNavMenuChange} />

        {navMenuIsOpen ? (
          <Dropdown handleDropMenu={handleNavMenuChange} />
        ) : null}
        <Switch>
          <Route
            path="/authentication/activate/:token"
            component={AccountActivate}
          />

          <Route path="/channel/:nameOfChannel" component={ChannelNews} />
          <Route path="/news" component={News} />
          <Route path="/signup">
            {isLoggedIn ? <Redirect push to="/" /> : <Signup />}
          </Route>
          <Route path="/login">
            {isLoggedIn ? <Redirect push to="/" /> : <Login />}
          </Route>

          <ProtectedRoute path="/admin" component={Admin} />

          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
