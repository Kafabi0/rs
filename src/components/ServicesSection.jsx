import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../ServicesSection.css";
import { Link } from "react-router-dom";  // Import Link dari react-router-dom

export default function ServicesSection() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  const services = [
    {
      icon: "🏥",
      title: "Pelayanan Rawat Inap",
      description: "Fasilitas kamar lengkap dengan pelayanan 24 jam.",
      url: "/fasilitas",
    },
    {
      icon: "👩‍⚕️",
      title: "Dokter Spesialis Berpengalaman",
      description: "Tenaga medis profesional yang siap membantu Anda.",
      url: "/dokter",
    },
    {
      icon: "🩺",
      title: "Pemeriksaan Lengkap",
      description: "Dilengkapi alat diagnostik modern dan akurat.",
      url: "/fasilitas",
    },
    {
      icon: "💊",
      title: "Farmasi 24 Jam",
      description: "Layanan obat dan konsultasi selama 24 jam.",
      url: "/farmasi",
    },
    {
      icon: "🤖",
      title: "Chatbot Kesehatan",
      description: "Layanan konsultasi kesehatan online 24/7.",
    },
  ];

  return (
    <section
      id="services"
      className="py-4"
      data-aos="fade-up"
      style={{ maxWidth: 1000, margin: "0 auto" }}
    >
      <h2 className="text-center text-primary mb-4 fw-semibold fs-3">
        Layanan Kami
      </h2>
      <div className="row justify-content-center g-3">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
          >
            <Link
              to={service.url}
              className="service-card p-3 bg-white rounded shadow-sm text-center h-100 w-100 text-decoration-none text-dark"
              style={{ cursor: "pointer" }}
              aria-label={`Lihat detail layanan ${service.title}`}
            >
              <div
                style={{ fontSize: "2.2rem", marginBottom: "0.8rem" }}
                aria-hidden="true"
              >
                {service.icon}
              </div>
              <h6 className="fw-semibold mb-1">{service.title}</h6>
              <p className="text-muted small mb-0">{service.description}</p>
            </Link>

            {/* Jika tidak menggunakan React Router, ganti Link dengan a:
            <a href={service.url} className="service-card p-3 bg-white rounded shadow-sm text-center h-100 w-100 text-decoration-none text-dark" style={{ cursor: "pointer" }}>
              ...
            </a>
            */}
          </div>
        ))}
      </div>
    </section>
  );
}
