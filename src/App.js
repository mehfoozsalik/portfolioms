import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.scss";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Multipage from "./pages/Multipage";

import About from "./pages/About";
import Services from "./pages/Services";
import Resume from "./pages/Resume";
import Works from "./pages/Works";
import Contact from "./pages/Contact";

import Demopage from "./pages/Demopage";
import WorkDetails from "./pages/WorkDetails";
import WorkDetails2 from "./pages/WorkDetails2";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminAboutPage from "./pages/admin/AdminAboutPage";
import AdminServicePage from "./pages/admin/AdminServicePage";
import AdminResumePage from "./pages/admin/AdminResumePage";
import AdminWorkPage from "./pages/admin/AdminWorkPage";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firbase/firbase";

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "portfolio"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  const [homeData] = data?.filter((d) => d.id === "home");
  const [aboutData] = data?.filter((d) => d.id === "about");
  const [skillsData] = data?.filter((d) => d.id === "skills");
  const [resumeData] = data?.filter((d) => d.id === "resume");
  const [workData] = data?.filter((d) => d.id === "work");

  console.log(workData);
  const RequreAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/admin" />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              homeData={homeData}
              aboutData={aboutData}
              skillsData={skillsData}
              resumeData={resumeData}
              workData={workData}
            />
          }
          exact
        />

        <Route path="/works/:id/:title" element={<WorkDetails />} />
        <Route path="/work-details/:id/:title" element={<WorkDetails2 />} />

        <Route
          path="/admin"
          element={<AdminLoginPage setUser={setCurrentUser} />}
          exact
        />
        <Route
          path="/admin/home"
          element={
            <RequreAuth>
              <AdminLayout aboutData={aboutData}>
                <AdminHomePage homeData={homeData} />
              </AdminLayout>
            </RequreAuth>
          }
          exact
        />
        <Route
          path="/admin/about"
          element={
            <RequreAuth>
              <AdminLayout aboutData={aboutData}>
                <AdminAboutPage aboutData={aboutData} />
              </AdminLayout>
            </RequreAuth>
          }
          exact
        />
        <Route
          path="/admin/services"
          element={
            <RequreAuth>
              <AdminLayout aboutData={aboutData}>
                <AdminServicePage skillsData={skillsData} />
              </AdminLayout>
            </RequreAuth>
          }
          exact
        />
        <Route
          path="/admin/resume"
          element={
            <RequreAuth>
              <AdminLayout aboutData={aboutData}>
                <AdminResumePage resumeData={resumeData} />
              </AdminLayout>
            </RequreAuth>
          }
          exact
        />
        <Route
          path="/admin/works"
          element={
            <RequreAuth>
              <AdminLayout aboutData={aboutData}>
                <AdminWorkPage workData={workData} />
              </AdminLayout>
            </RequreAuth>
          }
          exact
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
