"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Navbar from "@/app/components/NavBar";
import MobileBottomNav from "@/app/components/MobileBottomNav";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
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

  if (!user) {
    return null;
  }

  return (
    <div className="protected-shell" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main className="protected-main" style={{ flex: 1, paddingBottom: "80px", marginBottom: "0" }}>
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
}
