import { useEffect } from "react";
import { Element } from "react-scroll";
import Layout from "../components/Layout/Layout";
import About from "../components/Sections/About";
import Herosection from "../components/Sections/Herosection";
import SectionHeading from "../components/Items/SectionHeading";
import Skills from "../components/Sections/Skills";
import Funfacts from "../components/Sections/Funfacts";
import Experiences from "../components/Sections/Experiences";
import Portfolios from "../components/Sections/Portfolios";

function Homepage({ homeData, aboutData, skillsData, resumeData, workData }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout aboutData={aboutData}>
      <Element name="section-home">
        <Herosection homeData={homeData} />
      </Element>

      <Element name="section-about">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="About Me" />
          <About aboutData={aboutData} />
        </section>
      </Element>

      <Element name="section-skills">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="My skills" />
          <Skills skillsData={skillsData} />
        </section>
      </Element>

      <Element name="section-funfacts">
        <Funfacts skillsData={skillsData?.icons} />
      </Element>

      <Element name="section-experiences">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Education and Experience" />
          <Experiences resumeData={resumeData} />
        </section>
      </Element>

      <Element name="section-portfolios">
        <section className="shadow-blue white-bg padding">
          <SectionHeading title="Portfolio" />
          <Portfolios workData={workData?.work} />
        </section>
      </Element>
    </Layout>
  );
}

export default Homepage;
