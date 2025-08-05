import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import HeroResep from "../components/HeroResep";
import Footer from "../components/Footer";

export default function HalamanPendaftaran() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    gender: "",
    jenis: "konsultasi",
    kategori: "Umum",
    tanggal: "",
    catatan: "",
  });

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split("T")[0]; // yyyy-mm-dd
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: "Konfirmasi Pendaftaran",
      text: "Apakah Anda yakin semua data sudah benar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Kirim",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await axios.post(
        "https://be-production-6fef.up.railway.app/api/pendaftaran",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          icon: "success",
          title: "Pendaftaran Berhasil!",
          text: "Tunggu pemberitahuan selanjutnya.",
          timer: 3000,
          showConfirmButton: false,
        });

        setFormData({
          nama: "",
          email: "",
          gender: "",
          jenis: "konsultasi",
          kategori: "Umum",
          tanggal: "",
          catatan: "",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal Mendaftar",
        text: "❌ Terjadi kesalahan saat mengirim data.",
      });
    }
  };

  return (
    <>
      <Navbar />
      <HeroResep />

      <div className="container py-5">
        <h2 className="mb-4 text-center fw-bold text-primary">
          📝 Formulir Pendaftaran
        </h2>

        <form
          onSubmit={handleSubmit}
          className="shadow-lg p-4 p-md-5 bg-white rounded-4 border border-light-subtle"
        >
          <div className="row g-4">
            <div className="col-md-6 col-12">
              <label className="form-label fw-semibold">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="form-control"
                placeholder="Masukkan nama lengkap Anda"
                required
              />
            </div>

            <div className="col-md-6 col-12">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="contoh@email.com"
                required
              />
            </div>

            <div className="col-md-6 col-12">
              <label className="form-label fw-semibold">Jenis Kelamin</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div className="col-md-6 col-12">
              <label className="form-label fw-semibold">Jenis Pendaftaran</label>
              <select
                name="jenis"
                value={formData.jenis}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="konsultasi">Konsultasi</option>
                <option value="pemeriksaan">Pemeriksaan</option>
              </select>
            </div>

            <div className="col-md-6 col-12">
              <label className="form-label fw-semibold">Kategori</label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="Umum">Umum</option>
                <option value="Gigi">Gigi</option>
                <option value="Jantung">Jantung</option>
                <option value="Anak">Anak</option>
                <option value="Kulit">Kulit</option>
              </select>
            </div>

            <div className="col-md-6 col-12">
              <label className="form-label fw-semibold">Tanggal Kunjungan</label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="form-control"
                required
                min={getTomorrowDate()}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Catatan Tambahan</label>
              <textarea
                name="catatan"
                value={formData.catatan}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Tuliskan jika ada keluhan atau informasi tambahan..."
              ></textarea>
            </div>
          </div>

          <div className="text-end mt-4">
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 rounded-3 fw-semibold shadow-sm w-100 w-md-auto"
            >
              Kirim Pendaftaran
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}
