"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/tabs", label: "Tabs" },
    { href: "/admin/test-series", label: "Test Series" },
    { href: "/admin/questions-bank", label: "Questions Bank" },
    { href: "/admin/create-test", label: "Create Test" },
    { href: "/admin/live-test-scheduler", label: "Live Tests" },
    { href: "/admin/banners-slider", label: "Banners & Slider" },
    { href: "/admin/users-management", label: "Users Management" },
    { href: "/admin/transactions", label: "Transactions" },
    { href: "/admin/notifications", label: "Notifications" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-gray-200 p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-white">Admin Panel</h2>
      <nav className="flex flex-col gap-3">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`block px-4 py-2 rounded hover:bg-gray-700 transition ${
              pathname.startsWith(href) ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
