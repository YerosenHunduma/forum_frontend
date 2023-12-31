import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./Context/Context";
import { v4 as uuid } from "uuid";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import routes from "./route/index";
import axios from "./axios";
import preloader from "./resource/Images/preloader-8d5a7d18.gif";

import { AuthenticatedRoute } from "./auth/ProtectedRoutes";

function App() {
  const [userData, setuserData] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const checkLoggedIn = async () => {
    // Check if token already exists in localStorage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      // Token not in localStorage then set auth token empty
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      try {
        // If the token exists in localStorage, use auth to verify token and get user info
        const userRes = await axios.get("/users/check", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log("check user", userRes.data.user.username);
        // Set the global state with user info
        setuserData({
          token,
          user: {
            username: userRes.data.user.username,
            userid: userRes.data.user.userid,
          },
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setuserData({ token: undefined, user: undefined });
      } finally {
        // Set loading to false after the asynchronous request is complete
        setLoading(false);
      }
    }
  };

  const logout = () => {
    setuserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src={preloader}
          alt="preloader"
          style={{
            width: "80px",
            height: "80px",
          }}
        />
        ;
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Header logout={logout} />
        <Routes>
          {routes.map((route) => (
            <React.Fragment key={uuid()}>
              {route.isAuthenticated ? (
                <Route
                  element={
                    <AuthenticatedRoute>{route.element}</AuthenticatedRoute>
                  }
                  path={route.path}
                />
              ) : (
                <Route element={route.element} path={route.path} />
              )}
            </React.Fragment>
          ))}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
