import { useEffect, useState } from "react";
import axios from "axios";

export default function DaftarRawatInapUser() {
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8080/api/rawat-inap");
    setList(res.data.filter((i) => i.user_id === 1)); // Ganti sesuai login
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setujui = async (id) => {
    await axios.put(`http://localhost:8080/api/rawat-inap/${id}/setujui`);
    alert("Disetujui, lanjutkan ke pembayaran.");
    fetchData();
  };

  return (
    <div>
      <h4>Status Pengajuan</h4>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.nama_pasien} - {item.keluhan} - Status: <b>{item.status}</b>
            {item.status === "Dikonfirmasi" && (
              <>
                <p>Ruangan: {item.ruangan} | Biaya: Rp{item.biaya}</p>
                <button className="btn btn-success" onClick={() => setujui(item.id)}>
                  Setujui & Bayar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
