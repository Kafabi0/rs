import { useEffect, useState } from "react";

export default function AdminPendaftaran({ token }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    open: false,
    id: null,
    ruangan: "",
    waktu: "",
  });
  const [msg, setMsg] = useState("");

  const fetchData = () => {
    setLoading(true);
    fetch("http://localhost:8080/api/pendaftaran", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (id) => {
    setModal({ open: true, id, ruangan: "", waktu: "" });
    setMsg("");
  };

  const handleKonfirmasi = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/pendaftaran/${modal.id}/konfirmasi`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ruangan: modal.ruangan,
            waktu_pertemuan: modal.waktu,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMsg("Berhasil konfirmasi");
        setModal({ open: false, id: null, ruangan: "", waktu: "" });
        fetchData();
      } else {
        setMsg(data.message || "Gagal konfirmasi");
      }
    } catch (err) {
      setMsg("Terjadi kesalahan: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Admin: Daftar Pendaftaran</h2>
      <ul>
        {list.map((item) => (
          <li
            key={item.id}
            style={{ borderBottom: "1px solid #ccc", padding: 10 }}
          >
            <b>{item.nama}</b> - {item.jenis} - {item.tanggal}
            <br />
            Status: {item.konfirmasi ? "Dikonfirmasi" : "Menunggu"}
            <br />
            {item.konfirmasi && (
              <>
                Ruangan: {item.ruangan || "-"}
                <br />
                Jadwal: {item.waktu_pertemuan || "-"}
              </>
            )}
            {!item.konfirmasi && (
              <button
                onClick={() => openModal(item.id)}
                style={{ marginTop: 5 }}
              >
                Konfirmasi & Jadwalkan
              </button>
            )}
          </li>
        ))}
      </ul>

      {modal.open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 8,
              width: 300,
            }}
          >
            <h3>Konfirmasi dan Jadwalkan</h3>
            <input
              placeholder="Ruangan"
              value={modal.ruangan}
              onChange={(e) =>
                setModal((m) => ({ ...m, ruangan: e.target.value }))
              }
              style={{ width: "100%", marginBottom: 10 }}
            />
            <input
              type="datetime-local"
              value={modal.waktu}
              onChange={(e) =>
                setModal((m) => ({ ...m, waktu: e.target.value }))
              }
              style={{ width: "100%", marginBottom: 10 }}
            />
            <button onClick={handleKonfirmasi} style={{ marginRight: 10 }}>
              Simpan
            </button>
            <button
              onClick={() =>
                setModal({ open: false, id: null, ruangan: "", waktu: "" })
              }
            >
              Batal
            </button>
            {msg && <p>{msg}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
