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
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow sticky-top"
      style={{ borderRadius: "50px", margin: "20px" }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="../assets/rs1.png"
            alt="logo rs"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <span className="fw-bold text-primary">RS Sehat Sentosa</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${
                    isActive ? "fw-bold text-primary" : "text-primary"
                  }`
                }
              >
                <FontAwesomeIcon icon={faHouse} className="me-2" />
                Beranda
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/dokter"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${
                    isActive ? "fw-bold text-primary" : "text-primary"
                  }`
                }
              >
                <FontAwesomeIcon icon={faUserInjured} className="me-2" />
                Dokter
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/fasilitas"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${
                    isActive ? "fw-bold text-primary" : "text-primary"
                  }`
                }
              >
                <FontAwesomeIcon icon={faHospital} className="me-2" />
                Fasilitas
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/farmasi"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${
                    isActive ? "fw-bold text-primary" : "text-primary"
                  }`
                }
              >
                <FontAwesomeIcon icon={faStethoscope} className="me-2" />
                Farmasi
              </NavLink>
            </li>
          </ul>

          {token && (
            <div className="text-end">
              <button
                className="btn btn-outline-danger text-primary d-flex align-items-center"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
