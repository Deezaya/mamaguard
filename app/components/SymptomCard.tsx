"use client";

import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface SymptomCardProps {
  icon: LucideIcon;
  label: string;
  id: string;
  onChange?: (id: string, checked: boolean) => void;
  isActive?: boolean;
}

export default function SymptomCard({
  icon: Icon,
  label,
  id,
  onChange,
  isActive = false,
}: SymptomCardProps) {
  const [active, setActive] = useState(isActive);

  const handleClick = () => {
    const newState = !active;
    setActive(newState);
    if (onChange) {
      onChange(id, newState);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="symptom-card"
      style={{
        background: active ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))" : "white",
        border: active ? "2px solid var(--color-primary)" : "2px solid var(--color-border)",
        borderRadius: "14px",
        padding: "14px 16px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "18px",
        cursor: "pointer",
        transition: "all .3s ease",
        color: active ? "white" : "var(--color-dark)",
        minHeight: "88px",
        textAlign: "left",
        width: "100%",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = "var(--color-primary)";
          e.currentTarget.style.backgroundColor = "rgba(168, 85, 74, 0.05)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.backgroundColor = "white";
        }
      }}
    >
      <span
        style={{
          width: "54px",
          height: "54px",
          borderRadius: "13px",
          background: active ? "rgba(255,255,255,.16)" : "#fff1ef",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon
          size={26}
          style={{
            color: active ? "white" : "var(--color-primary)",
            flexShrink: 0,
          }}
        />
      </span>
      <span 
        style={{ 
          fontSize: "15px",
          fontWeight: "700", 
          color: active ? "white" : "var(--color-dark)",
          lineHeight: "1.3",
          wordBreak: "break-word",
        }}
      >
        {label}
      </span>
    </button>
  );
}
