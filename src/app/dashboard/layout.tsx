import React from "react";
import { Sidebar } from "./components/sidenav";
import Header from "./components/header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="text-white block md:flex bg-[#211A1D] min-h-screen ">
      <Sidebar />
      <div className="text-white w-full px-8 md:px-12 py-4 max-h-screen overflow-y-auto">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
