import React from "react";
import { Link as ScrollLink } from "react-scroll";

const herosectionData = {
  name: "Bako Doe",
  aboutMe:
    "He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.",
};

function Herosection({ homeData }) {
  return (
    <section
      className="hero background parallax shadow-dark d-flex align-items-center"
      style={{ backgroundImage: `url(${homeData?.background})` }}
    >
      <div className="cta mx-auto mt-2">
        <h1 className="mt-0 mb-4">
          I’m {homeData?.title}
          <span className="dot"></span>
        </h1>
        <p className="mb-4">{homeData?.description}</p>
        <ScrollLink
          activeClass="active"
          to="section-portfolios"
          spy={true}
          smooth={true}
          duration={500}
          offset={50}
          className="btn btn-default btn-lg mr-3"
        >
          <i className="icon-grid"></i>View Portfolio
        </ScrollLink>
        <div
          className="spacer d-md-none d-lg-none d-sm-none"
          data-height="10"
        ></div>
        <a
          target="_blank"
          href="mailto:mehfooz.salik@gmail.com"
          className="btn btn-border-light btn-lg"
        >
          <i className="icon-envelope"></i>Hire me
        </a>
      </div>
      <div className="overlay"></div>
    </section>
  );
}

export default Herosection;
