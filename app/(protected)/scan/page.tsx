"use client";

import { useState } from "react";
import { Camera, Smartphone, Heart, Clock, CheckCircle } from "lucide-react";
import ScanModal from "@/app/components/ScanModal";
import Card from "@/app/components/Card";

export default function ScanPage() {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);

  const handleScanComplete = (result: any) => {
    console.log("Scan result:", result);
    setLastScanTime(new Date().toLocaleTimeString());
    setIsScanModalOpen(false);
  };

  const scanTips = [
    {
      icon: Smartphone,
      title: "Stable Position",
      description: "Hold your phone at eye level and keep it still during scanning.",
    },
    {
      icon: Clock,
      title: "15 Seconds",
      description: "The scan takes 15 seconds. Don't move your face until it completes.",
    },
    {
      icon: Heart,
      title: "Accurate Results",
      description: "Position your face in good lighting for the most accurate vitals.",
    },
  ];

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px" }} className="max-md:px-5">
        {/* Header */}
        <div style={{ marginBottom: "48px" }} className="max-md:mb-8">
          <h1 style={{ fontSize: "42px", fontWeight: "800", color: "var(--color-dark)", marginBottom: "12px" }} className="max-md:text-3xl">
            Health Scan
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "18px" }} className="max-md:text-base">
            Monitor your vital signs in real-time using your device's camera
          </p>
        </div>

        {/* Main CTA */}
        <div
          style={{
            background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-lighter) 100%)`,
            borderRadius: "35px",
            padding: "50px 40px",
            marginBottom: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 20px 40px rgba(168, 85, 74, 0.25)",
            gap: "40px",
          }}
          className="max-md:flex-col max-md:p-8 max-md:gap-6"
        >
          {/* Left Content */}
          <div style={{ flex: 1, color: "white" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "16px" }} className="max-md:text-2xl">
              Ready for a health check?
            </h2>
            <p style={{ fontSize: "18px", opacity: 0.95, lineHeight: "1.6", marginBottom: "24px" }} className="max-md:text-base">
              Our advanced camera-based scanning technology captures your vital signs in just 15 seconds. No additional equipment needed.
            </p>

            {lastScanTime && (
              <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: "14px", padding: "14px 18px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", fontWeight: "600" }}>
                <CheckCircle size={20} />
                Last scan: {lastScanTime}
              </div>
            )}

            <button
              onClick={() => setIsScanModalOpen(true)}
              style={{
                background: "white",
                color: "var(--color-primary)",
                border: "none",
                padding: "16px 32px",
                borderRadius: "14px",
                fontSize: "18px",
                fontWeight: "800",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "transform .2s, box-shadow .2s",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
              }}
              className="max-md:w-full max-md:justify-center"
            >
              <Camera size={22} />
              Start Scan
            </button>
          </div>

          {/* Right Visual */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="max-md:flex"
          >
            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px dashed rgba(255,255,255,0.3)",
                animation: "pulse 2s ease-in-out infinite",
              }}
              className="max-md:w-32 max-md:h-32"
            >
              <Camera size={80} style={{ opacity: 0.8 }} className="max-md:w-12 max-md:h-12" />
            </div>
            <style>{`
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.05); opacity: 0.9; }
              }
            `}</style>
          </div>
        </div>

        {/* Tips Section */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: "var(--color-dark)", marginBottom: "24px" }} className="max-md:text-xl">
            Scanning Tips
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
            className="max-md:grid-cols-1"
          >
            {scanTips.map(({ icon: Icon, title, description }, i) => (
              <Card key={i}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div
                    style={{
                      background: "var(--color-accent)",
                      padding: "12px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={24} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--color-dark)", marginBottom: "6px" }}>
                      {title}
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: "1.6" }}>
                      {description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div
          style={{
            background: "white",
            borderRadius: "25px",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
          className="max-md:p-6"
        >
          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--color-dark)", marginBottom: "16px" }}>
            How It Works
          </h3>
          <ol
            style={{
              color: "var(--color-dark)",
              lineHeight: "1.8",
              paddingLeft: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <li>Position your face in the camera frame with good lighting</li>
            <li>Keep your device steady and maintain a neutral expression</li>
            <li>The scan will automatically detect and capture your vital signs</li>
            <li>Results are displayed immediately and saved to your history</li>
          </ol>
        </div>
      </div>

      {/* Scan Modal */}
      <ScanModal isOpen={isScanModalOpen} onClose={() => setIsScanModalOpen(false)} onScanComplete={handleScanComplete} />
    </div>
  );
}
