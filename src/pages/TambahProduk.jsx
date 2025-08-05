import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function TambahProduk() {
  const [form, setForm] = useState({
    nama_produk: "",
    harga: "",
    kategori: "",
    stok: "",
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Harap pilih gambar produk");
      return;
    }

    const formData = new FormData();
    formData.append("nama_produk", form.nama_produk);
    formData.append("harga", parseInt(form.harga));
    formData.append("kategori", form.kategori);
    formData.append("stok", parseInt(form.stok));
    formData.append("gambar", file);

    try {
      await axios.post("https://be-production-6fef.up.railway.app/api/produk/tambah", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Produk berhasil ditambahkan");
      navigate("/produk");
    } catch (err) {
      alert("Gagal tambah produk: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="w-100">
      <Navbar />

      <div className="d-flex flex-column align-items-center mt-4">
        <h3 className="mb-3">Tambah Produk</h3>

        <div className="bg-light p-4 rounded shadow w-100" style={{ maxWidth: "500px" }}>
          <input
            className="form-control mb-3"
            placeholder="Nama Produk"
            value={form.nama_produk}
            onChange={(e) => setForm({ ...form, nama_produk: e.target.value })}
          />
          <input
            className="form-control mb-3"
            type="number"
            placeholder="Harga"
            value={form.harga}
            onChange={(e) => setForm({ ...form, harga: e.target.value })}
          />
          <input
            className="form-control mb-3"
            placeholder="Kategori"
            value={form.kategori}
            onChange={(e) => setForm({ ...form, kategori: e.target.value })}
          />
          <input
            className="form-control mb-3"
            type="number"
            placeholder="Stok"
            value={form.stok}
            onChange={(e) => setForm({ ...form, stok: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            className="form-control mb-3"
            onChange={handleFileChange}
          />
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            Tambah Produk
          </button>
        </div>
      </div>
    </div>
  );
}
