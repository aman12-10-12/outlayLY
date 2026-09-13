import React, { useContext } from "react";

import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user, loading } = useContext(UserContext);

  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      {user ? (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 rounded-full border-4 border-[#B0E0E6] border-t-[#4682B4] animate-spin" />
        </div>
      ) : null}
    </div>
  );
};

export default DashboardLayout;
