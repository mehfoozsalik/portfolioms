import React from "react";
import { Link } from "react-router-dom";

function Header({ aboutData, toggleHeader, toggleHandler }) {
  return (
    <>
      <div
        className={
          toggleHeader
            ? "mobile-header py-2 px-3 mt-4 push"
            : "mobile-header py-2 px-3 mt-4"
        }
      >
        <button className="menu-icon mr-2" onClick={toggleHandler}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to="/admin/home" className="logo">
          <img src={aboutData?.image} alt={aboutData?.name} />
        </Link>
        <Link to="/admin/home" className="site-title dot ml-2">
          {aboutData?.name}
        </Link>
      </div>

      <header
        className={
          toggleHeader
            ? "left float-left shadow-dark open"
            : "left float-left shadow-dark"
        }
      >
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={toggleHandler}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="header-inner d-flex align-items-start flex-column">
          <Link to="/admin/home">
            <img src={aboutData?.image} alt={aboutData?.name} />
          </Link>
          <Link to="/admin/home" className="site-title dot mt-3">
            {aboutData?.name}
          </Link>

          <span className="site-slogan">{aboutData?.designation}</span>

          <nav>
            <ul className="vertical-menu scrollspy">
              <li>
                <Link to="/admin/home">
                  <i className="icon-home"></i>Home
                </Link>
              </li>
              <li>
                <Link to="/admin/about">
                  <i className="icon-user"></i>About
                </Link>
              </li>
              <li>
                <Link to="/admin/services">
                  <i className="icon-bulb"></i>Skils
                </Link>
              </li>
              <li>
                <Link to="/admin/resume">
                  <i className="icon-graduation"></i>Resume
                </Link>
              </li>
              <li>
                <Link to="/admin/works">
                  <i className="icon-grid"></i>Works
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
