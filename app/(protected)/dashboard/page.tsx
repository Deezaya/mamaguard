"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { api } from "@/app/lib/api";
import { Brain, Eye, Hand, Droplets, Thermometer, Wind, Heart, MapPin, Clock, Video } from "lucide-react";
import SymptomCard from "@/app/components/SymptomCard";
import Card from "@/app/components/Card";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, boolean>>({});
  const [postpartumDay, setPostpartumDay] = useState(14);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const symptoms = [
    { id: "severe_headache", icon: Brain, label: "Severe headache" },
    { id: "blurred_vision", icon: Eye, label: "Blurred vision" },
    { id: "abdominal_pain", icon: Hand, label: "Abdominal pain" },
    { id: "heavy_bleeding", icon: Droplets, label: "Heavy bleeding" },
    { id: "high_fever", icon: Thermometer, label: "High fever" },
    { id: "shortness_of_breath", icon: Wind, label: "Shortness of breath" },
    { id: "racing_heartbeat", icon: Heart, label: "Racing heartbeat" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const profile = await api.getProfile();
        setUserProfile(profile);

        // Calculate postpartum day from created_at date
        if (profile.created_at) {
          const createdDate = new Date(profile.created_at);
          const today = new Date();
          const daysDiff = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          setPostpartumDay(daysDiff);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        // Use default value if API fails
        setPostpartumDay(14);
      } finally {
        setLoading(false);
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
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", paddingBottom: "100px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px" }} className="max-md:p-4">
        {/* Greeting Section */}
        <div style={{ marginBottom: "28px" }} className="max-md:mb-6">
          <p style={{ color: "var(--color-text-muted)", fontWeight: "600", fontSize: "13px", margin: "0 0 8px 0" }} className="max-md:text-xs">
            Day {postpartumDay} postpartum
          </p>
          <h1 style={{ fontSize: "36px", fontWeight: "800", margin: "0", color: "var(--color-dark)", lineHeight: "1.2" }} className="max-md:text-2xl">
            Good morning, <span style={{ color: "var(--color-primary)" }}>{user?.name || "Mama"}</span> 🌿
          </h1>
        </div>

        {/* Scan CTA Card */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-lighter) 100%)",
            borderRadius: "24px",
            padding: "32px",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 16px 40px rgba(185,111,98,.2)",
            marginBottom: "32px",
            gap: "20px",
          }}
          className="max-md:flex-col max-md:text-center max-md:p-6 max-md:gap-4"
        >
          <div>
            <p style={{ fontSize: "11px", fontWeight: "800", letterSpacing: "0.5px", margin: "0 0 12px 0", opacity: 0.95 }}>
              STEP 1 · HEALTH SCAN
            </p>
            <h2 style={{ fontSize: "28px", fontWeight: "800", margin: "0 0 10px 0", lineHeight: "1.2" }}>
              Ready for your scan?
            </h2>
            <p style={{ opacity: 0.95, fontSize: "15px", margin: "0", lineHeight: "1.5" }}>
              A quick AI-powered scan checks your recovery and gives personalized postpartum insights.
            </p>
          </div>

          <Link href="/scan" style={{ textDecoration: "none", flexShrink: 0 }}>
            <button
              style={{
                border: "none",
                background: "white",
                color: "var(--color-primary)",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: "800",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "transform .2s, box-shadow .2s",
                boxShadow: "0 8px 20px rgba(0,0,0,.1)",
                fontSize: "15px",
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
              <Video size={18} />
              Start Face Scan
            </button>
          </Link>
        </div>

        {/* Daily Check-in */}
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "32px",
            marginBottom: "40px",
            boxShadow: "0 8px 20px rgba(0,0,0,.04)",
          }}
        >
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <div style={{ width: "5px", height: "28px", background: "var(--color-primary)", borderRadius: "2.5px" }} />
              <h2 style={{ fontSize: "22px", fontWeight: "800", color: "var(--color-dark)", margin: "0" }}>
                Daily Check-in
              </h2>
            </div>
            <p style={{ color: "var(--color-text-muted)", fontWeight: "600", fontSize: "15px", margin: "4px 0 0 0", paddingLeft: "17px" }}>
              Select any warning signs you're experiencing today
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
              gap: "12px",
              gridAutoRows: "1fr",
            }}
            className="max-md:grid-cols-3"
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

        {/* Quick Action Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
          className="max-md:grid-cols-1 max-md:gap-3"
        >
          <Link href="/care" style={{ textDecoration: "none" }}>
            <Card>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={24} style={{ color: "var(--color-primary)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--color-dark)", margin: "0 0 6px 0" }}>
                    Find Nearby Care
                  </h3>
                  <p style={{ color: "var(--color-text-muted)", fontWeight: "600", fontSize: "14px", margin: "0" }}>
                    Locate trusted postpartum healthcare providers near you.
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/history" style={{ textDecoration: "none" }}>
            <Card>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Clock size={24} style={{ color: "var(--color-primary)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--color-dark)", margin: "0 0 6px 0" }}>
                    History
                  </h3>
                  <p style={{ color: "var(--color-text-muted)", fontWeight: "600", fontSize: "14px", margin: "0" }}>
                    View your previous scans and checkups.
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
