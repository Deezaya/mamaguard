"use client";

import { ArrowRight, Building2, Eye, EyeOff, Lock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

function FieldShell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-[var(--color-dark)]">{label}</label>
      <div className="flex items-center gap-3 rounded-[14px] border-2 border-[var(--color-border)] bg-white px-[18px] py-[14px] transition focus-within:border-[var(--color-primary)]">
        {children}
      </div>
    </div>
  );
}

export default function HospitalRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page grid min-h-screen grid-cols-1 bg-[linear-gradient(180deg,#fff8f6_0%,var(--background)_100%)] md:grid-cols-2">
      <aside className="auth-brand-panel hidden min-h-screen flex-col items-center justify-center bg-[linear-gradient(135deg,#7d4038_0%,#c97970_100%)] p-10 text-white md:flex">
        <div className="max-w-[430px] text-center">
          <Image src="/mamaguard-logo.png" alt="MamaGuard" width={118} height={118} className="mx-auto mb-6" />
          <h1 className="mb-4 text-[42px] font-extrabold leading-tight text-white">Join as a Hospital</h1>
          <p className="text-lg font-semibold leading-8 text-white/90">
            Create a dedicated care partner profile for referrals, urgent alerts, and postpartum support.
          </p>
          <div className="mt-8 grid gap-3 text-left">
            {["Facility profile", "Care desk contact", "Referral-ready setup", "Secure team access"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/12 p-4 font-bold">
                <ShieldCheck size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="auth-form-panel flex min-h-screen flex-col items-center justify-center px-5 py-8 md:p-10">
        <div className="auth-card w-full max-w-[470px]">
          <div className="mb-7 text-center md:hidden">
            <Image src="/mamaguard-logo.png" alt="MamaGuard" width={82} height={82} className="mx-auto mb-4" />
          </div>

          <div className="mb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1ef] text-[var(--color-primary)]">
              <Building2 size={24} />
            </div>
            <h2 className="mb-2 text-[34px] font-black leading-tight text-[var(--color-dark)]">Hospital Sign Up</h2>
            <p className="text-base font-semibold text-[var(--color-text-muted)]">Set up your care team profile</p>
          </div>

          <form
            className="auth-form flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <FieldShell label="Hospital Name">
              <Building2 size={20} className="shrink-0 text-[var(--color-primary)]" />
              <input className="min-w-0 flex-1 bg-transparent text-base text-[var(--color-dark)] outline-none" type="text" placeholder="St. Mary's Hospital" />
            </FieldShell>

            <FieldShell label="Work Email">
              <Mail size={20} className="shrink-0 text-[var(--color-primary)]" />
              <input className="min-w-0 flex-1 bg-transparent text-base text-[var(--color-dark)] outline-none" type="email" placeholder="careteam@hospital.com" />
            </FieldShell>

            <FieldShell label="Phone Number">
              <Phone size={20} className="shrink-0 text-[var(--color-primary)]" />
              <input className="min-w-0 flex-1 bg-transparent text-base text-[var(--color-dark)] outline-none" type="tel" placeholder="+234 800 000 0000" />
            </FieldShell>

            <FieldShell label="Hospital Address">
              <MapPin size={20} className="shrink-0 text-[var(--color-primary)]" />
              <input className="min-w-0 flex-1 bg-transparent text-base text-[var(--color-dark)] outline-none" type="text" placeholder="Street, city, state" />
            </FieldShell>

            <FieldShell label="Password">
              <Lock size={20} className="shrink-0 text-[var(--color-primary)]" />
              <input className="min-w-0 flex-1 bg-transparent text-base text-[var(--color-dark)] outline-none" type={showPassword ? "text" : "password"} placeholder="Create password" />
              <button type="button" onClick={() => setShowPassword((current) => !current)} className="shrink-0 text-[var(--color-text-muted)]">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </FieldShell>

            <button className="auth-submit mt-3 flex min-h-[54px] items-center justify-center gap-2 rounded-[14px] border-0 bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-primary-light)_100%)] px-6 py-4 text-base font-extrabold text-white shadow-[0_8px_24px_rgba(168,85,74,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(168,85,74,0.3)]">
              Create Hospital Account
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="auth-switch mt-8 border-t border-[var(--color-border)] pt-8 text-center">
            <p className="text-base text-[var(--color-text-muted)]">
              Already registered?{" "}
              <Link href="/hospital-login" className="font-extrabold text-[var(--color-primary)] no-underline hover:opacity-75">
                Sign In
              </Link>
            </p>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              Not a hospital?{" "}
              <Link href="/register" className="font-extrabold text-[var(--color-primary)] no-underline hover:opacity-75">
                Patient sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
