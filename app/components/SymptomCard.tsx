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
      style={{
        background: active ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))" : "white",
        border: active ? "2px solid var(--color-primary)" : "2px solid var(--color-border)",
        borderRadius: "14px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        transition: "all .3s ease",
        color: active ? "white" : "var(--color-dark)",
        minHeight: "100px",
        textAlign: "center",
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
      <Icon 
        size={28} 
        style={{ 
          color: active ? "white" : "var(--color-primary)",
          flexShrink: 0,
        }} 
      />
      <span 
        style={{ 
          fontSize: "12px", 
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
