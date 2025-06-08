"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import Logo from "../../../../public/brandlogo.svg";
import home from "../../../../public/navIcons/home.svg";
import projectsIcon from "../../../../public/navIcons/projects.svg";
import reportsIcon from "../../../../public/navIcons/reports.svg";
import payoutsIcon from "../../../../public/navIcons/payouts.svg";
import helpIcon from "../../../../public/navIcons/help.svg";
import profileIcon from "../../../../public/navIcons/profile.svg";
import profileActive from "../../../../public/navIcons/profileActive.svg";
import homeActive from "../../../../public/navIcons/homeBlue.svg";
import projectsActive from "../../../../public/navIcons/projectsBlue.svg";
import reportsActive from "../../../../public/navIcons/reportsBlue.svg";
import payoutsActive from "../../../../public/navIcons/payoutsBlue.svg";
import helpActive from "../../../../public/navIcons/helpBlue.svg";
import validatorIcon from "../../../../public/navIcons/validator.svg";
import validatorActive from "../../../../public/navIcons/validatorBlue.svg";
import rewardIcon from "../../../../public/navIcons/rewards.svg";
import rewardActive from "../../../../public/navIcons/rewardActives.svg";
import { Animation } from "@/motion/Animation";

const navConfig = {
  "project-owner": [
    {
      index: 1,
      name: "Overview",
      href: "/dashboard/project-owner/overview",
      icon: home,
      activeIcon: homeActive,
    },
    {
      index: 2,
      name: "Projects",
      href: "/dashboard/project-owner/projects",
      icon: projectsIcon,
      activeIcon: projectsActive,
    },
    {
      index: 3,
      name: "Reports",
      href: "/dashboard/project-owner/reports",
      icon: reportsIcon,
      activeIcon: reportsActive,
    },
    {
      index: 4,
      name: "Payouts",
      href: "/dashboard/project-owner/payouts",
      icon: payoutsIcon,
      activeIcon: payoutsActive,
    },
    {
      index: 5,
      name: "Help Center",
      href: "/dashboard/project-owner/help-center",
      icon: helpIcon,
      activeIcon: helpActive,
    },
  ],
  validator: [
    {
      index: 1,
      name: "Overview",
      href: "/dashboard/validator/overview",
      icon: home,
      activeIcon: homeActive,
    },
    {
      index: 2,
      name: "Reports",
      href: "/dashboard/validator/reports",
      icon: reportsIcon,
      activeIcon: reportsActive,
    },
    {
      index: 3,
      name: "Rewards",
      href: "/dashboard/validator/rewards",
      icon: rewardIcon,
      activeIcon: rewardActive,
    },
    {
      index: 4,
      name: "Help Center",
      href: "/dashboard/validator/help-center",
      icon: helpIcon,
      activeIcon: helpActive,
    },
    {
      index: 5,
      name: "Profile",
      href: "/dashboard/validator/profile",
      icon: profileIcon,
      activeIcon: profileActive,
    },
  ],
  researcher: [
    {
      index: 1,
      name: "Overview",
      href: "/dashboard/researcher/overview",
      icon: home,
      activeIcon: homeActive,
    },
    {
      index: 2,
      name: "Projects",
      href: "/dashboard/researcher/projects",
      icon: projectsIcon,
      activeIcon: projectsActive,
    },
    {
      index: 3,
      name: "Reports",
      href: "/dashboard/researcher/reports",
      icon: reportsIcon,
      activeIcon: reportsActive,
    },
    {
      index: 4,
      name: "Rewards",
      href: "/dashboard/researcher/rewards",
      icon: rewardIcon,
      activeIcon: rewardActive,
    },
    {
      index: 5,
      name: "Help Center",
      href: "/dashboard/researcher/help-center",
      icon: helpIcon,
      activeIcon: helpActive,
    },
  ],
  admin: [
    {
      index: 1,
      name: "Overview",
      href: "/dashboard/admin/overview",
      icon: home,
      activeIcon: homeActive,
    },
    {
      index: 2,
      name: "Projects",
      href: "/dashboard/admin/projects",
      icon: projectsIcon,
      activeIcon: projectsActive,
    },
    {
      index: 3,
      name: "Reports",
      href: "/dashboard/admin/reports",
      icon: reportsIcon,
      activeIcon: reportsActive,
    },
    {
      index: 4,
      name: "Validators",
      href: "/dashboard/admin/validators",
      icon: validatorIcon,
      activeIcon: validatorActive,
    },
    {
      index: 5,
      name: "Support",
      href: "/dashboard/admin/support",
      icon: helpIcon,
      activeIcon: helpActive,
    },
  ],
};

