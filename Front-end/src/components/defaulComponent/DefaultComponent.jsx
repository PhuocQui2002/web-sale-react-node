// eslint-disable-next-line no-unused-vars
import React from "react";
import HeaderComponent from "../headerComponent/HeaderComponent";

// eslint-disable-next-line react/prop-types
function DefaultComponent({children}) {
  return (
    <div>
      <HeaderComponent/>
      {children}
    </div>
  )
}

export default DefaultComponent;
