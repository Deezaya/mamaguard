"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { LayoutDashboard, History, MapPin, Baby, LogOut, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/history", label: "History", icon: History },
    { href: "/care", label: "Find Care", icon: MapPin },
    { href: "/baby", label: "Baby", icon: Baby },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className="sticky top-0 z-20 bg-white"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)",
        minHeight: "70px",
      }}
    >
      {/* Logo */}
      <Link
        href="/dashboard"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        <Image
          src="/mamaguard-logo.png"
          alt="MamaGuard"
          width={40}
          height={40}
        />
        <span style={{ fontSize: "20px", fontWeight: "800", color: "var(--color-primary)" }}>
          MamaGuard
        </span>
      </Link>

      {/* Desktop Menu */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          marginLeft: "40px",
        }}
        className="max-md:hidden"
      >
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 16px",
              borderRadius: "10px",
              fontWeight: "700",
              fontSize: "14px",
              color: isActive(href) ? "var(--color-primary)" : "var(--color-text-secondary)",
              backgroundColor: isActive(href) ? "var(--color-accent)" : "transparent",
              transition: ".3s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => !isActive(href) && (e.currentTarget.style.backgroundColor = "rgba(0,0,0,.03)")}
            onMouseLeave={(e) => !isActive(href) && (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </div>

      {/* Profile Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "10px",
            transition: ".3s",
          }}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          className="max-md:hidden"
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800",
              background: "var(--color-accent)",
              color: "var(--color-primary)",
              fontSize: "14px",
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold", color: "var(--color-dark)", fontSize: "14px" }}>
              {user?.name || "User"}
            </span>
            <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
              Account
            </span>
          </div>
          <ChevronDown size={18} style={{ color: "var(--color-text-muted)" }} />
        </div>

        {/* Dropdown Menu */}
        {isProfileOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
              marginTop: "8px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,.12)",
              minWidth: "160px",
              overflow: "hidden",
            }}
            className="max-md:hidden"
          >
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "none",
                background: "none",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "14px",
                fontWeight: "700",
                color: "var(--color-primary)",
                transition: ".3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}

        {/* Mobile Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "none",
            background: "none",
            cursor: "pointer",
            transition: ".3s",
          }}
          className="md:hidden"
          title="Logout"
        >
          <LogOut size={20} style={{ color: "var(--color-primary)" }} />
        </button>
      </div>
    </nav>
  );
}
