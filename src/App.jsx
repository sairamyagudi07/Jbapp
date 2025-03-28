import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import DualSideNavbar from "./Components/SideNavbar";
import JobListings from "./Components/JobListings";
import ApplicationForm from "./Components/ApplicationForm";
import JobDescriptionPage from "./Components/JobDescription";
import JobPosting from "./Components/AddJobs";
import Login from "./Components/login";
import JobApplicants from "./Components/GetApplicant";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        // Public Route - Login Page
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        // Protected Routes
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="flex">
                <DualSideNavbar />
                <div className="flex-1">
                  <Routes>
                    <Route path="/joblist" element={<JobListings />} />
                    <Route path="/jobapply/:Id" element={<ApplicationForm />} />
                    <Route path="/jobsdetails/:Id" element={<JobDescriptionPage />} />
                    <Route path="/postjob" element={<JobPosting />} />
                    <Route path="/allApplicants" element={<JobApplicants/>} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      {/* <div className="flex">
        <DualSideNavbar />
        <div className="flex-1 ">
          <Routes>
            <Route path="/" element={<JobListings />} />
            <Route path="/jobapply" element={<ApplicationForm />} />
            <Route path="/showjobs" element={<JobDescriptionPage />} />
            <Route path="/postjob" element={<JobPosting />} />
          </Routes>
        </div>
      </div> */}
    </Router>
  );
}

export default App;
