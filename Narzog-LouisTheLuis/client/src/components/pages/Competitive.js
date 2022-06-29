import React, { useState, Component, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get, post } from "../../utilities";
import celestial from "../d3-celestial";
import "./Competitive.css";
import linedata from "./data/constellations.lines.json";
import GlitchText from "react-glitch-effect/core/GlitchText";
import { Link } from "@reach/router";
import logo from "./images/logo.png";
import Countdown from "react-countdown";

const GOOGLE_CLIENT_ID = "715577014512-flo8qqmhkuliopuucfov4874ki39704v.apps.googleusercontent.com";

const Competitive = ({ userId, handleLogout }) => {
  const [profile, setProfile] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [constellationData, setData] = useState({});
  const [score, setScore] = useState(0); // Counting
  const [currentState, setState] = useState("");
  // const [id, setID] = useState(0); // Counting

  const [constel, setConstel] = useState("");
  const [showtitle, setShowtitle] = useState(false);
  const [time, setTime] = useState(180);

  const [skip, setSkip] = useState("");
  const [currentName, setName] = useState("");

  const edgeCases_IAU = ["Eri", "UMa", "UMi", "Cyg", "Crt", "Cep", "Dra", "Aqr", "Vir", "Hya"];

  var pixelRatio = window.devicePixelRatio || 1;
  var allwidth = 1000;
  var allheight = 1000;
  var skipcounter = 0; 
  var occupied = false; 
  var timeison = true;
  var initialvalue = 0; 
  var id = 0 
    
  useEffect(() => {
    const body = { user: userId };
    get("/api/using", body).then((user) => {
      setProfile(user.name);
      setScore(user.currentcomp-user.initial);
    });
  }, [id]);

  useEffect(() => {
    if (time !== 0) {
      setTimeout(setTime, 1000, time - 1);
    } else {
      setTime("Ran out of");
    }
  }, [time]);

  const handleToggleGlitch = () => {
    setDisabled(!isDisabled);
  };

  useEffect(() => {
    var dataArray = {};

    get("/api/constellationname").then((constellationname) => {
      get("/api/data").then((constellationdata) => {
        var constdataarrays = constellationdata[0].data[0].features;
        for (let i = 0; i < constdataarrays.length; i++) {
          dataArray[constdataarrays[i].id] = constdataarrays[i].geometry.coordinates;
        }
        var text = 0;
        var greek_constellation_IAU = [
          "And",
          "Aqr",
          "Aql",
          "Ara",
          "Ari",
          "Aur",
          "Boo",
          "Cnc",
          "CMa",
          "CMi",
          "Cap",
          "Cas",
          "Cen",
          "Cep",
          "Cet",
          "CrB",
          "CrA",
          "Crv",
          "Crt",
          "Cyg",
          "Del",
          "Dra",
          "Equ",
          "Eri",
          "Gem",
          "Her",
          "Hya",
          "Leo",
          "Lep",
          "Lib",
          "Lup",
          "Lyr",
          "Oph",
          "Ori",
          "Peg",
          "Per",
          "Psc",
          "PsA",
          "Sge",
          "Sgr",
          "Sco",
          "Ser",
          "Tau",
          "Tri",
          "UMa",
          "UMi",
          "Vir",
        ];
        function arrayRemove(arr, value) {
          return arr.filter(function (ele) {
            return ele != value;
          });
        }


        var IAUdict = {};
        var IAUtruename = {};
        var currentnaming = {};
        var body = { name: "And" };
        var constname = { name: "Andromeda" };
        function randomSelection() {
          var randomSelected =
            greek_constellation_IAU[Math.floor(Math.random() * greek_constellation_IAU.length)];
          greek_constellation_IAU = arrayRemove(greek_constellation_IAU, randomSelected);
          return randomSelected;
        }

        const constellation = constellationname[0].data[0];
        for (let i = 0; i < constellation.features.length; i++) {
          IAUdict[constellation.features[i].id] = constellation.features[i].geometry.coordinates;
          IAUtruename[constellation.features[i].id] = constellation.features[i].properties.name;
        }
        function randomLocation() {
          var angle = Math.random() * Math.PI * 2;
          var x = Math.cos(angle) * 22.5;
          var y = Math.sin(angle) * 22.5;
          return [x, y];
        }

        var config1 = {
          constellations: {
            show: false, // Show constellations
            names: false, // Show constellation names
            desig: false, // Show short constellation names (3 letter designations)
            namestyle: {
              fill: "#cccc99",
              align: "center",
              baseline: "middle",
              opacity: 0.8,
              font: [
                "bold 14px Helvetica, Arial, sans-serif", // Different fonts for brighter &
                "bold 12px Helvetica, Arial, sans-serif", // sdarker constellations
                "bold 11px Helvetica, Arial, sans-serif",
              ],
            },
            lines: true, // Show constellation lines
            linestyle: { stroke: "#f00", width: 1, opacity: 0.6 },
            bounds: true, // Show constellation boundaries
            boundstyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] },
          },
        };

        var config = {
          width: 0, // Default width, 0 = full parent width; height is determined by projection
          //Azimuthaequal
          projection: "azimuthalEquidistant", // Map projection used: airy, aitoff, armadillo, august,
          //azimuthalEqualArea, azimuthalEquidistant, baker, berghaus, boggs, bonne, bromley,
          // collignon, craig, craster, cylindricalEqualArea, cylindricalStereographic, eckert1, eckert2
          //, eckert3, eckert4, eckert5, eckert6, eisenlohr, equirectangular, fahey, foucaut, ginzburg4, ginzburg5,
          // ginzburg6, ginzburg8, ginzburg9, gringorten, hammer, hatano, healpix, hill, homolosine, kavrayskiy7, lagrange, larrivee, laskowski, loximuthal, mercator, miller, mollweide, mtFlatPolarParabolic, mtFlatPolarQuartic, mtFlatPolarSinusoidal, naturalEarth, nellHammer, orthographic, patterson, polyconic, rectangularPolyconic, robinson, sinusoidal, stereographic, times, twoPointEquidistant, vanDerGrinten, vanDerGrinten2, vanDerGrinten3, vanDerGrinten4, wagner4, wagner6, wagner7, wiechel, winkel3
          projectionRatio: null, // Optional override for default projection ratio
          transform: "ecliptic", // Coordinate transformation: equatorial (default), ecliptic, galactic, supergalactic
          center: [0, 0, 0], // Initial center coordinates in equatorial transformation [hours, degrees, degrees],
          // otherwise [degrees, degrees, degrees], 3rd parameter is orientation, null = default center
          orientationfixed: true, // Keep orientation angle the same as center[2]
          follow: "center",
          geopos: [0, 0],

          background: { fill: "#000000", stroke: "#000000", opacity: 1 }, // Background style
          adaptable: false, // Sizes are increased with higher zoom-levels
          interactive: true, // Enable zooming and rotation with mousewheel and dragging
          disableAnimations: false, // Disable all animations
          form: false, // Display settings form
          formFields: {
            location: true, // Set visziblity for each group of fields with the respective id
            general: true,
            stars: true,
            dsos: true,
            constellations: true,
            lines: true,
            other: true,
            download: false,
          },
          advance: true,

          location: false, // Display location settings
          controls: false, // Display zoom controls
          lang: "", // Language for names, so far only for constellations: de: german, es: spanish
          // Default:en or empty string for english
          container: "celestial-map", // ID of parent element, e.g. div
          // datapath: "https://ofrohn.github.io/data/",
          datapath: "https://narzog.github.io/weblab-project/data/",
          stars: {
            show: true, // Show stars
            limit: 6, // Show only stars brighter than limit magnitude
            colors: "color", // Show stars in spectral colors, if not use "color"
            style: { fill: "#ffffff", opacity: 1 }, // Default style for stars
            names: false, // Show star names (Bayer, Flamsteed, Variable star, Gliese, whichever applies first)
            proper: false, // Show proper name (if present)
            desig: false, // Show all names, including Draper and Hipparcos
            namelimit: 2.5, // Show only names for stars brighter than namelimit
            namestyle: {
              fill: "#ddddbb",
              font: "11px Georgia, Times, 'Times Roman', serif",
              align: "left",
              baseline: "top",
            },
            propernamestyle: {
              fill: "#ddddbb",
              font: "11px Georgia, Times, 'Times Roman', serif",
              align: "right",
              baseline: "bottom",
            },
            propernamelimit: 1.5, // Show proper names for stars brighter than propernamelimit
            size: 3.3  , // Maximum size (radius) of star circle in pixels
            exponent: -0.28, // Scale exponent for star size, larger = more linear
            data: "stars.6.json", // Data source for stellar data
            //data: 'stars.8.json' // Alternative deeper data source for stellar data
          },
          dsos: {
            show: false, // Show Deep Space Objects
            limit: 6, // Show only DSOs brighter than limit magnitude
            names: false, // Show DSO names
            desig: true, // Show short DSO names
            namelimit: 4, // Show only names for DSOs brighter than namelimit
            namestyle: {
              fill: "#cccccc",
              font: "11px Helvetica, Arial, serif",
              align: "left",
              baseline: "top",
            },
            size: null, // Optional seperate scale size for DSOs, null = stars.size
            exponent: 1.0, // Scale exponent for DSO size, larger = more non-linear
            data: "dsos.bright.json", // Data source for DSOs
            //data: 'dsos.6.json'  // Alternative broader data source for DSOs
            //data: 'dsos.14.json' // Alternative deeper data source for DSOs
            symbols: {
              //DSO symbol styles
              gg: { shape: "circle", fill: "#ff0000" }, // Galaxy cluster
              g: { shape: "ellipse", fill: "#ff0000" }, // Generic galaxy
              s: { shape: "ellipse", fill: "#ff0000" }, // Spiral galaxy
              s0: { shape: "ellipse", fill: "#ff0000" }, // Lenticular galaxy
              sd: { shape: "ellipse", fill: "#ff0000" }, // Dwarf galaxy
              e: { shape: "ellipse", fill: "#ff0000" }, // Elliptical galaxy
              i: { shape: "ellipse", fill: "#ff0000" }, // Irregular galaxy
              oc: { shape: "circle", fill: "#ffcc00", stroke: "#ffcc00", width: 1.5 }, // Open cluster
              gc: { shape: "circle", fill: "#ff9900" }, // Globular cluster
              en: { shape: "square", fill: "#ff00cc" }, // Emission nebula
              bn: { shape: "square", fill: "#ff00cc", stroke: "#ff00cc", width: 2 }, // Generic bright nebula
              sfr: { shape: "square", fill: "#cc00ff", stroke: "#cc00ff", width: 2 }, // Star forming region
              rn: { shape: "square", fill: "#00ooff" }, // Reflection nebula
              pn: { shape: "diamond", fill: "#00cccc" }, // Planetary nebula
              snr: { shape: "diamond", fill: "#ff00cc" }, // Supernova remnant
              dn: { shape: "square", fill: "#999999", stroke: "#999999", width: 2 }, // Dark nebula grey
              pos: { shape: "marker", fill: "#cccccc", stroke: "#cccccc", width: 1.5 }, // Generic marker
            },
          },
          constellations: {
            show: false, // Show constellations
            names: false, // Show constellation names
            desig: false, // Show short constellation names (3 letter designations)
            namestyle: {
              fill: "#cccc99",
              align: "center",
              baseline: "middle",
              opacity: 0.8,
              font: [
                "bold 14px Helvetica, Arial, sans-serif", // Different fonts for brighter &
                "bold 12px Helvetica, Arial, sans-serif", // sdarker constellations
                "bold 11px Helvetica, Arial, sans-serif",
              ],
            },
            lines: true, // Show constellation lines
            linestyle: { stroke: "#d7c26e", width: 1, opacity: 0.6 },
            bounds: true, // Show constellation boundaries
            boundstyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] },
          },
          mw: {
            show: false, // Show Milky Way as filled polygons
            style: { fill: "#ffffff", opacity: "0.15" },
          },
          lines: {
            graticule: {
              show: false,
              stroke: "#cccccc",
              width: 0.6,
              opacity: 0.8, // Show graticule lines
              // grid values: "outline", "center", or [lat,...] specific position
              lon: { pos: ["center"], fill: "#eee", font: "10px Helvetica, Arial, sans-serif" },
              // grid values: "outline", "center", or [lon,...] specific position
              lat: { pos: ["center"], fill: "#eee", font: "10px Helvetica, Arial, sans-serif" },
            },
            equatorial: { show: false, stroke: "#aaaaaa", width: 1.3, opacity: 0.7 }, // Show equatorial plane
            ecliptic: { show: false, stroke: "#66cc66", width: 1.3, opacity: 0.7 }, // Show ecliptic plane
            galactic: { show: false, stroke: "#cc6666", width: 1.3, opacity: 0.7 }, // Show galactic plane
            supergalactic: { show: false, stroke: "#cc66cc", width: 1.3, opacity: 0.7 }, // Show supergalactic plane
          },
        };

        var test = celestial.Celestial();
        test.display(config);
        test.clear();
        test.reload();
        test.apply(config);
        test.zoomBy(2);
        var counts = 0;
        function verifyCoordinates(first, second) {
          if (first[0] < second[0]) {
            var minx = second[0];
            var maxx = first[0];
          } else {
            var minx = first[0];
            var maxx = second[0];
          }
          if (first[1] > second[1]) {
            var miny = second[1];
            var maxy = first[1];
          } else {
            var miny = first[1];
            var maxy = second[1];
          }
          return [
            [minx, maxy],
            [maxx, miny],
          ];
        }

        function checkIfLeft(click, actualmax, actualmin, name) {
          var flag = true;
          if (edgeCases_IAU.includes(name)) {
            return true;
          } else {
            if (click[0] < actualmax[0]) {
              if (click[0] > actualmin[0]) {
              } else {
                flag = false;
              }
            } else {
              flag = false;
            }
          }

          if (click[1] < actualmax[1]) {
            if (click[1] > actualmin[1]) {
            } else {
              flag = false;
            }
          } else {
            flag = false;
          }
          return flag;
        }

        function checkIfRight(click, actualmax, actualmin, name) {
          var flag = true;
          if (edgeCases_IAU.includes(name)) {
            return true;
          } else {
            if (click[0] > actualmax[0]) {
              if (click[0] < actualmin[0]) {
              } else {
                flag = false;
              }
            } else {
              flag = false;
            }
          }
          if (click[1] > actualmax[1]) {
            if (click[1] < actualmin[1]) {
            } else {
              flag = false;
            }
          } else {
            flag = false;
          }
          return flag;
        }

      
        var firstClick = [];
        var secondClick = [];
        var absoluteFirst = [];
        var absoluteSecond = [];
        var counting = true;
        var counts = 0;
        var c = document.getElementById("outercanvas");
        var ctx = c.getContext("2d");
        var isStart = false;
        
        function timedone() { 
           timeison = false;
           console.log("ASLKDJLAKSJDLKASJDLKAJSDLK")
           const bodys = { user: userId };        
           get("/api/using", bodys).then((user) => {                        
            post("/api/finalscore", {index: user.currentcomp})            ;
          });
          post("/api/compscore", { index:-1 })

             } 
        function start(e) {
          if (!isStart) { 
            setTimeout(timedone, 180000)
            isStart = true;
            setShowtitle(true);
            next();
          }
        }
   
        function submit(e) {
          if (isStart === true && timeison) {
            if (counts === 1) {
              counts = 0;
              counting = true;
              var coords1 = verifyCoordinates(firstClick, secondClick)[0];
              var coords2 = verifyCoordinates(firstClick, secondClick)[1];
              var width = Math.abs(absoluteSecond[0]) - Math.abs(absoluteFirst[0]);
              var height = Math.abs(absoluteSecond[1]) - Math.abs(absoluteFirst[1]);
              var area = width * height;
              const userIDs = { user: userId };
              get("/api/constellations", body).then((constellation) => {
                ctx.clearRect(0, 0, allwidth, allheight);
                var temp_area = constellation.area;
                var temp_name = constellation.name;
                if (
                  checkIfLeft(
                    coords1,
                    [constellation.max[0], constellation.max[1]],
                    [constellation.min[0], constellation.min[1]],
                    temp_name
                  )
                ) {
                  if (
                    checkIfRight(
                      coords2,
                      [constellation.max[2], constellation.max[3]],
                      [constellation.min[2], constellation.min[3]],
                      temp_name
                    )
                  ) {
                    if (area > temp_area) {
                        occupied = false; 

                        var lineStyle = {
                          stroke: "#f00",
                          fill: "rgba(255, 204, 204, 0.4)",
                          width: 1,
                          opacity: 0.6,
                        },
                        textStyle = {
                          fill: "#f00",
                          font: "bold 15px Helvetica, Arial, sans-serif",
                          align: "center",
                          baseline: "middle",
                        };

                      var jsonLine = {
                        "type":"FeatureCollection",
                        "features":[
                          {"type":"Feature",
                           "id":"SummerTriangle",
                           "properties": {
                             "n":"Summer Triangle",
                             "loc": [-67.5, 52]
                           }, "geometry":{
                             "type":"MultiLineString",
                             "coordinates": dataArray[body.name],
                            }
                          }
                        ]};

                          var asterism = test.getData(jsonLine, config.transform);
                          test.container.selectAll(".asterisms")
                            .data(asterism.features)
                            .enter().append("path")
                            .attr("class", "constline");
                          test.container.selectAll(".constline").each(function(d) {
                            test.setStyle(lineStyle);
                            test.map(d);
                            test.context.stroke();
                          });
                            test.apply(config)
                            const bodys = { user: userId };
                      get("/api/using", bodys).then((user) => {                        
                        post("/api/compscore", { index: user.currentcomp })
                        ;
                      });

                      setState("Correct!");
                    } else {
                      setState("Try Again!");
                      skipcounter = skipcounter + 1;

                    }
                  } else {
                    setState("Try Again!");
                    skipcounter = skipcounter + 1;
                  }
                } else {
                  setState("Try Again!");
                  skipcounter = skipcounter + 1;
                }

                if (skipcounter === 3) {
                  setSkip("Skip");
                  skipcounter = 0;
                }
              });
            }
          }
        }

        function cancel(e) {
          if (isStart === true && timeison) {
            firstClick = [];
            secondClick = [];
            ctx.clearRect(0, 0, allwidth, allheight);
            absoluteFirst = [];
            absoluteSecond = [];
            counts = 0;
            counting = true;
          }
        }
        var curindex = 0;

        function getClickPosition(e) {
       
          if (isStart && timeison) {
            var xPosition = e.offsetX;
            var yPosition = e.offsetY;
            var inv = test.mapProjection.invert([xPosition, yPosition]);
            function drawdots(x, y) {
              ctx.strokeStyle = "#FFD700";
              ctx.fillStyle = "rgba(255, 215, 0, 1)";
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.arc(x, y, 5, 0, 2 * Math.PI);
              ctx.stroke();
              ctx.fill();
            }
            if (counts === 0) {
              firstClick = [inv[0], inv[1]];
              absoluteFirst = [xPosition, yPosition];
              drawdots(xPosition, yPosition);
            }
            if (counts === 1 && counting) {
              secondClick = [inv[0], inv[1]];
              drawdots(xPosition, yPosition);
              absoluteSecond = [xPosition, yPosition];
              counting = false;
              var width = Math.abs(absoluteSecond[0]) - Math.abs(absoluteFirst[0]);
              var height = Math.abs(absoluteSecond[1]) - Math.abs(absoluteFirst[1]);
              ctx.strokeStyle = "#FFD700";
              ctx.fillStyle = "rgba(135, 206, 235, 0.5)";
              ctx.beginPath();
              ctx.rect(absoluteFirst[0], absoluteFirst[1], width, height);
              ctx.stroke();
              ctx.fill();
            }
            if (counting) {
              counts = counts + 1;
            }
          }
        }
        function next() {
          if (isStart === true && greek_constellation_IAU.length != 0 && !occupied && timeison) {
            skipcounter = 0;
            occupied = true; 
            var randomIAU = randomSelection();
            var randoloco = randomLocation();
            setState("");
            setSkip("");
            test.rotate({
              center: [
                IAUdict[randomIAU][0] + randoloco[0],
                IAUdict[randomIAU][1] + randoloco[1],
                0,
              ],
            });
            setName(IAUtruename[randomIAU]);
            body = { name: randomIAU };
            currentnaming = IAUtruename[randomIAU];
            constname = { name: currentnaming };
            get("/api/starname", constname).then((star) => {
              setConstel(star.const_img);
            });
          } else if (isStart === true && !occupied && timeison) {
            skipcounter = 0;
            setSkip("");
            occupied = true; 


            isStart = false;
            setState("CONGRATULATIONS YOU HAVE COMPLETED THE GAME FULLY! Look at the leaderboard to see if you beat the records!");
            test.apply(config1);
            test.zoomBy(-1);
          }
        }

        function skip() {
          skipcounter = 0;

          if (isStart === true && greek_constellation_IAU.length != 0 && timeison) {
            skipcounter = 0;
            occupied = true; 
            var lineStyle = {
              stroke: "#f00",
              fill: "rgba(255, 204, 204, 0.4)",
              width: 1,
              opacity: 0.6,
            },
            textStyle = {
              fill: "#f00",
              font: "bold 15px Helvetica, Arial, sans-serif",
              align: "center",
              baseline: "middle",
            };

          var jsonLine = {
            "type":"FeatureCollection",
            "features":[
              {"type":"Feature",
               "id":"SummerTriangle",
               "properties": {
                 "n":"Summer Triangle",
                 "loc": [-67.5, 52]
               }, "geometry":{
                 "type":"MultiLineString",
                 "coordinates": dataArray[body.name],
                }
              }
            ]};

              var asterism = test.getData(jsonLine, config.transform);
              test.container.selectAll(".asterisms")
                .data(asterism.features)
                .enter().append("path")
                .attr("class", "constline");
              test.container.selectAll(".constline").each(function(d) {
                test.setStyle(lineStyle);
                test.map(d);
                test.context.stroke();
              });
                test.apply(config)

            var randomIAU = randomSelection();
            var randoloco = randomLocation();
            setState("");
            setSkip("");
            test.rotate({
              center: [
                IAUdict[randomIAU][0] + randoloco[0],
                IAUdict[randomIAU][1] + randoloco[1],
                0,
              ],
            });
            setName(IAUtruename[randomIAU]);
            body = { name: randomIAU };
            currentnaming = IAUtruename[randomIAU];
            constname = { name: currentnaming };
            get("/api/starname", constname).then((star) => {
              setConstel(star.const_img);
            });
          } else if (isStart === true && timeison) {
            skipcounter = 0;
            setSkip("");
            isStart = false;
            setState("CONGRATULATIONS YOU HAVE COMPLETED THE GAME! TRY YOUR LUCK IN COMPETITIVE!");
            test.apply(config1);
            test.zoomBy(-1);
          }
        }

        var finalwidth = 0;
        var finalheight = 0;

        var showncanvas = d3.select("#celestial-map").selectAll("canvas");
        finalwidth = showncanvas[0][0].width;
        finalheight = showncanvas[0][0].height;

        // document.getElementById("celestial-map").addEventListener("click", getClickPosition, false);
        document.getElementById("outercanvas").addEventListener("click", getClickPosition, false);
        document.getElementById("submit").addEventListener("click", submit, false);
        document.getElementById("cancel").addEventListener("click", cancel, false);
        document.getElementById("next").addEventListener("click", next, false);
        document.getElementById("start").addEventListener("click", start, false);
        document.getElementById("skip").addEventListener("click", skip, false);
      });
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

  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
      </style>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Titillium+Web:wght@300;600&family=Ubuntu:wght@300&display=swap');
      </style>

      <div id="competitive-background">
        {/* //////////////////// SIDEBAR HTML ///////////////////////*/}
        <div id="mySidebar" className="sidebar">
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

        {/* //////////////////// GAMEBOX HTML ///////////////////////*/}
        <div id="competitive-gamebox">
          {!showtitle && (
            <div id="title" className="title-design">
              <GlitchText color1="#c895e2" color2="#0abdc6">
                COMPETITIVE MODE
              </GlitchText>
            </div>
          )}
          {showtitle && (
            <div className="title-design">
              <GlitchText color1="#c895e2" color2="#0abdc6">
                {currentName}
              </GlitchText>
            </div>
          )}

          {!showtitle && (
            <div id="content" className="competitive-content-design">
              Welcome to the competitive mode. Try to find as many constellations as you can under
              5 minutes. Fight for the top of the leaderboard just like the Greek heroes would do for
              their Gods!
            </div>
          )}

          {!showtitle && (
          <div className="gamebox-message">
            <GlitchText color1="#ffffff" color2="#0abdc6">{">>>"}PRESS START TO CONTINUE{"<<<"}</GlitchText>
          </div>
          )}
          {showtitle && (<div className="timer">{time}{" seconds"}</div>)}

          <div className="above-score">
            {showtitle && (
              <div className="state-message"><GlitchText color1="#ea00d9" color2="#0abdc6">{currentState}</GlitchText></div>
            )}
            <button id="skip" className="skip-button">
              <GlitchText color1="#ea00d9" color2="#0abdc6">
                {skip}
              </GlitchText>
            </button>
          </div>
          
          {/* {showtitle && <div className="score-content">SCORE IS {score}</div>} */}
        </div>
        {/* //////////////////// GAMEBOX HTML ///////////////////////*/}

        <div id="celestial-map" />
        <canvas id="outercanvas" width={671} height={671} />
      </div>

      {/* //////////////////// NAVBAR HTML ///////////////////////*/}
      <div>
        <ul id="navbar-game">
          <button id="start" className="buttons">
            <GlitchText color1="#ea00d9" color2="#0abdc6">
              Start
            </GlitchText>
          </button>
          <button id="submit" className="buttons">
            <GlitchText color1="#ea00d9" color2="#0abdc6">
              Submit
            </GlitchText>
          </button>
          <button id="cancel" className="buttons">
            <GlitchText color1="#ea00d9" color2="#0abdc6">
              Cancel
            </GlitchText>
          </button>
          <button id="next" className="buttons">
            <GlitchText color1="#ea00d9" color2="#0abdc6">
              Next
            </GlitchText>
          </button>
        </ul>
      </div>
      {/* //////////////////// NAVBAR HTML ///////////////////////*/}
    </>
  );
};

export default Competitive;