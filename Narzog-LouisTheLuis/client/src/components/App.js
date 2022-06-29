import React, { useState, useEffect } from "react";
import { Router , navigate, Redirect } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Main from "./pages/Main.js";
import Login from "./pages/Login.js";
import Learning from "./pages/Learning.js";
import Casual from "./pages/Casual.js";
import Competitive from "./pages/Competitive.js";
import Leaderboard from "./pages/Leaderboard.js";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [name, setName] = useState("");

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setName(res.profileObj.name);
      console.log(name);
      post("/api/initsocket", { socketid: socket.id });
    });
  }; 
  //Google Login Handle 

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };
  if (!userId) { 
  return (
    <>
      <Router>
        <Redirect from = "/home" to = "/" />
        <Redirect from = "/learning" to = "/" />
        <Redirect from = "/casual" to = "/" />
        <Redirect from = "/competitive" to = "/" />
        <Redirect from = "/leaderboard" to = "/" />
        <Login path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} name={name} />
        <NotFound default />
      </Router>
    </>
  ) } 

  else {
    return ( 
    <>
    <Router>
        <Redirect from = "/" to = "/home"/>
        <Main path="/home" handleLogout={handleLogout} userId={userId} name={name}/>
        <Learning path="/learning" handleLogout={handleLogout} userId={userId} />
        <Casual path="/casual" handleLogout={handleLogout} userId={userId} />
        <Competitive path="/competitive" handleLogout={handleLogout} userId={userId} />
        <Leaderboard path="/leaderboard" handleLogout={handleLogout} userId={userId} />
        <NotFound default />
      </Router>
    </>
    )
  }
  
  }
;

export default App;
