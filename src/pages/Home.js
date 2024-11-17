import React, { useState } from "react";
import { usePage } from "../context/PageContext";
import Link from "../context/Link";

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const styles = {
    dark: {
      background: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
      card: "bg-gray-700 text-gray-300 shadow-lg",
      text: "text-white",
      button: "bg-teal-600 text-white hover:bg-teal-500",
    },
    light: {
      background: "bg-gradient-to-br from-blue-50 via-blue-100 to-white",
      card: "bg-white text-gray-800 shadow-lg",
      text: "text-gray-800",
      button: "bg-blue-500 text-white hover:bg-blue-400",
    },
  };

  const currentStyle = darkMode ? styles.dark : styles.light;

  return (
    <div className={`${currentStyle.background} min-h-screen mt-16` }>
      {/* Header with Light/Dark Mode Toggle */}
      <header className="p-6 flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${currentStyle.text}`}>CRM Hub</h1>
        <button
          onClick={toggleDarkMode}
          className={`py-2 px-4 rounded-lg ${currentStyle.button}`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
          <h2 className={`text-5xl font-extrabold mb-6 ${currentStyle.text}`}>
            Empower Your Business Growth
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mb-8">
            Elevate customer relationships and streamline your marketing campaigns with ease.
          </p>
          <button
            className={`py-3 px-8 rounded-lg text-lg font-semibold ${currentStyle.button}`}
          >
            Get Started
          </button>
        </div>
        <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-t from-transparent via-blue-500 to-indigo-700 opacity-30"></div>
      </section>

      {/* Login and Get Started Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Login Section */}
          <div
            className={`bg-opacity-90 backdrop-blur-md rounded-lg p-10 text-center shadow-xl ${currentStyle.card}`}
          >
            <h2 className={`text-3xl font-bold mb-4 ${currentStyle.text}`}>
              Login Now
            </h2>
            <p className="text-gray-400 mb-6">
              Access your account and manage your campaigns seamlessly.
            </p>
            <Link to="/login">
              <button
                className={`py-3 px-6 rounded-lg text-lg font-semibold ${currentStyle.button}`}
              >
                Login
              </button>
            </Link>
          </div>

          {/* Get Started Section */}
          <div
            className={`bg-opacity-90 backdrop-blur-md rounded-lg p-10 text-center shadow-xl ${currentStyle.card}`}
          >
            <h2 className={`text-3xl font-bold mb-4 ${currentStyle.text}`}>
              Get Started Today
            </h2>
            <p className="text-gray-400 mb-6">
              Start your journey with our powerful tools to transform your
              business.
            </p>
            <Link to="/signup">
            <button
              className={`py-3 px-6 rounded-lg text-lg font-semibold ${currentStyle.button}`}
            >
              Sign Up
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className={`text-4xl font-extrabold mb-12 ${currentStyle.text}`}>
            Why Choose CRM Hub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-y-12">
            <div className={`${currentStyle.card} rounded-lg p-8`}>
              <h3 className="text-xl font-bold mb-4">Seamless Integration</h3>
              <p className="text-gray-400">
                Connect effortlessly with existing tools and platforms for a unified experience.
              </p>
            </div>
            <div className={`${currentStyle.card} rounded-lg p-8`}>
              <h3 className="text-xl font-bold mb-4">Customizable Solutions</h3>
              <p className="text-gray-400">
                Tailor CRM features to meet your unique business needs and goals.
              </p>
            </div>
            <div className={`${currentStyle.card} rounded-lg p-8`}>
              <h3 className="text-xl font-bold mb-4">Data-Driven Insights</h3>
              <p className="text-gray-400">
                Leverage analytics to understand customer behavior and optimize campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Ready to Transform?</h2>
          <p className="text-lg mb-8">
            Join hundreds of businesses already revolutionizing their workflows with CRM Hub.
          </p>
          <button className="py-3 px-8 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-200">
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
