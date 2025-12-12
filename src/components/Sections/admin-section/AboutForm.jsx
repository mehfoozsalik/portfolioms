import React, { useEffect, useState } from "react";

import { db, storage } from "../../../firbase/firbase";
import { doc, setDoc } from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function AboutForm({ aboutData }) {
  const [formdata, setFormdata] = useState({
    image: aboutData?.image || "",
    cvpath: aboutData?.cvpath || "",
    title: aboutData?.title || "",
    name: aboutData?.name || "",
    location: aboutData?.location || "",
    birthday: aboutData?.birthday || "",
    email: aboutData?.email || "",
    description: aboutData?.description || "",
    designation: aboutData?.designation || "",
  });

  const [perc, setPerc] = useState();
  const [file, setFile] = useState();
  const [resume, setResume] = useState();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + resume.name;

      const storageRef = ref(storage, resume.name);
      const uploadTask = uploadBytesResumable(storageRef, resume);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormdata((prev) => ({ ...prev, cvpath: downloadURL }));
          });
        }
      );
    };
    resume && uploadFile();
  }, [resume]);
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormdata((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formdata.image) {
      setError(true);
      setMessage("Set Image it is required");
    } else if (!formdata.title) {
      setError(true);
      setMessage("Title is required");
    } else if (!formdata.email) {
      setError(true);
      setMessage("Email is required");
    } else if (!formdata.location) {
      setError(true);
      setMessage("Location is required");
    } else if (!formdata.name) {
      setError(true);
      setMessage("Name is required");
    } else if (!formdata.description) {
      setError(true);
      setMessage("Description is required");
    } else {
      await setDoc(doc(db, "portfolio", "about"), formdata);
      setError(false);
      setMessage("Your message has been sent!!!");
    }
  };
  const handleChange = (event) => {
    setFormdata({
      ...formdata,
      [event.target.name]: event.target.value,
    });
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

  return (
    <div className="row">
      <div className="col-md-12">
        <form className="contact-form" onSubmit={submitHandler}>
          <div className="row">
            <div className="column m-auto">
              <div className="form-group">
                <label
                  className="for-image-input small-image"
                  style={{
                    "--bg-image": `url('${
                      file
                        ? URL.createObjectURL(file)
                        : formdata.image
                        ? formdata.image
                        : "/images/about.png"
                    }')`,
                  }}
                  htmlFor="image"
                ></label>
                {perc > 0 && perc < 100 && (
                  <span
                    style={{
                      borderRadius: "12px",
                      display: "block",
                      height: "8px",
                      image: "lightblue",
                      width: `${perc}%`,
                    }}
                  ></span>
                )}
                <input
                  type="file"
                  className="form-control for-image"
                  id="image"
                  name="image"
                  placeholder="Upload Background"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            <div className="column col-md-12">
              <div className="form-group">
                <label className="form-control text-center" htmlFor="resume">
                  {resume ? resume.name : "Upload Your Resume"}
                </label>
                {perc > 0 && perc < 100 && (
                  <span
                    style={{
                      borderRadius: "12px",
                      display: "block",
                      height: "8px",
                      background: "lightblue",
                      width: `${perc}%`,
                    }}
                  ></span>
                )}
                <input
                  type="file"
                  className="form-control for-image"
                  id="resume"
                  name="resume"
                  placeholder="Upload Resume"
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>
            </div>
            <div className="column col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Your Title"
                  onChange={handleChange}
                  value={formdata.title}
                />
              </div>
            </div>
            <div className="column col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="designation"
                  placeholder="Your Designation"
                  onChange={handleChange}
                  value={formdata.designation}
                />
              </div>
            </div>
            <div className="column col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Your Name"
                  onChange={handleChange}
                  value={formdata.name}
                />
              </div>
            </div>
            <div className="column col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Your Location"
                  onChange={handleChange}
                  value={formdata.location}
                />
              </div>
            </div>
            <div className="column col-md-6">
              <div className="form-group">
                <input
                  type="date"
                  className="form-control"
                  name="birthday"
                  onChange={handleChange}
                  value={formdata.birthday}
                />
              </div>
            </div>
            <div className="column col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Your Email"
                  onChange={handleChange}
                  value={formdata.email}
                />
              </div>
            </div>
            <div className="column col-md-12">
              <div className="form-group">
                <textarea
                  name="description"
                  className="form-control"
                  rows="5"
                  placeholder="Add Your Description"
                  onChange={handleChange}
                  value={formdata.description}
                ></textarea>
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

export default AboutForm;
