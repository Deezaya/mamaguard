"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Activity, Baby, CheckCircle2, HeartPulse, Hospital, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="landing-loading">
        <div style={{ textAlign: "center" }}>
          <div className="loading-ring" />
          <p style={{ color: "var(--color-text-muted)" }}>Loading...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: HeartPulse,
      title: "Camera-based vitals",
      description: "Capture heart and breathing signals with a quick face scan, no extra device required.",
    },
    {
      icon: ShieldCheck,
      title: "Risk-aware check-ins",
      description: "Combine vitals with danger sign questions so recovery concerns are easier to spot.",
    },
    {
      icon: Hospital,
      title: "Care nearby",
      description: "Find hospitals and care providers quickly when symptoms need attention.",
    },
  ];

  const steps = ["Scan your vitals", "Answer warning-sign questions", "Get a clear risk summary"];

  return (
    <div className="landing-page">
      <header className="landing-header">
        <Link href="/" className="landing-brand">
          <Image src="/mamaguard-logo.png" alt="MamaGuard" width={42} height={42} />
          <span>MamaGuard</span>
        </Link>

        <nav className="landing-actions" aria-label="Account actions">
          <Link href="/login" className="btn btn-secondary">
            Sign In
          </Link>
          <Link href="/register" className="btn btn-primary">
            Get Started
          </Link>
        </nav>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero__copy">
            <p className="landing-kicker">Postpartum health monitoring</p>
            <h1>Know when recovery needs attention.</h1>
            <p className="landing-lede">
              MamaGuard helps new mothers track vital signs, check danger symptoms, and find nearby care during the
              postpartum period.
            </p>

            <div className="landing-hero__actions">
              <Link href="/register" className="btn btn-primary btn-large">
                Create Account
              </Link>
              <Link href="/login" className="btn btn-secondary btn-large">
                Sign In
              </Link>
            </div>
          </div>

          <div className="landing-preview" aria-label="MamaGuard dashboard preview">
            <div className="preview-top">
              <div>
                <p>Day 14 postpartum</p>
                <h2>Good morning, Mama</h2>
              </div>
              <Activity size={28} />
            </div>
            <div className="preview-scan">
              <p>STEP 1 · HEALTH SCAN</p>
              <h3>Ready for your scan?</h3>
              <span>Start Face Scan</span>
            </div>
            <div className="preview-grid">
              <div>
                <HeartPulse size={22} />
                <span>Vitals</span>
              </div>
              <div>
                <Baby size={22} />
                <span>Baby care</span>
              </div>
              <div>
                <Hospital size={22} />
                <span>Nearby care</span>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-steps" aria-label="How MamaGuard works">
          {steps.map((step, index) => (
            <div key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </section>

        <section className="landing-features">
          {features.map(({ icon: Icon, title, description }) => (
            <article key={title} className="landing-feature-card">
              <div className="feature-icon">
                <Icon size={28} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </section>

        <section className="landing-care-note">
          <div>
            <CheckCircle2 size={30} />
            <h2>Built for daily postpartum check-ins</h2>
          </div>
          <p>
            MamaGuard is designed to make repeated health checks feel simple: scan, answer a few symptom questions,
            review your risk level, and know your next step.
          </p>
        </section>
      </main>

      <footer className="landing-footer">
        <p>© 2026 MamaGuard. Taking care of mamas, one scan at a time.</p>
      </footer>
    </div>
  );
}
