import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import EditIcon from "../../assets/icons/EditIcon.svg";
import "./ClassDetail.css";
import { FiEdit } from "react-icons/fi";
import api from "../../api";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeBackDrop, openBackDrop } from "../../redux/action";
import { useSnackbar } from "../../component/SnackbarProvider";
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN').format(value);
};

function ClassDetail() {
  const { idClass } = useParams("idClass");
  const navigate = useNavigate();
  const open = useSelector(state => state.backdropAction)
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const [data, setData] = useState({
    id: null,
    classStatus: "",
    dateStart: "",
    salary: "",
    classDeposit: "",
    commissionFee: "",
    teachingStyleTName: "",
    studentName: "",
    tutorFullName: "",
    subjects: "",
    classTypes: "",
    weekDay: "",
    time: "",
    address: "",
    requirements: "",
    invoiceCode: "",
    teachingApplicationCode: "",
  });

  const listTitleTop = [
    {
      title1: "Trạng thái",
      title2: "Ngày bắt đầu",
      data1: data.classStatus,
      data2: data.dateStart,
    },
    {
      title1: "Mức lương",
      title2: "Tiền đặt cọc",
      data1: data.salary,
      data2: data.classDeposit,
    },
    {
      title1: "Tiền hoa hồng",
      title2: "Kiểu dạy",
      data1: data.commissionFee,
      data2: data.teachingStyleTName,
    },
    {
      title1: "Học viên",
      title2: "Gia sư",
      data1: data.studentName,
      data2: data.tutorFullName,
    },
    {
      title1: "Môn học",
      title2: "Khối lớp",
      data1: data.subjects,
      data2: data.classTypes,
    },
    {
      title1: "Buổi dạy",
      title2: "Giờ dạy",
      data1: data.weekDay,
      data2: data.time,
    },
  ];

  async function getDetailClass(){
    try{
      dispatch(openBackDrop());
      const response = await api.get(`api/v1/classes/${idClass}`);
      console.log(response);
      setData({
        ...response.data,
        subjects: Array.from(response.data.subjects).join(', '),
        classTypes: Array.from(response.data.classTypes).join(', '),
        weekDay: Array.from(response.data.dateAndTimeList).map(item => item.weekDay).join("\n"),
        time: Array.from(response.data.dateAndTimeList).map(item => item.time).join("\n"),
        commissionFee: `${formatCurrency(response.data.commissionFee)}đ`,
        classDeposit: `${formatCurrency(response.data.classDeposit)}đ`,
        salary: `${formatCurrency(response.data.salary)}đ`,
      })
    }catch(e){
      showSnackbar("Lỗi kết nối, vui lòng thử lại sau");
    }
    dispatch(closeBackDrop());
  }
  
  useEffect(() => {
    getDetailClass();
  }, []);

  const listTitleBottom = ["Địa chỉ", "Yêu cầu"];

  return (
    <div className="container-ta">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1>
        Mã lớp học: <p>{idClass}</p>
      </h1>
      <IconButton className="img" onClick={() => navigate("/update-class/" + idClass)}>
        <FiEdit size={48} color="#957DAD"/>
      </IconButton>
      <div className="form-ta">
        {listTitleTop.map((item) => (
          <Grid container className="grid-container-top" key={item.title1}>
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
        {listTitleBottom.map((item) => (
          <Grid container className="grid-container-top top1" key={item}>
            <Grid item xs={3} className="title item">
              {item}
            </Grid>
            <Grid item xs={9} className="item">
              {item === "Địa chỉ"
                ? data.address
                : data.requirements}
            </Grid>
          </Grid>
        ))}
        <Grid container>
          <Grid item className="title item" xs={3} 
            sx={{
              aspectRatio: "1 / 1", // tỷ lệ 1:1 giữa chiều rộng và chiều cao
            }}
          >
            Mã hóa đơn
          </Grid>
          <Grid item xs={3} 
            sx={{
              aspectRatio: "1 / 1",
            }}
            className="item"
          >
            <p onClick={() => navigate("/bill/2")}>{data.invoiceCode}</p>
          </Grid>
          <Grid item xs={3} 
            sx={{
              aspectRatio: "1 / 1",
            }}
            className="title item"
          >
            Đơn đăng ký dạy
          </Grid>
          <Grid item xs={3} 
            sx={{
              aspectRatio: "1 / 1",
            }}
            className="item"
          >
            <p onClick={() => navigate("/teaching-application/1")}>{data.teachingApplicationCode}</p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ClassDetail;
