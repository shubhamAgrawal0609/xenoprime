import React, { useLayoutEffect, useState } from "react";
import axios from "axios";

function OrderSegmentModal({ showModal, onClose, order }) {
  const [name, setName] = useState(order ? order.name : "");
  const [userId, setUserId] = useState(null);
  const [audienceSets, setAudienceSets] = useState([]);
  const [audienceId, setAudienceId] = useState(order ? order.audienceId : "");
  const [budget, setBudget] = useState(order ? order.budget : "");
  const [startDate, setStartDate] = useState(order ? order.startDate : "");
  const [endDate, setEndDate] = useState(order ? order.endDate : "");

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user.id);
      fetchAudienceSets(user.email);
    }
  }, []);

  const fetchAudienceSets = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/audiences/${email}`
      );
      setAudienceSets(response.data);
    } catch (error) {
      console.error("Error fetching audiences:", error.message);
    }
  };

  const handleCreateCampaign = async (event) => {
    event.preventDefault();
    const campaign = {
      name,
      audienceId,
      budget,
      startDate,
      endDate,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/campaigns", {
        userId,
        campaign,
      });
      console.log("Campaign created:", response.data);
      onClose();
    } catch (error) {
      console.error("Error creating campaign:", error.message);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              ✖
            </button>

            {/* Modal Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              {order ? "Edit Order" : "Add New Order"}
            </h2>

            {/* Order Form */}
            <form onSubmit={handleCreateCampaign}>
              {/* Campaign Name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter campaign name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Audience */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Audience
                </label>
                <select
                  value={audienceId}
                  onChange={(e) => setAudienceId(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select Audience Set</option>
                  {audienceSets.map((audience) => (
                    <option key={audience._id} value={audience._id}>
                      {audience.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Budget (in USD)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter budget"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Date Range */}
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderSegmentModal;
