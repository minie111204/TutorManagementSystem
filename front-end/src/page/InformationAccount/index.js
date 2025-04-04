import React, { useEffect, useState } from "react";
import "./InformationAccount.css";
import UserInfoIcon from "../../assets/icons/UserInfoIcon.svg";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { closeBackDrop, openBackDrop } from "../../redux/action";
import api from "../../api";
import { useSnackbar } from "../../component/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import dayjs from "dayjs";

const formatDate = (dateStr) => {
  return dayjs(dateStr).format("DD/MM/YYYY");
}

function InformationAccount() {

  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const userData = useSelector(state => state.accountAction);
  const navigate = useNavigate();
  const open = useSelector(state => state.backdropAction);

  // Thông tin người dùng
  const title = [
    "Họ và tên",
    "Giới tính",
    "Ngày sinh",
    "Quê quán",
    "CCCD/ CMND",
    "Số điện thoại",
    "Email",
    "Mạng xã hội",
  ];
  const [userInfo, setUserInfo] = useState({
    fullname: "",
    sex: "",
    birthday: null,
    hometown: "",
    cccd: "",
    phoneNumber: "",
    email: "",
    association: "",
  });

  async function getInformation(){
    try{
      dispatch(openBackDrop());
      const response = await api.get(`user/information?id=${userData.id}`);
      const data = {
        ...response.data, 
        phoneNumber: Array.from(response.data.contact).map(it => it.phoneNumber).join(', '),
        email: Array.from(response.data.contact).map(it => it.email).join(', '),
        association: Array.from(response.data.contact).map(it => it.association).join(', '),
        birthday: formatDate(response.data.birthday),
      }
      delete data.contact;
      setUserInfo(data);
    }catch(e){
      if(e.response.status === 404){
        showSnackbar("Tài khoản hiện tại không khả dụng");
      } else if(e.response.status === 500){
        showSnackbar("Vui lòng đăng nhập lại");
        navigate("/login");
      } else {
        showSnackbar("Lỗi kết nối. Vui lòng thử lại sau ít phút");
      }
    }
    dispatch(closeBackDrop());
  }

  useEffect(() => {
    getInformation();
  }, []);

  return (
    <>
    <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="container-information-account">
        <img src={UserInfoIcon} alt="UserInfoIcon" />
        <Grid
          className="container-grid"
          container
          sx={{ borderCollapse: "collapse", border: "1px solid #957DAD" }}
        >
          {Object.entries(userInfo).map((item, index) => (
            <>
              <Grid
                item
                xs={3}
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
                xs={9}
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
            </>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default InformationAccount;
