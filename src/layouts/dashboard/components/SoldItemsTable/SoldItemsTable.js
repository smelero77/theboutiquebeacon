// src/layouts/dashboard/components/SoldItemsTable/SoldItemsTable.js
import React from "react";
import PropTypes from "prop-types";
// Importa componentes de MUI
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

// (Opcional) Importa componentes MD2React (MDBox, MDTypography, etc.) si quieres un estilo coherente
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function SoldItemsTable({ receipts }) {
  // receipts debería tener la forma { count, results: [...] }

  // Aplanamos todas las transacciones de todos los receipts
  // para tener un array de transacciones.
  const allTransactions =
    receipts?.results?.flatMap((receipt) => {
      return (receipt.transactions || []).map((trans) => {
        // Podrías inyectar más campos del receipt, ej. country_iso, receipt_id
        return {
          ...trans,
          receiptId: receipt.receipt_id,
          countryIso: receipt.country_iso,
          currency: trans.price?.currency_code || "USD", // fallback
          amountNumber: trans.price ? trans.price.amount : 0,
          divisorNumber: trans.price ? trans.price.divisor || 100 : 100,
        };
      });
    }) || [];

  return (
    <MDBox mt={4}>
      <MDTypography variant="h6" mb={2}>
        Artículos vendidos
      </MDTypography>

      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f8f9fa",
                  width: "8%",
                  padding: "16px",
                }}
              >
                Receipt ID
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f8f9fa",
                  width: "5%",
                  padding: "16px",
                }}
              >
                País
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f8f9fa",
                  width: "60%",
                  padding: "16px",
                }}
              >
                Título
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f8f9fa",
                  width: "12%",
                  padding: "16px",
                }}
              >
                Precio
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f8f9fa",
                  width: "5%",
                  padding: "16px",
                }}
              >
                Cantidad
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTransactions.map((item, index) => {
              const priceValue = item.amountNumber / item.divisorNumber;
              return (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#fafafa",
                    },
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <TableCell align="left" sx={{ padding: "16px" }}>
                    {item.receiptId}
                  </TableCell>
                  <TableCell align="left" sx={{ padding: "16px" }}>
                    {item.countryIso || "N/A"}
                  </TableCell>
                  <TableCell align="left" sx={{ padding: "16px" }}>
                    {item.title}
                  </TableCell>
                  <TableCell align="right" sx={{ padding: "16px" }}>
                    {priceValue.toFixed(2)} {item.currency}
                  </TableCell>
                  <TableCell align="right" sx={{ padding: "16px" }}>
                    {item.quantity}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </MDBox>
  );
}

SoldItemsTable.propTypes = {
  receipts: PropTypes.shape({
    count: PropTypes.number,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        receipt_id: PropTypes.number.isRequired,
        country_iso: PropTypes.string,
        transactions: PropTypes.arrayOf(
          PropTypes.shape({
            transaction_id: PropTypes.number,
            title: PropTypes.string,
            quantity: PropTypes.number,
            price: PropTypes.shape({
              amount: PropTypes.number,
              divisor: PropTypes.number,
              currency_code: PropTypes.string,
            }),
          })
        ),
      })
    ),
  }),
};

SoldItemsTable.defaultProps = {
  receipts: null,
};

export default SoldItemsTable;
