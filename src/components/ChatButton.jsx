import React from "react";

export default function ChatButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 9999,
        cursor: "pointer",
        backgroundColor: "#007bff",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        userSelect: "none",
      }}
      title="Chatbot"
    >
      <img
        src="../assets/cos.png"
        alt="Chat"
        style={{ width: "50px", height: "50px", color: "white" }}
      />
    </div>
  );
}
