import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const api = axios.create({
    baseURL: "http://localhost:5000", // Backend server URL
  });

  const registerUser = async (userData) => {
    try {
      const response = await api.post("/api/users/register", userData);
      console.log("User registered:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleRegister = async () => {
    const userData = {
      name: name, // Replace with actual input values
      email: email,
      password: password,
    };
    console.log("inside");
    try {
      const result = await registerUser(userData);
      console.log("Registration successful:", result);
      alert("User registered successfully!");
    } catch (error) {
      alert("Failed to register user. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-light-blue mb-6">
          Welcome to Xeno CRM
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister(e);
          }}
        >
          {/* Name Input */}
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-700 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-blue text-gray-300"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-700 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-blue text-gray-300"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-700 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-blue text-gray-300"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-light-blue text-black py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        {/* Additional Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <a href="#" className="hover:underline">
            Already have an account? Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
