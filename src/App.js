/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";

// Context
import { AntDesignProvider } from "context";

// Routes
import routes from "routes";

// Layouts
import MainLayout from "layouts/MainLayout";
import AuthLayout from "layouts/AuthLayout";

function App() {
  return (
    <AntDesignProvider>
      <ConfigProvider locale={esES}>
        <BrowserRouter>
          <Routes>
            {/* Redirección automática de la raíz a /authentication/sign-in */}
            <Route path="/" element={<Navigate to="/authentication/sign-in" replace />} />

            {/* Rutas existentes */}
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.type === "auth" ? (
                    <AuthLayout>
                      <route.component />
                    </AuthLayout>
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </AntDesignProvider>
  );
}

export default App;
