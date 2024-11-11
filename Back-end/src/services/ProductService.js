const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      image,
      type,
      countInStock,
      price,
      rating,
      description,
      discount,
    } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "ERR",
          message: "The name of product is already",
        });
      }
      const newProduct = await Product.create({
        name,
        image,
        type,
        countInStock: Number(countInStock),
        price,
        rating,
        description,
        discount: Number(discount),
      });
      if (newProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      if (product === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESS",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

 const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
      let allProduct = [];

      //console.log('totalProduct' ,totalProduct)
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        //console.log("objectSort", objectSort);
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        //.sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allProductSort,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (filter) {
        const label = filter[0];
        const allObjectFilter = await Product.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit)
          //.sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (!limit) {
        allProduct = await Product.find().sort({
          createdAt: -1,
          updatedAt: -1,
        });
      } else {
        allProduct = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }
      // const allProduct = await Product.find()
      //   .limit(limit)
      //   .skip(page * limit);
      resolve({
        status: "OK",
        message: "Success",
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct2 = (limit, page, sort, filter, minPrice, maxPrice) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
      let allProduct = [];

      // Tạo đối tượng truy vấn cơ bản
      const query = {};
      
      // Nếu có bộ lọc theo giá, thêm vào đối tượng truy vấn
      if (minPrice !== undefined || maxPrice !== undefined) {
        if (minPrice !== undefined) {
          query.price = { ...query.price, $gte: minPrice }; // Sản phẩm có giá lớn hơn hoặc bằng minPrice
        }
        if (maxPrice !== undefined) {
          query.price = { ...query.price, $lte: maxPrice }; // Sản phẩm có giá nhỏ hơn hoặc bằng maxPrice
        }
      }

      // Kiểm tra và xử lý sắp xếp
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        console.log("objectSort", objectSort);
        const allProductSort = await Product.find(query) // Sử dụng query đã tạo
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        
        return resolve({
          status: "OK",
          message: "Success",
          data: allProductSort,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      // Kiểm tra và xử lý bộ lọc
      if (filter) {
        const label = filter[0];
        query[label] = { $regex: filter[1] }; // Thêm điều kiện bộ lọc vào truy vấn
        const allObjectFilter = await Product.find(query)
          .limit(limit)
          .skip(page * limit);

        return resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      // Nếu không có limit, lấy tất cả sản phẩm
      if (!limit) {
        allProduct = await Product.find(query).sort({
          createdAt: -1,
          updatedAt: -1,
        });
      } else {
        allProduct = await Product.find(query) // Sử dụng query đã tạo
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }

      return resolve({
        status: "OK",
        message: "Success",
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyProduct = (ids) => {
  console.log("deleteManyProduct", ids)
  return new Promise(async (resolve, reject) => {
      try {
          await Product.deleteMany({ _id: ids })
          resolve({
              status: 'OK',
              message: 'Delete product success',
          })
      } catch (e) {
          reject(e)
      }
  })
}
const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Truy vấn tất cả các sản phẩm, sắp xếp theo thời gian tạo (createdAt) tăng dần
      const products = await Product.find().sort({ createdAt: 1 });
      
      // Lọc ra các loại (type) duy nhất dựa trên thứ tự thời gian tăng dần
      const allType = [...new Set(products.map(product => product.type))];
      
      console.log(allType);
      resolve({
        status: 'OK',
        message: 'Success',
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};


const getAllPrice = () => {
  return new Promise(async (resolve, reject) => {
    try {
        const allType = await Product.distinct('price').sort({ createdAt: -1, updatedAt: -1 })
        resolve({
            status: 'OK',
            message: 'Success',
            data: allType,
        })
    } catch (e) {
        reject(e)
    }
})
};



module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getDetailsProduct,
  getAllProduct,
  deleteManyProduct,
  getAllType,
  getAllPrice
};
