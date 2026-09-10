import { useState, useEffect } from "react";
import {
  Briefcase,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import { NAVIGATION_MENU } from "../../Utils/Data"

const NavigationItem = ({ item, isActive, onClick, isCollapsed }) => {
  const Icon = item.icon;

  return (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
        ? "bg-blue-50 text-blue-900 shadow-sm shadow-blue-50"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
    >
      <Icon
        className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-blue-900" : "text-gray-500"
          }`}
      />

      {!isCollapsed && (
        <span className="ml-3 truncate">
          {item.name}
        </span>
      )}
    </button>
  );
};

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, [profileDropdownOpen]);

  const handleNavigation = (itemId) => {
    setActiveNavItem(itemId);
    navigate(`/${itemId}`);

    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarCollapsed = !isMobile && false;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-transform duration-300 ${isMobile
          ? sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          : "translate-x-0"
          } ${sidebarCollapsed ? "w-16" : "w-64"
          } bg-white border-r border-gray-200`}
      >
        {/* Company Logo */}
        <div className="h-20 flex items-center px-6 border-b border-gray-200">
          <Link
            className="flex items-center gap-4"
            to="/dashboard"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-800 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-white" />
            </div>

            {!sidebarCollapsed && (
              <span className="text-2xl font-bold text-gray-900 whitespace-nowrap">
                AI Invoice App
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <nav className="p-4 space-y-2">
            {NAVIGATION_MENU.map((item) => (
              <NavigationItem
                key={item.id}
                item={item}
                isActive={activeNavItem === item.id}
                onClick={handleNavigation}
                isCollapsed={sidebarCollapsed}
              />
            ))}
          </nav>
        </nav>

        {/* Logout */}
        <div className="px-4 py-6">
          <button
            className="w-full flex items-center gap-4 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            onClick={logout}
          >
            <LogOut className="w-6 h-6 flex-shrink-0" />

            {!sidebarCollapsed && (
              <span className="text-base font-medium">
                Logout
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`min-h-screen flex flex-col transition-all duration-300 ${isMobile
          ? "ml-0"
          : sidebarCollapsed
            ? "ml-16"
            : "ml-64"
          }`}
      >
        {/* Top navbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex-shrink-0">
          <div className="h-full px-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              {isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {sidebarOpen ? (
                    <X className="w-6 h-6 text-gray-700" />
                  ) : (
                    <Menu className="w-6 h-6 text-gray-700" />
                  )}
                </button>
              )}

              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Welcome back, {user?.name}!
                </h1>

                <p className="text-base text-gray-500 mt-1">
                  Here's your invoice overview.
                </p>
              </div>
            </div>

            <div className="relative">
              {/* Profile dropdown */}
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                onToggle={(e) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                avatar={user?.avatar || ""}
                companyName={user?.name || ""}
                email={user?.email || ""}
                onLogout={logout}
              />
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 bg-gray-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;