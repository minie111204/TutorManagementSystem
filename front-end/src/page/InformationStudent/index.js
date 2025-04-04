import React, { useEffect, useState } from "react";
import "./InformationStudent.css";
import UserInfoIcon from "../../assets/icons/UserInfoIcon.svg";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "../../component/SnackbarProvider";
import { closeBackDrop, openBackDrop } from "../../redux/action";

function InformationStudent() {

  const { idStudent } = useParams('idStudent');
  const open = useSelector(state => state.backdropAction);
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const title = [
    "Họ và tên",
    "Giới tính",
    "Khối lớp",
    "Trường",
    "Địa chỉ",
    "Số điện thoại",
    "Email",
    "Mạng xã hội",
  ];
  const [studentInfo, setStudentInfo] = useState({
    fullname: "",
    sex: "",
    grade: null,
    school: "",
    address:"",
    phoneNumber: "",
    email: "",
    association: "",
  });

  async function getStudentInfo(){
    try{
      dispatch(openBackDrop());
      const response = await api.get(`user/information?id=${idStudent}`);
      console.log(response);
      const data = {
        ...response.data, 
        phoneNumber: Array.from(response.data.contact).map(it => it.phoneNumber).join(', '),
        email: Array.from(response.data.contact).map(it => it.email).join(', '),
        association: Array.from(response.data.contact).map(it => it.association).join(', '),
        address: Array.from(response.data.address).map(it => it).join('\n'),
      }
      delete data.contact;
      setStudentInfo(data);
    }catch(e){
      showSnackbar("Lỗi kết nối, vui lòng thử lại sau ít phút");
    }
    dispatch(closeBackDrop());
  }

  useEffect(() => {
    getStudentInfo();
  }, []);

  return (
    <div className="container-information-account">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <img src={UserInfoIcon} alt="UserInfoIcon" />
      <Grid
        className="container-grid"
        container
        sx={{ borderCollapse: "collapse", border: "1px solid #957DAD" }}
      >
        {Object.entries(studentInfo).map((item, index) => (
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
  );
}

export default InformationStudent;
