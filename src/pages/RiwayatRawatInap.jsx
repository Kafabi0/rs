import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function RiwayatRawatInap() {
  const [rawats, setRawats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      setError("🔒 Anda belum login.");
      return;
    }

    axios
      .get(`https://be-production-6fef.up.railway.app/api/rawat-inap/nama_pasien/${username}`)
      .then((res) => setRawats(res.data))
      .catch(() => setError("❌ Gagal mengambil data rawat inap."));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4 text-primary fw-bold">
          📋 Riwayat Rawat Inap
        </h2>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {!error && (
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-primary sticky-top">
                <tr>
                  <th className="text-center">ID</th>
                  <th>Nama Pasien</th>
                  <th>Keluhan</th>
                  <th>Ruangan</th>
                  <th>Biaya</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rawats.length > 0 ? (
                  rawats.map((rawat) => (
                    <tr key={rawat.id}>
                      <td className="text-center">{rawat.id}</td>
                      <td>{rawat.nama_pasien || "-"}</td>
                      <td>{rawat.keluhan || "-"}</td>
                      <td>{rawat.ruangan || "Tunggu Konfirmasi dari admin dulu ya😊"}</td>
                      <td>
                        {rawat.biaya
                          ? `Rp ${rawat.biaya.toLocaleString("id-ID")}`
                          : "Tunggu Konfirmasi dari admin dulu ya😊"}
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge rounded-pill px-3 py-2 fw-semibold ${
                            rawat.status === "disetujui"
                              ? "bg-success"
                              : rawat.status === "ditolak"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {rawat.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      Tidak ada pengajuan rawat inap.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tambahkan styling responsif tambahan */}
      <style>{`
        table {
          font-size: 0.95rem;
        }
        @media (max-width: 576px) {
          table {
            font-size: 0.85rem;
          }
          th, td {
            padding: 0.5rem !important;
          }
          .badge {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}
