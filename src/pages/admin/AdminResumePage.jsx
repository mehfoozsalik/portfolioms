import React from "react";
import SectionHeading from "../../components/Items/SectionHeading";
import ContactSection from "../../components/Sections/Contact";
import ResumeForm from "../../components/Sections/admin-section/ResumeForm";

export default function AdminResumePage({ resumeData }) {
  return (
    <section className="shadow-blue white-bg padding mt-0">
      <SectionHeading title="Education and Experience" />
      <ResumeForm resumeData={resumeData} />
    </section>
  );
}
