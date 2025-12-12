import React from "react";
import { Link as ScrollLink } from "react-scroll";

function About({ aboutData }) {
  return (
    <div className="row">
      <div className="col-md-3">
        <img
          className="about-img"
          src={aboutData?.image}
          alt={aboutData?.name}
        />
      </div>
      <div className="col-md-9">
        <h2 className="mt-4 mt-md-0 mb-4">{aboutData?.title}</h2>
        <h3 className="mt-4 mt-md-0 mb-4">{aboutData?.designation}</h3>
        <p className="mb-0">{aboutData?.description}</p>
        <div className="row my-4">
          <div className="col-md-6">
            <p className="mb-2">
              Name: <span className="text-dark">{aboutData?.name}</span>
            </p>
            <p className="mb-0">
              Birthday: <span className="text-dark">{aboutData?.birthday}</span>
            </p>
          </div>
          <div className="col-md-6 mt-2 mt-md-0 mt-sm-2">
            <p className="mb-2">
              Location: <span className="text-dark">{aboutData?.location}</span>
            </p>
            <p className="mb-0">
              Email: <span className="text-dark">{aboutData?.email}</span>
            </p>
          </div>
        </div>
        <a
          href={aboutData?.cvpath}
          target="_blank"
          className="btn btn-default mr-3"
        >
          <i className="icon-cloud-download"></i>Download CV
        </a>
        <a
          target="_blank"
          href="mailto:mehfooz.salik@gmail.com"
          className="btn btn-alt mt-md-0 mt-xs-2 mt-2 lg:mt-0"
        >
          <i className="icon-envelope"></i>Hire me
        </a>
      </div>
    </div>
  );
}

export default About;
