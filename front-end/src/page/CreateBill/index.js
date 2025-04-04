import React, { useState } from "react";
import { Grid } from "@mui/material";
import "./CreateBill.css";

function CreateBill() {
  const [bill, setBill] = useState({
    status: "Đã thanh toán",
    deposit: "2,000,000 VND",
    tutor: "Nguyễn Văn A",
    admin: "Trần Thị B",
    proofImage: "Hóa đơn thanh toán.jpg",
    billType: "Hóa đơn đặt cọc",
    voucherCode: "DISCOUNT2024",
    classCode: "CLS12345",
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBill((prevBill) => ({
      ...prevBill,
      [name]: value,
    }));
  };

  const listTitleTop = [
    {
      title1: "Trạng thái",
      title2: "Loại hóa đơn",
      data1: (
        <input
          type="text"
          name="status"
          value={bill.status}
          onChange={handleInputChange}
        />
      ),
      data2: (
        <input
          type="text"
          name="billType"
          value={bill.billType}
          onChange={handleInputChange}
        />
      ),
    },
    {
      title1: "Tiền đặt cọc",
      title2: "Mã voucher",
      data1: (
        <input
          type="text"
          name="deposit"
          value={bill.deposit}
          onChange={handleInputChange}
        />
      ),
      data2: (
        <input
          type="text"
          name="voucherCode"
          value={bill.voucherCode}
          onChange={handleInputChange}
        />
      ),
    },
    {
      title1: "Gia sư",
      title2: "Mã lớp học",
      data1: (
        <input
          type="text"
          name="tutor"
          value={bill.tutor}
          onChange={handleInputChange}
        />
      ),
      data2: (
        <input
          type="text"
          name="classCode"
          value={bill.classCode}
          onChange={handleInputChange}
        />
      ),
    },
  ];

  const listTitleBottom = ["Admin", "Ảnh minh chứng"];

  return (
    <div className="create-bill-container">
      <h1>Tạo hóa đơn mới</h1>
      <div className="form-create-bill">
        {listTitleTop.map((item, index) => (
          <Grid container className="grid-container-top" key={index}>
            <Grid item xs={6}>
              <Grid container className="grid-item-top top1">
                <Grid item className="title item" xs={6}>
                  {item.title1}
                </Grid>
                <Grid item xs={6} className="item">
                  {item.data1}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container className="grid-item-top">
                <Grid item className="title item" xs={6}>
                  {item.title2}
                </Grid>
                <Grid item xs={6} className="item">
                  {item.data2}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
        {listTitleBottom.map((item, index) => (
          <Grid container className="grid-container-top top1" key={index}>
            <Grid item xs={3} className="title item">
              {item}
            </Grid>
            <Grid item xs={9} className="item">
              {item === "Admin" ? (
                <input
                  type="text"
                  name="admin"
                  value={bill.admin}
                  onChange={handleInputChange}
                />
              ) : (
                <input
                  type="text"
                  name="proofImage"
                  value={bill.proofImage}
                  onChange={handleInputChange}
                />
              )}
            </Grid>
          </Grid>
        ))}
      </div>
      <button type="button" className="confirm-button">
        Lưu hóa đơn
      </button>
    </div>
  );
}

export default CreateBill;