export const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const basePath = pathname.split("/")[2] as keyof typeof navConfig;
  const navItems = navConfig[basePath] || [];

  // Check if we're on validator dashboard for different styling
  const isValidatorDashboard = basePath === "validator";

  // Function to determine if a nav item is active
  const isNavItemActive = (href: string, name: string) => {
    // Exact match
    if (pathname === href) return true;

    // If we're on the base dashboard path and this is the Overview item, make it active
    if (name === "Overview" && pathname === `/dashboard/${basePath}`) {
      return true;
    }

    // Special handling for Projects nav item
    if (name === "Projects") {
      // Check if we're on any projects-related route
      const projectsBasePath = `/dashboard/${basePath}/projects`;
      if (pathname.startsWith(projectsBasePath)) {
        return true;
      }
    }

    // Special handling for Reports nav item
    if (name === "Reports") {
      // Check if we're on any reports-related route
      const reportsBasePath = `/dashboard/${basePath}/reports`;
      if (pathname.startsWith(reportsBasePath)) {
        return true;
      }
    }

    // Special handling for other nav items that might have sub-routes
    if (pathname.startsWith(href + "/")) {
      return true;
    }

    return false;
  };

  return (
    <>
      {/* Top Navbar for Mobile */}
      <div className="md:hidden w-full flex items-center justify-between p-4 pt-7 bg-[#110D0F] rounded-xl">
        <Image src={Logo} width={120} height={35} alt="Brand Logo" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex w-[272px] h-[95vh] bg-[#110D0F] m-3 rounded-[20px] py-6 flex-col border-r border-none z-50 absolute md:static top-[65px] left-0 md:top-0 md:left-0`}
      >
        <Animation delay={0.2} animationType="slide-up">
          <Link
            href={"/"}
            className="hidden md:flex w-full items-center justify-center cursor-pointer mb-[40px] rounded-lg"
          >
            <Image width={158} height={35} src={Logo} alt="Brand Logo" />
          </Link>
        </Animation>

        {/* CONDITIONAL RENDERING - ONLY VALIDATOR GETS SPECIAL LAYOUT */}
        {isValidatorDashboard ? (
          /* VALIDATOR DASHBOARD - Special Layout with Spacer */
          <nav className="flex-1 flex flex-col">
            {/* Top 3 items for validator */}
            <div className="space-y-2">
              {navItems
                .slice(0, 3)
                .map(({ name, href, icon: Icon, activeIcon, index: index }) => {
                  const isActive = isNavItemActive(href, name);

                  return (
                    <Animation
                      delay={0.2 * index}
                      animationType="slide-up"
                      key={href}
                    >
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${
                          isActive
                            ? "border-l-4 border-[#0000FF] rounded-none text-white bg-[#1a1a1a]"
                            : "text-zinc-400 hover:text-white hover:bg-[#1a1a1a]"
                        }`}
                      >
                        <Image
                          src={isActive ? activeIcon : Icon}
                          alt={name}
                          width={24}
                          height={24}
                        />
                        <span
                          className={`text-[18px] ${
                            isActive ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {name}
                        </span>
                      </Link>
                    </Animation>
                  );
                })}
            </div>

            {/* Spacer - ONLY FOR VALIDATOR */}
            <div className="flex-1"></div>

            {/* Bottom 2 items for validator */}
            <div className="space-y-2">
              {navItems
                .slice(3)
                .map(({ name, href, icon: Icon, activeIcon, index: index }) => {
                  const isActive = isNavItemActive(href, name);

                  return (
                    <Animation
                      delay={0.2 * (index + 3)}
                      animationType="slide-up"
                      key={href}
                    >
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${
                          isActive
                            ? "border-l-4 border-[#0000FF] rounded-none text-white bg-[#1a1a1a]"
                            : "text-zinc-400 hover:text-white hover:bg-[#1a1a1a]"
                        }`}
                      >
                        <Image
                          src={isActive ? activeIcon : Icon}
                          alt={name}
                          width={24}
                          height={24}
                        />
                        <span
                          className={`text-[18px] ${
                            isActive ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {name}
                        </span>
                      </Link>
                    </Animation>
                  );
                })}
            </div>
          </nav>
        ) : (
          /* ALL OTHER DASHBOARDS - Original Layout (NO SPACER) */
          <nav className="space-y-2 flex-1">
            {navItems.map(
              ({ name, href, icon: Icon, activeIcon, index: index }) => {
                const isActive = isNavItemActive(href, name);
                return (
                  <Animation
                    delay={0.2 * index}
                    animationType="slide-up"
                    key={href}
                  >
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${
                        isActive
                          ? "border-l-4 border-[#0000FF] rounded-none text-white font-extrabold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Image
                        src={isActive ? activeIcon : Icon}
                        alt={name}
                        width={20}
                        height={20}
                      />
                      <span
                        className={`text-[18px] ${
                          isActive ? "font-[600]" : "font-thin"
                        }`}
                      >
                        {name}
                      </span>
                    </Link>
                  </Animation>
                );
              }
            )}
          </nav>
        )}
      </aside>
    </>
  );
};
