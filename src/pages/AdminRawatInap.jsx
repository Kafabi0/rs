import React, { useEffect, useState } from "react";
import axios from "axios";
import Navadmin from "../components/Navadmin";

export default function AdminRawatInap() {
  const [rawats, setRawats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    ruangan: "",
    biaya: 0,
    status: "disetujui",
    tanggal_masuk: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRawatInap();
  }, []);

  const fetchRawatInap = () => {
    axios
      .get("https://be-production-6fef.up.railway.app/api/rawat-inap")
      .then((res) => setRawats(res.data))
      .catch(() => setError("Gagal ambil data rawat inap"));
  };

  const handleSelect = (rawat) => {
    setSelected(rawat);
    setForm({
      ruangan: rawat.ruangan || "",
      biaya: rawat.biaya || 0,
      status: rawat.status || "disetujui",
      tanggal_masuk: rawat.tanggal_masuk
        ? rawat.tanggal_masuk.split("T")[0]
        : "",
    });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "biaya" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected) return;

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8080/api/rawat-inap/${selected.id}/konfirmasi`,
        form
      );

      setRawats(
        rawats.map((r) => (r.id === selected.id ? { ...r, ...form } : r))
      );
      alert("Konfirmasi berhasil!");
      setSelected(null);
    } catch {
      setError("Gagal update konfirmasi");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Navadmin />

      <div style={{ flex: 1, padding: "30px", background: "#f7f9fc" }}>
        <h2 style={{ marginBottom: "20px" }}>Admin Rawat Inap - Konfirmasi</h2>

        {error && (
          <div
            style={{
              color: "#721c24",
              backgroundColor: "#f8d7da",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "30px" }}>
          {/* Tabel */}
          <div style={{ flex: 2 }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#fff",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
                <tr>
                  <th style={th}>ID</th>
                  <th style={th}>Nama Pasien</th>
                  {/* <th style={th}>Tanggal Masuk</th> */}
                  <th style={th}>Ruangan</th>
                  <th style={th}>Biaya</th>
                  <th style={th}>Status</th>
                  <th style={th}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rawats.map((rawat) => (
                  <tr key={rawat.id}>
                    <td style={td}>{rawat.id}</td>
                    <td style={td}>{rawat.nama_pasien}</td>
                    {/* <td style={td}>
                      {rawat.tanggal_masuk
                        ? new Date(rawat.tanggal_masuk).toLocaleDateString()
                        : "-"}
                    </td> */}
                    <td style={td}>{rawat.ruangan || "-"}</td>
                    <td style={td}>
                      {rawat.biaya
                        ? `Rp ${rawat.biaya.toLocaleString()}`
                        : "-"}
                    </td>
                    <td style={td}>{rawat.status}</td>
                    <td style={td}>
                      {rawat.status === "menunggu" ? (
                        <button style={btnPrimary} onClick={() => handleSelect(rawat)}>
                          Konfirmasi
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Form */}
          {selected && (
            <div
              style={{
                flex: 1,
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 0 8px rgba(0,0,0,0.05)",
              }}
            >
              <h3>Konfirmasi ID: {selected.id}</h3>
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px", marginTop: 10 }}>
                <div>
                  <label>Ruangan:</label>
                  <input
                    type="text"
                    name="ruangan"
                    value={form.ruangan}
                    onChange={handleChange}
                    required
                    style={input}
                  />
                </div>
                <div>
                  <label>Biaya:</label>
                  <input
                    type="number"
                    name="biaya"
                    value={form.biaya}
                    onChange={handleChange}
                    required
                    style={input}
                  />
                </div>
                <div>
                  <label>Tanggal Masuk:</label>
                  <input
                    type="date"
                    name="tanggal_masuk"
                    value={form.tanggal_masuk}
                    onChange={handleChange}
                    required
                    style={input}
                  />
                </div>
                <div>
                  <label>Status:</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    style={input}
                  >
                    <option value="disetujui">Disetujui</option>
                    <option value="ditolak">Ditolak</option>
                  </select>
                </div>
                <div style={{ marginTop: 10 }}>
                  <button type="submit" disabled={loading} style={btnPrimary}>
                    {loading ? "Menyimpan..." : "Simpan"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    style={btnSecondary}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Styling helpers
const th = {
  padding: "10px",
  textAlign: "left",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const input = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginTop: "4px",
};

const btnPrimary = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "10px",
};

const btnSecondary = {
  backgroundColor: "#6c757d",
  color: "#fff",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
