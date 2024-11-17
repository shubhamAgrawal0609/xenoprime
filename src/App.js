import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { RouteProvider } from "./context/RouteContext";
import Router from "./context/Router";
import Route from "./context/Route";
import Link from "./context/Link";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard";
import OrdersPage from "./pages/ordersPage";
import AudienceSetsPage from "./pages/audiencesetspage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/check-session")
      .then((res) => {
        setIsLoggedIn(res.data.loggedIn);
        setUser(res.data.user);
      })
      .catch((err) => console.error("Session check error:", err));
  }, []);

  useEffect(() => {
    const storedPage = window.localStorage.getItem("Current_page");
    if (storedPage) {
      setCurrentPage(JSON.parse(storedPage));
    } else {
      setCurrentPage("Home");
      window.localStorage.setItem("Current_page", JSON.stringify("Home"));
    }
  }, []);

  const setCurrPage = (page) => {
    setCurrentPage(page);
    window.localStorage.setItem("Current_page", JSON.stringify(page));
  };

  return (
    <div>
      <RouteProvider>
        <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md z-10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Brand */}
            <div
              className="text-2xl font-bold cursor-pointer hover:opacity-90"
              onClick={() => setCurrPage("Home")}
            >
              Xeno CRM
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" onClick={() => setCurrPage("Home")}>
                Home
              </Link>
              <Link to="/login" onClick={() => setCurrPage("Login")}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setCurrPage("Signup")}>
                Signup
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-blue-700 text-white px-6 py-4 space-y-4">
              <Link to="/" onClick={() => setCurrPage("Home")}>
                Home
              </Link>
              <Link to="/login" onClick={() => setCurrPage("Login")}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setCurrPage("Signup")}>
                Signup
              </Link>
              <Link to="/about" onClick={() => setCurrPage("About")}>
                About
              </Link>
            </div>
          )}
        </nav>

        <Router>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/orders" component={OrdersPage} />
          <Route path="/dashboard/audience" component={AudienceSetsPage} />
        </Router>
      </RouteProvider>
    </div>
  );
}

export default App;
