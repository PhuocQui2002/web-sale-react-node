import { Table } from "antd";
import React, { useState } from "react";
import { Button, Flex } from "antd";

const TableComponent = (props) => {
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  const {
    selectionType = "checkbox",
    data = [],
    isPending = false,
    columns = [],
    handleDelteMany,
  } = props;

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys1: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setRowSelectedKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const handleDeleteAll = () => {
    handleDelteMany(rowSelectedKeys);
  };
  return (
    <div>
      {!!rowSelectedKeys.length && (
        <div>
          <Flex gap="middle" wrap>
            <Button
              color="danger"
              variant="solid"
              style={{ marginBottom: "5px" }}
              onClick={handleDeleteAll}
            >
              Xóa tất cả
            </Button>
          </Flex>
        </div>
      )}

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default TableComponent;
