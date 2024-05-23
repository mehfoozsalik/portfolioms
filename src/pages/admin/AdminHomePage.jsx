import React from "react";
import SectionHeading from "../../components/Items/SectionHeading";
import HomeForm from "../../components/Sections/admin-section/HomeForm";

export default function AdminHomePage({ homeData }) {
  return (
    <section className="shadow-blue white-bg padding mt-0">
      <SectionHeading title="Your Home" />
      <HomeForm homeData={homeData} />
    </section>
  );
}
