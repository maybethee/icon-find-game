function Goal({ found, imgSrc }) {
  return (
    <>
      <div className={found ? "found" : ""}>
        <img src={imgSrc} alt="" style={{ width: "200px", height: "200px" }} />
      </div>
    </>
  );
}

export default Goal;
