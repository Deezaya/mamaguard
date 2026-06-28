"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, History, MapPin, Baby } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/history", label: "History", icon: History },
    { href: "/care", label: "Care", icon: MapPin },
    { href: "/baby", label: "Baby", icon: Baby },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 md:hidden z-50 flex justify-around items-center gap-1 rounded-t-3xl bg-white"
      style={{
        boxShadow: "0 -8px 24px rgba(0,0,0,.08)",
        padding: "12px 8px 20px 8px",
        height: "auto",
      }}
    >
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center gap-1 text-center no-underline transition-all duration-200 hover:scale-110 p-2 rounded-lg flex-1"
          style={{
            color: isActive(href) ? "var(--color-primary)" : "var(--color-text-secondary)",
            background: isActive(href) ? "var(--color-accent)" : "transparent",
            minHeight: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={22} />
          <span style={{ fontSize: "11px", fontWeight: "700", marginTop: "2px" }}>{label}</span>
        </Link>
      ))}
    </div>
  );
}
