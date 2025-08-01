import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Orb from "./Orb";
import AdminKonfirmasi from "./pages/admin/AdminKonfirmasi";
import ChatBot from "./pages/ChatBot";
import RawatInapForm from "./pages/RawatInapForm";
import AdminRawatInap from "./pages/AdminRawatInap";
import RiwayatRawatInap from "./pages/RiwayatRawatInap";
import AdminFarmasi from "./pages/admin/AdminFarmasi";
import React, { useState } from "react";
import ListObat from "./pages/admin/ListObat";
import EditObat from "./pages/admin/EditObat";

export default function App() {
    const [showChatbot, setShowChatbot] = useState(false);
      const toggleChatbot = () => setShowChatbot((prev) => !prev);


  return (
    <Router>
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
        <Route
          path="/pendaftaran"
          element={

              <HalamanPendaftaran />

          }
        />
        <Route path="/fasilitas" element={<Fasilitas />} />

        <Route path="/admin/pendaftaran" element={<AdminPendaftaran />} />
        <Route path="/pendaftaran/riwayat" element={<RiwayatPendaftaran />} />
        <Route path="/admin/konfirmasi" element={<AdminKonfirmasi />} />
        <Route path="/rawatinap" element={
          <ProtectedRoute>
          <RawatInapForm />
          </ProtectedRoute>}
         />
        <Route path="/admin/rawatinap" element={<AdminRawatInap />} />
        <Route path="/riwayatrawatinap" element={
          <ProtectedRoute>
          <RiwayatRawatInap />
          </ProtectedRoute>} 
          />
        <Route path="/admin/adminfarmasi" element={<AdminFarmasi />} />
        <Route path="/admin/daftarobat" element={<ListObat />} />
        <Route path="/admin/editobat" element={<EditObat />} />
      </Routes>
      <ChatButton onClick={toggleChatbot} />
      {showChatbot && <ChatBot onClose={toggleChatbot} />}
    </Router>
  );
}
