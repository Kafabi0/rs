import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navadmin from "../../components/Navadmin";

export default function ListObat() {
  const [dataObat, setDataObat] = useState([]);
  const navigate = useNavigate();

  const getDataObat = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/obat");
      setDataObat(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
      Swal.fire("Gagal", "Tidak bisa mengambil data obat.", "error");
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus?");
    if (!konfirmasi) return;

    try {
      await axios.delete(`http://localhost:8080/api/obat/delete?id=${id}`);
      getDataObat();
      Swal.fire("Berhasil", "Obat dihapus", "success");
    } catch (error) {
      console.error("Gagal menghapus:", error.message);
      Swal.fire("Gagal", `Gagal menghapus obat: ${error.message}`, "error");
    }
  };

  const handleEdit = (obat) => {
    navigate("/admin/editobat", { state: { obat } });
  };

  useEffect(() => {
    getDataObat();
  }, []);

  return (
    <div className="d-flex w-100" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className=" text-white" style={{ width: "250px" }}>
        <Navadmin />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <div className="container">
          <div className="card shadow-lg border-0 animate__animated animate__fadeInUp">
            <div className="card-header bg-success text-white text-center">
              <h4 className="mb-0 fw-bold">📋 Daftar Obat</h4>
            </div>

            <div className="card-body table-responsive">
              <table className="table table-hover align-middle text-center">
                <thead className="table-success text-dark">
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Jenis</th>
                    <th>Stok</th>
                    <th>Harga</th>
                    <th>Kategori</th>
                    <th>Kegunaan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataObat.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-muted text-center">
                        <i>Belum ada data obat</i>
                      </td>
                    </tr>
                  ) : (
                    dataObat.map((obat, index) => (
                      <tr
                        key={obat.ID || obat.id || `${obat.nama}-${obat.jenis}`}
                        className="animate__animated animate__fadeIn"
                      >
                        <td>{index + 1}</td>
                        <td><span className="badge bg-primary">{obat.nama}</span></td>
                        <td>{obat.jenis}</td>
                        <td><span className="badge bg-warning text-dark">{obat.stok}</span></td>
                        <td>Rp {obat.harga.toLocaleString("id-ID")}</td>
                        <td><span className="badge bg-info text-dark">{obat.kategori}</span></td>
                        <td className="text-start">{obat.kegunaan}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => handleEdit(obat)}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(obat.ID || obat.id)}
                            >
                              🗑️ Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
