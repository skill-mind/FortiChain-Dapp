import React from "react";
import { Sidebar } from "./components/sidenav";
import Header from "./components/header";
import { ProjectsProvider } from "@/context/project-context";
import Foot from "@/components/foot";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProjectsProvider>
      <div className="text-white bg-[#090909] min-h-screen flex flex-col text-sm">
        {/* Header at the top */}
        <Header />

        {/* Main content area grows, pushes footer down */}
        <div className="flex-1">
          <div className="px-4 md:px-[100px] py-6">{children}</div>
        </div>

        {/* Footer always below content, not fixed */}
        <div>
          <Foot />
        </div>
      </div>
    </ProjectsProvider>
  );
};

export default Layout;
