import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function TestimonialsSection() {
      useEffect(() => {
        AOS.init({
          duration: 800, // durasi animasi dalam ms
          easing: "ease-in-out",
          once: false, // animasi hanya sekali saat scroll ke bawah
        });
        
      }, []);
  const testimonials = [
    {
      name: "Andi",
      role: "Pasien",
      text: "Pelayanan sangat memuaskan dan dokter sangat ramah.",
    },
    {
      name: "Sari",
      role: "Keluarga Pasien",
      text: "Fasilitas lengkap dan penanganan cepat di RS Sehat Sentosa.",
    },
    {
      name: "Budi",
      role: "Pasien",
      text: "Saya merasa nyaman dan aman selama perawatan di sini.",
    },
  ];

  return (
    
    <section
      className="py-5 bg-white" data-aos="fade-right"
      style={{ maxWidth: 800, margin: "auto", borderRadius: 12 }}
    >
      <h2 className="text-center text-primary mb-5 fw-bold">Apa Kata Mereka</h2>

      <div
        id="carouselTestimonials"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
            >
              <div className="text-center px-4">
                <p className="fs-5 fst-italic">"{item.text}"</p>
                <h6 className="fw-bold mt-4 mb-0">{item.name}</h6>
                <small className="text-muted">{item.role}</small>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselTestimonials"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselTestimonials"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
               {/* <style>{`
    .carousel-control-prev,
    .carousel-control-next {
      width: 3rem;
      height: 3rem;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
    }

    .carousel-control-prev-icon,
    .carousel-control-next-icon {
      filter: invert(1);
      background-color: transparent !important;
    }
  `}</style> */}
    </section>
  );
}
