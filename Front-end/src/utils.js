import { orderContant } from "./contant";

export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const renderOptions = (arr) => {
  console.log('renderOptions', arr)
  let results = [];
  if (arr) {
    results = arr?.map((opt) => {
      return {
        value: opt,
        label: opt,
      };
    });
  }
  console.log('renderOptions-add', results)
  results.push({
    label: "Thêm type",
    value: "add_type",
  });
  return results;
};

export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString().replaceAll(",", ".");
    return `${result} VND`;
  } catch (error) {
    return null;
  }
};

// export const convertDataChart = (data, type) => {
//   try {
//     const object = {};
//     Array.isArray(data) &&
//       data.forEach((opt) => {
//         if (!object[opt[type]]) {
//           object[opt[type]] = 1;
//         } else {
//           object[opt[type]] += 1;
//           console.log(
//             "c;getBase64",
//             object[opt[type]],
//             typeof object[opt[type]]
//           );
//         }
//       });
//     const results =
//       Array.isArray(Object.keys(object)) &&
//       Object.keys(object).map((item) => {
//         return {
//           name: "Đơn hàng đã giao",
//           value: object[item],
//         };
//       });
//     return results;
//   } catch (e) {
//     return [];
//   }
// };
export const convertDataChart = (data, type) => {
  try {
    const object = {};
    Array.isArray(data) &&
      data.forEach((opt) => {
        const name = opt[type] ? "Đơn đã giao" : "Đơn chưa giao";
        if (!object[name]) {
          object[name] = 1;
        } else {
          object[name] += 1;
        }
      });
    const results =
      Array.isArray(Object.keys(object)) &&
      Object.keys(object).map((item) => {
        return {
          name: item,
          value: object[item],
        };
      });
    return results;
  } catch (e) {
    return [];
  }
};

export const convertDataChart2 = (data) => {
  try {
    const object = {};
    
    Array.isArray(data) &&
      data.forEach((order) => {
        // Loop through each order's orderItems
        order.orderItems.forEach((item) => {
          const typeName = item.type;
          
          if (!object[typeName]) {
            object[typeName] = 1;
          } else {
            object[typeName] += 1;
          }
        });
      });
    
    const results =
      Array.isArray(Object.keys(object)) &&
      Object.keys(object).map((item) => {
        return {
          name: item,
          value: object[item],
        };
      });
      
    return results;
  } catch (e) {
    return [];
  }
};
export const convertDataBarChart = (data) => {
  try {
    const object = {};
    
    Array.isArray(data) &&
      data.forEach((order) => {
        if (order.isPaid) { 
          const fullName = order.shippingAddress.fullName;
          const totalPrice = order.totalPrice;

          if (!object[fullName]) {
            object[fullName] = totalPrice;
          } else {
            object[fullName] += totalPrice;
          }
        }
      });
    
    // Convert to array and sort by totalPrice in descending order
    const results = Object.keys(object)
      .map((name) => ({
        name,
        value: object[name],
      }))
      .sort((a, b) => b.value - a.value) // Sort by value in descending order
      .slice(0, 5); // Take the top 5 customers

    return results;
  } catch (e) {
    return [];
  }
};


