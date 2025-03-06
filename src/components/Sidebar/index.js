import React from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import SideMenu from "./SideMenu";
import Filters from "../Filters";

const { Sider } = Layout;

function Sidebar() {
  const location = useLocation();
  const showFilters = location.pathname === "/dashboard"; // Solo mostrar filtros en el dashboard

  return (
    <Sider
      width={80}
      style={{
        background: "#fff",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        overflowY: "auto",
        borderRight: "1px solid #f0f0f0"
      }}
    >
      <SideMenu />
      {showFilters && (
        <div style={{ width: "280px", borderLeft: "1px solid #f0f0f0" }}>
          <Filters />
        </div>
      )}
    </Sider>
  );
}

export default Sidebar;
