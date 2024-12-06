const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
var inlineBase64 = require("nodemailer-plugin-inline-base64");

const createOrderPDF = (
  orderItems,
  shippingPrice,
  totalPrice,
  fullName,
  address,
  phone,
  
) => {
  const pdfFileName = `order_${Date.now()}.pdf`;
  const pdfDir = path.resolve(__dirname, "../assets/PDF");
  const pdfPath = path.join(pdfDir, pdfFileName);

  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  const doc = new PDFDocument();
  const fontPath = path.resolve(
    __dirname,
    "../assets/fonts/Open_Sans/static/OpenSans-Regular.ttf"
  );

  if (fs.existsSync(fontPath)) {
    doc.font(fontPath);
  } else {
    console.error(
      "Font file not found. Please ensure the font file exists at:",
      fontPath
    );
    return null;
  }

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.fontSize(25).text("Đơn hàng của bạn", { align: "center" });
  doc.moveDown();
  doc.fontSize(15).text(`Tên khách hàng: ${fullName}`);
  doc.fontSize(15).text(`Địa chỉ: ${address}`);
  doc.fontSize(15).text(`Số điện thoại: ${phone}`);
  doc.fontSize(15).text(`Phí ship: ${shippingPrice} VND`);
  doc.fontSize(15).text(`Tổng đơn hàng phải trả: ${totalPrice} VND`);
  doc.moveDown();

  orderItems.forEach((order, index) => {
    let currentY = doc.y;

    doc
      .fontSize(16)
      .text(`Sản phẩm ${index + 1}:`, 50, currentY, { underline: true });
    const imageX = 50; // Tọa độ x của hình ảnh (bên trái)
    const textX = 230; // Tọa độ x của dữ liệu sản phẩm (bên phải hình ảnh)
    const imageY = doc.y; // Tọa độ y hiện tại của văn bản

    // Thêm hình ảnh sản phẩm
    if (order.image && order.image.startsWith("data:image")) {
      const matches = order.image.match(/^data:(image\/\w+);base64,(.+)$/);
      if (matches) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        const fileExtension = mimeType === "image/png" ? "png" : "jpg";
        const tempImagePath = path.join(
          pdfDir,
          `temp_image_${Date.now()}_${index}.${fileExtension}`
        );

        try {
          fs.writeFileSync(tempImagePath, base64Data, { encoding: "base64" });

          if (fs.existsSync(tempImagePath)) {
            doc.image(tempImagePath, imageX, imageY, {
              fit: [150, 150], // Kích thước hình ảnh
            });
            doc.moveDown();

            // Xóa file ảnh tạm sau khi chèn xong
            fs.unlinkSync(tempImagePath);
          } else {
            console.error(
              "Temporary image file not found after save:",
              tempImagePath
            );
          }
        } catch (error) {
          console.error("Error saving or adding image to PDF:", error);
        }
      }
    }

    // Thêm dữ liệu sản phẩm bên phải hình ảnh
    doc
      .fontSize(12)
      .text(`Tên sản phẩm: ${order.name}`, textX, imageY)
      .text(`Kích thước: ${order.size}`, textX)
      .text(`Khung: ${order.frame}`, textX)
      .text(`Số lượng: ${order.amount}`, textX)
      .text(`Giá: ${order.totalPrice} VND`, textX);
    doc.moveDown();
    doc.y += 100;
  });

  // Thêm thông tin giá ship và tổng đơn hàng
  doc.moveDown();
  

  doc.end();
  return pdfPath;
};

const sendEmailCreateOrder = async (
  email,
  orderItems,
  shippingPrice,
  totalPrice,
  fullName,
  address,
  phone
) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  transporter.use("compile", inlineBase64({ cidPrefix: "somePrefix_" }));

  let listItem = "";
  const attachments = [];
  const attachImage = [];
  // Tạo PDF và lấy đường dẫn
  const pdfPath = createOrderPDF(
    orderItems,
    shippingPrice,
    totalPrice,
    fullName,
    address,
    phone,
  );
  orderItems.forEach((order, index) => {
    attachImage.push({ path: order.image });
    if (pdfPath) {
      attachments.push({
        filename: path.basename(pdfPath),
        path: pdfPath,
        contentType: "application/pdf",
      });
    }

    listItem += `
    <div style= "display: flex">
        <tr style="border-bottom: 1px solid #ddd; padding: 8px;">
                <td style="padding: 8px;">
                   <img src="${order.image}" alt="Product Image" width="100" />
                </td>
                <td style="padding: 8px;">
                    <p><b>Sản phẩm:</b> ${order.name}</p>
                    <p><b>Kích thước:</b> ${order.size}</p>
                    <p><b>Khung:</b> ${order.frame}</p>
                    <p><b>Số lượng:</b> ${order.amount}</p>
                    <p><b>Giá:</b> ${order.totalPrice} VND</p>
                </td>
        </tr>
    </div>`;
  });

  let info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT,
    to: process.env.MAIL_ACCOUNT,
    subject: "Bạn đã đặt hàng tại Canvas Store",
    text: "Hello world?",
    html: `<div><b>Bạn đã đặt hàng thành công tại Canvas Store</b></div> ${listItem}`,
    attachments: attachments,
    attachImage, // Sử dụng mảng attachments đã được khai báo
  });

  console.log("Email sent: %s", info.messageId);
};
const sendOtpEmail = async (otp) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT,
    to: process.env.MAIL_ACCOUNT,
    subject: "Max otp của bạn",
    text: "Hello world?",
    html: `<div><b>Mã OTP của bạn</b></div> ${otp}`,
  });
};
module.exports = {
  sendEmailCreateOrder,
  sendOtpEmail,
};
