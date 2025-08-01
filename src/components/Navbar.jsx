import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserInjured,
  faSignOutAlt,
  faHospital,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="../assets/rs1.png"
            alt="logo rs"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          <span className="fw-bold text-primary">RS Sehat Sentosa</span>
        </Link>

        {/* Hamburger button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigasi */}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto align-items-lg-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center mx-lg-2 ${
                  isActive ? "fw-bold text-primary" : "text-primary"
                }`
              }
            >
              <FontAwesomeIcon icon={faHouse} className="me-2" />
              Beranda
            </NavLink>

            <NavLink
              to="/dokter"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center mx-lg-2 ${
                  isActive ? "fw-bold text-primary" : "text-primary"
                }`
              }
            >
              <FontAwesomeIcon icon={faUserInjured} className="me-2" />
              Dokter
            </NavLink>

            <NavLink
              to="/fasilitas"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center mx-lg-2 ${
                  isActive ? "fw-bold text-primary" : "text-primary"
                }`
              }
            >
              <FontAwesomeIcon icon={faHospital} className="me-2" />
              Fasilitas
            </NavLink>

            <NavLink
              to="/farmasi"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center mx-lg-2 ${
                  isActive ? "fw-bold text-primary" : "text-primary"
                }`
              }
            >
              <FontAwesomeIcon icon={faStethoscope} className="me-2" />
              Farmasi
            </NavLink>

            {/* Logout hanya muncul jika login */}
            {token && (
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger text-primary d-flex align-items-center mx-lg-2 mt-2 mt-lg-0"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
