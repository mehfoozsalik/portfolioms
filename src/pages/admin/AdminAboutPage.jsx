import React from "react";
import SectionHeading from "../../components/Items/SectionHeading";
import ContactSection from "../../components/Sections/Contact";
import AboutForm from "../../components/Sections/admin-section/AboutForm";

export default function AdminAboutPage({ aboutData }) {
  return (
    <section className="shadow-blue white-bg padding mt-0">
      <SectionHeading title="About Page" />
      <AboutForm aboutData={aboutData} />
    </section>
  );
}
