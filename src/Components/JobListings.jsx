import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const jobs = [
//   {
//     title: "Software Development Engineer in Test",
//     type: "Permanent",
//     experience: "4-8 years",
//     category: "other",
//     location: "Bengaluru",
//   },
//   {
//     title: "Lead Automation Tester",
//     type: "Contract",
//     experience: "6-8 years",
//     category: "Automated Tester",
//     location: "Bengaluru",
//   },
// ];

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [role, setRole] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get the token
        const api = "http://156.67.111.32:3120/api/jobPortal/getAllJobPostings";
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        const response = await axios.get(api, {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure 'Bearer' is included
          },
        });

        setJobs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(
          "Error fetching jobs:",
          error.response?.data || error.message
        );
      }
    };
    fetchJobs();
  }, []);
  const handleNavigation = (Id) => {
    Navigate(`/jobsdetails/${Id}`);
  };
  const handleApply = (Id) => {
    Navigate(`/jobapply/${Id}`);
  };

  return (
    <div className="  min-h-screen">
      <div className="   p-6    items-start ">
        <img src={logo} alt="b2ylogo" className="w-28 sm:w-40 h-auto  " />
      </div>
      <div className="w-full border-t  border-gray-300"></div>

      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-6 md:px-6 md:pb-6 px-2 pb-2 gap-3">
        <select
          className="border py-2 px-4 rounded-md bg-slate-100   sm:w-auto"
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">FILTER BY CITY(S)</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Mumbai">Mumbai</option>
        </select>
        <select
          className="border py-2 px-4 rounded-md bg-slate-100   sm:w-auto"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">QUALITY ASSURANCE</option>
          <option value="Manual Testing">Manual Testing</option>
          <option value="Automation Testing">Automation Testing</option>
        </select>
        <select
          className="border py-2 px-4 rounded-md bg-slate-100  sm:w-auto"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">FILTER BY ROLE(S)</option>
          <option value="SDET">SDET</option>
          <option value="Lead Tester">Lead Tester</option>
        </select>
      </div>

      <div className="bg-white px-4 sm:px-6 pb-6 space-y-4 mt-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="border p-6 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-100 gap-4"
          >
            <div
              className="flex flex-col text-sm md:text-lg w-full md:w-1/3"
              onClick={() => handleNavigation(job.Id)}
            >
              <p className="font-bold  whitespace-nowrap">{job.Title}</p>
              <p className="text-sm text-gray-500  whitespace-nowrap">
                {job.JobType} | {job.ExperienceRequired}
              </p>
            </div>

            <div className="text-gray-500 text-start    md:text-center text-lg  whitespace-nowrap">
              {job.Department}
            </div>

            <div className="text-gray-500 text-lg text-start md:text-center  whitespace-nowrap">
              {job.address?.City}, {job.address?.State}
            </div>
            <div className="w-full md:w-auto text-center">
              <button
                className="text-red-600 font-bold hover:underline mr-20  whitespace-nowrap cursor-pointer"
                onClick={() => handleApply(job.Id)}
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListings;
