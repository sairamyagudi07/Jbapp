import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  LogOut,
  Briefcase,
  FileText,
  Users,
  FilePlus,
} from "lucide-react";

export default function DualSideNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove authentication token
    sessionStorage.clear(); // Clear session storage
    navigate("/"); // Redirect to login page
  };

  return (
    <nav
      className={`bg-gray-900 text-white   ${
        isExpanded ? "w-64" : "w-20"
      } p-4 transition-all duration-300 min-h-screen  `}
    >
      {/* Hamburger Menu */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-6 flex items-center ml-4 text-white"
      >
        <Menu size={24} />
        {isExpanded && <span className="ml-6 text-lg"> </span>}
      </button>

      {/* Navigation Links */}
      <ul className="space-y-4">
        <button onClick={() => handleLogout()}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 ml-2 rounded cursor-pointer ${
                  isActive ? "bg-blue-500" : "hover:bg-gray-700"
                }`
              }
            >
              <LogOut size={24} />
              {isExpanded && <span>Logout</span>}
            </NavLink>
          </li>
        </button>

        <li>
          <NavLink
            to="/joblist"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2  ml-2 rounded cursor-pointer ${
                isActive ? "bg-blue-500" : "hover:bg-gray-700"
              }`
            }
          >
            <Briefcase size={24} />
            {isExpanded && <span>Job List</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/jobapply"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2   ml-2 rounded cursor-pointer ${
                isActive ? "bg-blue-500" : "hover:bg-gray-700"
              }`
            }
          >
            <FileText size={22} />
            {isExpanded && <span>Job Descriptions</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/postjob"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2   ml-2 rounded cursor-pointer ${
                isActive ? "bg-blue-500" : "hover:bg-gray-700"
              }`
            }
          >
            <FilePlus size={22} />
            {isExpanded && <span>Job Postings</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/allApplicants"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2   ml-2 rounded cursor-pointer ${
                isActive ? "bg-blue-500" : "hover:bg-gray-700"
              }`
            }
          >
            <Users size={22} />
            {isExpanded && <span>All Applicants</span>}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
