import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, MenuItem, Select } from "@mui/material";
import { FiChevronsDown } from "react-icons/fi";
import EditIcon from "../../assets/icons/EditIcon.svg"; 
import "./BillDetail.css";

function BillDetail() {
  const { idBill } = useParams();
  const navigate = useNavigate();

  // Thông tin hóa đơn
  const billDetails = {
    status: "Đã hoàn",
    billType: "Đóng tiền cọc",
    deposit: "200.000",
    voucherCode: "",
    tutor: "Nguyễn Việt Anh",
    classCode: "1",
    admin: "Nguyễn Trung Khoa",
    proofImage: "...",
  };

  const listTitleTop = [
    {
      title1: "Trạng thái",
      title2: "Loại hóa đơn",
      data1: billDetails.status,
      data2: billDetails.billType,
    },
    {
      title1: "Tiền đặt cọc",
      title2: "Mã voucher",
      data1: billDetails.deposit,
      data2: billDetails.voucherCode,
    },
    {
      title1: "Gia sư",
      title2: "Mã lớp học",
      data1: billDetails.tutor,
      data2: billDetails.classCode,
    },
  ];

  const listTitleBottom = ["Admin", "Ảnh minh chứng"];

  return (
    <div className="container-ta">
      <h1>Mã hóa đơn: <p>{idBill}</p></h1>
      <img src={EditIcon} alt="EditIcon" />
      <div className="form-ta">
        {listTitleTop.map((item, index) => (
          <Grid container className="grid-container-top" key={index}>
            <Grid item xs={6}>
              <Grid container className="grid-item-top top1">
                <Grid item className="title item" xs={6}>
                  {item.title1}
                </Grid>
                <Grid item xs={6} className="item">
                  {item.title1 === "Trạng thái"? 
                    <span
                    className={
                      "status drop " +
                      (billDetails.status === "Chưa duyệt"
                        ? "open"
                        : billDetails.status === "Đã hoàn"
                        ? "cancel"
                        : billDetails.status === "Chưa hoàn"
                        ? "not-yet-process"
                        : "process")
                    }
                  >
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={billDetails.status}
                      // onChange={handleChange}
                      sx={{
                        "& .MuiSelect-icon": {
                          color:
                            billDetails.status === "Chưa duyệt"
                              ? "#D291BC"
                              : billDetails.status === "Đã hoàn"
                              ? "#FFDFD3"
                              : billDetails.status === "Chưa hoàn"
                              ? "#D291BC"
                              : "#D291BC", // Màu mặc định
                          fontSize: 24,
                          marginRight: "10px",
                        },
                        fontFamily: 'Itim',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: 'normal',
                      }}
                      IconComponent={FiChevronsDown}
                    >
                      <MenuItem
                        value={"Chưa duyệt"}
                        sx={{ background: "#E0BBE4 !important" }}
                      >
                        Chưa duyệt
                      </MenuItem>
                      <MenuItem
                        value={"Đã hoàn"}
                        sx={{ background: "#D291BC !important" }}
                      >
                        Đã hoàn
                      </MenuItem>
                      <MenuItem
                        value={"Chưa hoàn"}
                        sx={{ background: "#FFDFD3 !important" }}
                      >
                        Chưa hoàn
                      </MenuItem>
                      <MenuItem
                        value={"Đã duyệt"}
                        sx={{ background: "#FEC8D8 !important" }}
                      >
                        Đã duyệt
                      </MenuItem>
                    </Select>
                  </span>
                  : item.data1}
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
              {item === "Admin" ? billDetails.admin : "Ảnh minh chứng"}
            </Grid>
          </Grid>
        ))}
      </div>
    </div>
  );
}

export default BillDetail;
