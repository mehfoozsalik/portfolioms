import React from "react";

function Experience({ data }) {
  return (
    <div className="entry">
      <div className="title">
        <span>{data.year}</span>
      </div>
      <div className="body">
        <h4 className="mt-0">{data.title}</h4>
        <h4 className="mt-0">{data?.institute || data?.company}</h4>
        <p>{data.desc}</p>
      </div>
    </div>
  );
}

export default Experience;
