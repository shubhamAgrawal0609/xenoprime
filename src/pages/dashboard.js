import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import { useRoute } from "../context/RouteContext";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const { navigate } = useRoute();

  useLayoutEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Xeno CRM</h2>
          <p className="mt-2 text-sm">Welcome, {user?.name || "User"}!</p>
        </div>
        <nav className="mt-8">
          <ul className="space-y-4 px-4">
            <li>
              <button
                onClick={() => navigate("/dashboard/audience")}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Audience Sets
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/dashboard/orders")}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/dashboard/campaigns")}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Campaigns
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/dashboard/analytics")}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Analytics
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Manage your CRM with ease.</p>
        </header>

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-teal-500">
              Audience Sets
            </h2>
            <p className="text-gray-600 mt-2">
              Manage your customers and view their details.
            </p>
            <button
              onClick={() => navigate("/dashboard/audience")}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
            >
              View Audiences
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-teal-500">Orders</h2>
            <p className="text-gray-600 mt-2">
              Track and manage customer orders efficiently.
            </p>
            <button
              onClick={() => navigate("/dashboard/orders")}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
            >
              Manage Orders
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-teal-500">Campaigns</h2>
            <p className="text-gray-600 mt-2">
              Create and monitor marketing campaigns.
            </p>
            <button
              onClick={() => navigate("/dashboard/campaigns")}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
            >
              View Campaigns
            </button>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-teal-500">Analytics</h2>
            <p className="text-gray-600 mt-2">
              Analyze customer and campaign data effectively.
            </p>
            <button
              onClick={() => navigate("/dashboard/analytics")}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
            >
              View Analytics
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
