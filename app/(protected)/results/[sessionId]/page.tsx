"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/app/lib/api";
import { ArrowLeft, Heart, Wind, Activity, AlertCircle, CheckCircle } from "lucide-react";

export default function ScanDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [summary, setSummary] = useState<any>(null);
  const [riskScore, setRiskScore] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const [summaryData, riskData] = await Promise.all([
          api.getScanSummary(sessionId),
          api.getRiskAssessment(sessionId),
        ]);
        console.log(summaryData)
        setSummary(summaryData);
        setRiskScore(riskData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load scan details");
        console.error("Error fetching scan details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg)",
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
            Loading scan details...
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

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "32px 20px",
          background: "var(--color-bg)",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <AlertCircle size={48} style={{ color: "#ef4444", margin: "0 auto 16px" }} />
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--color-dark)", margin: "0 0 8px 0" }}>
            Error Loading Scan
          </h1>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "24px" }}>
            {error}
          </p>
          <button
            onClick={() => router.back()}
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              background: "var(--color-primary)",
              color: "white",
              fontWeight: "800",
              border: "none",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const riskTierColors = {
    LOW: "var(--color-primary)",
    MODERATE: "#f59e0b",
    HIGH: "#ef4444",
    CRITICAL: "#7f1d1d",
  };

  const riskTierBgColors = {
    LOW: "rgba(168, 85, 74, 0.1)",
    MODERATE: "rgba(245, 158, 11, 0.1)",
    HIGH: "rgba(239, 68, 68, 0.1)",
    CRITICAL: "rgba(127, 29, 29, 0.1)",
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 20px",
        background: "var(--color-bg)",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-primary)",
            fontWeight: "700",
            fontSize: "14px",
            marginBottom: "24px",
            padding: "8px 0",
          }}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Risk Tier Card */}
        <div
          style={{
            background: riskTierBgColors[riskScore?.risk_tier as keyof typeof riskTierBgColors],
            border: `2px solid ${riskTierColors[riskScore?.risk_tier as keyof typeof riskTierColors]}`,
            borderRadius: "16px",
            padding: "28px",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          {riskScore?.risk_tier === "LOW" && (
            <CheckCircle size={48} style={{ color: "var(--color-primary)", margin: "0 auto 16px" }} />
          )}
          {riskScore?.risk_tier === "MODERATE" && (
            <AlertCircle size={48} style={{ color: "#f59e0b", margin: "0 auto 16px" }} />
          )}
          {(riskScore?.risk_tier === "HIGH" || riskScore?.risk_tier === "CRITICAL") && (
            <AlertCircle size={48} style={{ color: "#ef4444", margin: "0 auto 16px" }} />
          )}

          <h1
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: riskTierColors[riskScore?.risk_tier as keyof typeof riskTierColors],
              margin: "0 0 8px 0",
            }}
          >
            {riskScore?.risk_tier} Risk
          </h1>

          <p style={{ fontSize: "16px", fontWeight: "600", color: "var(--color-text-muted)", margin: "0" }}>
            Score: {riskScore?.risk_score}%
          </p>
        </div>

        {/* Vital Signs */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 2px 12px rgba(0,0,0,.05)",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "var(--color-dark)", margin: "0 0 16px 0" }}>
            Vital Signs
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {/* Heart Rate */}
            <div style={{ padding: "16px", background: "var(--color-accent)", borderRadius: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Heart size={18} style={{ color: "var(--color-primary)" }} />
                <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-text-muted)" }}>
                  Heart Rate
                </span>
              </div>
              <p style={{ fontSize: "24px", fontWeight: "800", color: "var(--color-dark)", margin: "0" }}>
                {summary?.heart_rate?.toFixed(1)}
                <span style={{ fontSize: "14px", fontWeight: "600", marginLeft: "4px" }}>bpm</span>
              </p>
            </div>

            {/* Respiratory Rate */}
            <div style={{ padding: "16px", background: "var(--color-accent)", borderRadius: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Wind size={18} style={{ color: "var(--color-primary)" }} />
                <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-text-muted)" }}>
                  Respiratory Rate
                </span>
              </div>
              <p style={{ fontSize: "24px", fontWeight: "800", color: "var(--color-dark)", margin: "0" }}>
                {summary?.respiratory_rate?.toFixed(1)}
                <span style={{ fontSize: "14px", fontWeight: "600", marginLeft: "4px" }}>rpm</span>
              </p>
            </div>

            {/* HRV */}
            <div style={{ padding: "16px", background: "var(--color-accent)", borderRadius: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Activity size={18} style={{ color: "var(--color-primary)" }} />
                <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-text-muted)" }}>
                  Heart Rate Variability
                </span>
              </div>
              <p style={{ fontSize: "24px", fontWeight: "800", color: "var(--color-dark)", margin: "0" }}>
                {summary?.hrv?.toFixed(1)}
              </p>
            </div>

            {/* Frames */}
            <div style={{ padding: "16px", background: "var(--color-accent)", borderRadius: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Activity size={18} style={{ color: "var(--color-primary)" }} />
                <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-text-muted)" }}>
                  Frames Processed
                </span>
              </div>
              <p style={{ fontSize: "24px", fontWeight: "800", color: "var(--color-dark)", margin: "0" }}>
                {summary?.total_frames}
              </p>
            </div>
          </div>
        </div>

        {/* Danger Signs */}
        {summary?.checklist && (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "24px",
              boxShadow: "0 2px 12px rgba(0,0,0,.05)",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "800", color: "var(--color-dark)", margin: "0 0 16px 0" }}>
              Danger Signs Assessment
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { key: "severe_headache", label: "Severe headache" },
                { key: "blurred_vision", label: "Blurred vision" },
                { key: "abdominal_pain", label: "Abdominal pain" },
                { key: "sudden_swelling", label: "Sudden swelling" },
                { key: "shortness_of_breath", label: "Shortness of breath" },
              ].map(({ key, label }) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "12px",
                    background: summary.checklist[key] ? "rgba(239, 68, 68, 0.1)" : "var(--color-accent)",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={summary.checklist[key]}
                    disabled
                    style={{
                      width: "18px",
                      height: "18px",
                      cursor: "default",
                      accentColor: "var(--color-primary)",
                    }}
                  />
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--color-dark)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: "16px 0 0 0", fontWeight: "600" }}>
              Signs detected: {summary.checklist.danger_sign_count} of 5
            </p>
          </div>
        )}

        {/* Recommendation */}
        {riskScore?.recommendation && (
          <div
            style={{
              background: "var(--color-accent)",
              borderLeft: `4px solid var(--color-primary)`,
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "24px",
            }}
          >
            <p style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-text-muted)", margin: "0 0 8px 0" }}>
              CLINICAL RECOMMENDATION
            </p>
            <p style={{ fontSize: "15px", color: "var(--color-dark)", margin: "0", fontWeight: "700" }}>
              {riskScore.recommendation}
            </p>
          </div>
        )}

        {/* Metadata */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,.05)",
          }}
        >
          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "0", fontWeight: "600" }}>
            Scan Date: {summary?.created_at ? formatDate(summary.created_at) : "N/A"}
          </p>
          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: "8px 0 0 0", fontWeight: "600" }}>
            Duration: {summary?.duration_seconds?.toFixed(1)}s
          </p>
        </div>
      </div>
    </div>
  );
}
