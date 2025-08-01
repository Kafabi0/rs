import { useState } from "react";
import axios from "axios";
import SplitText from "../SplitText";
import { useNavigate } from "react-router-dom";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const submit = async () => {
    if (!username || !password) {
      setMessage("Username dan Password harus diisi.");
      return;
    }

    const endpoint = isLogin ? "/api/login" : "/api/register";

    try {
      const res = await axios.post(`http://localhost:8080${endpoint}`, {
        username,
        password,
      });

      const data = res.data;

      if (isLogin && data.token) {
        // Simpan token, username, dan role di localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", data.role);

        // Navigasi ke dashboard sesuai role
        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/"); // fallback ke dashboard umum
        }
      } else {
        setMessage(data.message || "Registrasi berhasil!");
      }
    } catch (err) {
      setMessage(err?.response?.data?.message || "Username sudah terdaftar.");
    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light px-3">
      {/* Header */}
      <div className="text-center mb-4">
        <SplitText
          text="Selamat datang di"
          className="display-5 fw-bold text-success mb-2"
          delay={80}
          duration={0.6}
          ease="back.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <p className="lead text-muted">
          Sistem manajemen{" "}
          <strong className="text-dark fw-bold">
            Rumah Sakit Sehat Sentosa
          </strong>
        </p>
      </div>

      {/* Card Form */}
      <div className="card shadow p-4 w-100" style={{ maxWidth: 400 }}>
        <div className="d-flex align-items-center mb-3">
          <img
            src="../assets/rs1.png"
            alt="Logo rs"
            style={{ width: "70px", height: "70px" }}
          />
          <div className="ms-3">
            <h5 className="mb-0 fw-bold">RS Sehat Sentosa</h5>
          </div>
        </div>
        <h3 className="text-center mb-3">{isLogin ? "Login" : "Register"}</h3>

        {message && (
          <div className="alert alert-warning text-center py-2">{message}</div>
        )}

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </div>

        <button onClick={submit} className="btn btn-success w-100">
          {isLogin ? "Login" : "Daftar"}
        </button>

        <div className="text-center mt-3">
          <span>
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <button
              className="btn btn-link p-0"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
            >
              {isLogin ? "Daftar di sini" : "Login di sini"}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
