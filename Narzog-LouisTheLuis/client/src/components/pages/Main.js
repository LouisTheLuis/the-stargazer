import React, { useState, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";
import GlitchClip from "react-glitch-effect/core/GlitchClip";
import GlitchText from "react-glitch-effect/core/GlitchText";
import logo from "./images/logo.png";
import constellation from "./data/constellations.json";

import "../../utilities.css";
import "./Main.css";
import "./Learning.js";

const GOOGLE_CLIENT_ID = "715577014512-flo8qqmhkuliopuucfov4874ki39704v.apps.googleusercontent.com";

const Main = ({ userId, handleLogout }) => {
  const [profile, setProfile] = useState(""); // User profile name
  const [pic, setPic] = useState(""); // User profile picture
  const [isDisabled, setDisabled] = useState(false); // Enabling of glitch animation

  useEffect(() => {
    const body = { user: userId };
    get("/api/using", body).then((user) => {
      setProfile(user.name);
      setPic(user.picture)
    });

    const bod = { user: userId };
    get("/api/using", bod).then((user) => {
      // initialvalue = (user.currentcomp);
      // var cur = user.currentcomp
      // post("api/initial", {index: cur})
    });
    // useEffect(() => {
    
  // }, []);
  //   post("/api/newdata", constellation).then((star) => { 
  //     console.log("done")
  //   });

  }, []);
  
  /*
  /////////////// SIDEBAR NAVIGATION /////////////////
  */
  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  // Glitch animation feature (DON'T DELETE)
  const handleToggleGlitch = () => {
    setDisabled(!isDisabled);
  };

  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
      </style>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
      </style>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Titillium+Web:wght@300;600&family=Ubuntu:wght@300&display=swap');
      </style>

      <div id="main-background">

        {/* //////////////////// PROFILE HTML ///////////////////////*/}
        <div id="profile-box">
          <div id="profile-content">
            <img id="profile-pic" src={pic}/>
            Welcome to Stargazer, {profile}!
          </div>
        </div>
        {/* //////////////////// PROFILE HTML ///////////////////////*/}

        {/* //////////////////// BACKGROUND STARS HTML ///////////////////////*/}
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        {/* //////////////////// BACKGROUND STARS HTML ///////////////////////*/}

        {/* //////////////////// SELECTION HTML ///////////////////////*/}
        <div id="selection-box-wrap">
          <div id="selection-box"> 
            <div id="selection-content">
              <Link to="/learning" className="remove-underline">
                <button className="selection-button position-1"><GlitchText color1="#ea00d9" color2="#0abdc6" onHover="true">LEARNING</GlitchText></button>
              </Link>
              <Link to="/casual" className="remove-underline">
                <button className="selection-button position-2"><GlitchText color1="#ea00d9" color2="#0abdc6" onHover="true">CASUAL</GlitchText></button>
              </Link>
              <Link to="/competitive" className="remove-underline">
                <button className="selection-button position-3"><GlitchText color1="#ea00d9" color2="#0abdc6" onHover="true">COMPETITIVE</GlitchText></button>
              </Link>
              <Link to="/leaderboard" className="remove-underline">
                <button className="selection-button position-4"><GlitchText color1="#ea00d9" color2="#0abdc6" onHover="true">LEADERBOARD</GlitchText></button>
              </Link>
            </div>
          </div>
        </div>
        {/* //////////////////// SELECTION HTML ///////////////////////*/}

        {/* //////////////////// SIDEBAR HTML ///////////////////////*/}
        <div id="mySidebar" className="sidebar">
          <div className="profile-content">STARGAZER {profile}</div>
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            onFailure={(err) => console.log(err)}
            render={(props) => (
              <div>
                <button className="sidebar-buttons" onClick={props.onClick}>Logout</button>
              </div>
            )}
          />
          <button className="sidebar-buttons" onClick={closeNav}>Close</button>
        </div>
        <button id="main" className="openbtn" onClick={openNav}>
          <img src={logo} width="100%" height="100%" />
        </button>
        {/* //////////////////// SIDEBAR HTML ///////////////////////*/}

      </div>
    </>
  );
};

export default Main;
