"use client";

import { Baby, Droplet, Heart, Activity } from "lucide-react";
import Card from "@/app/components/Card";

export default function BabyPage() {
  return (
    <div style={{ background: "var(--background)", minHeight: "100vh", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px" }} className="max-md:px-5">
        <h1 style={{ fontSize: "42px", fontWeight: "800", color: "var(--color-dark)", marginBottom: "20px" }}>
          Baby Care
        </h1>

        <p style={{ color: "var(--color-text-muted)", fontSize: "16px", marginBottom: "40px" }}>
          Essential information and tips for your baby's health and development
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
          }}
        >
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <Baby size={28} style={{ color: "var(--color-primary)" }} />
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--color-dark)", margin: 0 }}>
                Newborn Care
              </h3>
            </div>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "1.6" }}>
              Learn about umbilical cord care, bathing, and keeping your newborn comfortable.
            </p>
          </Card>

          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <Droplet size={28} style={{ color: "var(--color-primary)" }} />
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--color-dark)", margin: 0 }}>
                Feeding
              </h3>
            </div>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "1.6" }}>
              Breastfeeding and formula feeding tips to support your baby's nutrition and growth.
            </p>
          </Card>

          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <Heart size={28} style={{ color: "var(--color-primary)" }} />
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--color-dark)", margin: 0 }}>
                Health Milestones
              </h3>
            </div>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "1.6" }}>
              Track your baby's development and learn about important health checkups.
            </p>
          </Card>

          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <Activity size={28} style={{ color: "var(--color-primary)" }} />
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--color-dark)", margin: 0 }}>
                Safety
              </h3>
            </div>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "1.6" }}>
              Essential safety practices for sleep, car rides, and creating a safe environment.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
