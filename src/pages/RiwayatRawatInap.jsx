import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function RiwayatRawatInap() {
  const [rawats, setRawats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      setError("User belum login.");
      return;
    }

    axios
      .get(`https://be-production-6fef.up.railway.app/api/rawat-inap/nama_pasien/${username}`)
      .then((res) => setRawats(res.data))
      .catch(() => setError("Gagal ambil data rawat inap"));
  }, []);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <div className="alert alert-danger">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Semua Data Rawat Inap</h2>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nama Pasien</th>
                {/* <th>Tanggal Masuk</th> */}
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
                    <td>{rawat.id}</td>
                    <td>{rawat.nama_pasien || "Tidak diketahui"}</td>
                    {/* <td>{new Date(rawat.tanggal_masuk).toLocaleDateString()}</td> */}
                    <td>{rawat.keluhan}</td>
                    <td>{rawat.ruangan || "-"}</td>
                    <td>
                      {rawat.biaya ? `Rp ${rawat.biaya.toLocaleString()}` : "-"}
                    </td>
                    <td>
                      <span
                        className={`badge ${
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
                  <td colSpan="7" className="text-center text-muted">
                    Belum ada data rawat inap
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
