import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import logo from "../assets/logo.png";
import axios from "axios"; // Import Axios for API requests
import DOMPurify from "dompurify"; // Import DOMPurify

export default function JobPosting() {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    department: "",
    addressId: "",
    country: "",
    state: "",
    city: "",
    salaryRange: "",
    experienceRequired: "",
    jobType: "",
    eduQualifications: "",
    jobResponsibilities: "",
    skillsRequired: "",
    status: "",
    jdDocument: "",
  });

  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const [success, setSuccess] = useState(false); // State for success handling

  const handleChange = (field, value) => {
    setJobDetails((prev) => ({ ...prev, [field]: value }));
  };
  
  // Function to sanitize and extract plain text
  const sanitizeInput = (html) => {
    return DOMPurify.sanitize(html)
      .replace(/<[^>]+>/g, "")
      .trim(); // Remove HTML tags
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 🔹 Convert HTML data to plain text before saving
      const cleanData = Object.keys(jobDetails).reduce((acc, key) => {
        acc[key] = sanitizeInput(jobDetails[key]);
        return acc;
      }, {});

      console.log("Clean Data to Save:", cleanData); // Debugging

      const api = "http://156.67.111.32:3120/api/jobportal/jobPostings";

      // 🔹 Get the token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        return;
      }

      // 🔹 Convert ReactQuill fields to plain text before sending

      const response = await axios.post(api, cleanData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        setSuccess(true);
        alert("Job posted successfully!");
        setJobDetails({
          title: "",
          description: "",
          department: "",
          addressId: "",
          country: "",
          state: "",
          city: "",
          salaryRange: "",
          experienceRequired: "",
          jobType: "",
          eduQualifications: "",
          jobResponsibilities: "",
          skillsRequired: "",
          status: "",
          jdDocument: "",
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to post job. Please try again."
      );
      console.error("API Error:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Header Section */}
      <header className="py-4 md:pl-[400px] sm:flex justify-start">
        <img src={logo} alt="b2ylogo" className="w-40 h-auto mb-4" />
      </header>
      <hr />

      <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen mt-5">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Job Details
        </h2>

        {/* Job Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 font-semibold">
              Job Title
            </label>
            <ReactQuill
              value={jobDetails.title}
              onChange={(value) => handleChange("title", value)}
              className="bg-white mt-1"
              required
            />
          </div>
          {/*Job Type */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Job Type
            </label>
            <ReactQuill
              value={jobDetails.jobType}
              onChange={(value) => handleChange("jobType", value)}
              className="bg-white mt-1"
            />
          </div>
        </div>

        {/* Recruitment Quota & Period */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 font-semibold">
           Job Responsibilities
            </label>
            <ReactQuill
              value={jobDetails.jobResponsibilities}
              onChange={(value) => handleChange("jobResponsibilities", value)}
              className="bg-white mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Country</label>
            <ReactQuill
              value={jobDetails.country}
              onChange={(value) => handleChange("country", value)}
              className="bg-white mt-1"
              required
            />
          </div>
        </div>

        {/* Expected Salary & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 font-semibold">State</label>
            <ReactQuill
              value={jobDetails.state}
              onChange={(value) => handleChange("state", value)}
              className="bg-white mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">City</label>
            <ReactQuill
              value={jobDetails.city}
              onChange={(value) => handleChange("city", value)}
              className="bg-white mt-1"
            />
          </div>
        </div>

        {/* Location & Hiring Manager */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 font-semibold">
              SalryRange
            </label>
            <ReactQuill
              value={jobDetails.salaryRange}
              onChange={(value) => handleChange("salaryRange", value)}
              className="bg-white mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Experience Required
            </label>
            <ReactQuill
              value={jobDetails.experienceRequired}
              onChange={(value) => handleChange("experienceRequired", value)}
              className="bg-white mt-1"
            />
          </div>
        </div>

        {/* Job Qualification */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">
            Qualification
          </label>
          <ReactQuill
            value={jobDetails.eduQualifications}
            onChange={(value) => handleChange("eduQualifications", value)}
            className="bg-white mt-1"
          />
        </div>
        {/* Description  */}

        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">
            Description
          </label>
          <ReactQuill
            value={jobDetails.description}
            onChange={(value) => handleChange("description", value)}
            className="bg-white mt-1"
            required
          />
        </div>
        {/* Department */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">
            Department
          </label>
          <ReactQuill
            value={jobDetails.department}
            onChange={(value) => handleChange("department", value)}
            className="bg-white mt-1"
            required
          />
        </div>
        {/* Skills */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">Skills</label>
          <ReactQuill
            value={jobDetails.skillsRequired}
            onChange={(value) => handleChange("skillsRequired", value)}
            className="bg-white mt-1"
          />
        </div>

        {/* Display Error Message */}
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        {/* Display Success Message */}
        {success && (
          <p className="text-green-500 mt-2 text-center">
            Job posted successfully!
          </p>
        )}

        {/* Submit Button */}
        <button
          className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </div>
    </div>
  );
}
