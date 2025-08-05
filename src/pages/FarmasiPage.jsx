import { useState, useEffect } from "react";
import ObatCard from "../components/ObatCard";
import Navbar from "../components/Navbar";
import HeroFarmasi from "../components/HeroFarmasi";
import "../farmasi.css";

export default function FarmasiPage() {
  const [search, setSearch] = useState("");
  const [selectedKategori, setSelectedKategori] = useState(null);
  const [obatList, setObatList] = useState([]);
  const [loading, setLoading] = useState(true);

  const kategoriList = [
    { id: 1, nama: "Obat Umum", gambar: "../assets/umum.png" },
    { id: 2, nama: "Obat Gigi", gambar: "../assets/gigi2.png" },
    { id: 3, nama: "Obat Anak", gambar: "../assets/anak.png" },
    { id: 4, nama: "Obat Jantung", gambar: "../assets/jantung.png" },
    { id: 5, nama: "Obat Kulit", gambar: "../assets/kulit.png" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    fetch("https://be-production-6fef.up.railway.app/api/obat")
      .then((res) => res.json())
      .then((data) => {
        setObatList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch data:", err);
        setLoading(false);
      });
  };

  const filteredObat = obatList.filter(
    (obat) =>
      (!selectedKategori || obat.kategori === selectedKategori) &&
      obat.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <HeroFarmasi />
      <div className="container mt-4">
        {!selectedKategori ? (
          <>
            <h2 className="text-success mb-4">Pilih Kategori Obat</h2>
            <div className="row">
              {kategoriList.map((kategori) => (
                <div
                  className="col-md-4 mb-4"
                  key={kategori.id}
                  onClick={() => setSelectedKategori(kategori.nama)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card h-100 kategori-card shadow-sm border-0">
                    <img
                      src={kategori.gambar}
                      className="card-img-top"
                      alt={kategori.nama}
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{kategori.nama}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="text-success">Kategori: {selectedKategori}</h2>
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  setSelectedKategori(null);
                  setSearch("");
                }}
              >
                Kembali ke Kategori
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Cari nama obat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="row">
                {filteredObat.length > 0 ? (
                  filteredObat.map((obat) => (
                    <div className="col-md-4 mb-4" key={obat.id}>
                      <ObatCard data={obat} />
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p className="text-muted">
                      Tidak ditemukan obat pada kategori ini.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
