"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function DashboardNav({
  navItems,
}: {
  navItems: {
    label: string;
    href: string;
  }[];
}) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="mx-auto w-fit rounded-full p-1 bg-[#101011] flex items-stretch">
      {navItems.map((item, id) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={id}
            href={item.href}
            style={{
              background: isActive
                ? "linear-gradient(90deg, #10273E 0%, #2A67A4 100%)"
                : "",
            }}
            className="p-[2px] rounded-full"
          >
            <div
              className="py-3 px-6 rounded-full"
              style={{
                background: isActive
                  ? "linear-gradient(90deg, #1D74F9 16.06%, #092650 100%)"
                  : "",
              }}
            >
              {item.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default DashboardNav;
