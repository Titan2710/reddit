import React from "react";
import Navbar from "../Navbar/Navbar";

const Layout: React.FC= ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children && children}</main>
    </>
  );
};

export default Layout;
