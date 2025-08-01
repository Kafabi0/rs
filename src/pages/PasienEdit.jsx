import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navadmin from "../components/Navadmin";

export default function PasienEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    umur: "",
    jenis_kelamin: "",
    alamat: "",
    no_telepon: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8080/admin/pasien/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      umur: Number(form.umur), // konversi string ke number
    };

    const res = await fetch(`http://localhost:8080/admin/pasien/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Gagal update pasien:", errorText);
      alert("Gagal update pasien, cek console");
      return;
    }

    navigate("/admin/pasien");
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Navadmin />

      {/* Main content */}
      <div
        className="container mt-4"
        style={{ marginLeft: "250px", maxWidth: "600px" }}
      >
        <h2>Edit Pasien</h2>
        <form onSubmit={handleSubmit}>
          <InputPasien form={form} handleChange={handleChange} />
          <button type="submit" className="btn btn-primary">
            Update
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
