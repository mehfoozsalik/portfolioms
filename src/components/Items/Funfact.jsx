import React from "react";
import CountUp from "react-countup";

function Funfact({ funfact: { desc, image }, isVisible }) {
  const winWidth = window.innerWidth;
  const countQuery = () => {
    if (winWidth && winWidth > 767) {
      return <CountUp end={isVisible ? desc : 0} />;
    }
    return <CountUp end={desc} />;
  };
  return (
    <div className="fact-item text-center">
      {image ? <img src={image} /> : null}
      {/* <h2 className="count">{countQuery()}</h2> */}
      <h3>{desc}</h3>
    </div>
  );
}

export default Funfact;
