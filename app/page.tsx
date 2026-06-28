"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Leaf, HeartPulse, Baby, Hospital } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push("/dashboard");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "var(--background)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "4px solid var(--color-primary)",
              borderBottomColor: "transparent",
              animation: "spin 1s linear infinite",
              marginBottom: "16px",
            }}
          />
          <p style={{ color: "var(--color-text-muted)" }}>Loading...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      {/* Header */}
      <header
        style={{
          background: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,.05)",
          padding: "20px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="max-md:px-5"
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "25px",
            fontWeight: "800",
            color: "var(--color-primary)",
            textDecoration: "none",
          }}
        >
          <Leaf size={28} />
          MamaGuard
        </Link>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            href="/login"
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              background: "transparent",
              color: "var(--color-primary)",
              border: "2px solid var(--color-primary)",
              textDecoration: "none",
              fontWeight: "700",
              cursor: "pointer",
              transition: ".3s",
            }}
            className="hover:bg-accent"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              background: "var(--color-primary)",
              color: "white",
              border: "none",
              textDecoration: "none",
              fontWeight: "700",
              cursor: "pointer",
              transition: ".3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 60px",
          textAlign: "center",
        }}
        className="max-md:px-5 max-md:py-12"
      >
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "800",
            color: "var(--color-dark)",
            marginBottom: "20px",
            lineHeight: "1.2",
          }}
          className="max-md:text-4xl"
        >
          Real-time Postpartum Health Monitoring
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "var(--color-text-muted)",
            marginBottom: "40px",
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          MamaGuard uses AI-powered face scanning to monitor your vital signs and assess health risks during your
          postpartum recovery journey.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "60px" }}>
          <Link
            href="/register"
            style={{
              padding: "16px 40px",
              borderRadius: "12px",
              background: "var(--color-primary)",
              color: "white",
              border: "none",
              textDecoration: "none",
              fontWeight: "800",
              fontSize: "16px",
              cursor: "pointer",
              transition: ".3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Get Started
          </Link>
          <Link
            href="/login"
            style={{
              padding: "16px 40px",
              borderRadius: "12px",
              background: "var(--color-accent)",
              color: "var(--color-primary)",
              border: "none",
              textDecoration: "none",
              fontWeight: "800",
              fontSize: "16px",
              cursor: "pointer",
              transition: ".3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
        }}
        className="max-md:px-5 max-md:py-8"
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,.05)",
          }}
        >
          <HeartPulse size={48} style={{ color: "var(--color-primary)", margin: "0 auto 20px" }} />
          <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "12px", color: "var(--color-dark)" }}>
            Real-time Vitals
          </h3>
          <p style={{ color: "var(--color-text-muted)", lineHeight: "1.5" }}>
            Monitor your heart rate, respiratory rate, and oxygen levels with advanced AI technology.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,.05)",
          }}
        >
          <Baby size={48} style={{ color: "var(--color-primary)", margin: "0 auto 20px" }} />
          <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "12px", color: "var(--color-dark)" }}>
            Daily Check-in
          </h3>
          <p style={{ color: "var(--color-text-muted)", lineHeight: "1.5" }}>
            Log your symptoms and receive personalized health recommendations based on your status.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,.05)",
          }}
        >
          <Hospital size={48} style={{ color: "var(--color-primary)", margin: "0 auto 20px" }} />
          <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "12px", color: "var(--color-dark)" }}>
            Find Care
          </h3>
          <p style={{ color: "var(--color-text-muted)", lineHeight: "1.5" }}>
            Locate nearby healthcare providers and emergency services in your area instantly.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "white",
          borderTop: "1px solid var(--color-border)",
          padding: "40px 60px",
          textAlign: "center",
          color: "var(--color-text-muted)",
          fontSize: "14px",
        }}
        className="max-md:px-5"
      >
        <p>© 2026 MamaGuard. All rights reserved. Taking care of mamas, one scan at a time.</p>
      </footer>
    </div>
  );
}
         