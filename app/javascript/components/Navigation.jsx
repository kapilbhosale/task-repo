import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              My Store
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/tasks" className="text-gray-600 hover:text-gray-900">
              Tasks
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

