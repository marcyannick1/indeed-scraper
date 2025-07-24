import { Briefcase, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header
      className={`${"bg-white/80 border-white/20"} shadow-md backdrop-blur-md border-b sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1
                className={`text-2xl font-bold bg-gradient-to-r ${
                  darkMode
                    ? "from-gray-100 to-gray-400"
                    : "from-gray-900 to-gray-600"
                } bg-clip-text text-transparent`}
              >
                JobFinder Pro
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } transition-all duration-200 cursor-pointer`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
