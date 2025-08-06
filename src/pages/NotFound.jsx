import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center px-3"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e6f2ff, #ffffff)",
        color: "#005d8f",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <img
        src="../public/assets/404.png"
        alt="Hospital 404"
        style={{ maxWidth: "350px", marginBottom: "20px" }}
      />
      <h1 className="display-4 fw-bold">404 - Halaman Tidak Ditemukan</h1>
      <p className="lead" style={{ maxWidth: "500px" }}>
        Maaf, halaman yang Anda cari tidak tersedia. Mungkin sudah dipindahkan
        atau tidak pernah ada. Silakan kembali ke halaman utama untuk melanjutkan.
      </p>
      <Link to="/" className="btn btn-primary mt-4 px-4 py-2 shadow-sm rounded-pill">
        🔙 Kembali ke Beranda
      </Link>
    </div>
  );
}
