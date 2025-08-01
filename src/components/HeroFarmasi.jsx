import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HeroFarmasi() {
    useEffect(() => {
        AOS.init({
          duration: 800, // durasi animasi dalam ms
          easing: "ease-in-out",
          once: false, // animasi hanya sekali saat scroll ke bawah
          mirror: true,
        });
      }, []);
  return (
    <section
      className="d-flex align-items-center"
      style={{ minHeight: "80vh", padding: "0 2rem" }}
    >
      <div className="container d-flex flex-column flex-lg-row align-items-center gap-5">
        <div className="text-center text-lg-start" style={{ maxWidth: 500 }}>
          <h1 className="display-4 fw-bold text-primary" data-aos="fade-right">
            Pilihan Obat di Farmasi <br /> Yang Lengkap dan Terpercaya
          </h1>
          <p className="lead text-secondary my-4" data-aos="fade-right">
            <strong className="text-black">RS Sehat Sentosa </strong> hadir memberikan pelayanan kesehatan terbaik dengan teknologi modern dan tenaga medis berpengalaman.
          </p>
          {/* <a href="#services" className="btn btn-primary btn-lg" data-aos="fade-right">
            Lihat Layanan Kami
          </a> */}
        </div>

        <div>
          <img
            src="../assets/farmasi.png"
            alt="Dokter ilustrasi"
            style={{ maxWidth: "600px", width: "100%" }} 
            data-aos="fade-left"
          />
        </div>
      </div>
    </section>
  );
}
