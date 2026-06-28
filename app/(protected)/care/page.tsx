"use client";

import { useState, useEffect } from "react";
import { api } from "@/app/lib/api";
import { MapPin, Phone, AlertCircle, Compass, MapIcon } from "lucide-react";
import Card from "@/app/components/Card";

export default function CarePage() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationStatus, setLocationStatus] = useState("Click below to find nearby hospitals");

  useEffect(() => {
    // Don't auto-fetch, let user click the button
  }, []);

  const requestLocation = async () => {
    setLoading(true);
    setError("");
    setLocationStatus("Getting your location...");

    try {
      // Request geolocation
      const position = await new Promise<GeolocationCoordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });

      setLocationStatus("Searching for nearby hospitals...");

      // Fetch hospitals within 10km (10000 meters)
      const result = await api.findHospitals(position.latitude, position.longitude, 10000);

      console.log("Hospitals found:", result);

      // Handle both array and object responses
      const hospitalsList = Array.isArray(result) ? result : result?.hospitals || [];

      if (hospitalsList.length === 0) {
        setError("No hospitals found nearby. Try expanding your search radius.");
        setHospitals([]);
      } else {
        setHospitals(hospitalsList);
        setLocationStatus(`Found ${hospitalsList.length} hospital${hospitalsList.length !== 1 ? "s" : ""} nearby`);
      }
    } catch (err: any) {
      console.error("Location/Hospital error:", err);

      if (err.code === 1) {
        setError("Location access denied. Please enable location permissions in your browser settings.");
      } else if (err.code === 2) {
        setError("Could not determine your location. Please check your internet connection.");
      } else if (err.code === 3) {
        setError("Location request timed out. Please try again.");
      } else {
        setError(err.message || "Failed to find nearby hospitals. Please try again.");
      }

      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", paddingBottom: "100px" }}>
      <div 
        style={{ maxWidth: "800px", margin: "0 auto", padding: "24px 16px" }}
        className="max-md:p-4 md:padding-40px-20px"
      >
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "var(--color-dark)", margin: "0 0 8px 0", lineHeight: "1.2" }} className="max-md:text-2xl">
            Find Healthcare Providers
          </h1>
          <p style={{ fontSize: "15px", color: "var(--color-text-muted)", fontWeight: "600", margin: "0" }}>
            Nearby hospitals and emergency services
          </p>
        </div>

        {/* Location Status */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "20px",
            textAlign: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,.05)",
          }}
          className="max-md:p-3"
        >
          <p style={{ fontSize: "15px", color: "var(--color-text-muted)", fontWeight: "600", margin: "0 0 16px 0" }}>
            {locationStatus}
          </p>

          <button
            onClick={requestLocation}
            disabled={loading}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "12px",
              background: loading ? "rgba(0,0,0,.1)" : "var(--color-primary)",
              color: "white",
              fontWeight: "800",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
              transition: ".2s",
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = "translateY(0)")}
          >
            <Compass size={18} />
            {loading ? "Searching..." : "Find Nearby Hospitals"}
          </button>
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

        {/* Hospitals List */}
        {hospitals.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {hospitals.map((hospital: any, index: number) => (
              <div
                key={index}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "20px",
                  boxShadow: "0 2px 12px rgba(0,0,0,.05)",
                  border: "2px solid transparent",
                  transition: ".2s",
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
                {/* Name */}
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "var(--color-dark)",
                    margin: "0 0 12px 0",
                  }}
                >
                  {hospital.name}
                </h3>

                {/* Distance */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                    padding: "8px 12px",
                    background: "var(--color-accent)",
                    borderRadius: "8px",
                    width: "fit-content",
                  }}
                >
                  <MapIcon size={16} style={{ color: "var(--color-primary)" }} />
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--color-dark)" }}>
                    {(hospital.distance / 1000).toFixed(1)} km away
                  </span>
                </div>

                {/* Address */}
                {hospital.address && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "12px" }}>
                    <MapPin size={16} style={{ color: "var(--color-text-muted)", marginTop: "2px", flexShrink: 0 }} />
                    <p style={{ fontSize: "14px", color: "var(--color-dark)", margin: "0", fontWeight: "600" }}>
                      {hospital.address}
                    </p>
                  </div>
                )}

                {/* Call Button */}
                <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      borderRadius: "8px",
                      background: "white",
                      border: "2px solid var(--color-primary)",
                      color: "var(--color-primary)",
                      fontWeight: "800",
                      textDecoration: "none",
                      textAlign: "center",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: ".2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--color-accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "white";
                    }}
                  >
                    View on Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State - Before search */}
        {!loading && hospitals.length === 0 && !error && (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "40px",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,.05)",
            }}
          >
            <MapPin size={48} style={{ color: "var(--color-primary)", margin: "0 auto 16px", opacity: 0.3 }} />
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "var(--color-dark)", margin: "0 0 8px 0" }}>
              Find Nearby Hospitals
            </h2>
            <p style={{ fontSize: "14px", color: "var(--color-text-muted)", margin: "0 0 16px 0", fontWeight: "600" }}>
              Click the button above to enable location and find hospitals near you
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
