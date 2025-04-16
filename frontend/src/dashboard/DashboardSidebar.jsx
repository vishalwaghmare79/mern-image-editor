import { useState, useEffect } from "react";
import { FiImage, FiUpload , FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

export const DashboardSidebar = () => {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname.includes("upload")) return "upload";
    if (location.pathname.includes("gallery")) return "gallery";
    if (location.pathname.includes("edit")) return "edit";
    return "";
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location]);

  const navItems = [
    { label: "Image Upload", icon: <FiUpload />, path: "/dashboard/upload", key: "upload" },
    { label: "Image Gallery", icon: <FiImage />, path: "/dashboard/gallery", key: "gallery" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-lg md:hidden shadow"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-gray-100 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 md:translate-x-0 md:relative md:block`}
      >
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                activeTab === item.key
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 mt-auto">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-red-400 hover:text-red-300 hover:bg-gray-800 transition"
          >
            <FiLogOut />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};
