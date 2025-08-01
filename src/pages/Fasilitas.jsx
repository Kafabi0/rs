import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroFasilitas from "../components/HeroFasilitas";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Fasilitas() {
  useEffect(() => {
    Aos.init({
      duration: 800, // durasi animasi dalam ms
      easing: "ease-in-out",
      once: false, // animasi hanya sekali saat scroll ke bawah
      mirror: true,
    });
  }, []);
  return (
    <>
      <Navbar />
      <HeroFasilitas />
      <section className="container mt-5 mb-5" data-aos="zoom-in-up">
        <h2 className="text-center text-primary fw-bold mb-4">
          🏥 Fasilitas Rumah Sakit
        </h2>

        <div className="row g-4">
          {/* Fasilitas 1 */}
          <div className="col-md-4">
            <div className="card shadow h-100">
              <img src="/assets/igd.png" className="card-img-top" alt="IGD" />
              <div className="card-body">
                <h5 className="card-title fw-semibold text-primary">
                  Instalasi Gawat Darurat (IGD)
                </h5>
                <p className="card-text">
                  Layanan darurat 24 jam dengan tenaga medis profesional.
                </p>
              </div>
            </div>
          </div>

          {/* Fasilitas 2 */}
          <div className="col-md-4">
            <div className="card shadow h-100">
              <img
                src="/assets/operasi.png"
                className="card-img-top"
                alt="Ruang Operasi"
              />
              <div className="card-body">
                <h5 className="card-title fw-semibold text-primary">
                  Ruang Operasi
                </h5>
                <p className="card-text">
                  Dilengkapi peralatan modern dan sistem sterilisasi mutakhir.
                </p>
              </div>
            </div>
          </div>

          {/* Fasilitas 3 */}
          <div className="col-md-4">
            <div className="card shadow h-100">
              <img
                src="/assets/labor.png"
                className="card-img-top"
                alt="Laboratorium"
              />
              <div className="card-body">
                <h5 className="card-title fw-semibold text-primary">
                  Laboratorium
                </h5>
                <p className="card-text">
                  Pemeriksaan lengkap dan akurat untuk diagnosis yang tepat.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow h-100">
              <img src="/assets/rawat.png" className="card-img-top" alt="IGD" />
              <div className="card-body">
                <h5 className="card-title fw-semibold text-primary">
                  Ruang Rawat Inap
                </h5>
                <p className="card-text">
                  Kamar nyaman dengan fasilitas lengkap untuk pemulihan pasien.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
