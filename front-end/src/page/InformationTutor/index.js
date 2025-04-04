import { Backdrop, Box, CircularProgress, Grid, Rating } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../api";
import UserInfoIcon from "../../assets/icons/UserInfoIcon.svg";
import { useSnackbar } from "../../component/SnackbarProvider";
import { closeBackDrop, openBackDrop } from "../../redux/action";
import "./InformationTutor.css";

const formatDate = (dateStr) => {
  return dayjs(dateStr).format("DD/MM/YYYY");
};

function InformationTutor() {
  const { idTutor } = useParams("idTutor");
  const open = useSelector((state) => state.backdropAction);
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  const title = [
    "Họ và tên",
    "Giới tính",
    "Ngày sinh",
    "Quê quán",
    "CCCD/ CMND",
    "Số điện thoại",
    "Email",
    "Mạng xã hội",
    "Địa chỉ",
    "Ngày tham gia",
    "Mã giới thiệu",
    "Số lần giới thiệu",
    "Mã được giới thiệu",
    "Tiểu sử",
  ];

  // Thông tin gia sư
  const [tutorInfo, setTutorInfo] = useState({
    fullname: "",
    sex: "",
    birthday: null,
    hometown: "",
    cccd: "",
    phoneNumber: "",
    email: "",
    association: "",
    address: "",
    dateJoin: null,
    codeInviting: "",
    nofInvitations: null,
    codeInvited: "",
    bio: "",
  });

  async function getTutorInfo() {
    try {
      dispatch(openBackDrop());
      const response = await api.get(`user/information?id=${idTutor}`);
      const response1 = await api.get(`api/v1/tutors/summary/${idTutor}`);
      const data = {
        fullname: response.data.fullname,
        sex: response.data.sex,
        birthday: formatDate(response.data.birthday),
        hometown: response.data.hometown,
        cccd: response.data.cccd,
        phoneNumber: Array.from(response.data.contact)
          .map((it) => it.phoneNumber)
          .join(", "),
        email: Array.from(response.data.contact)
          .map((it) => it.email)
          .join(", "),
        association: Array.from(response.data.contact)
          .map((it) => it.association)
          .join(", "),
        address: Array.from(response.data.address)
          .map((it) => it)
          .join("\n"),
        dateJoin: formatDate(response.data.dateJoin),
        codeInviting: response.data.codeInviting,
        nofInvitations: response.data.nofInvitations,
        codeInvited: response.data.codeInvited,
        bio: response.data.bio,
        acceptedCount: response1.data.acceptedCount,
        deniedCount: response1.data.deniedCount,
      };
      delete data.contact;
      console.log(data);
      setTutorInfo(data);
    } catch (e) {
      showSnackbar("Lỗi kết nối, vui lòng thử lại sau ít phút");
    }
    dispatch(closeBackDrop());
  }

  useEffect(() => {
    getTutorInfo();
  }, []);

  return (
    <div className="container-information-account">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <Box display="flex" alignItems="center">
          <Rating
            name="half-rating"
            value={2.4}
            precision={0.1} // Cho phép hiển thị nửa sao hoặc số lẻ
            readOnly
            sx={{ color: "#D291BC" }}
          />
        </Box>
        <img src={UserInfoIcon} alt="UserInfoIcon" />
      </div>
      <Grid
        className="container-grid"
        container
        sx={{ borderCollapse: "collapse", border: "1px solid #957DAD" }}
      >
        {Object.entries(tutorInfo).map((item, index) => 
          index + 2 < Object.entries(tutorInfo).length?
          <>
          
            <Grid
              item
              xs={
                title[index] === "Số lần giới thiệu" ||
                title[index] === "Mã được giới thiệu"
                  ? 2
                  : 3
              }
              className="item title"
              sx={{
                border: "1px solid #957DAD",
                backgroundColor: "#FEC8D8",
                color: "#957DAD",
              }}
            >
              {title[index]}
            </Grid>
            <Grid
              item
              xs={
                title[index] === "Mã giới thiệu" ||
                title[index] === "Mã được giới thiệu"
                  ? 2
                  : title[index] === "Số lần giới thiệu"
                  ? 1
                  : 9
              }
              className="item"
              sx={{ border: "1px solid #957DAD" }}
            >
              {title[index] === "Mạng xã hội" ? (
                <a style={{ color: "#000" }} href={item[1]}>
                  {item[1]}
                </a>
              ) : title[index] === "Số điện thoại" ? (
                String(item[1]).substring(0, 4) +
                " " +
                String(item[1]).substring(4, 7) +
                " " +
                String(item[1]).substring(7, 10)
              ) : (
                item[1]
              )}
            </Grid> 
          </>: <></>
        )}
        <Grid item className="item title" xs={3}>
          Số đơn được chấp nhận
        </Grid>
        <Grid item className="item" xs={3}>
        {tutorInfo.acceptedCount}
        </Grid>
        <Grid item className="item title" xs={3}>
          Số đơn bị từ chối
        </Grid>
        <Grid item className="item" xs={3}>
        {tutorInfo.deniedCount}
        </Grid>
      </Grid>
    </div>
  );
}

export default InformationTutor;
