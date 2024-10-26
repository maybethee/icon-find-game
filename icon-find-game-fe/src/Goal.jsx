function Goal({ found, imgSrc }) {
  return (
    <>
      <div className={found ? "found" : ""}>
        <img src={imgSrc} alt="" style={{ width: "100px", height: "100px" }} />
      </div>
    </>
  );
}

export default Goal;
