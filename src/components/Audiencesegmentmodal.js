import React, { useState, useLayoutEffect } from "react";
import axios from "axios";

const AudienceSegmentModal = ({ isOpen, onClose, audience }) => {
  const [userId, setUserId] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [conditions, setConditions] = useState([]);
  const [newCondition, setNewCondition] = useState({
    field: "",
    operator: "",
    value: "",
  });
  const [logic, setLogic] = useState("AND");
  const [calculatedSize, setCalculatedSize] = useState(0);

  const fields = [
    "Age Range",
    "Gender",
    "Location",
    "Language",
    "Interests",
    "Behavior",
    "Job Title",
    "Industry",
    "Education Level",
    "Device Type",
    "Time of Day",
    "Frequency",
    "Income Level",
  ];

  const genders = ["Male", "Female", "Rather not say"];
  const languages = ["Hindi", "English", "Odia"];
  const industries = ["IT", "Healthcare", "Education", "Retail", "Finance"];
  const educationLevels = ["Masters", "Bachelors", "PhD", "Graduation"];
  const deviceTypes = ["Mobile", "Web", "Tablet", "Android"];
  const timeOfDayOptions = ["Morning", "Afternoon", "Evening", "Night"];

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user.id);
    console.log(audience);
  }, [audience]);

  const addCondition = () => {
    setConditions([...conditions, newCondition]);
    setNewCondition({ field: "", operator: "", value: "" });
  };

  const removeCondition = (index) => {
    const updatedConditions = conditions.filter((_, idx) => idx !== index);
    setConditions(updatedConditions);
  };

  const calculateAudienceSize = () => {
    const size = Math.floor(Math.random() * 1000);
    setCalculatedSize(size);
  };

  const handleSave = async () => {
    const newSegment = {
      name,
      description,
      conditions,
      logic,
      calculatedSize,
    };

    try {
      await addAudienceSet(userId, newSegment);
      console.log("Audience saved successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving audience:", error);
    }
  };

  const api = axios.create({
    baseURL: "http://localhost:5000",
  });

  const addAudienceSet = async (userId, audienceData) => {
    try {
      console.log(audienceData);
      const response = await api.post("/api/audiences", {
        userId,
        audience: audienceData,
      });
      console.log("Audience added:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error adding audience:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const renderFieldInput = () => {
    switch (newCondition.field) {
      case "Age Range":
        return (
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="18"
              max="65"
              onChange={(e) =>
                setNewCondition({ ...newCondition, value: e.target.value })
              }
              className="w-full"
            />
            <span>{newCondition.value || "18-65"}</span>
          </div>
        );
      case "Gender":
        return (
          <select
            value={newCondition.value}
            onChange={(e) =>
              setNewCondition({ ...newCondition, value: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white w-full relative max-w-3xl p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-deep-teal">
            Create Audience Segment
          </h2>
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✖
          </button>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Conditions</label>
            <div className="space-y-2">
              {conditions.map((cond, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <span>
                    {cond.field} {cond.operator} {cond.value}
                  </span>
                  <button
                    onClick={() => removeCondition(idx)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <select
                value={newCondition.field}
                onChange={(e) =>
                  setNewCondition({ ...newCondition, field: e.target.value })
                }
                className="p-2 border border-gray-300 rounded"
              >
                <option value="">Select Field</option>
                {fields.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
              <select
                value={newCondition.operator}
                onChange={(e) =>
                  setNewCondition({ ...newCondition, operator: e.target.value })
                }
                className="p-2 border border-gray-300 rounded ml-2"
              >
                <option value="">Select Operator</option>
                <option value="equals">Equals</option>
                <option value="greater than">Greater Than</option>
                <option value="less than">Less Than</option>
                <option value="contains">Contains</option>
              </select>
              <select
                value={logic}
                onChange={(e) => setLogic(e.target.value)}
                className="p-2 border border-gray-300 rounded ml-2"
              >
                <option value="">Select Logic</option>
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
              <div className="mt-4">{renderFieldInput()}</div>
              <button
                onClick={addCondition}
                className="bg-mint-green text-black px-4 py-2 rounded mt-2"
              >
                Add Condition
              </button>
            </div>
          </div>
          <div className="mb-4">
            <button
              onClick={calculateAudienceSize}
              className="bg-light-sky-blue text-black px-4 py-2 rounded"
            >
              Calculate Audience Size
            </button>
            {calculatedSize > 0 && (
              <div className="text-green-600 mt-2">
                Calculated Audience Size: {calculatedSize}
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-mint-green text-black rounded hover:bg-light-sky-blue"
            >
              Save Segment
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AudienceSegmentModal;
