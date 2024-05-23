import React from "react";
import SectionHeading from "../../components/Items/SectionHeading";

import SkillsForm from "../../components/Sections/admin-section/SkillsForm";

export default function AdminServicePage({ skillsData }) {
  return (
    <section className="shadow-blue white-bg padding mt-0">
      <SectionHeading title="Skills Page" />
      <SkillsForm skillsData={skillsData} />
    </section>
  );
}
