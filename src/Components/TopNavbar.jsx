import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

 function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-[#7c3aed] to-[#6366f1] text-white px-6 py-3 shadow-md flex items-center justify-between w-full fixed top-0 z-50">
      
      {/* Left Section: Logo + Navigation */}
      <div className="flex items-center gap-6">
        <span className="text-xl font-bold">JobNest</span>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-2 py-1 border-b-2 ${
              isActive
                ? "border-white font-semibold"
                : "border-transparent hover:border-white hover:font-medium transition-all duration-200"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/joblistings"
          className={({ isActive }) =>
            `px-2 py-1 border-b-2 ${
              isActive
                ? "border-white font-semibold"
                : "border-transparent hover:border-white hover:font-medium transition-all duration-200"
            }`
          }
        >
          Job Board
        </NavLink>

        <NavLink
          to="/getapplicant"
          className={({ isActive }) =>
            `px-2 py-1 border-b-2 ${
              isActive
                ? "border-white font-semibold"
                : "border-transparent hover:border-white hover:font-medium transition-all duration-200"
            }`
          }
        >
          Candidate Pool
        </NavLink>
      </div>

      {/* Right Section: Auth Buttons */}
      <div className="flex items-center gap-6">
        {!isAuthenticated ? (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-2 py-1 border-b-2 ${
                  isActive
                    ? "border-white font-semibold"
                    : "border-transparent hover:border-white hover:font-medium transition-all duration-200"
                }`
              }
            >
              Login
            </NavLink>

            {/* <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-2 py-1 border-b-2 ${
                  isActive
                    ? "border-white font-semibold"
                    : "border-transparent hover:border-white hover:font-medium transition-all duration-200"
                }`
              }
            >
              Register
            </NavLink> */}
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-2 py-1 border-b-2 border-transparent hover:border-white hover:font-medium transition-all duration-200"
          >
            Logout
          </button>
        )}

        <NavLink
          to="/addjobs"
          className={({ isActive }) =>
            `px-2 py-1 border-b-2 ${
              isActive
                ? "border-white font-semibold"
                : "border-transparent hover:border-white hover:font-medium transition-all duration-200"
            }`
          }
        >
          Upload Jobs
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;

