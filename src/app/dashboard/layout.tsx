import React from "react";
import { Sidebar } from "./components/sidenav";
import Header from "./components/header";
import { ProjectsProvider } from "@/context/project-context";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProjectsProvider>
      <div className="text-white bg-[#090909] h-screen flex flex-col text-sm">
        <Header />
        <div className="text-white w-full flex-1 px-8 md:px-[100px] py-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </ProjectsProvider>
  );
};

export default Layout;
