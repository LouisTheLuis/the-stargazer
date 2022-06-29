import React, { useState, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get, post } from "../../utilities";
import logo from "./images/logo.png";
import { Link } from "@reach/router";
import GlitchText from "react-glitch-effect/core/GlitchText";

import "../../utilities.css";
import "./Leaderboard.css";
import column1 from "./images/column1.png";
import column2 from "./images/column2.png";

const GOOGLE_CLIENT_ID = "715577014512-flo8qqmhkuliopuucfov4874ki39704v.apps.googleusercontent.com";

const Leaderboard = ({ userId, handleLogout }) => {
  const [profile, setProfile] = useState(""); // User profile name

  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [third, setThird] = useState([]);
  const [fourth, setFourth] = useState([]);
  const [fifth, setFifth] = useState([]);

  // This useEffect is used to obtain the name of the current profile.
  useEffect(() => {
    let leaders = []
    const body = { user: userId };
            get("/api/leader", body).then((users) => {
              let userlist = users
              function arrayRemove(arr, value) {
                return arr.filter(function (ele) {
                  return ele != value;
                });
              }

              while (leaders.length < 5){ 
                var greatestname = ""
                var greaternumber = 0
                var currentindex = 0
              for (let i = 0; i < userlist.length; i++) {
                if (userlist[i].compscore >= greaternumber){ 
                   greatestname = userlist[i].name 
                   greaternumber = userlist[i].compscore
                   currentindex = i
                }
                  
              }

              leaders.push([greatestname, greaternumber])
              userlist = arrayRemove(userlist, userlist[currentindex])
              }
              setFirst([leaders[0][0], leaders[0][1]])
              setSecond([leaders[1][0], leaders[1][1]])
              setThird([leaders[2][0], leaders[2][1]])
              setFourth([leaders[3][0], leaders[3][1]])
              setFifth([leaders[4][0], leaders[4][1]])

                  console.log(leaders)
            
            })

   
  }, []);
  useEffect(() => {
    const body = { user: userId };
    get("/api/using", body).then((user) => {
      console.log(user.googleid);
      setProfile(user.name);
    });
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
      <div id="leaderboard-background">
        <img className="column1" src={column1} />
        <img className="column2" src={column2} />
        {/* //////////////////// LEADERBOARD HTML ///////////////////////*/}
        <div id="leaderboard-title"><GlitchText color1="#c895e2" color2="#0abdc6">LEADERBOARD</GlitchText></div>
        <div id="leaderboard-container">
          <div id="names-container">
            <div id="names-title"><GlitchText color1="#ffffff" duration="5000">USERS</GlitchText></div>
            <div className="names">{first[0]}</div>
            <div className="names">{second[0]}</div>
            <div className="names">{third[0]}</div>
            <div className="names">{fourth[0]}</div>
            <div className="names">{fifth[0]}</div>
          </div>
          <div id="scores-container">
          <div id="scores-title"><GlitchText color1="#ffffff" duration="5000">SCORES</GlitchText></div>
            <div className="scores">{first[1]}</div>
            <div className="scores">{second[1]}</div>
            <div className="scores">{third[1]}</div>
            <div className="scores">{fourth[1]}</div>
            <div className="scores">{fifth[1]}</div>
          </div>
        </div>
        {/* //////////////////// LEADERBOARD HTML ///////////////////////*/}

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

      </div>
    </>
  );
};

export default Leaderboard;
