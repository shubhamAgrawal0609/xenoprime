import React, { useState } from "react";
import { useRoute } from "../context/RouteContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigate } = useRoute();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data.message);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        console.error("Login failed:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center">
      {/* Card Container */}
      <div className="w-full max-w-4xl bg-gray-800 shadow-2xl rounded-2xl p-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="flex flex-col items-start justify-center space-y-6">
            <h1 className="text-4xl font-bold text-teal-400">
              Welcome Back!
            </h1>
            <p className="text-gray-400 text-lg">
              Manage your projects, access exclusive features, and stay connected. Log in to continue your journey with us.
            </p>
            <img
              src="https://via.placeholder.com/400x300?text=Secure+Login"
              alt="Secure Login Illustration"
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Right Section */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-teal-400 mb-6">
              Login to Your Account
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-teal-500 text-gray-900 rounded-lg font-bold hover:bg-teal-400 transition"
              >
                Log In
              </button>
            </form>

            {/* Additional Links */}
            <div className="flex justify-between mt-6 text-sm text-gray-400">
              <a href="#" className="hover:text-teal-300">
                Forgot Password?
              </a>
              <a href="#" className="hover:text-teal-300">
                Create Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

