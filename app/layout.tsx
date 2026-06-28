import type { Metadata } from "next";
import "./globals.css";
import { QueryClientProvider } from "./providers/QueryClientProvider";

export const metadata: Metadata = {
  title: "MamaGuard - Postpartum Health Companion",
  description: "Your trusted postpartum care companion",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
