"use client";

import { useState, useRef, useEffect } from "react";
import { X, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { api } from "@/app/lib/api";

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete?: (sessionId: string) => void;
}

export default function ScanModal({ isOpen, onClose, onScanComplete }: ScanModalProps) {
  const router = useRouter();
  const { token } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [timer, setTimer] = useState(15);
  const [status, setStatus] = useState("Ready to scan");
  const [progress, setProgress] = useState(0);
  const [scanResult, setScanResult] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setStatus("Requesting camera access...");
      setTimer(15);
      setProgress(0);

      // Verify token
      if (!token) {
        setStatus("Authentication error. Please login again.");
        setIsRecording(false);
        return;
      }

      api.setToken(token);
      console.log("[ScanModal] Starting video recording...");

      // Get camera stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setStatus("Recording... keep your face centered");
      
      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/mp4",
      });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        console.log("[ScanModal] Recording stopped, processing video...");
        await processRecordedVideo();
      };

      mediaRecorder.start();

      // Start countdown timer
      let timeLeft = 15;
      timerIntervalRef.current = setInterval(() => {
        timeLeft--;
        setTimer(timeLeft);
        setProgress(((15 - timeLeft) / 15) * 100);

        if (timeLeft <= 0) {
          stopRecording();
        }
      }, 1000);
    } catch (error) {
      console.error("[ScanModal] Error starting recording:", error);
      setStatus("Camera access denied. Please check permissions.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    console.log("[ScanModal] Stopping recording...");
    
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    setIsRecording(false);
    setStatus("Processing video...");
    setProgress(100);
  };

  const processRecordedVideo = async () => {
    try {
      setIsAnalyzing(true);
      setStatus("Analyzing video...");

      // Create blob from recorded chunks
      const videoBlob = new Blob(chunksRef.current, { type: "video/mp4" });
      console.log(`[ScanModal] Video blob created: ${videoBlob.size} bytes`);

      // Send to backend for analysis
      console.log("[ScanModal] Sending video to backend...");
      const result = await api.analyzeVideo(videoBlob) as any;

      console.log("[ScanModal] Video analysis result:", result);

      setScanResult(result);
      setStatus("Scan complete ✓");

      // Store session ID for next steps
      const sessionId = result.session_id;

      // Callback if provided
      if (onScanComplete) {
        onScanComplete(sessionId);
      }

      // Auto-navigate to checklist after 2 seconds
      setTimeout(() => {
        router.push(`/checklist?sessionId=${sessionId}`);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("[ScanModal] Error analyzing video:", error);
      setStatus("Error analyzing video. Please try again.");
      setIsAnalyzing(false);
    }
  };

  const handleClose = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    onClose();
  };

  useEffect(() => {
    if (isOpen && !isRecording && !isAnalyzing) {
      setTimeout(() => startRecording(), 500);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isOpen, isRecording, isAnalyzing]);

  if (!isOpen) return null;

  return (
    <>
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        backdropFilter: "blur(8px)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "32px",
          background: "white",
          borderRadius: "24px",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,.3)",
        }}
        className="max-md:rounded-2xl max-md:p-4 max-md:max-h-screen max-md:m-4"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isRecording || isAnalyzing}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: isRecording || isAnalyzing ? "var(--color-border)" : "var(--color-accent)",
            border: "none",
            color: "var(--color-primary)",
            cursor: isRecording || isAnalyzing ? "not-allowed" : "pointer",
            opacity: isRecording || isAnalyzing ? 0.5 : 1,
            padding: "8px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: ".2s",
          }}
        >
          <X size={24} />
        </button>

        <div style={{ textAlign: "center" }}>
          {/* Title */}
          <h2 style={{ fontSize: "28px", fontWeight: "800", color: "var(--color-dark)", margin: "0 0 8px 0", lineHeight: "1.2" }} className="max-md:text-2xl">
            Health Scan
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "14px", fontWeight: "600", margin: "0 0 24px 0" }} className="max-md:text-sm">
            Keep your face centered in the camera
          </p>

          {/* Video Preview */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "280px",
              aspectRatio: "1",
              margin: "24px auto 28px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid var(--color-primary)",
              boxShadow: "0 8px 32px rgba(168, 85, 74, 0.3)",
              background: "black",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scaleX(-1)",
              }}
            />

            {/* Recording Indicator */}
            {isRecording && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "3px solid var(--color-primary)",
                  animation: "pulse 1s infinite",
                }}
              />
            )}
          </div>

          {/* Timer */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: "800",
              color: "var(--color-primary)",
              margin: "16px 0",
              fontVariantNumeric: "tabular-nums",
            }}
            className="max-md:text-3xl"
          >
            {isRecording ? timer : isAnalyzing ? "⏳" : "✓"}
          </div>

          {/* Status */}
          <div
            style={{
              fontSize: "15px",
              color: "var(--color-text-muted)",
              fontWeight: "600",
              marginBottom: "24px",
              minHeight: "20px",
            }}
          >
            {status}
          </div>

          {/* Progress Bar */}
          <div
            style={{
              height: "6px",
              background: "var(--color-border)",
              borderRadius: "3px",
              overflow: "hidden",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: `linear-gradient(90deg, var(--color-primary), var(--color-primary-light))`,
                borderRadius: "3px",
                transition: "width .3s ease",
              }}
            />
          </div>

          {/* Results (shown after analysis) */}
          {scanResult && (
            <div
              style={{
                background: "var(--color-accent)",
                padding: "20px",
                borderRadius: "16px",
                marginBottom: "24px",
                textAlign: "left",
                animation: "appear .5s ease",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "800",
                  color: "var(--color-primary)",
                  margin: "0 0 16px 0",
                  textAlign: "center",
                }}
              >
                Scan Results
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--color-text-muted)",
                      fontWeight: "700",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Heart Rate
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: "800", color: "var(--color-dark)", margin: "0" }}>
                    {scanResult.heart_rate ? scanResult.heart_rate.toFixed(0) : "—"}{" "}
                    <span style={{ fontSize: "12px", fontWeight: "600" }}>bpm</span>
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "var(--color-text-muted)",
                      fontWeight: "600",
                      margin: "4px 0 0 0",
                    }}
                  >
                    ({Math.round(scanResult.heart_rate_confidence * 100)}%)
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--color-text-muted)",
                      fontWeight: "700",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Respiratory Rate
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: "800", color: "var(--color-dark)", margin: "0" }}>
                    {scanResult.respiratory_rate ? scanResult.respiratory_rate.toFixed(0) : "—"}{" "}
                    <span style={{ fontSize: "12px", fontWeight: "600" }}>rpm</span>
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "var(--color-text-muted)",
                      fontWeight: "600",
                      margin: "4px 0 0 0",
                    }}
                  >
                    ({Math.round(scanResult.respiratory_rate_confidence * 100)}%)
                  </p>
                </div>
              </div>

              <p
                style={{
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                  fontWeight: "600",
                  margin: "12px 0 0 0",
                  textAlign: "center",
                }}
              >
                {scanResult.total_frames} frames analyzed ({scanResult.valid_frames} valid)
              </p>
            </div>
          )}

          {/* Control Button */}
          {isRecording && !scanResult && (
            <button
              onClick={stopRecording}
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: "12px",
                background: "white",
                border: "2px solid var(--color-primary)",
                color: "var(--color-primary)",
                fontWeight: "800",
                cursor: "pointer",
                transition: ".2s",
                fontSize: "15px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
              }}
            >
              Stop Scan
            </button>
          )}

          {!isRecording && isAnalyzing && (
            <button
              disabled
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: "12px",
                background: "var(--color-border)",
                border: "none",
                color: "var(--color-text-muted)",
                fontWeight: "800",
                cursor: "not-allowed",
                fontSize: "15px",
              }}
            >
              Analyzing Video...
            </button>
          )}

          {scanResult && !isRecording && !isAnalyzing && (
            <button
              onClick={() => router.push(`/checklist?sessionId=${scanResult.session_id}`)}
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, var(--color-primary), var(--color-primary-light))`,
                border: "none",
                color: "white",
                fontWeight: "800",
                cursor: "pointer",
                transition: "transform .2s, box-shadow .2s",
                fontSize: "15px",
                boxShadow: "0 8px 20px rgba(168, 85, 74, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(168, 85, 74, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(168, 85, 74, 0.2)";
              }}
            >
              Continue to Assessment
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes appear {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
    </>
  );
}
