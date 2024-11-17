import React, { useState, useLayoutEffect } from "react";
import AudienceSegmentModal from "../components/Audiencesegmentmodal";
import axios from "axios";

const AudienceSetsPage = () => {
  const [audienceSets, setAudienceSets] = useState([]); // This would be populated with actual data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [seed, setSeed] = useState("123");
  const [userId, setUserId] = useState();
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  // Handle adding a new audience set
  const handleAddAudienceSet = () => {
    setSeed(Math.random());
  };

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    if (email) {
      getAudienceSet(email);
    }
  }, [seed]);

  async function getAudienceSet(email) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/audiences/${email}`
      );
      setAudienceSets(response.data); // Audience data
    } catch (error) {
      console.error(
        "Error fetching audiences:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 text-center text-white">
        <h1 className="text-4xl font-bold">Audience Sets</h1>
        <p className="text-sm mt-2">
          Manage your audience data with ease and efficiency.
        </p>
      </div>

      {/* Add New Audience Set Button */}
      <div className="text-center my-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition"
        >
          Add New Audience Set
        </button>
      </div>

      {/* Audience Sets Cards */}
      <div className="max-w-6xl mx-auto px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {audienceSets.length === 0 ? (
          <p className="text-center text-gray-500">
            No audience sets added yet.
          </p>
        ) : (
          audienceSets.map((audience, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-teal-500 mb-2">
                {audience.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {audience.description}
              </p>
              <button
                onClick={() => setActiveModalIndex(index)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                View Details
              </button>
              {activeModalIndex === index && (
                <AudienceSegmentModal
                  isOpen={true}
                  onClose={() => setActiveModalIndex(null)}
                  audience={audience}
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal to Add Audience Set */}
      <AudienceSegmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          handleAddAudienceSet();
        }}
      />
    </div>
  );
};

export default AudienceSetsPage;
