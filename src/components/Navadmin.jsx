import { Link, NavLink } from "react-router-dom";

export default function Navadmin() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-success text-white"
      style={{ width: "250px", height: "100vh" }}
    >
      {/* Logo dan teks vertikal */}
      <Link
        to="/admin/dashboard"
        className="d-flex flex-column align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <img
          src="../assets/rs1.png"
          alt="logo rs"
          style={{ width: "100px", height: "100px" }}
          className="mb-2"
        />
        <span className="fs-5 fw-bold text-center">
          Rumah Sakit Sehat Sentosa
        </span>
      </Link>

      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "active bg-white text-success fw-bold" : "text-white"
              }`
            }
          >
            Home
          </NavLink>
        </li>
        {/* Jika ingin aktifkan produk, uncomment di bawah */}
        {/* <li>
          <NavLink
            to="/produk"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active bg-white text-success fw-bold" : "text-white"}`
            }
          >
            Produk
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink
            to="/admin/pasien"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active bg-white text-success fw-bold" : "text-white"}`
            }
          >
            Data Pasien
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink
            to="/admin/pendaftaran"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active bg-white text-success fw-bold" : "text-white"}`
            }
          >
            Data Pendaftar
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink
            to="/admin/konfirmasi"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active bg-white text-success fw-bold" : "text-white"}`
            }
          >
            Konfirmasi Pendaftaran
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink
            to="/admin/rawatinap"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "active bg-white text-success fw-bold" : "text-white"
              }`
            }
          >
            Konfirmasi Rawat Inap
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="/admin/daftarobat"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "active bg-white text-success fw-bold" : "text-white"
              }`
            }
          >
            Daftar Obat
          </NavLink>
        </li>


        <li>
          <NavLink
            to="/admin/adminfarmasi"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "active bg-white text-success fw-bold" : "text-white"
              }`
            }
          >
            Tambah Obat
          </NavLink>
        </li>
      </ul>

      <hr />

      <div className="mt-auto">
        <button
          className="btn btn-outline-light w-100"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("role"); // hapus role juga
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
