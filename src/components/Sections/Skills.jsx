import React from "react";

function Skills({ skillsData }) {
  console.log(skillsData);
  return <p className="mb-0">{skillsData?.description}</p>;
}

export default Skills;
