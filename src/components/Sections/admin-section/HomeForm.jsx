import React, { useEffect, useState } from "react";

import { db, storage } from "../../../firbase/firbase";
import { doc, setDoc } from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function HomeForm({ homeData }) {
  const [formdata, setFormdata] = useState({
    background: homeData?.background || "",
    title: homeData?.title || "",
    description: homeData?.description || "",
  });

  const [perc, setPerc] = useState();
  const [file, setFile] = useState();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
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
            setFormdata((prev) => ({ ...prev, background: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formdata.background) {
      setError(true);
      setMessage("Set Background Image it is required");
    } else if (!formdata.title) {
      setError(true);
      setMessage("Title is required");
    } else if (!formdata.description) {
      setError(true);
      setMessage("Description is required");
    } else {
      await setDoc(doc(db, "portfolio", "home"), formdata);
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
            <div className="column col-md-12">
              <div className="form-group">
                <label
                  className="for-image-input"
                  style={{
                    "--bg-image": `url('${
                      file
                        ? URL.createObjectURL(file)
                        : formdata.background
                        ? formdata.background
                        : "/images/hero.jpg"
                    }')`,
                  }}
                  htmlFor="background"
                ></label>
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
                  id="background"
                  name="background"
                  placeholder="Upload Background"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>

            <div className="column col-md-12">
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

export default HomeForm;
