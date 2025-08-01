import Navbar from "../components/Navbar";
import DoctorCard from "../components/DoctorCard";
import "../DoctorsPage.css";
import HeroDokter from "../components/HeroDokter";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Footer from "../components/Footer";
const doctorsData = [
  {
    id: 1,
    name: "Dr. Ras Wa",
    specialty: "Dokter Spesialis Jantung",
    image: "../assets/dokter4.png",
    social: { twitter: "#", facebook: "#", linkedin: "#" },
  },
  {
    id: 2,
    name: "Dr. Siti Aminah",
    specialty: "Dokter Spesialis Anak",
    image: "../assets/dokter21.png",
    social: { twitter: "#", facebook: "#", linkedin: "#" },
  },
  {
    id: 3,
    name: "Dr. Budi Nugroho",
    specialty: "Dokter Spesialis Kulit",
    image: "../assets/dokter3.png",
    social: { twitter: "#", facebook: "#", linkedin: "#" },
  },
  {
    id: 4,
    name: "Dr. Dewi Lestari",
    specialty: "Dokter Spesialis Gigi",
    image: "../assets/dokter1.png",
    social: { twitter: "#", facebook: "#", linkedin: "#" },
  },
];

export default function DoctorsPage() {
    useEffect(() => {
        AOS.init({
          duration: 800, 
          easing: "ease-in-out",
          once: false, 
          mirror: true,
        });
      }, []);
  return (
    <div style={{ backgroundColor: "#f8fafd", minHeight: "100vh" }}>
      <Navbar />
      <HeroDokter/>


      <main className="container py-5" style={{ maxWidth: 1000 }}>
        <h1 className="text-primary mb-5 text-center fw-bold" data-aos="fade-up">Tim Dokter Kami</h1>

        <div className="row g-4" data-aos="fade-zoom-in" data-aos-delay="500">
          {doctorsData.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </main>
              <Footer/>

    </div>
  );
}
