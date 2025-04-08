// import { useState, useEffect } from "react";
// import logo from "../assets/logo.png";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const JobListings = () => {
//   const [jobs, setJobs] = useState([]);
//   const [city, setCity] = useState("");
//   const [category, setCategory] = useState("");
//   const [role, setRole] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const pageSize = 5;
//   const Navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         console.log("Auth Token:", token);

//         if (!token) {
//           console.error("No token found, please log in.");
//           return;
//         }

//         const params = new URLSearchParams();
//         params.append("page", currentPage);
//         params.append("limit", pageSize);
//         if (city) params.append("city", city);
//         if (category) params.append("category", category);
//         if (role) params.append("role", role);

//         const api = `http://156.67.111.32:3120/api/jobPortal/getAllJobPostings?${params.toString()}`;
//         console.log("API URL:", api);

//         const response = await axios.get(api, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         console.log("API Response:", response.data);
//         setJobs(response.data.jobPostings || []);
//         setTotalPages(response.data.totalPages || 1);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//         if (error.response) {
//           console.log("Response data:", error.response.data);
//           console.log("Status:", error.response.status);
//           console.log("Headers:", error.response.headers);
//         }
//       }
//     };

//     fetchJobs();
//   }, [currentPage, city, category, role]);

//   const handleNavigation = (Id) => {
//     Navigate(`/jobsdetails/${Id}`);
//   };

//   const handleApply = (Id) => {
//     Navigate(`/jobapply/${Id}`);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   // const removeHtmlTags = (str) => str.replace(/</?[^>]+(>|$)/g, "");
//   const removeHtmlTags = (str) => {
//     if (!str) return "";
//     return str.replace(/<\/?[^>]+(>|$)/g, "");
//   };

//   return (
//     <div className="bg-white min-h-screen">
//       <div className="p-6 items-start">
//         <img src={logo} alt="b2ylogo" className="w-28 sm:w-40 h-auto" />
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-6 md:px-6 md:pb-6 px-2 pb-2 gap-3">
//         <select
//           className="border py-2 px-4 rounded-md bg-slate-100 sm:w-auto text-black-600"
//           onChange={(e) => setCity(e.target.value)}
//         >
//           <option value="">FILTER BY CITY(S)</option>
//           <option value="Bengaluru">Bengaluru</option>
//           <option value="Mumbai">Mumbai</option>
//         </select>

//         <select
//           className="border py-2 px-4 rounded-md bg-slate-100 sm:w-auto text-black-600"
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="">FILTER BY CATEGORY</option>
//           <option value="Manual Testing">Manual Testing</option>
//           <option value="Automation Testing">Automation Testing</option>
//         </select>

//         <select
//           className="border py-2 px-4 rounded-md bg-slate-100 sm:w-auto text-black-600"
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="">FILTER BY ROLE(S)</option>
//           <option value="SDET">SDET</option>
//           <option value="Lead Tester">Lead Tester</option>
//         </select>
//       </div>

//       {/* Job Cards */}
//       <div className="px-4 sm:px-6 pb-6 space-y-4 mt-4">
//         {jobs && jobs.length > 0 ? (
//           jobs.map((job, index) => (
//             <div
//               key={index}
//               className="border p-6 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center bg-blue-50 shadow-md gap-4"
//             >
//               <div
//                 className="flex flex-col text-sm md:text-lg w-full md:w-1/3 cursor-pointer"
//                 onClick={() => handleNavigation(job.Id)}
//               >
//                 <p className="font-bold text-blue-700 truncate">
//                   {removeHtmlTags(job.Title)}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {job.JobType} | {job.Experience}
//                 </p>
//               </div>

//               <div className="text-gray-500 text-lg">{job.Department}</div>
//               <div className="text-gray-500 text-lg">
//                 {job.City}, {job.State}
//               </div>

//               <div className="w-full md:w-auto text-center">
//                 <button
//                   className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-600"
//                   onClick={() => handleApply(job.Id)}
//                 >
//                   Apply Now
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center">No jobs available</p>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center space-x-4 my-6">
//         <button
//           className={`px-4 py-2 border rounded-md ${
//             currentPage === 1
//               ? "text-gray-400 cursor-not-allowed"
//               : "hover:bg-gray-200"
//           }`}
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className="font-semibold">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           className={`px-4 py-2 border rounded-md ${
//             currentPage === totalPages
//               ? "text-gray-400 cursor-not-allowed"
//               : "hover:bg-gray-200"
//           }`}
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobListings;

import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaBriefcase, FaRupeeSign, FaRegBookmark } from "react-icons/fa";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [role, setRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 3; // Change this number if needed

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const params = new URLSearchParams();
        params.append("page", currentPage);
        params.append("limit", pageSize);
        if (city) params.append("city", city);
        if (category) params.append("category", category);
        if (role) params.append("role", role);

        const api = `http://156.67.111.32:3120/api/jobPortal/getAllJobPostings?${params.toString()}`;
        const response = await axios.get(api, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setJobs(response.data.jobPostings || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [currentPage, city, category, role]);

  const handleNavigation = (Id) => {
    Navigate(`/jobsdetails/${Id}`);
  };

  const handleApply = (Id) => {
    Navigate(`/jobapply/${Id}`);
  };

  const removeHtmlTags = (str) => {
    if (!str) return "";
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="p-6">
        <img src={logo} alt="b2ylogo" className="w-28 sm:w-40 h-auto" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-6 md:px-6 md:pb-6 px-2 pb-2 gap-3">
        <select
          className="border border-blue-500 py-2 px-4 rounded-md bg-white sm:w-auto text-black"
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Filter By City(S)</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        <select
          className="border border-blue-500 py-2 px-4 rounded-md bg-white sm:w-auto text-black"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Filter By Category</option>
          <option value="Manual Testing">Manual Testing</option>
          <option value="Automation Testing">Automation Testing</option>
        </select>

        <select
          className="border border-blue-500 py-2 px-4 rounded-md bg-white sm:w-auto text-black"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Filter By Role(S)</option>
          <option value="SDET">SDET</option>
          <option value="Lead Tester">Lead Tester</option>
        </select>
      </div>

      {/* Job Cards */}
      <div className="px-4 sm:px-6 pb-6 space-y-4 mt-4">
        {jobs && jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div
              key={index}
              className="border p-6 rounded-lg flex flex-col md:flex-row justify-between items-center bg-white shadow-md gap-4 hover:shadow-lg transition relative"
            >
              {/* Job Details */}
              <div
                className="flex flex-col text-sm md:text-lg cursor-pointer w-full"
                onClick={() => handleNavigation(job.Id)}
              >
                <p className="font-bold text-lg text-gray-900">
                  {removeHtmlTags(job.Title)}
                </p>
                <p className="text-sm text-gray-500">{job.JobType}</p>
                <div className="flex items-center text-gray-500 gap-4 text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <FaBriefcase /> {job.Experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRupeeSign /> Not Disclosed
                  </span>
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt /> {job.City}, {job.State}
                  </span>
                </div>
              </div>

              {/* Apply Button */}
              <button
                className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap"
                onClick={() => handleApply(job.Id)}
              >
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No jobs available</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 my-6">
        <button
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 border rounded-md ${
            currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
          }`}
          onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobListings;


