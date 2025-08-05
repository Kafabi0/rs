import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

export default function RawatInapForm() {
  const [nama, setNama] = useState("");
  const [keluhan, setKeluhan] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username") || "";
    setNama(username);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://be-production-6fef.up.railway.app/api/rawat-inap", {
        user_id: 1, // ganti sesuai dengan login user_id
        nama_pasien: nama,
        keluhan: keluhan,
      });

      setKeluhan("");

      Swal.fire({
        icon: "success",
        title: "✅ Pengajuan Berhasil!",
        text: "Pengajuan rawat inap Anda telah terkirim. Silakan tunggu konfirmasi dari pihak rumah sakit.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-border-radius',
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "❌ Gagal Mengirim",
        text: "Terjadi kesalahan saat mengirim data rawat inap. Silakan coba lagi.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-header bg-primary text-white rounded-top-4">
                <h5 className="mb-0 text-center">🛏️ Form Pengajuan Rawat Inap</h5>
              </div>
              <div className="card-body p-4">
                <form onSubmit={submit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={nama}
                      readOnly
                      placeholder="Nama Pasien"
                    />
                    <label>Nama Pasien</label>
                  </div>

                  <div className="form-floating mb-4">
                    <textarea
                      className="form-control"
                      rows="4"
                      value={keluhan}
                      onChange={(e) => setKeluhan(e.target.value)}
                      placeholder="Tuliskan keluhan Anda di sini..."
                      required
                      style={{ height: "120px" }}
                    ></textarea>
                    <label>Keluhan</label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold shadow-sm"
                  >
                    Kirim Pengajuan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styling Swal untuk radius yang lembut */}
      <style>{`
        .swal2-border-radius {
          border-radius: 16px !important;
        }
      `}</style>
    </>
  );
}
