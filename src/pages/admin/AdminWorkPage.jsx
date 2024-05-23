import React from "react";
import SectionHeading from "../../components/Items/SectionHeading";
import ContactSection from "../../components/Sections/Contact";
import WorkForm from "../../components/Sections/admin-section/WorkForm";

export default function AdminWorkPage({ workData }) {
  return (
    <section className="shadow-blue white-bg padding mt-0">
      <SectionHeading title="Work Details" />
      <WorkForm workData={workData} />
    </section>
  );
}
