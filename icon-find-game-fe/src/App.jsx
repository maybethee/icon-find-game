import { useState, useEffect, useRef } from "react";
import Goal from "./Goal";
import "./App.css";
import techIcons from "./assets/techIcons.png";
import ArgoCD from "./assets/ArgoCD.png";
import OpenFeign from "./assets/OpenFeign.png";
import ReadyAPI from "./assets/ReadyAPI.png";
import VSCode from "./assets/VSCode.png";
import Notification from "./Notification";

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
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [notification, setNotification] = useState({
    type: "",
    message: "",
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
        showNotification("success", "Game Started");
        console.log("timer started", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSubmitToLeaderboard = (e) => {
    e.preventDefault();

    fetch("/save_score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: playerName }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        console.log("leaderboard:", data.leaderboard);
        showNotification("success", "Score successfully submitted.");
      })
      .catch((error) => {
        console.log("error:", error);
        showNotification(
          "error",
          `Failed to submit score, see error: ${error}`
        );
      });

    setDisabled(true);
  };

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

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: "", message: "" });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

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
          showNotification("success", "You got one!");

          if (data.score) {
            console.log(`${data.message} ${data.score}`);
            setGameOver(true);
            setScore(data.score);
          }
        } else {
          showNotification("error", "Sorry, that's wrong!");
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

  const displayLeaderboard = () => {
    fetch("/top_ten", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLeaderboard(data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

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
        <Notification
          type={notification.type}
          message={notification.message}
          key={notification.key}
        />
        {!gameOver && (
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
        )}

        <h1>find the icons!</h1>
        <div style={{ display: "inline-block" }}>
          <img
            onClick={handleClick}
            src={techIcons}
            alt=""
            style={{ width: "1500px", height: "auto" }}
          />
        </div>

        {gameOver && (
          <div className="game-over-popup">
            <h3>You Win!</h3>
            <p>final time: {score.toFixed(3)}s</p>
            <form action="" onSubmit={handleSubmitToLeaderboard}>
              <label htmlFor="">
                Name:{" "}
                <input
                  type="text"
                  name="name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  disabled={disabled}
                />
              </label>
              <button disabled={disabled}>Submit</button>
            </form>
            <button onClick={displayLeaderboard}>Leaderboard</button>
            <button onClick={() => window.location.reload(false)}>
              Play Again
            </button>
          </div>
        )}

        {leaderboard && (
          <div className="leaderboard">
            <h3>Leaderboard</h3>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>NAME</th>
                  <th>TIME</th>
                  <th>DATE</th>
                </tr>
                {leaderboard.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.name}</td>
                    <td>{entry.score.toFixed(3)}s</td>
                    <td>
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setLeaderboard(null)}>Back</button>
          </div>
        )}

        <p>coordinates: {`x: ${coordinates.x}, y: ${coordinates.y}`}</p>
      </div>

      <h2>looking for:</h2>
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
