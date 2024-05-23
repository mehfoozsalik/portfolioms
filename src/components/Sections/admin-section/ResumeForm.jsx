import React, { useEffect, useState } from "react";

import { db, storage } from "../../../firbase/firbase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function ResumeForm({ resumeData }) {
  const [experience, setExperience] = useState(
    resumeData?.experience || [
      {
        title: "",
        desc: "",
        year: "",
        company: "",
      },
    ]
  );
  const [education, setEducation] = useState(
    resumeData?.education || [
      {
        title: "",
        desc: "",
        year: "",
        institute: "",
      },
    ]
  );

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      !education[0].title ||
      !education[0].desc ||
      !experience[0].title ||
      !experience[0].desc
    ) {
      setError(true);
      setMessage("Description is required");
    } else {
      await setDoc(doc(db, "portfolio", "resume"), { education, experience });
      setError(false);
      setMessage("Your message has been sent!!!");
    }
  };

  const handleAlerts = () => {
    if (error && message) {
      return <div className="alert alert-danger mt-4">{message}</div>;
    } else if (!error && message) {
      return <div className="alert alert-success mt-4">{message}</div>;
    } else {
      return null;
    }
  };
  const addMore = (inn) => {
    if (inn === "exp") {
      setExperience([
        ...experience,
        {
          title: "",
          desc: "",
          year: "",
          institute: "",
        },
      ]);
    } else if (inn === "edu") {
      setEducation([
        ...education,
        {
          title: "",
          desc: "",
          year: "",
          company: "",
        },
      ]);
    }
  };

  const handleFileChange = (inn, event, index) => {
    const { name, value } = event.target;
    if (inn === "edu") {
      const updatedFormData = [...education];
      updatedFormData[index] = { ...education[index], [name]: value };
      setEducation(updatedFormData);
    } else if (inn === "exp") {
      const updatedFormData = [...experience];
      updatedFormData[index] = { ...experience[index], [name]: value };
      setExperience(updatedFormData);
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <form className="contact-form" onSubmit={submitHandler}>
          <h2>Experience</h2>
          <div className="row">
            <div className="row gap-10">
              {experience &&
                experience.map((d, index) => {
                  return (
                    <div key={index} className="w-200p">
                      <div className="column fixed-input">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Title"
                            onChange={(e) => handleFileChange("exp", e, index)}
                            value={d.title}
                          />
                        </div>
                      </div>
                      <div className="column fixed-input">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="company"
                            placeholder="Company"
                            onChange={(e) => handleFileChange("exp", e, index)}
                            value={d.company}
                          />
                        </div>
                      </div>
                      <div className="column fixed-input">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="year"
                            placeholder="Year"
                            onChange={(e) => handleFileChange("exp", e, index)}
                            value={d.year}
                          />
                        </div>
                      </div>
                      <div className="column fixed-input">
                        <div className="form-group">
                          <textarea
                            name="desc"
                            className="form-control"
                            rows="5"
                            placeholder="Add Your Description"
                            onChange={(e) => handleFileChange("exp", e, index)}
                            value={d.desc}
                          ></textarea>{" "}
                        </div>
                      </div>
                    </div>
                  );
                })}

              <div className="w-200p">
                <i
                  onClick={() => addMore("exp")}
                  className="plus-icon-add icon-plus"
                ></i>
              </div>
            </div>
          </div>

          <h2>Education</h2>
          <div className="row">
            <div className="row gap-10">
              {education &&
                education.map((d, index) => {
                  return (
                    <div key={index} className="w-200p">
                      <div className="column fixed-input">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Title"
                            onChange={(e) => handleFileChange("edu", e, index)}
                            value={d.title}
                          />
                        </div>
                      </div>
                      <div className="column fixed-input">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="institute"
                            placeholder="Institute"
                            onChange={(e) => handleFileChange("edu", e, index)}
                            value={d.institute}
                          />
                        </div>
                      </div>
                      <div className="column fixed-input">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="year"
                            placeholder="Year"
                            onChange={(e) => handleFileChange("edu", e, index)}
                            value={d.year}
                          />
                        </div>
                      </div>
                      <div className="column fixed-input">
                        <div className="form-group">
                          <textarea
                            name="desc"
                            className="form-control"
                            rows="5"
                            placeholder="Add Your Description"
                            onChange={(e) => handleFileChange("edu", e, index)}
                            value={d.desc}
                          ></textarea>{" "}
                        </div>
                      </div>
                    </div>
                  );
                })}

              <div className="w-200p">
                <i
                  onClick={() => addMore("edu")}
                  className="plus-icon-add icon-plus"
                ></i>
              </div>
            </div>
          </div>

          <button
            type="submit"
            name="submit"
            value="Submit"
            className="btn btn-default"
          >
            UPLOAD
          </button>
        </form>
        {handleAlerts()}
      </div>
    </div>
  );
}

export default ResumeForm;
