import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

// Komponen titik animasi blinking
function Dot({ delay }) {
  return (
    <span
      style={{
        width: 6,
        height: 6,
        backgroundColor: "currentColor",
        borderRadius: "50%",
        display: "inline-block",
        animation: "typingBlink 1.4s infinite",
        animationDelay: `${delay}s`,
      }}
    />
  );
}

// Komponen bubble indikator mengetik
function TypingIndicator({ isUser }) {
  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        backgroundColor: isUser ? "#007bff" : "#e4e6eb",
        color: isUser ? "white" : "#333",
        padding: "8px 12px",
        borderRadius: "20px",
        maxWidth: "60px",
        display: "flex",
        gap: "4px",
        boxShadow:
          isUser
            ? "0 2px 8px rgba(0,123,255,0.4)"
            : "0 2px 8px rgba(0,0,0,0.1)",
        fontSize: "0.85rem",
        fontWeight: "bold",
        userSelect: "none",
      }}
      aria-label={isUser ? "Anda sedang mengetik" : "Chatbot sedang mengetik"}
    >
      <Dot delay={0} />
      <Dot delay={0.2} />
      <Dot delay={0.4} />
    </div>
  );
}

export default function ChatBot({ onClose }) {
  const [userInput, setUserInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Scroll ke bawah setiap chat update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  // Auto resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [userInput]);

  // Update indikator user mengetik
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    setIsUserTyping(e.target.value.trim() !== "");
  };

  // Kirim pesan user dan dapatkan balasan bot
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setIsUserTyping(false);

    const newUserMessage = { sender: "user", message: userInput };
    setChatLog((prev) => [...prev, newUserMessage]);
    setUserInput("");

    setIsBotTyping(true);

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: userInput,
      });

      const botReply = {
        sender: "bot",
        message: response.data.reply || "Maaf, saya tidak mengerti.",
      };

      setChatLog((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Gagal terhubung ke chatbot:", error);
      setChatLog((prev) => [
        ...prev,
        { sender: "bot", message: "Terjadi kesalahan pada server chatbot." },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <>
      {/* Tambahkan style global animasi */}
      <style>
        {`
          @keyframes typingBlink {
            0%, 80%, 100% {
              opacity: 0.3;
            }
            40% {
              opacity: 1;
            }
          }
        `}
      </style>

      <div
        style={{
          position: "fixed",
          bottom: "100px",
          right: "30px",
          width: "360px",
          height: "500px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          zIndex: 10000,
          userSelect: "text",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "12px 16px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Chatbot Kesehatan
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              color: "white",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              lineHeight: 1,
            }}
            title="Tutup"
            aria-label="Tutup chatbot"
          >
            ×
          </button>
        </div>

        {/* Chat log */}
        <div
          style={{
            flex: 1,
            padding: "1rem",
            overflowY: "auto",
            backgroundColor: "#f7f9fc",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
          }}
        >
          {chatLog.length === 0 && (
            <p style={{ color: "#666", textAlign: "center", marginTop: "2rem" }}>
              Mulai chat dengan mengetik pesan di bawah.
            </p>
          )}

          {chatLog.map((chat, index) => (
            <div
              key={index}
              style={{
                alignSelf: chat.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor:
                  chat.sender === "user" ? "#007bff" : "#e4e6eb",
                color: chat.sender === "user" ? "white" : "#333",
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: "80%",
                wordWrap: "break-word",
                fontSize: "0.95rem",
                boxShadow:
                  chat.sender === "user"
                    ? "0 2px 8px rgba(0,123,255,0.4)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {chat.message}
            </div>
          ))}

          {/* Bubble animasi "sedang mengetik" */}
          {isUserTyping && <TypingIndicator isUser={true} />}
          {isBotTyping && <TypingIndicator isUser={false} />}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #ccc",
            padding: "0.5rem",
          }}
        >
          <textarea
            ref={textareaRef}
            placeholder="Ketik pesan..."
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            style={{
              flex: 1,
              resize: "none",
              border: "1px solid #ccc",
              borderRadius: "20px 0 0 20px",
              padding: "0.5rem 1rem",
              outline: "none",
              maxHeight: "100px",
              overflowY: "auto",
              fontSize: "0.95rem",
            }}
            rows={1}
            aria-label="Input pesan chatbot"
          />
          <button
            onClick={handleSendMessage}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "0 20px 20px 0",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            aria-label="Kirim pesan chatbot"
          >
            Kirim
          </button>
        </div>
      </div>
    </>
  );
}
