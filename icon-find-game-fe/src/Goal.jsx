import ArgoCD from "./assets/ArgoCD.png";
import OpenFeign from "./assets/OpenFeign.png";
import ReadyAPI from "./assets/ReadyAPI.png";
import VSCode from "./assets/VSCode.png";

function Goal() {
  return (
    <>
      <h1>looking for:</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <img src={ArgoCD} alt="" style={{ width: "200px", height: "200px" }} />
        <img
          src={OpenFeign}
          alt=""
          style={{ width: "200px", height: "200px" }}
        />
        <img
          src={ReadyAPI}
          alt=""
          style={{ width: "200px", height: "200px" }}
        />
        <img src={VSCode} alt="" style={{ width: "200px", height: "200px" }} />
      </div>
    </>
  );
}

export default Goal;
