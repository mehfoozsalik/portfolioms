import React from "react";
import Experience from "../Items/Experience";

const experiencesData = [
  {
    id: 1,
    year: "2019 - Present",
    degree: "Academic Degree",
    content:
      "Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget dolor aenean massa.",
  },
  {
    id: 2,
    year: "2018 - 2015",
    degree: "Bachelor’s Degree",
    content:
      "Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget dolor aenean massa.",
  },
  {
    id: 3,
    year: "2015 - 2012",
    degree: "Honours Degree",
    content:
      "Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget dolor aenean massa.",
  },
];

function Experiences({ resumeData }) {
  console.log(resumeData);
  return (
    <div className="timeline">
      {resumeData?.education?.map((education) => (
        <Experience data={education} key={education.id} />
      ))}
      <span className="timeline-line"></span>

      <hr className="space" />
      {resumeData?.experience?.map((experience) => (
        <Experience data={experience} key={experience.id} />
      ))}
      <span className="timeline-line"></span>
    </div>
  );
}

export default Experiences;
