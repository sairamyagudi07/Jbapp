import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  EyeIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const JobApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null); // Store file URL for preview
  const [error, setError] = useState(null);
  const { Id } = useParams(); // ✅ Get Job ID from URL

  useEffect(() => {
    const fetchApplicants = async () => {
      const api = "http://156.67.111.32:3120/api/jobPortal/getAllApplications";
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found, please log in.");
        setIsLoading(false);
        return;
      }

      //   const controller = new AbortController();
      //   const signal = controller.signal;

      try {
        const response = await axios.get(api, {
          headers: { Authorization: `Bearer ${token}` },
          //   signal, // Attach signal for cleanup
        });

        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.applications)) {
          setApplicants(response.data.applications); // Store only applications array
        } else {
          setError("Unexpected response format");
          setApplicants([]); // Prevent further errors
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled:", error.message);
        } else {
          setError("Failed to load applicants.");
          console.error("API Error:", error.response || error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
        Job Applicants
      </h1>

      {isLoading ? (
        <p className="text-gray-500 text-center">Loading applicants...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Total Applicants: {applicants.length}
          </h2>

          {/* Table for Medium and Large Screens */}
          <div className="hidden sm:block">
            <table className="min-w-full border border-gray-300 text-sm sm:text-base">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Email</th>
                  <th className="border p-2 text-left hidden sm:table-cell">
                    Phone
                  </th>
                  <th className="border p-2 text-left">Job Applied</th>
                  <th className="border p-2 text-left hidden md:table-cell">
                    Job ID
                  </th>
                  <th className="border p-2 text-left">Resume</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(applicants) && applicants.length > 0 ? (
                  applicants.map((app, index) => (
                    <tr key={index} className="text-left border-b">
                      <td className="border p-2">
                        {app.Candidate?.FullName || "N/A"}
                      </td>
                      <td className="border p-2">
                        {app.Candidate?.Email || "N/A"}
                      </td>
                      <td className="border p-2 hidden sm:table-cell">
                        {app.Candidate?.PhoneNumber || "N/A"}
                      </td>
                      <td className="border p-2">
                        {app.JobPosting?.Title || "N/A"}
                      </td>
                      <td className="border p-2 hidden md:table-cell text-center">
                        <div className="flex justify-center items-center">
                          <span className="px-2 py-1 rounded bg-blue-500 text-white text-xs sm:text-sm">
                            {app.JobId || "Unknown"}
                          </span>
                        </div>
                      </td>

                      <td className="border p-2 flex items-center gap-2">
                        {app.Candidate?.ResumeUrl ? (
                          <>
                            {/* Preview Button */}
                            <button
                              onClick={() =>
                                setPreviewUrl(app.Candidate.ResumeUrl)
                              }
                              className="text-green-600 hover:text-green-800"
                              title="Preview Resume"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>

                            {/* Download Button */}
                            <a
                              href={app.Candidate.ResumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                              title="Download Resume"
                              download
                            >
                              <ArrowDownTrayIcon className="h-5 w-5" />
                            </a>
                          </>
                        ) : (
                          <span className="text-gray-400">Not Available</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No applicants found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Card View for Small Screens */}
          <div className="sm:hidden">
            {Array.isArray(applicants) && applicants.length > 0 ? (
              applicants.map((app, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white rounded-lg p-4 shadow-sm mb-4"
                >
                  <h3 className="text-lg font-semibold text-gray-700">
                    {app.Candidate?.FullName || "N/A"}
                  </h3>
                  <p className="text-gray-600">
                    {app.Candidate?.Email || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Job:</span>{" "}
                    {app.JobPosting?.Title || "N/A"}
                  </p>
                  {app.Candidate?.PhoneNumber && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Phone:</span>{" "}
                      {app.Candidate.PhoneNumber}
                    </p>
                  )}
                  <p className="mt-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        app.Status?.StatusName === "Accepted"
                          ? "bg-green-500"
                          : app.Status?.StatusName === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {app.Status?.StatusName || "Unknown"}
                    </span>
                  </p>
                  <p className="mt-2 flex items-center gap-2">
                    {app.Candidate?.ResumeUrl ? (
                      <>
                        {/* Preview Button */}
                        <button
                          onClick={() => setPreviewUrl(app.Candidate.ResumeUrl)}
                          className="text-green-600 hover:text-green-800"
                          title="Preview Resume"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>

                        {/* Download Button */}
                        <a
                          href={app.Candidate.ResumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                          title="Download Resume"
                          download
                        >
                          <ArrowDownTrayIcon className="h-5 w-5" />
                        </a>
                      </>
                    ) : (
                      <span className="text-gray-400">
                        Resume Not Available
                      </span>
                    )}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No applicants found</p>
            )}
          </div>

          {/* Resume Preview Modal */}
          {previewUrl && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Resume Preview</h2>
                  <button onClick={() => setPreviewUrl(null)}>
                    <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>

                <iframe
                  src={previewUrl}
                  title="Resume Preview"
                  className="w-full h-96 mt-4"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobApplicants;
