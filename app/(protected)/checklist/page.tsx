"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/app/lib/api";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

export default function ChecklistPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const [responses, setResponses] = useState({
    severe_headache: false,
    blurred_vision: false,
    abdominal_pain: false,
    sudden_swelling: false,
    shortness_of_breath: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID provided. Please start a new scan.");
    }
  }, [sessionId]);

  const dangerSigns = [
    { key: "severe_headache", label: "Severe headache that won't go away" },
    { key: "blurred_vision", label: "Blurred or flashing vision" },
    { key: "abdominal_pain", label: "Upper abdominal pain" },
    { key: "sudden_swelling", label: "Sudden swelling of face, hands, or feet" },
    { key: "shortness_of_breath", label: "Shortness of breath or chest pain" },
  ];

  const handleToggle = (key: keyof typeof responses) => {
    setResponses((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = async () => {
    if (!sessionId) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await api.submitDangerSigns(sessionId, responses);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit checklist");
      console.error("Checklist submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (!sessionId) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          background: "var(--color-bg)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: "500px",
          }}
        >
          <AlertCircle size={48} style={{ color: "var(--color-primary)", margin: "0 auto 16px" }} />
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--color-dark)", margin: "0 0 8px 0" }}>
            Invalid Session
          </h1>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "24px" }}>
            No session ID found. Please start a new scan first.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
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
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (result) {
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
          {/* Risk Tier Result */}
          <div
            style={{
              background: riskTierBgColors[result.risk_tier as keyof typeof riskTierBgColors],
              border: `2px solid ${riskTierColors[result.risk_tier as keyof typeof riskTierColors]}`,
              borderRadius: "16px",
              padding: "32px",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            {result.risk_tier === "LOW" && <CheckCircle size={48} style={{ color: "var(--color-primary)", margin: "0 auto 16px" }} />}
            {result.risk_tier === "MODERATE" && (
              <AlertTriangle size={48} style={{ color: "#f59e0b", margin: "0 auto 16px" }} />
            )}
            {(result.risk_tier === "HIGH" || result.risk_tier === "CRITICAL") && (
              <AlertCircle size={48} style={{ color: "#ef4444", margin: "0 auto 16px" }} />
            )}

            <h1
              style={{
                fontSize: "32px",
                fontWeight: "800",
                color: riskTierColors[result.risk_tier as keyof typeof riskTierColors],
                margin: "0 0 8px 0",
              }}
            >
              {result.risk_tier} Risk
            </h1>

            <p style={{ fontSize: "16px", fontWeight: "600", color: "var(--color-text-muted)", margin: "0 0 16px 0" }}>
              Risk Score: {result.risk_score}%
            </p>

            <p style={{ fontSize: "14px", color: "var(--color-dark)", margin: "0" }}>
              Danger signs detected: {result.danger_sign_count} of 5
            </p>
          </div>

          {/* Submitted Responses */}
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
              Your Responses
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {dangerSigns.map(({ key, label }) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "12px",
                    background: result[key] ? "rgba(239, 68, 68, 0.1)" : "var(--color-accent)",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={result[key]}
                    disabled
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: "default",
                      accentColor: "var(--color-primary)",
                    }}
                  />
                  <label style={{ fontSize: "14px", color: "var(--color-dark)", fontWeight: "600", cursor: "default" }}>
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          {result.recommendation && (
            <div
              style={{
                background: "var(--color-accent)",
                borderLeft: `4px solid var(--color-primary)`,
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "24px",
              }}
            >
              <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--color-text-muted)", margin: "0 0 8px 0" }}>
                Clinical Recommendation
              </p>
              <p style={{ fontSize: "15px", color: "var(--color-dark)", margin: "0", fontWeight: "700" }}>
                {result.recommendation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
            <button
              onClick={() => router.push("/history")}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, var(--color-primary), var(--color-primary-light))`,
                color: "white",
                fontWeight: "800",
                border: "none",
                cursor: "pointer",
                fontSize: "15px",
                transition: "transform .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              View Full Results
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                background: "white",
                color: "var(--color-primary)",
                fontWeight: "800",
                border: "2px solid var(--color-primary)",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        {/* Header */}
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "var(--color-dark)", margin: "0 0 8px 0" }}>
            How are you feeling?
          </h1>
          <p style={{ fontSize: "15px", color: "var(--color-text-muted)", fontWeight: "600", margin: "0" }}>
            Please indicate if you're experiencing any of these symptoms
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
            }}
          >
            {error}
          </div>
        )}

        {/* Danger Signs Checkboxes */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px",
            boxShadow: "0 2px 12px rgba(0,0,0,.05)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {dangerSigns.map(({ key, label }) => (
              <label
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px",
                  borderRadius: "12px",
                  background: responses[key as keyof typeof responses] ? "var(--color-accent)" : "white",
                  border: `2px solid ${responses[key as keyof typeof responses] ? "var(--color-primary)" : "var(--color-border)"}`,
                  cursor: "pointer",
                  transition: ".2s",
                }}
                onMouseEnter={(e) => {
                  if (!responses[key as keyof typeof responses]) {
                    e.currentTarget.style.borderColor = "var(--color-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!responses[key as keyof typeof responses]) {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                  }
                }}
              >
                <input
                  type="checkbox"
                  checked={responses[key as keyof typeof responses]}
                  onChange={() => handleToggle(key as keyof typeof responses)}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                    accentColor: "var(--color-primary)",
                  }}
                />
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "var(--color-dark)",
                  }}
                >
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            background: isSubmitting ? "rgba(0,0,0,.1)" : `linear-gradient(135deg, var(--color-primary), var(--color-primary-light))`,
            color: "white",
            fontWeight: "800",
            border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            fontSize: "15px",
            transition: "transform .2s",
          }}
          onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.transform = "translateY(0)")}
        >
          {isSubmitting ? "Analyzing..." : "Submit & Get Results"}
        </button>
      </div>
    </div>
  );
}
