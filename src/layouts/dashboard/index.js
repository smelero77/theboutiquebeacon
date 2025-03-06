// src/layouts/dashboard/index.js
import React, { useState, useEffect } from "react";
import { Layout, theme, Typography, Row, Col, Card, Spin } from "antd";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { supabase } from "supabaseClient";

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
    startDate: null,
    endDate: null,
  });
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    status: null,
    type: null,
  });

  const [allData, setAllData] = useState(null);
  const [filteredData, setFilteredData] = useState({
    overview: null,
    receipts: null,
    dailyData: [],
    markers: [],
    hourlyData: [],
  });
  const [statistics, setStatistics] = useState({
    netSales: 0,
    dailyAverage: 0,
    orders: 0,
  });

  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetchOrders();
  }, [dateRange, filters]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let query = supabase.from("orders").select("*");

      // Aplicar filtros de fecha
      if (dateRange.startDate) {
        query = query.gte("created_at", dateRange.startDate);
      }
      if (dateRange.endDate) {
        query = query.lte("created_at", dateRange.endDate);
      }

      // Aplicar filtros de estado y tipo
      if (filters.status) {
        query = query.eq("status", filters.status);
      }
      if (filters.type) {
        query = query.eq("type", filters.type);
      }

      const { data, error } = await query;

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
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

  const handleFilterChange = (values) => {
    setFilters(values);
  };

  const filterDataByDateRange = (data, startDate, endDate) => {
    if (!data?.rawData?.results) {
      console.log("No hay datos para filtrar");
      return null;
    }

    // Si no hay fechas seleccionadas, mostrar todos los datos
    if (!startDate && !endDate) {
      console.log("No hay fechas seleccionadas, mostrando todos los datos");
      return {
        overview: data.overview,
        receipts: data.rawData,
        dailyData: data.dailyData,
        markers: data.stats.markers,
        hourlyData: processHourlyData(data.rawData.results),
        statistics: calculateStatistics(data.rawData.results),
      };
    }

    // Convertir las fechas de inicio y fin a UTC y ajustar al inicio/fin del día
    const start = startDate ? dayjs(startDate).utc().startOf("day") : null;
    const end = endDate ? dayjs(endDate).utc().endOf("day") : null;

    console.log("Rango de fechas para filtrado (UTC):", {
      start: start?.format(),
      end: end?.format(),
    });

    const filteredReceipts = {
      ...data.rawData,
      results: data.rawData.results.filter((receipt) => {
        // Convertir el timestamp Unix a fecha UTC
        const timestamp = receipt.create_timestamp * 1000;
        const receiptDate = dayjs(timestamp);
        const receiptDateUTC = receiptDate.utc();

        console.log("Evaluando receipt:", {
          receiptId: receipt.receipt_id,
          timestamp,
          receiptDate: receiptDate.format(),
          receiptDateUTC: receiptDateUTC.format(),
          startDate: start?.format(),
          endDate: end?.format(),
          isDayjs: dayjs.isDayjs(receiptDateUTC),
        });

        // Verificar si la fecha está en el rango
        let isInRange = true;

        if (start) {
          const isAfterStart = receiptDateUTC.startOf("day").isSameOrAfter(start);
          console.log(`Receipt ${receipt.receipt_id} isAfterStart:`, {
            receiptDateStart: receiptDateUTC.startOf("day").format(),
            startDate: start.format(),
            isAfterStart,
          });
          isInRange = isInRange && isAfterStart;
        }

        if (end) {
          const isBeforeEnd = receiptDateUTC.endOf("day").isSameOrBefore(end);
          console.log(`Receipt ${receipt.receipt_id} isBeforeEnd:`, {
            receiptDateEnd: receiptDateUTC.endOf("day").format(),
            endDate: end.format(),
            isBeforeEnd,
          });
          isInRange = isInRange && isBeforeEnd;
        }

        console.log(`Receipt ${receipt.receipt_id} final isInRange:`, isInRange);
        return isInRange;
      }),
    };

    console.log("Receipts filtrados:", {
      total: filteredReceipts.results.length,
      fechas: filteredReceipts.results.map((r) => ({
        id: r.receipt_id,
        fecha: dayjs(r.create_timestamp * 1000)
          .utc()
          .format(),
        fechaInicio: dayjs(r.create_timestamp * 1000)
          .utc()
          .startOf("day")
          .format(),
        fechaFin: dayjs(r.create_timestamp * 1000)
          .utc()
          .endOf("day")
          .format(),
      })),
    });

    // Procesar datos diarios
    const filteredDailyData =
      data.dailyData
        ?.filter((item) => {
          if (!item.date) return false;
          const itemDate = dayjs(item.date).utc();
          return (
            itemDate.isValid() &&
            (!start || itemDate.isSameOrAfter(start)) &&
            (!end || itemDate.isSameOrBefore(end))
          );
        })
        .map((item) => ({
          date: dayjs(item.date).format("YYYY-MM-DD"),
          sales: parseFloat(item.sales || 0),
        })) || [];

    return {
      overview: {
        ...data.overview,
        orders: filteredReceipts.results.length,
        sales: calculateTotalSales(filteredReceipts.results),
      },
      receipts: filteredReceipts,
      dailyData: filteredDailyData,
      markers: data.stats.markers || [],
      hourlyData: processHourlyData(filteredReceipts.results),
      statistics: calculateStatistics(filteredReceipts.results),
    };
  };

  // Función auxiliar para procesar datos por hora
  const processHourlyData = (receipts) => {
    const salesByHour = new Array(7).fill(null).map(() => new Array(24).fill(0));
    receipts.forEach((receipt) => {
      const date = dayjs(receipt.create_timestamp * 1000);
      const day = date.day();
      const hour = date.hour();

      const totalSales =
        receipt.transactions?.reduce((sum, trans) => {
          return sum + (trans.quantity || 0);
        }, 0) || 0;

      salesByHour[day][hour] += totalSales;
    });

    const heatmapData = [];
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        if (salesByHour[day][hour] > 0) {
          heatmapData.push({
            day,
            hour,
            sales: salesByHour[day][hour],
          });
        }
      }
    }
    return heatmapData;
  };

  // Función auxiliar para calcular estadísticas
  const calculateStatistics = (receipts) => {
    const totalSales = calculateTotalSales(receipts);
    const totalOrders = receipts.length;
    const uniqueDays = new Set(
      receipts.map((receipt) => dayjs(receipt.create_timestamp * 1000).format("YYYY-MM-DD"))
    ).size;
    const dailyAverage = totalSales / (uniqueDays || 1);

    return {
      netSales: totalSales,
      dailyAverage: dailyAverage,
      orders: totalOrders,
    };
  };

  // Función auxiliar para calcular ventas totales
  const calculateTotalSales = (receipts) => {
    return receipts.reduce((sum, receipt) => {
      return sum + receipt.total_price.amount / receipt.total_price.divisor;
    }, 0);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchEtsyData();
        setAllData(data);
        const filtered = filterDataByDateRange(data, dateRange.startDate, dateRange.endDate);
        setFilteredData({
          overview: filtered.overview,
          receipts: filtered.receipts,
          dailyData: filtered.dailyData,
          markers: filtered.markers,
          hourlyData: filtered.hourlyData,
        });
        setStatistics(filtered.statistics);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Title level={2} style={{ margin: 0 }}>
        Dashboard
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <DateRangePicker
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onDateChange={handleDateRangeChange}
            />
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card>
            <Filters onFilter={handleFilterChange} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24}>
          <StatisticsCards orders={orders} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} lg={16}>
          <Card title="Ventas Diarias">
            <DailySales data={filteredData.dailyData} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Heatmap de Ventas">
            <SalesHeatmap data={filteredData.hourlyData} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} lg={16}>
          <Card title="Ventas por País">
            <SalesByCountryWithMap orders={orders} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Últimas Órdenes">
            <DataTable
              data={orders.slice(0, 5)}
              columns={[
                {
                  title: "ID",
                  dataIndex: "id",
                  key: "id",
                },
                {
                  title: "Fecha",
                  dataIndex: "created_at",
                  key: "created_at",
                  render: (text) => new Date(text).toLocaleDateString(),
                },
                {
                  title: "Monto",
                  dataIndex: "amount",
                  key: "amount",
                  render: (amount) => `$${amount.toFixed(2)}`,
                },
                {
                  title: "Estado",
                  dataIndex: "status",
                  key: "status",
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
}

export default Dashboard;
