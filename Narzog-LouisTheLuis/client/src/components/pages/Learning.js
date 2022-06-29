import React, { useState, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get, post } from "../../utilities";
import logo from "./images/logo.png";
import { Link } from "@reach/router";
import GlitchText from "react-glitch-effect/core/GlitchText";

import "../../utilities.css";
import "./Learning.css";

const GOOGLE_CLIENT_ID = "715577014512-flo8qqmhkuliopuucfov4874ki39704v.apps.googleusercontent.com";

const Learning = ({ userId, handleLogout }) => {
  const [title, setTitle] = useState("");  // Title in Learning page
  const [content, setContent] = useState(""); // Content in Learning page
  const [myth, setMyth] = useState(""); // Mythological image in Learning page
  const [constel, setConstel] = useState(""); // Constellation image in Learning page
  const [index, setIndex] = useState(0); // Index of the constellations when switching
  // const [count, setCount] = useState(0); // Counting 
  const [counts, setCounts] = useState(0) ; // Counting
  const [profile, setProfile] = useState(""); // User profile name


  
    const [loaded, setLoaded] = useState(false);
    // const [loaded2, setLoaded2] = useState(false);

    function onLoad() {
      setLoaded(true);
    }
    function offLoad() {
        setLoaded(false);
      }
  



  /* Obtains the user profile name */
  useEffect(() => {
    const body = { user: userId };
    get("/api/using", body).then((user) => {
      setProfile(user.name);
    });
  }, []);

  /* 
  Handling of 'Next' and 'Back' buttons, which switch the images and the descriptions.
  */
  const handleNext = (event) => {
    event.preventDefault();
    if (index >= 46) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };
  const handleBack = (event) => {
    event.preventDefault();
    if (index <= 0) {
      setIndex(46);
    } else {
      setIndex(index - 1);
    }
  };

  /* Counting button functioning */
  const buttonCount = (event) => {
    event.preventDefault();
    setCounts(counts + 1);
  };

  /* Functioning of counting (to the database) and of the receiving point of descriptions and names */
  useEffect(() => {
    const body = { index: index };
    get("/api/stars", body).then((star) => {
      setTitle(star.name);
      setContent(star.content);
      setMyth(star.myth_img);
      setConstel(star.const_img);
    });
    post("/api/point", body).then((star) => {
      setCount(star.next);
    });
  }, [index, counts]);

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

  const handleToggleGlitch = () => {
    setDisabled(!isDisabled);
  };

  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
      </style>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');
      </style>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Titillium+Web:wght@300;600&family=Ubuntu:wght@300&display=swap');
      </style>

      <div id="learning-background">
        {/* //////////////////// SIDEBAR HTML ///////////////////////*/}
        <div id="mySidebar" className="sidebar">
          <div className="profile-content">HELLO {profile}</div>
          <Link id="remove-underline" to="/home">
            <button className="sidebar-buttons">Home</button>
          </Link>
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            onFailure={(err) => console.log(err)}
            render={(props) => (
              <div>
                <button className="sidebar-buttons" onClick={props.onClick}>
                  Logout
                </button>
              </div>
            )}
          />
          <button className="sidebar-buttons" onClick={closeNav}>
            Close
          </button>
        </div>
        <button id="main" className="openbtn" onClick={openNav}>
          <img src={logo} width="100%" height="100%" />
        </button>
        {/* //////////////////// SIDEBAR HTML ///////////////////////*/}

        {/* //////////////////// LEARNING HTML ///////////////////////*/}
        <div className="learning-container">
          <div className="title-container"><GlitchText color1="#c895e2" color2="#0abdc6">{title}</GlitchText></div>
          {/* <img className="image-container" src={constel} /> */}
          <img className="image-container"
        style={{display: loaded? 'block': 'none'}}
        src={constel}
       /> 
          <div className="description-container">
            <div className="description-text">{content}</div>
            <button className="select-button-back" onClick={handleBack}>Back</button>
            <button className="select-button-next" onClick={handleNext}>Next</button>
          </div>

          {/* <button className="select-button" onClick={buttonCount}>
            Click Me! {count}
          </button> */}
        </div>
        {/* //////////////////// LEARNING HTML ///////////////////////*/}

        {/* //////////////////// IMAGE HTML ///////////////////////*/}
        <div id="myth-image-container">

        <img className="image-myth-container" 
        style={{display: loaded? 'block': 'none'}}
        onLoad={onLoad}
        src={myth}
       /> 

          {/* <img className="image-myth-container" src={myth}/> */}
        </div>
        {/* //////////////////// IMAGE HTML ///////////////////////*/}
        
      </div>
    </>
  );
};

export default Learning;
