import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select"; // <-- Import React Select
import Navadmin from "../../components/Navadmin";

export default function AdminFarmasi() {
  const [form, setForm] = useState({
    nama: "",
    jenis: "",
    stok: "",
    harga: "",
    kegunaan: "",
    kategori: "",
  });

  // Opsi kategori untuk React Select
  const kategoriOptions = [
    { value: "Obat Umum", label: "Obat Umum" },
    { value: "Obat Gigi", label: "Obat Gigi" },
    { value: "Obat Anak", label: "Obat Anak" },
    { value: "Obat Jantung", label: "Obat Jantung" },
    { value: "Obat Kulit", label: "Obat Kulit" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stok = parseInt(form.stok, 10);
    const harga = parseInt(form.harga, 10);

    if (isNaN(stok) || stok < 1) {
      Swal.fire("Error", "Stok minimal 1", "error");
      return;
    }

    if (isNaN(harga) || harga < 1) {
      Swal.fire("Error", "Harga minimal Rp 1", "error");
      return;
    }

    const dataToSend = { ...form, stok, harga };

    try {
      await axios.post("https://be-production-6fef.up.railway.app/api/obat", dataToSend);
      Swal.fire("Berhasil", "Obat berhasil ditambahkan", "success");

      setForm({
        nama: "",
        jenis: "",
        stok: "",
        harga: "",
        kegunaan: "",
        kategori: "",
      });
    } catch (error) {
      Swal.fire("Gagal", "Terjadi kesalahan saat menyimpan", "error");
      console.error(error);
    }
  };

  return (
    <div className="d-flex w-100" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="bg-success text-white" style={{ width: "250px" }}>
        <Navadmin />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <div className="container">
          <div className="card shadow border-0 animate__animated animate__fadeIn">
            <div className="card-header bg-success text-white text-center">
              <h4 className="mb-0">Tambah Data Obat</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Nama, Jenis, Stok, Harga */}
                  {[
                    { label: "Nama Obat", name: "nama" },
                    { label: "Jenis Obat", name: "jenis" },
                    {
                      label: "Stok",
                      name: "stok",
                      type: "number",
                      min: 1,
                      placeholder: "Minimal 1",
                    },
                    {
                      label: "Harga",
                      name: "harga",
                      type: "number",
                      min: 1,
                      placeholder: "Minimal Rp 1",
                    },
                  ].map((field, idx) => (
                    <div className="col-md-6 mb-3" key={idx}>
                      <label className="form-label">{field.label}</label>
                      <input
                        name={field.name}
                        type={field.type || "text"}
                        value={form[field.name]}
                        onChange={handleChange}
                        className="form-control"
                        required
                        min={field.min}
                        placeholder={field.placeholder || ""}
                      />
                    </div>
                  ))}

                  {/* React Select Kategori */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Kategori</label>
                    <Select
                      options={kategoriOptions}
                      value={kategoriOptions.find(
                        (opt) => opt.value === form.kategori
                      )}
                      onChange={(selected) =>
                        setForm((prev) => ({
                          ...prev,
                          kategori: selected ? selected.value : "",
                        }))
                      }
                      placeholder="Pilih Kategori"
                      isClearable
                    />
                  </div>

                  {/* Textarea Kegunaan */}
                  <div className="col-12 mb-3">
                    <label className="form-label">Kegunaan</label>
                    <textarea
                      name="kegunaan"
                      value={form.kegunaan}
                      onChange={handleChange}
                      className="form-control"
                      rows="3"
                      required
                      placeholder="Contoh: Mengatasi tekanan darah tinggi..."
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Simpan Obat
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
