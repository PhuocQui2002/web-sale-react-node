import React, { useEffect, useState } from "react";
import {
  WrapperLableText,
  WrapperContent,
} from "./style";
import { Checkbox, Select } from "antd";
import * as ProductService from "../../services/ProductService";

function NavbarComponent({typeCheck}) {
  console.log("navbarComponent", typeCheck);
  const [typeProducts, setTypeProducts] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState(typeCheck);

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
    console.log("res", res);
  };
  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const onCheckboxChange = (value) => {
    
    setSelectedCheckbox(value);

  };

  const renderContent = (type, options) => {
    switch (type) {
      case "checkbox":
        return (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
            {options.map((option) => (
              <Checkbox
                key={option}
                checked={selectedCheckbox === option}
                onChange={() => onCheckboxChange(option)}
                style={{ marginLeft: 0 }}
              >
                {option}
              </Checkbox>
            ))}
          </div>
        );
      default:
        return {};
    }
  };

  return (
    <div>
      <WrapperLableText>Tìm kiếm theo sản phẩm</WrapperLableText>
      <WrapperContent>
        {renderContent("checkbox", typeProducts)}
      </WrapperContent>
      {/* <WrapperContent>
        {renderContent("price", ["duoi 400000 VNĐ", "trên 400000 VNĐ"])}
      </WrapperContent> */}
    </div>
  );
}

export default NavbarComponent;
