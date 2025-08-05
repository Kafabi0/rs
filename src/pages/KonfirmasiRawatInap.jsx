import React from "react";
import axios from "axios";
export default function KonfirmasiRawatInap({ request }) {
  const handleSetujui = async () => {
    const res = await axios.post(`https://be-production-6fef.up.railway.app/api/inap/${request.id}/setujui`);
    window.location.href = res.data.payment_url; // langsung ke payment
  };

  const handleTolak = async () => {
    await axios.post(`https://be-production-6fef.up.railway.app/api/inap/${request.id}/tolak`);
    alert("Anda menolak tawaran rawat inap.");
  };

  return (
    <div>
      <h3>Konfirmasi Rawat Inap</h3>
      <p>Ruangan: {request.ruangan}</p>
      <p>Biaya: Rp{request.biaya}</p>
      <button onClick={handleSetujui}>Setujui & Bayar</button>
      <button onClick={handleTolak}>Tolak</button>
    </div>
  );
}
