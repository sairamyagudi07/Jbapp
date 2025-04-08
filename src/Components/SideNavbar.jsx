// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   Menu,
//   LogOut,
//   Briefcase,
//   FileText,
//   Users,
//   FilePlus,
// } from "lucide-react";

// export default function DualSideNavbar() {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("authToken"); // Remove authentication token
//     sessionStorage.clear(); // Clear session storage
//     navigate("/"); // Redirect to login page
//   };

//   return (
//     <nav
//       className={`bg-white-950 text-black flex flex-col ${
//         isExpanded ? "w-64" : "w-20"
//       } p-4 transition-all duration-300 min-h-screen`}
//     >
//       {/* Hamburger Menu */}
//       <button
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="mb-6 flex items-center ml-4 text-black"
//       >
//         <Menu size={24} />
//         {isExpanded && <span className="ml-6 text-lg"></span>}
//       </button>

//       {/* Navigation Links */}
//       <ul className="space-y-4 flex-grow">
//         <li>
//           <NavLink
//             to="/joblist"
//             className={({ isActive }) =>
//               `flex items-center gap-3 p-2 ml-2 rounded cursor-pointer ${
//                 isActive ? "bg-blue-500" : "hover:bg-blue-600"
//               }`
//             }
//           >
//             <Briefcase size={24} />
//             {isExpanded && <span>Job Board</span>}
//           </NavLink>
//         </li>

//         <li>
//           <NavLink
//             to="/postjob"
//             className={({ isActive }) =>
//               `flex items-center gap-3 p-2 ml-2 rounded cursor-pointer ${
//                 isActive ? "bg-blue-500" : "hover:bg-blue-600"
//               }`
//             }
//           >
//             <FilePlus size={22} />
//             {isExpanded && <span>Upload Jobs</span>}
//           </NavLink>
//         </li>

//         <li>
//           <NavLink
//             to="/allApplicants"
//             className={({ isActive }) =>
//               `flex items-center gap-3 p-2 ml-2 rounded cursor-pointer ${
//                 isActive ? "bg-blue-500" : "hover:bg-blue-600"
//               }`
//             }
//           >
//             <Users size={22} />
//             {isExpanded && <span>Candidate Pool</span>}
//           </NavLink>
//         </li>
//         <li>
//           <button
//             onClick={handleLogout}
//             className="w-full text-left flex items-center gap-3 p-2 ml-2 rounded cursor-pointer hover:bg-blue-600"
//           >
//             <LogOut size={24} />
//             {isExpanded && <span>Exit</span>}
//           </button>
//         </li>
//       </ul>

//       {/* Logout Button - Stays at Bottom */}
//     </nav>
//   );
// }


import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, LogOut, Briefcase, FileText, Users, FilePlus } from "lucide-react";

export default function DualSideNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className={`bg-gray-100 text-black flex flex-col ${
        isExpanded ? "w-64" : "w-20"
      } p-4 transition-all duration-300 min-h-screen rounded-lg shadow-md`}
    >
      {/* Hamburger Menu */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-6 flex items-center ml-4 text-black"
      >
        <Menu size={24} />
        {isExpanded && <span className="ml-6 text-lg"></span>}
      </button>

      {/* Navigation Links */}
      <ul className="space-y-4 flex-grow">
        <li>
          <NavLink
            to="/joblist"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 ml-2 rounded-lg cursor-pointer transition ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
              }`
            }
          >
            <Briefcase size={24} />
            {isExpanded && <span>Job Board</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/postjob"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 ml-2 rounded-lg cursor-pointer transition ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
              }`
            }
          >
            <FilePlus size={22} />
            {isExpanded && <span>Upload Jobs</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/allApplicants"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 ml-2 rounded-lg cursor-pointer transition ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"
              }`
            }
          >
            <Users size={22} />
            {isExpanded && <span>Candidate Pool</span>}
          </NavLink>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-3 p-3 ml-2 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition"
          >
            <LogOut size={24} />
            {isExpanded && <span>Exit</span>}
          </button>
        </li>
      </ul>
    </nav>
  );
}
