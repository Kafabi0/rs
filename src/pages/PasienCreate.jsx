import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navadmin from "../components/Navadmin";

export default function PasienCreate() {
  const [form, setForm] = useState({
    nama: "",
    umur: "",
    jenis_kelamin: "",
    alamat: "",
    no_telepon: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Khusus untuk umur batasi maksimal 2 digit angka
    if (name === "umur") {
      // Hanya angka dan maksimal 2 digit
      if (value === "" || (/^\d{0,2}$/.test(value) && Number(value) <= 99)) {
        setForm({ ...form, [name]: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token tidak ditemukan. Silakan login ulang.");
        return;
      }

      const payload = {
        ...form,
        umur: Number(form.umur),
      };

      const res = await fetch("http://localhost:8080/api/admin/pasien/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.text();
        console.error("Gagal tambah pasien:", errorData);
        alert("Gagal tambah pasien, cek console");
        return;
      }

      navigate("/admin/pasien");
    } catch (error) {
      console.error("Error saat submit:", error);
      alert("Error koneksi ke server");
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Navadmin />

      {/* Main content */}
      <div className="container mt-4" style={{ maxWidth: "600px" }}>
        <h2>Tambah Pasien</h2>
        <form onSubmit={handleSubmit}>
          <InputPasien form={form} handleChange={handleChange} />
          <button type="submit" className="btn btn-success">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

function InputPasien({ form, handleChange }) {
  return (
    <>
      <div className="mb-3">
        <label>Nama</label>
        <input
          className="form-control"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Umur</label>
        <input
          className="form-control"
          type="number"
          name="umur"
          value={form.umur}
          onChange={handleChange}
          max="99"
          required
        />
      </div>
      <div className="mb-3">
        <label>Jenis Kelamin</label>
        <select
          className="form-control"
          name="jenis_kelamin"
          value={form.jenis_kelamin}
          onChange={handleChange}
          required
        >
          <option value="">Pilih</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Alamat</label>
        <input
          className="form-control"
          name="alamat"
          value={form.alamat}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>No Telepon</label>
        <input
          className="form-control"
          name="no_telepon"
          value={form.no_telepon}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
}
