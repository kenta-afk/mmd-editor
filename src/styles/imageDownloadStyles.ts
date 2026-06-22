import type { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
  display: "grid",
  gap: "12px",
  width: "100%",
};

export const diagramWrapperStyle: CSSProperties = {
  width: "100%",
  overflow: "auto",
  border: "1px solid rgba(148, 163, 184, 0.3)",
  borderRadius: "18px",
  background: "#ffffff",
  padding: "16px",
  boxShadow: "0 24px 48px rgba(15, 23, 42, 0.08)",
};

export const downloadButtonStyle: CSSProperties = {
  justifySelf: "start",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "12px 18px",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(135deg, #2563eb, #0f172a)",
  color: "#ffffff",
  fontWeight: 700,
  boxShadow: "0 14px 24px rgba(37, 99, 235, 0.24)",
  cursor: "pointer",
};

export const errorTextStyle: CSSProperties = {
  color: "#b91c1c",
  fontSize: "0.95rem",
  margin: 0,
};
