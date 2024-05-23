import React from "react";

function Portfolio({ portfolio }) {
  return (
    <div className="portfolio-item">
      <div className="details">
        <h4 className="title">{portfolio.title}</h4>
        <span className="term">{portfolio.desc}</span>
      </div>
      {portfolio.link && (
        <a href={portfolio.link} target="_blank">
          <span className="plus-icon">+</span>
        </a>
      )}
      <div className="thumb">
        <img src={portfolio.image} alt={portfolio.title} />
        <div className="mask"></div>
      </div>
    </div>
  );
}

export default Portfolio;
