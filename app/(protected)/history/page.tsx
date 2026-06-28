"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/api";
import { Heart, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const router = useRouter();
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScans = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await api.getAllScans();
        console.log("Scans fetched:", data);

        // Handle both array and paginated response
        const scansList = Array.isArray(data) ? data : data?.sessions || [];
        console.log(scansList)
        setScans(scansList);
      } catch (err) {
        console.error("Error fetching scans:", err);
        setError(err instanceof Error ? err.message : "Failed to load scan history");
        // Set empty list to show empty state
        setScans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRiskTierColor = (tier: string) => {
    switch (tier) {
      case "LOW":
        return "var(--color-primary)";
      case "MODERATE":
        return "#f59e0b";
      case "HIGH":
        return "#ef4444";
      case "CRITICAL":
        return "#7f1d1d";
      default:
        return "var(--color-text-muted)";
    }
  };

  const getRiskTierBg = (tier: string) => {
    switch (tier) {
      case "LOW":
        return "rgba(168, 85, 74, 0.1)";
      case "MODERATE":
        return "rgba(245, 158, 11, 0.1)";
      case "HIGH":
        return "rgba(239, 68, 68, 0.1)";
      case "CRITICAL":
        return "rgba(127, 29, 29, 0.1)";
      default:
        return "var(--color-accent)";
    }
  };

  if (loading) {
    return (
      <div
        style={{
          background: "var(--color-bg)",
          minHeight: "100vh",
          paddingBottom: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "4px solid var(--color-accent)",
              borderTopColor: "var(--color-primary)",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ color: "var(--color-text-muted)", fontWeight: "600" }}>
            Loading scan history...
          </p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", paddingBottom: "100px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 20px" }} className="max-md:p-4">
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "800", color: "var(--color-dark)", margin: "0 0 8px 0", lineHeight: "1.2" }} className="max-md:text-2xl">
            Scan History
          </h1>
          <p style={{ fontSize: "15px", color: "var(--color-text-muted)", fontWeight: "600", margin: "0" }}>
            {scans.length} {scans.length === 1 ? "scan" : "scans"} on record
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "2px solid #ef4444",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
              color: "#dc2626",
              fontWeight: "600",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Empty State */}
        {scans.length === 0 ? (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "40px",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,.05)",
            }}
          >
            <Heart size={48} style={{ color: "var(--color-primary)", margin: "0 auto 16px", opacity: 0.3 }} />
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "var(--color-dark)", margin: "0 0 8px 0" }}>
              No Scans Yet
            </h2>
            <p style={{ fontSize: "15px", color: "var(--color-text-muted)", margin: "0 0 24px 0", fontWeight: "600" }}>
              Start your first health scan from the dashboard to see your history here.
            </p>
            <Link
              href="/dashboard"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                borderRadius: "12px",
                background: "var(--color-primary)",
                color: "white",
                textDecoration: "none",
                fontWeight: "800",
                fontSize: "14px",
              }}
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          /* Scans List */
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {scans.map((scan: any, index: number) => (
              <Link
                key={scan.id || index}
                href={`/results/${scan.id || scan.session_id}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  background: "white",
                  borderRadius: "16px",
                  padding: "20px",
                  boxShadow: "0 2px 12px rgba(0,0,0,.05)",
                  border: "2px solid transparent",
                  transition: ".2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,.05)";
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    gap: "20px",
                  }}
                  className="max-md:grid-cols-1"
                >
                  {/* Left: Date & Info */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <Calendar size={16} style={{ color: "var(--color-primary)" }} />
                      <p style={{ fontSize: "13px", fontWeight: "700", color: "var(--color-text-muted)", margin: "0" }}>
                        {formatDate(scan.created_at || scan.started_at)}
                      </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }}>
                      <div>
                        <p style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-text-muted)", margin: "0 0 4px 0" }}>
                          Heart Rate
                        </p>
                        <p style={{ fontSize: "18px", fontWeight: "800", color: "var(--color-dark)", margin: "0" }}>
                          {scan.heart_rate?.toFixed(0) || "—"} <span style={{ fontSize: "12px" }}>bpm</span>
                        </p>
                      </div>
                      {/* <div>
                        <p style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-text-muted)", margin: "0 0 4px 0" }}>
                          Respiratory Rate
                        </p>
                        <p style={{ fontSize: "18px", fontWeight: "800", color: "var(--color-dark)", margin: "0" }}>
                          {scan.respiratory_rate?.toFixed(0) || "—"} <span style={{ fontSize: "12px" }}>rpm</span>
                        </p>
                      </div> */}
                    </div>
                  </div>

                  {/* Right: Risk Tier Badge */}
                  <div
                    style={{
                      background: getRiskTierBg(scan.risk_tier),
                      border: `2px solid ${getRiskTierColor(scan.risk_tier)}`,
                      borderRadius: "12px",
                      padding: "16px 20px",
                      textAlign: "center",
                      minWidth: "140px",
                    }}
                  >
                    <p style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-text-muted)", margin: "0 0 4px 0" }}>
                      Risk Level
                    </p>
                    <p style={{ fontSize: "18px", fontWeight: "800", color: getRiskTierColor(scan.risk_tier), margin: "0" }}>
                      {scan.risk_tier || "—"}
                    </p>
                    <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-text-muted)", margin: "8px 0 0 0" }}>
                      Score: {scan.risk_score?.toFixed(0) || "—"}%
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
