import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

const { RangePicker } = DatePicker;

function DateRangePicker({ startDate, endDate, onDateChange }) {
  const handleChange = (dates, dateStrings) => {
    console.log("DateRangePicker onChange:", { dates, dateStrings });

    if (!dates) {
      onDateChange({
        startDate: null,
        endDate: null,
      });
      return;
    }

    const [start, end] = dates;
    onDateChange({
      startDate: start,
      endDate: end,
    });
  };

  return (
    <MDBox mr={1}>
      <RangePicker
        value={[startDate, endDate]}
        onChange={handleChange}
        format="DD/MM/YYYY"
        allowClear={true}
        style={{
          height: "37px",
          minWidth: "260px",
          borderRadius: "0.375rem",
          border: "1px solid #d2d6da",
          color: "#7b809a",
        }}
        placeholder={["Fecha inicial", "Fecha final"]}
        ranges={{
          Hoy: [dayjs(), dayjs()],
          "Última semana": [dayjs().subtract(7, "days"), dayjs()],
          "Último mes": [dayjs().subtract(1, "month"), dayjs()],
          "Último año": [dayjs().subtract(1, "year"), dayjs()],
        }}
      />
    </MDBox>
  );
}

DateRangePicker.propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  onDateChange: PropTypes.func.isRequired,
};

export default DateRangePicker;
