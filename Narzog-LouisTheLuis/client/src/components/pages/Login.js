import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Anime from 'react-anime';
import GlitchClip from 'react-glitch-effect/core/GlitchClip';

import "../../utilities.css";
import "./Login.css";

const GOOGLE_CLIENT_ID = "715577014512-flo8qqmhkuliopuucfov4874ki39704v.apps.googleusercontent.com";

const Login = ({ userId, handleLogin, handleLogout, name}) => {
  return (
    <>
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
    </style>
      
    <div className = "image"> 

      {/* //////////////////// TITLE HTML ///////////////////////*/}
      <Anime
        easing="easeOutExpo"
        loop={false}
        duration={1200}
        delay={(el, i) => 500 + 30 * i}
        opacity={[0,1]}
        translateX={[40, 0]}>
        <div className="title-name">
          <center>STARGAZER</center>
        </div>
      </Anime>
      {/* //////////////////// TITLE HTML ///////////////////////*/}

      {/* //////////////////// LOGIN HTML ///////////////////////*/}
      <div>
        <GoogleLogin 
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Continue"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
          render={(props) => (
            <div>
              <button onClick = {props.onClick} className="login-button">CONTINUE</button>
            </div>
          )}
        />
      </div>
      {/* //////////////////// LOGIN HTML ///////////////////////*/}

    </div> 
    </>
  );
};

export default Login;
