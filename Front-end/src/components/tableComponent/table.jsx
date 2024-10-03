import { Table } from "antd";
import React, { useState } from "react";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data = [],
    isPending = false,
    columns = [],
  } = props;
  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: "Price",
  //     dataIndex: "price",
  //   },
  //   {
  //     title: "Rating",
  //     dataIndex: "rating",
  //   },
  //   {
  //     title: "Type",
  //     dataIndex: "type",
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "action",
  //     render: (text) => <a>{text}</a>,
  //   },
  // ];
  // const data =
  //   products?.length &&
  //   products?.map((product) => ({ ...product, key : product.id }));

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </div>
  );
};

export default TableComponent;
