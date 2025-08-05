import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../RiwayatPendaftaran.css";

export default function RiwayatPendaftaran({ token }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://be-production-6fef.up.railway.app/api/pendaftaran", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => b.id - a.id);
        setList(sortedData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  if (loading)
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading Data pendaftaran...</p>
        </div>
      </>
    );

  if (list.length === 0)
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <h2>Riwayat Pendaftaran</h2>
          <p className="text-muted">Tidak ada Data pendaftaran.</p>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <h2 className="mb-4 text-center">
          Data Seluruh Pendaftaran Konsultasi dan Pemeriksaan
        </h2>
        <div className="row">
          {/* Kolom Konsultasi */}
          <div className="col-12 col-md-6 mb-4">
            <h5 className="text-center mb-3 text-primary">Konsultasi</h5>
            <div className="scroll-container">
              {list
                .filter((item) => item.jenis.toLowerCase() === "konsultasi")
                .map((item, index) => (
                  <div
                    key={item.id}
                    className="card mb-3 shadow-sm animate-card"
                    style={{
                      borderRadius: "12px",
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5
                          className="card-title mb-0 text-truncate"
                          title={item.nama}
                        >
                          {item.nama}
                        </h5>
                        <small className="text-muted">
                          {new Date(item.tanggal).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </small>
                      </div>
                      <p className="card-text mb-1">
                        <strong>Kategori:</strong> {item.kategori}
                      </p>
                      <small
                        className="text-muted d-block text-truncate"
                        title={item.email}
                      >
                        Email: {item.email}
                      </small>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Kolom Pemeriksaan */}
          <div className="col-12 col-md-6 mb-4">
            <h5 className="text-center mb-3 text-success">Pemeriksaan</h5>
            <div className="scroll-container">
              {list
                .filter((item) => item.jenis.toLowerCase() === "pemeriksaan")
                .map((item, index) => (
                  <div
                    key={item.id}
                    className="card mb-3 shadow-sm animate-card"
                    style={{
                      borderRadius: "12px",
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5
                          className="card-title mb-0 text-truncate"
                          title={item.nama}
                        >
                          {item.nama}
                        </h5>
                        <small className="text-muted">
                          {new Date(item.tanggal).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </small>
                      </div>
                      <p className="card-text mb-1">
                        <strong>Kategori:</strong> {item.kategori}
                      </p>
                      <small
                        className="text-muted d-block text-truncate"
                        title={item.email}
                      >
                        Email: {item.email}
                      </small>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scroll-container {
          max-height: 70vh;
          overflow-y: auto;
          padding-right: 10px;
        }

        .animate-card {
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .scroll-container {
            max-height: unset;
          }
        }
      `}</style>
    </>
  );
}
