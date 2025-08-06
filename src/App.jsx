import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect } from "react";

import LoginRegister from "./components/LoginRegister";
import Dashboard from "./pages/Dashboard";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import PasienList from "./pages/PasienList";
import PasienCreate from "./pages/PasienCreate";
import PasienEdit from "./pages/PasienEdit";
import ProtectedRoute from "./pages/ProtectedRoute";
import DoctorsPage from "./pages/DoctorsPage";
import HalamanPendaftaran from "./pages/HalamanPendaftaran";
import AdminPendaftaran from "./pages/admin/AdminPendaftaran";
import RiwayatPendaftaran from "./pages/RiwayatPendaftaran";
import Fasilitas from "./pages/Fasilitas";
import FarmasiPage from "./pages/FarmasiPage";
import ScrollToTop from "./components/ScrollToTop";
import ChatButton from "./components/ChatButton";
import ChatBot from "./pages/ChatBot";
import AdminKonfirmasi from "./pages/admin/AdminKonfirmasi";
import RawatInapForm from "./pages/RawatInapForm";
import AdminRawatInap from "./pages/AdminRawatInap";
import RiwayatRawatInap from "./pages/RiwayatRawatInap";
import AdminFarmasi from "./pages/admin/AdminFarmasi";
import ListObat from "./pages/admin/ListObat";
import EditObat from "./pages/admin/EditObat";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";

function AppRoutes() {
  const location = useLocation();
  const [showChatbot, setShowChatbot] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const toggleChatbot = () => setShowChatbot((prev) => !prev);

  // Jangan tampilkan chatbot di halaman admin dan 404
  const shouldShowChatbot = () => {
    const path = location.pathname;
    return !path.startsWith("/admin") && !isNotFound;
  };

  useEffect(() => {
    // Tutup chatbot otomatis jika ganti halaman
    setShowChatbot(false);

    // Reset isNotFound jika route berubah (kecuali route 404 sendiri)
    if (isNotFound) {
      setIsNotFound(false);
    }
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="/dokter" element={<DoctorsPage />} />

        <Route path="/admin/pasien" element={<PasienList />} />
        <Route path="/admin/pasien/create" element={<PasienCreate />} />
        <Route path="/admin/pasien/edit/:id" element={<PasienEdit />} />
        <Route path="/farmasi" element={<FarmasiPage />} />
        <Route path="/pendaftaran" element={<HalamanPendaftaran />} />
        <Route path="/fasilitas" element={<Fasilitas />} />

        <Route path="/admin/pendaftaran" element={<AdminPendaftaran />} />
        <Route path="/pendaftaran/riwayat" element={<RiwayatPendaftaran />} />
        <Route path="/admin/konfirmasi" element={<AdminKonfirmasi />} />
        <Route
          path="/rawatinap"
          element={
            <ProtectedRoute>
              <RawatInapForm />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/rawatinap" element={<AdminRawatInap />} />
        <Route
          path="/riwayatrawatinap"
          element={
            <ProtectedRoute>
              <RiwayatRawatInap />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/adminfarmasi" element={<AdminFarmasi />} />
        <Route path="/admin/daftarobat" element={<ListObat />} />
        <Route path="/admin/editobat" element={<EditObat />} />

        {/* Route fallback 404 */}
        <Route
          path="*"
          element={<NotFound onNotFound={() => setIsNotFound(true)} />}
        />
      </Routes>

      {shouldShowChatbot() && (
        <>
          <ChatButton onClick={toggleChatbot} />
          {showChatbot && <ChatBot onClose={toggleChatbot} />}
        </>
      )}

      <Analytics />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
