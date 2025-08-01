import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HeroDokter() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <section
      className="d-flex align-items-center"
      style={{ minHeight: "80vh", padding: "0 2rem" }}
    >
      <div className="container d-flex flex-column flex-lg-row align-items-center gap-5">
        
        <div>
          <img
            src="../assets/dokterrame.png"
            alt="Dokter ilustrasi"
            style={{ maxWidth: "600px", width: "100%" }}
            data-aos="fade-right" 
          />
        </div>

        
        <div className="text-center text-lg-start" style={{ maxWidth: 500 }}>
          <h1 className="display-4 fw-bold text-primary" data-aos="fade-left">
            Dokter Spesialis <br /> Pilihan untuk Anda dan Keluarga
          </h1>
          <p className="lead text-secondary my-4" data-aos="fade-left">
            <strong className="text-black">RS Sehat Sentosa </strong> hadir memberikan pelayanan kesehatan terbaik dengan teknologi modern dan tenaga medis berpengalaman.
          </p>
          {/* <a href="#services" className="btn btn-primary btn-lg" data-aos="fade-left">
            Lihat Layanan Kami
          </a> */}
        </div>
      </div>
    </section>
  );
}
