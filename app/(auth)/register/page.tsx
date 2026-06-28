"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Mail, Lock, Phone, User, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "linear-gradient(180deg, #fff8f6 0%, var(--background) 100%)",
      }}
      className="auth-page max-md:grid-cols-1"
    >
      {/* Left Side - Branding */}
      <div
        style={{
          background: `linear-gradient(135deg, #9f4b42 0%, #d9897f 100%)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          color: "white",
        }}
        className="auth-brand-panel max-md:hidden"
      >
        <div style={{ textAlign: "center", maxWidth: "400px" }}>
          <Image
            src="/mamaguard-logo.png"
            alt="MamaGuard"
            width={120}
            height={120}
            style={{ marginBottom: "24px" }}
          />
          <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "16px", lineHeight: "1.2" }}>
            Join MamaGuard
          </h1>
          <p style={{ fontSize: "18px", opacity: 0.95, lineHeight: "1.6", marginBottom: "32px" }}>
            Get expert postpartum health monitoring and personalized care recommendations.
          </p>

          {/* Benefits */}
          <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              "Real-time vital signs monitoring",
              "AI-powered risk assessment",
              "24/7 emergency support",
              "Personalized health insights",
            ].map((benefit, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "16px",
                }}
              >
                <Check size={20} style={{ flexShrink: 0 }} />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
        className="auth-form-panel max-md:px-5"
      >
        <div className="auth-card" style={{ width: "100%", maxWidth: "440px" }}>
          {/* Mobile Logo */}
          <div style={{ textAlign: "center", marginBottom: "28px" }} className="md:hidden">
            <Image
              src="/mamaguard-logo.png"
              alt="MamaGuard"
              width={80}
              height={80}
              style={{ marginBottom: "16px", margin: "0 auto 16px" }}
            />
          </div>

          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "34px", fontWeight: "900", color: "var(--color-dark)", marginBottom: "8px", lineHeight: "1.1" }}>
              Create Account
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "16px" }}>
              Start your postpartum health journey today
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                background: "#fee",
                border: "1px solid #f5c6cb",
                color: "var(--color-primary)",
                padding: "14px 16px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          {/* Register Form */}
          <form className="auth-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Name */}
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "700", color: "var(--color-dark)", fontSize: "14px" }}>
                Full Name
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "white",
                  border: "2px solid var(--color-border)",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  gap: "12px",
                  transition: "border-color .2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              >
                <User size={20} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                <input
                  type="text"
                  name="name"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: "16px",
                    fontFamily: "inherit",
                    background: "transparent",
                    color: "var(--color-dark)",
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "700", color: "var(--color-dark)", fontSize: "14px" }}>
                Email Address
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "white",
                  border: "2px solid var(--color-border)",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  gap: "12px",
                  transition: "border-color .2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              >
                <Mail size={20} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: "16px",
                    fontFamily: "inherit",
                    background: "transparent",
                    color: "var(--color-dark)",
                  }}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "700", color: "var(--color-dark)", fontSize: "14px" }}>
                Phone Number
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "white",
                  border: "2px solid var(--color-border)",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  gap: "12px",
                  transition: "border-color .2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              >
                <Phone size={20} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: "16px",
                    fontFamily: "inherit",
                    background: "transparent",
                    color: "var(--color-dark)",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "700", color: "var(--color-dark)", fontSize: "14px" }}>
                Password
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "white",
                  border: "2px solid var(--color-border)",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  gap: "12px",
                  transition: "border-color .2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              >
                <Lock size={20} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: "16px",
                    fontFamily: "inherit",
                    background: "transparent",
                    color: "var(--color-dark)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0",
                    color: "var(--color-text-muted)",
                    flexShrink: 0,
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "700", color: "var(--color-dark)", fontSize: "14px" }}>
                Confirm Password
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "white",
                  border: "2px solid var(--color-border)",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  gap: "12px",
                  transition: "border-color .2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              >
                <Lock size={20} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: "16px",
                    fontFamily: "inherit",
                    background: "transparent",
                    color: "var(--color-dark)",
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="auth-submit"
              type="submit"
              disabled={isLoading}
              style={{
                background: isLoading ? "var(--color-text-muted)" : `linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)`,
                color: "white",
                border: "none",
                padding: "16px 24px",
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: "800",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "transform .2s, box-shadow .2s",
                marginTop: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 8px 24px rgba(168, 85, 74, 0.2)",
              }}
              onMouseEnter={(e) =>
                !isLoading && ((e.currentTarget.style.transform = "translateY(-2px)"), (e.currentTarget.style.boxShadow = "0 12px 32px rgba(168, 85, 74, 0.3)"))
              }
              onMouseLeave={(e) =>
                !isLoading && ((e.currentTarget.style.transform = "translateY(0)"), (e.currentTarget.style.boxShadow = "0 8px 24px rgba(168, 85, 74, 0.2)"))
              }
            >
              {isLoading ? "Creating account..." : <>Create Account<ArrowRight size={20} /></>}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="auth-switch" style={{ textAlign: "center", marginTop: "32px", paddingTop: "32px", borderTop: "1px solid var(--color-border)" }}>
            <p style={{ color: "var(--color-text-muted)", fontSize: "16px" }}>
              Already have an account?{" "}
              <Link
                href="/login"
                style={{
                  color: "var(--color-primary)",
                  fontWeight: "800",
                  textDecoration: "none",
                  transition: "opacity .2s",
                }}
                className="hover:opacity-75"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
