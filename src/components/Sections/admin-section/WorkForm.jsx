import React, { useEffect, useState } from "react";

import { db, storage } from "../../../firbase/firbase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function WorkForm({ workData }) {
  const [work, setWork] = useState(
    workData?.work || [
      {
        title: "",
        desc: "",
        link: "",
        image: "",
      },
    ]
  );

  const [error, setError] = useState(false);
  const [file, setFile] = useState();
  const [perc, setPerc] = useState();
  const [message, setMessage] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!work[0].title || !work[0].desc) {
      setError(true);
      setMessage("Description is required");
    } else {
      await setDoc(doc(db, "portfolio", "work"), { work });
      setError(false);
      setMessage("Your message has been sent!!!");
    }
  };
  console.log(work);
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
    setWork([
      ...work,
      {
        title: "",
        desc: "",
        link: "",
        image: "",
      },
    ]);
  };

  const handleFileChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFormData = [...work];
    updatedFormData[index] = { ...work[index], [name]: value };
    setWork(updatedFormData);
  };
  const uploadFile = (e, index) => {
    var singleFile = e.target.files[0];
    if (singleFile) {
      const storageRef = ref(storage, singleFile.name);
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
            var newWork = [...work];
            newWork[index] = {
              image: downloadURL,
              desc: work[index].desc,
              title: work[index].title,
            };
            setWork(newWork);
          });
        }
      );
    }
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <form className="contact-form" onSubmit={submitHandler}>
          <div className="col-md-12">
            <div className="col-md-12">
              {work &&
                work?.map((d, index) => {
                  return (
                    <div key={index} className="col-md-12">
                      <div className="column fixed-input">
                        <div className="form-group">
                          <label
                            className="for-image-input"
                            style={{
                              "--bg-image": `url('${
                                d?.image ? d?.image : "/images/hero.jpg"
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
                      <div className="column fixed-input">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Title"
                            onChange={(e) => handleFileChange(e, index)}
                            value={d?.title}
                          />
                        </div>
                      </div>
                      <div className="column fixed-input">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="link"
                            placeholder="Link"
                            onChange={(e) => handleFileChange(e, index)}
                            value={d?.link}
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
                            onChange={(e) => handleFileChange(e, index)}
                            value={d?.desc}
                          ></textarea>{" "}
                        </div>
                      </div>
                    </div>
                  );
                })}

              <div className="w-200p m-auto">
                <i
                  onClick={() => addMore("exp")}
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

export default WorkForm;
