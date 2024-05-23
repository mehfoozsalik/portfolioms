import React, { useState } from "react";
import AdminHeader from "./AdminHeader";

function AdminLayout({ aboutData, children }) {
  const [toggleHeader, setToggleHeader] = useState(false);
  const handleToggle = () => {
    setToggleHeader(!toggleHeader);
  };
  return (
    <div className="site-wrapper">
      <AdminHeader
        aboutData={aboutData}
        toggleHeader={toggleHeader}
        toggleHandler={handleToggle}
      />
      <main
        className={
          toggleHeader ? "content float-right push" : "content float-right"
        }
      >
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
