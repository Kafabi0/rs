import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Maintenance() {
  const [timeLeft, setTimeLeft] = useState(3600); // dalam detik (1 jam)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    alert(`📧 Kami akan menghubungi Anda di ${email} saat sistem kembali online.`);
    e.target.reset();
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center px-4"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #eaf8ff, #ffffff)",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#00778B",
      }}
    >
      <div className="heartbeat mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
          alt="Maintenance Icon"
          style={{ width: "140px" }}
        />
      </div>

      <h1 className="fw-bold display-5 mb-2">Sistem Sedang Dalam Pemeliharaan</h1>
      <p className="lead mb-3">
        Kami sedang melakukan peningkatan sistem agar pelayanan lebih baik.
      </p>

      <div className="mb-4">
        <h5 className="text-muted">
          Estimasi kembali online dalam: <br />
          <span className="fw-bold fs-4 text-dark">{formatTime(timeLeft)}</span>
        </h5>
      </div>

      {/* Form Notifikasi Email */}
      <form onSubmit={handleSubscribe} className="w-100" style={{ maxWidth: "400px" }}>
        <div className="input-group mb-3">
          <input
            name="email"
            type="email"
            required
            className="form-control"
            placeholder="Masukkan email Anda"
          />
          <button className="btn btn-primary" type="submit">
            Beri Tahu Saya
          </button>
        </div>
      </form>

      <Link to="/" className="btn btn-outline-secondary mt-2">
        Kembali ke Beranda
      </Link>

      <p className="mt-4 text-muted small">© {new Date().getFullYear()} Rumah Sakit Sehat Sentosa</p>

      {/* Animasi detak jantung */}
      <style>{`
        .heartbeat {
          animation: heartbeat 1.5s infinite;
        }

        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.3); }
          28% { transform: scale(1); }
          42% { transform: scale(1.3); }
          70% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
