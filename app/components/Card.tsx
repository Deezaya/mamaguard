"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "30px",
        boxShadow: "0 20px 50px rgba(0,0,0,.05)",
        cursor: onClick ? "pointer" : "default",
        transition: onClick ? ".3s" : "none",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
