import { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import Navadmin from "../../components/Navadmin";



export default function DashboardAdmin() {
  // const username = localStorage.getItem("username") || "Pengguna";

  const [pasiens, setPasiens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data pasien saat komponen mount
  useEffect(() => {
    const fetchPasiens = async () => {
      try {
        const res = await fetch("https://be-production-6fef.up.railway.app/pasien");
        if (!res.ok) throw new Error("Gagal mengambil data pasien");
        const data = await res.json();
        setPasiens(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPasiens();
  }, []);

  // Filter pasien berdasarkan kata kunci
  const filteredPasiens = pasiens.filter((p) =>
    p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.jenis_kelamin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.no_telepon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="d-flex"
      style={{ height: "100vh", overflow: "hidden", backgroundColor: "#f8f9fa" }}
    >
<Navadmin/>
      <div className="flex-grow-1 position-relative p-4" style={{ overflowY: "auto" }}>
        {/* Input Pencarian */}
        <div className="container d-flex justify-content-center mb-4 rounded shadow-sm p-3 bg-white" style={{ maxWidth: "900px" }}>
          <div style={{ width: "100%", maxWidth: "400px" }}>
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari berdasarkan nama, alamat, jenis kelamin, atau no telepon..."
            />
          </div>
        </div>

        {/* Welcome Section */}

        {/* Tabel Daftar Pasien */}
        <div className="mt-4 bg-white p-4 rounded shadow" style={{ maxWidth: "900px", margin: "auto" }}>
          <h3 className="mb-3 text-success">Daftar Pasien</h3>

          {loading && <p>Loading data pasien...</p>}
          {error && <p className="text-danger">Error: {error}</p>}

          {!loading && !error && (
            <table className="table table-bordered table-hover">
              <thead className="table-success">
                <tr>
                  <th>Nama</th>
                  <th>Umur</th>
                  <th>Jenis Kelamin</th>
                  <th>Alamat</th>
                  <th>No Telepon</th>
                </tr>
              </thead>
              <tbody>
                {filteredPasiens.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">Tidak ada pasien ditemukan.</td>
                  </tr>
                ) : (
                  filteredPasiens.map((p) => (
                    <tr key={p.id}>
                      <td>{p.nama}</td>
                      <td>{p.umur}</td>
                      <td>{p.jenis_kelamin}</td>
                      <td>{p.alamat}</td>
                      <td>{p.no_telepon}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
