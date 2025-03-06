// src/layouts/dashboard/index.js
import React, { useState, useEffect } from "react";
import { Layout, theme, Typography, Row, Col, Card, Spin, Alert } from "antd";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { supabase } from "supabaseClient";
import config from "../../config";

// Components
import StatisticsCards from "../../components/StatisticsCards";
import DateRangePicker from "../../components/DateRangePicker";
import DailySales from "../../components/DailySales";
import SalesTable from "../../components/SalesTable";
import SalesHeatmap from "../../components/SalesHeatmap";
import SalesByCountryWithMap from "../../components/SalesByCountryWithMap";
import Filters from "../../components/Filters";
import DataTable from "../../components/DataTable";

// Services
import { fetchEtsyData } from "../../services/apiEtsy";

// Extender dayjs con los plugins necesarios
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const { Content } = Layout;
const { Title } = Typography;

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().startOf("month"),
    endDate: dayjs().endOf("month"),
  });
  const [orders, setOrders] = useState([]);
  const [statistics, setStatistics] = useState({
    netSales: { value: 0, percentage: 0 },
    dailyAverage: { value: 0, percentage: 0 },
    orders: { value: 0, percentage: 0 },
  });

  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetchOrders();
  }, [dateRange]);

  const calculateStatistics = (currentOrders, previousOrders = []) => {
    // Calcular estadísticas actuales
    const totalSales = currentOrders.reduce((sum, order) => sum + order.total_amount, 0);
    const totalOrders = currentOrders.length;
    const uniqueDays = new Set(
      currentOrders.map((order) => dayjs(order.created_at).format("YYYY-MM-DD"))
    ).size;
    const dailyAverage = totalSales / (uniqueDays || 1);

    // Calcular estadísticas del período anterior
    const prevTotalSales = previousOrders.reduce((sum, order) => sum + order.total_amount, 0);
    const prevTotalOrders = previousOrders.length;
    const prevUniqueDays = new Set(
      previousOrders.map((order) => dayjs(order.created_at).format("YYYY-MM-DD"))
    ).size;
    const prevDailyAverage = prevTotalSales / (prevUniqueDays || 1);

    // Calcular porcentajes de cambio
    const calculatePercentageChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    return {
      netSales: {
        value: totalSales,
        percentage: calculatePercentageChange(totalSales, prevTotalSales),
      },
      dailyAverage: {
        value: dailyAverage,
        percentage: calculatePercentageChange(dailyAverage, prevDailyAverage),
      },
      orders: {
        value: totalOrders,
        percentage: calculatePercentageChange(totalOrders, prevTotalOrders),
      },
    };
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener el token de sesión de Supabase
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        throw new Error("No hay sesión activa. Por favor, inicia sesión.");
      }

      // Calcular el rango de fechas para el período anterior
      const currentPeriodDays = dateRange.endDate.diff(dateRange.startDate, "day");
      const previousStart = dateRange.startDate.subtract(currentPeriodDays, "day");
      const previousEnd = dateRange.startDate.subtract(1, "day");

      let currentOrders = [];
      let previousOrders = [];

      try {
        // Intentar obtener datos de Redis con un timeout de 5 segundos
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${config.apiUrl}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            startDate: dateRange.startDate.toISOString(),
            endDate: dateRange.endDate.toISOString(),
            previousStartDate: previousStart.toISOString(),
            previousEndDate: previousEnd.toISOString(),
          }),
          signal: controller.signal,
          credentials: "include",
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.orders) {
            setStatistics(data.statistics);
            setOrders(data.orders);
            return;
          }
        } else {
          throw new Error(
            `Error en la respuesta del servidor: ${response.status} ${response.statusText}`
          );
        }
      } catch (redisError) {
        if (redisError.name === "AbortError") {
          console.log("Timeout al intentar conectar con Redis, usando Supabase");
        } else {
          console.log("Error al intentar usar Redis:", redisError);
        }
      }

      console.log("Obteniendo datos desde Supabase...");

      // Si Redis falló o no tiene datos, usar Supabase
      const { data: currentOrdersData, error: currentError } = await supabase
        .from("orders")
        .select("*")
        .gte("created_at", dateRange.startDate.toISOString())
        .lte("created_at", dateRange.endDate.toISOString());

      if (currentError) {
        throw new Error(`Error al obtener órdenes actuales: ${currentError.message}`);
      }
      currentOrders = currentOrdersData || [];

      // Obtener órdenes del período anterior
      const { data: previousOrdersData, error: previousError } = await supabase
        .from("orders")
        .select("*")
        .gte("created_at", previousStart.toISOString())
        .lte("created_at", previousEnd.toISOString());

      if (previousError) {
        throw new Error(`Error al obtener órdenes anteriores: ${previousError.message}`);
      }
      previousOrders = previousOrdersData || [];

      // Actualizar estadísticas y órdenes
      const newStatistics = calculateStatistics(currentOrders, previousOrders);
      setStatistics(newStatistics);
      setOrders(currentOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error.message);
      // En caso de error, establecer datos vacíos
      setOrders([]);
      setStatistics({
        netSales: { value: 0, percentage: 0 },
        dailyAverage: { value: 0, percentage: 0 },
        orders: { value: 0, percentage: 0 },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (dates) => {
    setDateRange({
      startDate: dates.startDate,
      endDate: dates.endDate,
    });
  };

  return (
    <Content style={{ margin: "24px 16px", padding: 24, background: colorBgContainer }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <DateRangePicker onChange={handleDateRangeChange} />
        </Col>

        <Col span={24}>
          <StatisticsCards data={statistics} />
        </Col>

        {error && (
          <Col span={24}>
            <Alert message="Error" description={error} type="error" showIcon />
          </Col>
        )}

        <Col span={24}>
          <DailySales data={orders} loading={loading} />
        </Col>

        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <SalesHeatmap orders={orders} loading={loading} />
            </Col>
            <Col span={12}>
              <SalesByCountryWithMap orders={orders} loading={loading} />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <SalesTable data={orders} loading={loading} />
        </Col>
      </Row>
    </Content>
  );
}

export default Dashboard;
