"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { api } from "@/app/lib/api";
import {
  ArrowRight,
  Brain,
  ClipboardList,
  Droplets,
  Eye,
  Hand,
  HeartPulse,
  MapPin,
  ScanFace,
  Thermometer,
  Wind,
} from "lucide-react";
import SymptomCard from "@/app/components/SymptomCard";
import Card from "@/app/components/Card";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, boolean>>({});
  const [postpartumDay, setPostpartumDay] = useState(14);

  const symptoms = [
    { id: "severe_headache", icon: Brain, label: "Severe headache" },
    { id: "blurred_vision", icon: Eye, label: "Blurred vision" },
    { id: "sudden_swelling", icon: Hand, label: "Swollen hands" },
    { id: "heavy_bleeding", icon: Droplets, label: "Heavy bleeding" },
    { id: "high_fever", icon: Thermometer, label: "High fever" },
    { id: "shortness_of_breath", icon: Wind, label: "Hard to breathe" },
    { id: "racing_heartbeat", icon: HeartPulse, label: "Racing heartbeat" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profile = await api.getProfile();

        if (profile.created_at) {
          const createdDate = new Date(profile.created_at);
          const today = new Date();
          const daysDiff = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          setPostpartumDay(daysDiff);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setPostpartumDay(14);
      }
    };

    fetchUserData();
  }, []);

  const handleSymptomChange = (id: string, checked: boolean) => {
    setSelectedSymptoms((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <div style={{ background: "linear-gradient(180deg, #fff8f6 0%, var(--background) 100%)", minHeight: "100vh", paddingBottom: "100px" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "42px 28px" }} className="max-md:p-4">
        <div style={{ marginBottom: "34px" }} className="max-md:mb-6">
          <p style={{ color: "var(--color-text-secondary)", fontWeight: "800", fontSize: "16px", margin: "0 0 14px 0" }} className="max-md:text-xs">
            Day {postpartumDay} postpartum
          </p>
          <h1 style={{ fontSize: "48px", fontWeight: "900", margin: "0", color: "var(--color-dark)", lineHeight: "1.08", letterSpacing: "0" }} className="max-md:text-2xl">
            Good morning,
            <br />
            <span style={{ color: "var(--color-primary)" }}>{user?.name || "Mama"}</span>{" "}
            <span aria-hidden="true">🌿</span>
          </h1>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #d96767 0%, #eaa09a 100%)",
            borderRadius: "20px",
            padding: "44px 42px",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 18px 42px rgba(168, 85, 74, .22)",
            marginBottom: "28px",
            gap: "32px",
          }}
          className="max-md:flex-col max-md:text-center max-md:p-6 max-md:gap-4"
        >
          <div>
            <p style={{ fontSize: "14px", fontWeight: "800", letterSpacing: "0", margin: "0 0 20px 0", opacity: 0.95 }}>
              STEP 1 · HEALTH SCAN
            </p>
            <h2 style={{ fontSize: "34px", fontWeight: "900", margin: "0 0 14px 0", lineHeight: "1.12" }}>
              Ready for your scan?
            </h2>
            <p style={{ opacity: 0.95, fontSize: "17px", margin: "0", lineHeight: "1.55", maxWidth: "520px", fontWeight: "600" }}>
              A quick AI-powered scan checks your recovery and gives personalized postpartum insights.
            </p>
          </div>

          <Link href="/scan" style={{ textDecoration: "none", flexShrink: 0 }}>
            <button
              style={{
                border: "none",
                background: "white",
                color: "var(--color-primary)",
                padding: "22px 30px",
                borderRadius: "16px",
                fontWeight: "800",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                transition: "transform .2s, box-shadow .2s",
                boxShadow: "0 8px 20px rgba(0,0,0,.1)",
                fontSize: "16px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,.1)";
              }}
            >
              <ScanFace size={24} />
              Start Face Scan
            </button>
          </Link>
        </div>

        <div
          style={{
            background: "white",
            border: "1px solid rgba(168, 85, 74, .08)",
            borderRadius: "20px",
            padding: "28px",
            marginBottom: "24px",
            boxShadow: "0 14px 36px rgba(46, 34, 40, .07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: "24px" }}>
            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "14px",
                background: "#fff1ef",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ClipboardList size={26} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "800", color: "var(--color-dark)", margin: "0" }}>
                Daily Check-in
              </h2>
              <p style={{ color: "var(--color-text-muted)", fontWeight: "600", fontSize: "15px", margin: "6px 0 0 0" }}>
                Select any warning signs you're experiencing today
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "16px",
              gridAutoRows: "1fr",
            }}
          >
            {symptoms.map(({ id, icon: Icon, label }) => (
              <SymptomCard
                key={id}
                id={id}
                icon={Icon}
                label={label}
                onChange={handleSymptomChange}
                isActive={selectedSymptoms[id] || false}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "18px",
          }}
          className="max-md:grid-cols-1 max-md:gap-3"
        >
          <Link href="/care" style={{ textDecoration: "none" }}>
            <Card className="dashboard-action-card">
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "16px",
                    background: "#fff1ef",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={32} style={{ color: "var(--color-primary)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "20px", fontWeight: "900", color: "var(--color-dark)", margin: "0 0 8px 0" }}>
                    Find Nearby Care
                  </h3>
                  <p style={{ color: "var(--color-text-muted)", fontWeight: "600", fontSize: "15px", margin: "0", lineHeight: "1.45" }}>
                    Locate trusted postpartum healthcare providers near you.
                  </p>
                </div>
                <ArrowRight size={24} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
              </div>
            </Card>
          </Link>

          <Link href="/history" style={{ textDecoration: "none" }}>
            <Card className="dashboard-action-card">
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "16px",
                    background: "#fff1ef",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ClipboardList size={32} style={{ color: "var(--color-primary)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "20px", fontWeight: "900", color: "var(--color-dark)", margin: "0 0 8px 0" }}>
                    History
                  </h3>
                  <p style={{ color: "var(--color-text-muted)", fontWeight: "600", fontSize: "15px", margin: "0", lineHeight: "1.45" }}>
                    View your previous scans and checkups.
                  </p>
                </div>
                <ArrowRight size={24} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
