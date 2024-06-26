import React from "react";

function SectionHeading({ title }) {
  return (
    <>
      <h3 className="section-title">{title}</h3>
      <div className="spacer" data-height="20"></div>
    </>
  );
}

export default SectionHeading;
