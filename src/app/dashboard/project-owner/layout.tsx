import DashboardNav from "../components/resuables/DashboardNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nav_items = [
    { href: "/dashboard/project-owner/overview", label: "Overview" },
    {
      href: "/dashboard/project-owner/upload-project",
      label: "Upload Project",
    },
    {
      href: "/dashboard/project-owner/projects",
      label: "View Projects",
    },
    {
      href: "/dashboard/project-owner/rankings",
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
