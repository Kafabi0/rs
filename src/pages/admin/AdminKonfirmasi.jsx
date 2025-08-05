import { useEffect, useState, useCallback } from "react";

export default function AdminKonfirmasi({ token }) {
  const [konfirmasiList, setKonfirmasiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editKeterangan, setEditKeterangan] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch konfirmasi dengan useCallback supaya stabil
  const fetchKonfirmasi = useCallback(() => {
    setLoading(true);
    fetch("https://be-production-6fef.up.railway.app/api/konfirmasi", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data konfirmasi");
        return res.json();
      })
      .then((data) => {
        setKonfirmasiList(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    fetchKonfirmasi();
  }, [fetchKonfirmasi]);

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditStatus(item.status || "Menunggu");
    setEditKeterangan(item.keterangan || "");
    setError("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setError("");
  };

  const handleSave = async (id) => {
    // Validasi sederhana
    if (!editStatus.trim()) {
      setError("Status harus diisi");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:8080/api/konfirmasi/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: editStatus,
          keterangan: editKeterangan,
          pendaftaran_id: konfirmasiList.find((k) => k.id === id)?.pendaftaran_id,
        }),
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Gagal menyimpan perubahan");
      }
      setEditingId(null);
      fetchKonfirmasi(); // refresh data setelah simpan
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading data konfirmasi...</p>;

  if (error && !editingId) return <p className="text-center mt-5 text-danger">{error}</p>;

  if (konfirmasiList.length === 0)
    return <p className="text-center mt-5">Belum ada data konfirmasi.</p>;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4 text-center">Kelola Konfirmasi Pendaftaran</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Pendaftaran ID</th>
            <th>Status</th>
            <th>Keterangan</th>
            <th>Tanggal Konfirmasi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {konfirmasiList.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.pendaftaran_id}</td>
              <td>
                {editingId === item.id ? (
                  <select
                    className="form-select"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    disabled={saving}
                  >
                    <option value="Menunggu">Menunggu</option>
                    <option value="Dikonfirmasi">Dikonfirmasi</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                ) : (
                  item.status
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <textarea
                    className="form-control"
                    value={editKeterangan}
                    onChange={(e) => setEditKeterangan(e.target.value)}
                    rows={2}
                    disabled={saving}
                  />
                ) : (
                  item.keterangan || "-"
                )}
              </td>
              <td>
                {item.tanggal_konfirmasi
                  ? new Date(item.tanggal_konfirmasi).toLocaleString()
                  : "-"}
              </td>
              <td>
                {editingId === item.id ? (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleSave(item.id)}
                      disabled={saving}
                    >
                      {saving ? "Menyimpan..." : "Simpan"}
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={handleCancelEdit}
                      disabled={saving}
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                )}
                {editingId === item.id && error && (
                  <p className="text-danger mt-1">{error}</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
