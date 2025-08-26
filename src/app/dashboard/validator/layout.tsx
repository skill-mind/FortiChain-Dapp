import DashboardNav from "../components/resuables/DashboardNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nav_items = [
    { href: "/dashboard/validator/overview", label: "Overview" },
    {
      href: "/dashboard/validator/reports",
      label: "Reports",
    },
    {
      href: "/dashboard/validator/assigned-projects",
      label: "Assigned Projects",
    },
    {
      href: "/dashboard/validator/rankings",
      label: "Rankings",
    },
    {
      href: "/dashboard/validator/profile",
      label: "Profile",
    },
  ];
  return (
    <div className="flex flex-col gap-y-6">
      <DashboardNav navItems={nav_items} />
      {children}
    </div>
  );
}
