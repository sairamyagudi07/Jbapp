import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import DOMPurify from "dompurify";

import { ShareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaCopy,
} from "react-icons/fa";

function JobDescriptionPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ✅ Loading state
  const [jobData, setJobData] = useState(null);
  const { Id } = useParams(); // ✅ Get Job ID from URL
  // console.log(Id);
  // const cleanData = DOMPurify.sanitize(jobData?.Description); // Removes harmful scripts
  const sanitizeJobData = (data) => {
    if (!data) return {};

    return Object.keys(data).reduce((acc, key) => {
      if (typeof data[key] === "object" && data[key] !== null) {
        // Recursively sanitize nested objects (like `address`)
        acc[key] = sanitizeJobData(data[key]);
      } else {
        acc[key] = DOMPurify.sanitize(data[key] || "");
      }
      return acc;
    }, {});
  };
  const cleanData = sanitizeJobData(jobData); // Sanitize all fields

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const jobUrl = window.location.href; // Get current job URL
  // Social Media Share Links
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${jobUrl}`,
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-blue-400" />,
      url: `https://twitter.com/intent/tweet?url=${jobUrl}&text=Check out this job!`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-blue-700" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${jobUrl}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-green-600" />,
      url: `https://api.whatsapp.com/send?text=Check out this job! ${jobUrl}`,
    },
    {
      name: "Email",
      icon: <FaEnvelope className="text-red-500" />,
      url: `mailto:?subject=Job Opportunity&body=Check out this job: ${jobUrl}`,
    },
  ];
  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(jobUrl);
    alert("Link copied to clipboard!");
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        const response = await axios.get(
          `http://156.67.111.32:3120/api/jobPortal/getJobPostingById/${Id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setJobData(response.data);
      } catch (error) {
        console.error(
          "Error fetching job:",
          error.response?.data || error.message
        );
      } finally {
        setIsLoading(false); // ✅ Stop loading when API call is done
      }
    };

    if (Id) fetchJob();
  }, [Id]);
  // ✅ Handle Save Changes (POST API)
  const handleSave = async () => {
    try {
      const api = `http://156.67.111.32:3120/api/jobportal/updateJobPosting/${Id}`;
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("You must be logged in to edit this job.");
        return;
      }

      await axios.put(
        api,
        jobData, // ✅ Send updated job data to backend
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Job details updated successfully!");
      setIsEditing(false);
      // fetchJob(); // ✅ Fetch updated data after saving
    } catch (error) {
      console.error(
        "Error updating job:",
        error.response?.data || error.message
      );
      alert("Failed to update job. Please try again.");
    }
  };

  // ✅ Handle changes when editing
  // const handleChange = (field, value) => {
  //   setJobData((prev) => ({ ...prev, [field]: value }));
  // };

  // Handles list item updates
  // const handleListChange = (index, value) => {
  //   const updatedList = [...jobData.requirements];
  //   updatedList[index] = value;
  //   setJobData({ ...jobData, requirements: updatedList });
  // };
  const handleApply = (Id) => {
    navigate(`/jobapply/${Id}`);
  };

  // ✅ If still loading, show a spinner or message

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src="" alt="Loading..." className="w-20 h-20" />
        {/* Replace with a loading GIF or spinner */}
      </div>
    );
  }

  // ✅ If no data found, show an error message
  if (!jobData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">
          Job not found or data unavailable.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-white py-3">
      {/* Header Section */}
      <header className="py-4 px-4 sm:px-6 lg:px-20 xl:px-72 flex justify-start">
        <img src={logo} alt="b2ylogo" className="w-32 sm:w-40 h-auto mb-4" />
      </header>

      <hr className="w-full border-gray-300 mb-2" />

      {/* Job Title Section */}
      <div className="flex items-start justify-between pb-4 px-4 sm:px-6 lg:px-20 xl:px-72">
        <div className="flex-grow">
          {isEditing ? (
            <ReactQuill
              value={jobData?.Title || ""}
              onChange={(value) => setJobData({ ...jobData, Title: value })}
              className="bg-white rounded-md"
            />
          ) : (
            <h1
              className="font-bold text-2xl"
              dangerouslySetInnerHTML={{ __html: cleanData.Title }}
            />
          )}
        </div>

        <div className="ml-4">
          {!isEditing ? (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={() => setIsEditing(true)}
            >
              Edit Job Description
            </button>
          ) : (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md"
              onClick={handleSave}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="pb-4 px-4 sm:px-6 lg:px-20 xl:px-72">
        {isEditing ? (
          <>
            {/* City Input */}
            <ReactQuill
              name="city"
              value={jobData?.address?.City || ""}
              onChange={(value) =>
                setJobData({
                  ...jobData,
                  address: { ...jobData.address, City: value },
                })
              }
              className="text-gray-500 px-2 py-1 rounded-md w-full mb-2"
            />

            {/* State Input */}
            <ReactQuill
              name="state"
              value={jobData?.address?.State || ""}
              onChange={(value) =>
                setJobData({
                  ...jobData,
                  address: { ...jobData.address, State: value },
                })
              }
              className="text-gray-500 px-2 py-1 rounded-md w-full mb-2"
            />

            {/* Country Input */}
            <ReactQuill
              name="country"
              value={jobData?.address?.Country || ""}
              onChange={(value) =>
                setJobData({
                  ...jobData,
                  address: { ...jobData.address, Country: value },
                })
              }
              className="text-gray-500 px-2 py-1 rounded-md w-full mb-2"
            />

            {/* Status Input */}
            <ReactQuill
              name="status"
              value={jobData?.Status || ""}
              onChange={(value) => setJobData({ ...jobData, Status: value })}
              className="text-gray-500 px-2 py-1 rounded-md w-full"
            />
          </>
        ) : (
          <>
            {/* Display City, State, Country, and Status in one line */}
            <span style={{ whiteSpace: "nowrap" }}>
              <strong>City:</strong>
              <span
                dangerouslySetInnerHTML={{ __html: cleanData.address?.City }}
              />
              <strong> State:</strong>{" "}
              <span
                dangerouslySetInnerHTML={{ __html: cleanData.address?.State }}
              />
              <strong> Country:</strong>{" "}
              <span
                dangerouslySetInnerHTML={{ __html: cleanData.address?.Country }}
              />
            </span>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4 px-4 sm:px-6 lg:px-20 xl:px-72 pb-4">
        <button
          className="border border-red-600 text-red-600 px-10 py-2 rounded-md hover:bg-red-50 w-full sm:w-auto"
          onClick={() => navigate("/joblist")}
        >
          View All Jobs
        </button>
        <button
          className="bg-red-600 text-white px-10 py-2 rounded-md hover:bg-red-700 w-full sm:w-auto"
          onClick={() => handleApply(Id)}
        >
          Apply
        </button>
      </div>

      <hr className="md:mx-72 border-gray-300 py-2" />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 px-4 sm:px-6 lg:px-20 xl:px-72">
        <div>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-700  sm:w-auto"
            onClick={() => setIsOpen(true)}
          >
            <ShareIcon className="h-5 w-5 mr-2" /> Share this job
          </button>
          {/* Share Modal */}
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Share this job</h2>
                  <button onClick={() => setIsOpen(false)}>
                    <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>

                {/* Share Options */}
                <div className="mt-4 space-y-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 border   hover:bg-gray-100"
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </a>
                  ))}

                  {/* Copy Link */}
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 p-2 border   hover:bg-gray-100 w-full"
                  >
                    <FaCopy className="text-gray-500" />
                    <span>Copy Link</span>
                  </button>
                </div>

                {/* Close Button */}
                <button
                  className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-black py-2  "
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Edit Button */}
      </div>

      {/* Job Details */}
      <div className="mt-6 px-4 sm:px-6 md:px-72">
        <h3 className="text-lg font-semibold">Job Description:</h3>
        {isEditing ? (
          <ReactQuill
            name="description"
            value={jobData?.Description || ""}
            onChange={(value) => setJobData({ ...jobData, Description: value })}
            className="w-full p-2"
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: cleanData.Description }}
            className="text-gray-700"
          />
        )}
      </div>

      {/* <div className="mt-6 px-4 sm:px-6 md:px-72">
        <h3 className="text-lg font-semibold">Requirements:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {(jobData?.requirements || []).map((req, index) => (
            <li key={index}>
              {isEditing ? (
                <ReactQuill
                  value={req}
                  onChange={(value) => {
                    const updatedRequirements = [...jobData.requirements];
                    updatedRequirements[index] = value;
                    setJobData({
                      ...jobData,
                      requirements: updatedRequirements,
                    });
                  }}
                  className="border border-gray-300 w-full"
                />
              ) : (
                <span dangerouslySetInnerHTML={{ __html: req }} />
              )}
            </li>
          ))}
        </ul>
      </div> */}

      {/* Experience */}
      <div className="mt-6 px-4 sm:px-6 md:px-72">
        <h3 className="text-lg font-semibold">Experience:</h3>
        {isEditing ? (
          <ReactQuill
            name="ExperienceRequired"
            value={jobData?.ExperienceRequired || ""}
            onChange={(value) =>
              setJobData({ ...jobData, ExperienceRequired: value })
            }
            className="w-full p-2"
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: cleanData.ExperienceRequired }}
            className="text-gray-700"
          />
        )}
      </div>

      {/* Department */}
      <div className="mt-6 px-4 sm:px-6 md:px-72">
        <h3 className="text-lg font-semibold">Department:</h3>
        {isEditing ? (
          <ReactQuill
            name="department"
            value={jobData?.Department || ""}
            onChange={(value) => setJobData({ ...jobData, Department: value })}
            className="w-full p-2"
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: cleanData.Department }}
            className="text-gray-700"
          />
        )}
      </div>

      {/* Job Type */}
      <div className="mt-6 px-4 sm:px-6 md:px-72">
        <h3 className="text-lg font-semibold">Job Type:</h3>
        {isEditing ? (
          <ReactQuill
            name="jobType"
            value={jobData?.JobType || ""}
            onChange={(value) => setJobData({ ...jobData, JobType: value })}
            className="w-full p-2"
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: cleanData.JobType }}
            className="text-gray-700"
          />
        )}
      </div>
      {/* Salary Range */}
      <div className="mt-6 px-4 sm:px-6 md:px-72">
        <h3 className="text-lg font-semibold">Salary Range:</h3>
        {isEditing ? (
          <ReactQuill
            name="salaryRange"
            value={jobData?.SalaryRange || ""}
            onChange={(value) => setJobData({ ...jobData, SalaryRange: value })}
            className="w-full p-2"
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: cleanData.SalaryRange }}
            className="text-gray-700"
          />
        )}
      </div>
      {/* Job Responsibilities */}
      <div className="mt-6 px-4 sm:px-6 md:px-72">
        <h3 className="text-lg font-semibold">Job Responsibilities:</h3>
        {isEditing ? (
          <ReactQuill
            name="jobResponsibilities"
            value={jobData?.JobResponsibilities || ""}
            onChange={(value) =>
              setJobData({ ...jobData, JobResponsibilities: value })
            }
            className="w-full p-2"
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: cleanData.JobResponsibilities }}
            className="text-gray-700"
          />
        )}
      </div>

      {/* Educational Qualifications */}
      <div className="mt-6 px-4 sm:px-6 md:px-72">
        <h3 className="text-lg font-semibold">Education Qualification:</h3>
        {isEditing ? (
          <ReactQuill
            name="EduQualifications"
            value={jobData?.EduQualifications || ""}
            onChange={(value) =>
              setJobData({ ...jobData, EduQualifications: value })
            }
            className="w-full p-2"
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: cleanData.EduQualifications }}
            className="text-gray-700"
          />
        )}
      </div>

      {/* Skills Section */}
      <div className="mb-6 mt-6 px-4 sm:px-6   md:px-72">
        <h2 className="text-xl font-semibold">Skills Required:</h2>
        {/* {console.log(jobData.SkillsRequired)} */}
        {isEditing ? (
          <ReactQuill
            name="SkillsRequired"
            value={jobData?.SkillsRequired || ""}
            onChange={(value) =>
              setJobData({ ...jobData, SkillsRequired: value })
            }
            className=" p-2  rounded-md w-full h-24 resize-none"
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: cleanData.skillsRequired }}
            className="text-gray-700"
          />
        )}
      </div>
    </div>
  );
}

export default JobDescriptionPage;
