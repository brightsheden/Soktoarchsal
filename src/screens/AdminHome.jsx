import React, { useState } from "react";
import AdminBlogListScreen from "./AdminBlogListScreen";

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState("staffs");

  const renderTabContent = () => {
    switch (activeTab) {
      case "staffs":
        return <Staffs />;
      case "teams":
        return <Teams />;
      case "blogs":
        return <Blogs />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("staffs")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "staffs"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Manage Staffs
        </button>
        <button
          onClick={() => setActiveTab("teams")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "teams"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Manage Teams
        </button>
        <button
          onClick={() => setActiveTab("blogs")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "blogs"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Manage Blogs
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-md shadow-md">{renderTabContent()}</div>
    </div>
  );
};

const Staffs = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Manage Staffs</h2>
    <p>Here you can add, edit, or remove staff members.</p>
    {/* Add form or table for managing staffs */}
  </div>
);

const Teams = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Manage Teams</h2>
    <p>Here you can add, edit, or remove teams.</p>
    {/* Add form or table for managing teams */}
  </div>
);

const Blogs = () => (
  <div>
    <AdminBlogListScreen/>
  </div>
);

export default AdminHome;
