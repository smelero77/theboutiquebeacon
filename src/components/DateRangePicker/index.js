import React from "react";
import { DatePicker, Space } from "antd";
import PropTypes from "prop-types";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

function DateRangePicker({ onChange }) {
  const handleChange = (dates) => {
    if (onChange) {
      onChange({
        startDate: dates?.[0],
        endDate: dates?.[1],
      });
    }
  };

  return (
    <Space>
      <RangePicker onChange={handleChange} defaultValue={[dayjs().subtract(7, "day"), dayjs()]} />
    </Space>
  );
}

DateRangePicker.propTypes = {
  onChange: PropTypes.func,
};

export default DateRangePicker;
