import DashboardNav from "../components/resuables/DashboardNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nav_items = [
    { href: "/dashboard/researcher/overview", label: "Overview" },
    {
      href: "/dashboard/researcher/projects",
      label: "Projects",
    },
    {
      href: "/dashboard/researcher/my-reports",
      label: "My Report",
    },
    {
      href: "/dashboard/researcher/rankings",
      label: "Rankings",
    },
    {
      href: "/dashboard/researcher/profile",
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
