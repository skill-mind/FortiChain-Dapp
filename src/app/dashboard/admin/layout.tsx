import DashboardNav from "../components/resuables/DashboardNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nav_items = [
    { href: "/dashboard/admin/overview", label: "Overview" },
    {
      href: "/dashboard/admin/projects",
      label: "Projects",
    },
    {
      href: "/dashboard/admin/researchers",
      label: "Researchers",
    },
    {
      href: "/dashboard/admin/validators",
      label: "Validators",
    },
    {
      href: "/dashboard/admin/metrics",
      label: "Metrics",
    },
    {
      href: "/dashboard/admin/blog-management",
      label: "Blog Management",
    },
    {
      href: "/dashboard/admin/help-center",
      label: "Help Center",
    },
    {
      href: "/dashboard/admin/suspension",
      label: "Suspension",
    },
  ];
  return (
    <div className="flex flex-col gap-y-6">
      <DashboardNav navItems={nav_items} />
      {children}
    </div>
  );
}
