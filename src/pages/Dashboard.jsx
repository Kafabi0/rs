import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";
// import MagicBento from '../MagicBento'


export default function Dashboard() {
  return (
    <div style={{ backgroundColor: "#f8fafd", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
