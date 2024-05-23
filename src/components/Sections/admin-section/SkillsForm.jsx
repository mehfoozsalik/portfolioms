import React, { useEffect, useState } from "react";

import { db, storage } from "../../../firbase/firbase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function SkillsForm({ skillsData }) {
  const [perc, setPerc] = useState();

  const [formdata, setFormdata] = useState({
    description: skillsData?.description || "",
    icons: skillsData?.icons,
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const uploadFile = (e, index) => {
    var singleFile = e.target.files[0];
    const storageRef = ref(storage, singleFile?.name);
    const uploadTask = uploadBytesResumable(storageRef, singleFile);
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
          const icons = [...formdata.icons];
          icons[index] = {
            image: downloadURL,
            desc: icons[index].desc,
          };
          setFormdata((prev) => ({ ...prev, icons }));
        });
      }
    );
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formdata.description) {
      setError(true);
      setMessage("Description is required");
    } else {
      await setDoc(doc(db, "portfolio", "skills"), formdata);
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
  const addMore = () => {
    const icons = [...formdata.icons];
    icons.push({ image: "", desc: "" });
    setFormdata((prev) => ({ ...prev, icons }));
  };
  const handleFileChange = (event, index) => {
    const { name, value } = event.target;
    const icons = [...formdata.icons];
    icons[index] = { image: icons[index].image, [name]: value };
    setFormdata((prev) => ({ ...prev, icons }));
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <form className="contact-form" onSubmit={submitHandler}>
          <div className="row">
            <div className="row gap-10">
              {formdata?.icons &&
                formdata?.icons.map((d, index) => {
                  return (
                    <div key={index} className="w-200p">
                      <div className="column m-auto">
                        <div className="form-group">
                          <label
                            className="for-image-input small-image"
                            style={{
                              "--bg-image": `url('${
                                d?.image ? d?.image : "/images/about.png"
                              }')`,
                            }}
                            htmlFor={"image-" + index}
                          ></label>
                          <input
                            type="file"
                            className="form-control for-image"
                            id={"image-" + index}
                            name="image"
                            placeholder="Upload Background"
                            onChange={(e) => uploadFile(e, index)}
                          />
                        </div>
                      </div>

                      <div className="column col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="desc"
                            placeholder="Skill Title"
                            onChange={(e) => handleFileChange(e, index)}
                            value={d.desc}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

              <div className="w-200p">
                <i onClick={addMore} className="plus-icon-add icon-plus"></i>
              </div>
            </div>
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

export default SkillsForm;
