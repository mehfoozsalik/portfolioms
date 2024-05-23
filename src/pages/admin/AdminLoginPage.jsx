import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firbase/firbase";
import { useNavigate } from "react-router-dom";

function AdminLoginPage({ setUser }) {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    error: false,
    message: "",
  });

  const submitHandler = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, formdata.email, formdata.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/admin/home");

        setAlert({
          error: false,
          message: "You Succesfully Logged in",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        setAlert({
          error: true,
          message: errorMessage,
        });
      });
  };

  const handleChange = (event) => {
    setFormdata({
      ...formdata,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleAlerts = () => {
    if (alert.error && alert.message) {
      return <div className="alert alert-danger mt-4">{alert.message}</div>;
    } else if (!alert.error && alert.message) {
      return <div className="alert alert-success mt-4">{alert.message}</div>;
    } else {
      return null;
    }
  };

  return (
    <div className="login">
      <form className="contact-form" onSubmit={submitHandler}>
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          value={formdata.email}
        />
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formdata.password}
        />

        <button
          type="submit"
          name="submit"
          value="Submit"
          className="btn btn-default"
        >
          Login
        </button>
      </form>
      {handleAlerts()}
    </div>
  );
}

export default AdminLoginPage;
