import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function RawatInapForm() {
  const [nama, setNama] = useState("");
  const [keluhan, setKeluhan] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // untuk notif sukses

  // Ambil nama user dari localStorage saat komponen mount
  useEffect(() => {
    const username = localStorage.getItem("username") || "";
    setNama(username);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/rawat-inap", {
        user_id: 1,
        nama_pasien: nama,
        keluhan: keluhan,
      });

      setKeluhan("");
      setShowSuccess(true); // tampilkan notifikasi sukses

      // sembunyikan notif setelah 3 detik
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      alert("❌ Gagal mengirim data!");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Form Pengajuan Rawat Inap</h5>
              </div>
              <div className="card-body">
                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label className="form-label ">Nama Pasien</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nama}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Keluhan</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={keluhan}
                      onChange={(e) => setKeluhan(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    Ajukan Rawat Inap
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifikasi sukses */}
      {showSuccess && (
        <div className="success-notif">
          ✅ Pengajuan rawat inap berhasil!
        </div>
      )}

      {/* CSS styles untuk animasi notifikasi */}
      <style jsx>{`
        .success-notif {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #28a745;
          color: white;
          padding: 20px 30px;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          font-size: 18px;
          font-weight: 600;
          animation: fadein 0.5s, fadeout 0.5s 2.5s;
          z-index: 9999;
        }

        @keyframes fadein {
          from {
            opacity: 0;
            transform: translate(-50%, -60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        @keyframes fadeout {
          from {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
        }
      `}</style>
    </>
  );
}
