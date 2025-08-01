// src/pages/PasienList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navadmin from "../components/Navadmin";
import SearchInput from "../components/SearchInput"; // Komponen search input terpisah

export default function PasienList() {
  const [pasiens, setPasiens] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPasiens = async () => {
    const res = await fetch("http://localhost:8080/admin/pasien");
    const data = await res.json();
    setPasiens(data);
  };

  useEffect(() => {
    fetchPasiens();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pasien ini?")) {
      await fetch(`http://localhost:8080/admin/pasien/${id}`, {
        method: "DELETE",
      });
      fetchPasiens();
    }
  };

  // Filter pasien sesuai searchTerm (nama, alamat, no_telepon)
  const filteredPasiens = pasiens.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.jenis_kelamin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.no_telepon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Navadmin />

      {/* Main content */}
      <div
        className="container-fluid"
        style={{ padding: "20px", maxWidth: "900px" }}
      >
        <h2 className="mb-3">Daftar Pasien</h2>
        <Link to="/admin/pasien/create" className="btn btn-success mb-3">
          Tambah Pasien
        </Link>

        {/* Search Input */}
        <div className="mb-3" style={{ maxWidth: "400px" }}>
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari berdasarkan nama, alamat, atau no telepon..."
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-success">
              <tr>
                <th>Nama</th>
                <th>Umur</th>
                <th>Jenis Kelamin</th>
                <th>Alamat</th>
                <th>No Telepon</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPasiens.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    Tidak ada data pasien.
                  </td>
                </tr>
              ) : (
                filteredPasiens.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nama}</td>
                    <td>{p.umur}</td>
                    <td>{p.jenis_kelamin}</td>
                    <td>{p.alamat}</td>
                    <td>{p.no_telepon}</td>
                    <td>
                      <Link
                        to={`/admin/pasien/edit/${p.id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
