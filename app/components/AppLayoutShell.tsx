'use client';

import { usePathname } from 'next/navigation';
import NavBar from './NavBar';

type AppLayoutShellProps = {
  children: React.ReactNode;
};

const NAVBAR_ROUTES = ['/dashboard', '/history', '/find-care', '/baby'];

export default function AppLayoutShell({ children }: AppLayoutShellProps) {
  const pathname = usePathname();

  const showNavbar = NAVBAR_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <>
      {showNavbar && <NavBar />}
      {children}
    </>
  );
}
