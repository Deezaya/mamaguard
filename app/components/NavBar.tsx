'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Baby, History, LayoutDashboard, Leaf, MapPin, UserRound } from 'lucide-react';

const NavBar = () => {
	const pathname = usePathname();

	const linkClass = (path: string) =>
		`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition ${
			pathname === path ? 'bg-[#F8E4DF] text-[#A8554A]' : 'text-[#9B8A84] hover:bg-[#F8E4DF]/60'
		}`;

	return (
		<nav className="sticky top-0 z-30 bg-white border-b border-[#eadbd1]">
			<div className="max-w-6xl mx-auto h-[75px] px-6 md:px-8 flex items-center justify-between gap-4">
				<Link href="/dashboard" className="flex items-center gap-2 text-[#A8554A] font-extrabold text-xl md:text-2xl">
					<Leaf size={22} />
					<span>MamaGuard</span>
				</Link>

				<div className="hidden md:flex items-center gap-2">
					<Link href="/dashboard" className={linkClass('/dashboard')}>
						<LayoutDashboard size={18} />
						<span>Dashboard</span>
					</Link>
					<Link href="/history" className={linkClass('/history')}>
						<History size={18} />
						<span>History</span>
					</Link>
					<Link href="/find-care" className={linkClass('/find-care')}>
						<MapPin size={18} />
						<span>Find Care</span>
					</Link>
					<Link href="/baby" className={linkClass('/baby')}>
						<Baby size={18} />
						<span>Baby</span>
					</Link>
				</div>

				<div className="flex items-center gap-2 text-[#2E2228]">
					<div className="w-10 h-10 rounded-full bg-[#F8E4DF] flex items-center justify-center text-[#A8554A]">
						<UserRound size={18} />
					</div>
					<span className="hidden sm:inline font-bold">Mama</span>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;