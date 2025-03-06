import React, { useState } from "react";
import { Card, Input, Button, Table, Typography, message, Spin } from "antd";
import axios from "axios";
import { supabase } from "../../supabaseClient";

const { TextArea } = Input;
const { Title, Text } = Typography;

const BACKEND_URL = "http://localhost:5000";

function QueryDashboard() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [sqlQuery, setSqlQuery] = useState("");

  const handleQuery = async () => {
    if (!query.trim()) {
      message.warning("Por favor, ingresa una consulta");
      return;
    }

    setLoading(true);
    setSqlQuery("");
    setResult(null);

    try {
      // Verificar la sesión de Supabase
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw new Error("Error de autenticación. Por favor, inicia sesión nuevamente.");
      }

      if (!session) {
        throw new Error("No hay sesión activa. Por favor, inicia sesión.");
      }

      // Realizar la consulta al backend
      const response = await axios.post(
        `${BACKEND_URL}/query`,
        {
          question: query,
        },
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        throw new Error("No se recibió respuesta del servidor");
      }

      setSqlQuery(response.data.sql);

      if (response.data.data && Array.isArray(response.data.data)) {
        const columns = Object.keys(response.data.data[0] || {}).map((key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          dataIndex: key,
          key: key,
          render: (text) => {
            if (typeof text === "boolean") return text ? "Sí" : "No";
            if (text === null) return "-";
            return text;
          },
        }));

        const dataSource = response.data.data.map((item, index) => ({
          ...item,
          key: index,
        }));

        setResult({
          columns,
          dataSource,
        });
      } else {
        message.warning("La consulta no devolvió resultados");
      }
    } catch (error) {
      console.error("Error al realizar la consulta:", error);

      let errorMessage = "Error al procesar la consulta";

      if (error.response) {
        // Error de respuesta del servidor
        errorMessage =
          error.response.data?.error ||
          `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        // Error de conexión
        errorMessage =
          "No se pudo conectar con el servidor. Verifica que el servidor backend esté ejecutándose en el puerto 5000";
      } else {
        // Error general
        errorMessage = error.message || "Error desconocido al procesar la consulta";
      }

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card bordered={false}>
      <Title level={2}>Consulta de Datos</Title>
      <Text type="secondary" style={{ marginBottom: 16, display: "block" }}>
        {
          'Realiza consultas en lenguaje natural sobre tus datos. Por ejemplo: "Muestra todas las órdenes del último mes" o "¿Cuál es el total de ventas por país?"'
        }
      </Text>

      <div style={{ marginBottom: 16 }}>
        <TextArea
          placeholder="Escribe tu consulta aquí..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoSize={{ minRows: 3, maxRows: 6 }}
          style={{ marginBottom: 16 }}
        />
        <Button type="primary" onClick={handleQuery} loading={loading} style={{ marginBottom: 16 }}>
          Consultar
        </Button>
      </div>

      {sqlQuery && (
        <Card
          type="inner"
          title="Consulta SQL generada"
          style={{ marginBottom: 16, background: "#f5f5f5" }}
        >
          <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {sqlQuery}
          </pre>
        </Card>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin size="large" />
        </div>
      ) : (
        result && (
          <Table
            columns={result.columns}
            dataSource={result.dataSource}
            scroll={{ x: true }}
            style={{ marginTop: 16 }}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total: ${total} registros`,
            }}
          />
        )
      )}
    </Card>
  );
}

export default QueryDashboard;
