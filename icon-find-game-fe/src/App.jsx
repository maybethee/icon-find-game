import { useState, useEffect, useRef } from "react";
import Goal from "./Goal";
import "./App.css";
import techIcons from "./assets/techIcons.png";
import ArgoCD from "./assets/ArgoCD.png";
import OpenFeign from "./assets/OpenFeign.png";
import ReadyAPI from "./assets/ReadyAPI.png";
import VSCode from "./assets/VSCode.png";

function App() {
  const boxRef = useRef(null);
  const dropdownRef = useRef(null);
  const iconOptions = useRef(null);
  const containerRef = useRef(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [foundIcons, setFoundIcons] = useState({
    ArgoCD: false,
    OpenFeign: false,
    ReadyAPI: false,
    VSCode: false,
  });

  useEffect(() => {
    fetch("/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("timer started", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleClick = (e) => {
    const element = e.target.getBoundingClientRect();
    const x = (e.clientX - element.left) / element.width;
    const y = (e.clientY - element.top) / element.height;
    setCoordinates({ x, y });
  };

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  function showBox(x, y) {
    if (boxRef.current) {
      const boxWidth = boxRef.current.offsetWidth;
      const boxHeight = boxRef.current.offsetHeight;
      boxRef.current.style.visibility = "visible";
      dropdownRef.current.style.visibility = "visible";
      boxRef.current.style.left = `${x - boxWidth / 2}px`;
      boxRef.current.style.top = `${y - boxHeight / 2}px`;
      dropdownRef.current.style.left = `${x - boxWidth / 2 + 120}px`;
      dropdownRef.current.style.top = `${y - boxHeight / 2}px`;
    }
  }

  function handleSubmitGuess(e) {
    e.preventDefault();
    const selectedOption = iconOptions.current.elements[0].value;
    console.log(`You selected: ${selectedOption}`);

    const data = {
      guessedIcon: selectedOption,
      guessedCoordinates: coordinates,
    };

    fetch("/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.valid) {
          console.log("correct");
          setFoundIcons((prevFoundIcons) => ({
            ...prevFoundIcons,
            [selectedOption]: true,
          }));
        } else if (data.score) {
          console.log(`${data.message} ${data.score}`);
          // popup
        } else {
          console.log("wrong");
        }
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (boxRef.current) {
          boxRef.current.style.visibility = "hidden";
          dropdownRef.current.style.visibility = "hidden";
        }
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        onPointerMove={(e) => {
          setPosition({
            x: e.clientX,
            y: e.clientY,
          });
        }}
        onClick={() => showBox(position.x, position.y)}
      >
        <div>
          <div
            ref={boxRef}
            className="box"
            style={{
              border: "4px solid black",
              position: "absolute",
              visibility: "hidden",
              width: "100px",
              height: "100px",
            }}
          ></div>
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              visibility: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <form ref={iconOptions} method="get">
              <select>
                <option value="ArgoCD">ArgoCD</option>
                <option value="VSCode">VSCode</option>
                <option value="OpenFeign">OpenFeign</option>
                <option value="ReadyAPI">ReadyAPI</option>
              </select>
              <button style={{ color: "green" }} onClick={handleSubmitGuess}>
                ✔
              </button>
            </form>
          </div>
        </div>

        <h1>find the icons!</h1>
        <div style={{ display: "inline-block" }}>
          <img
            onClick={handleClick}
            src={techIcons}
            alt=""
            style={{ width: "1500px", height: "auto" }}
          />
        </div>

        <p>coordinates: {`x: ${coordinates.x}, y: ${coordinates.y}`}</p>
      </div>

      <h1>looking for:</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Goal found={foundIcons.ArgoCD} imgSrc={ArgoCD} />
        <Goal found={foundIcons.OpenFeign} imgSrc={OpenFeign} />
        <Goal found={foundIcons.ReadyAPI} imgSrc={ReadyAPI} />
        <Goal found={foundIcons.VSCode} imgSrc={VSCode} />
      </div>
    </>
  );
}

export default App;
