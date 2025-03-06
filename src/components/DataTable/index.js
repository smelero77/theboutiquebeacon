import React from "react";
import { Table } from "antd";
import PropTypes from "prop-types";

function DataTable({ data, columns, loading, pagination }) {
  return (
    <Table
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={pagination || false}
      rowKey="id"
      size="small"
    />
  );
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default DataTable;
