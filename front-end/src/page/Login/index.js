import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import PenToolPink from "../../assets/icons/Pen tool-Pink.svg";
import { closeBackDrop, loginSuccess, openBackDrop } from "../../redux/action";
import "./Login.css";
import { useSnackbar } from "../../component/SnackbarProvider";

function Login() {

  // --------------------Hook-------------------
  const navigate = useNavigate();
  const open = useSelector(state => state.backdropAction);
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const [formLogin, setFormLogin] = useState({
    phoneNumber: "",
    password: "",
  });

  // ------------------Function------------------
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(openBackDrop());
      const response = await api.post("api/v1/auth/login", formLogin); 
      if (response.status === 200 && response.data.role === 'admin') {
        dispatch(loginSuccess(response.data));
        navigate("/information"); 
        showSnackbar("Đăng nhập thành công");
      } else {
        showSnackbar("Vui lòng đăng nhập bằng tài khoản admin");
      }
    } catch (error) {
        const status = error.response.status;
        if (status === 404) {
          showSnackbar("Tài khoản không tồn tại")
        } else if (status === 400) {
          showSnackbar("Sai mật khẩu"); 
        } else {
          showSnackbar("Lỗi kết nối. Vui lòng thử lại sau ít phút"); 
        }
    }
    dispatch(closeBackDrop());
  }
  

  function handleChange(e){
    const { name, value } = e.target;
    setFormLogin((prev) => ({
        ...prev,
        [name]: value,  
    }))
  }

  return (
    <>
    <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="container-login">
        <h1>
          <img src={PenToolPink} alt="PenToolPink" />
          Hệ thống Gia sư Dạy kèm tại nhà
        </h1>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>ĐĂNG NHẬP TÀI KHOẢN</h2>
          <div className="box-input">
            <label htmlFor="phoneNumber">Tên đăng nhập: </label>
            <input
              id="phoneNumber"
              placeholder="Nhập username hoặc số điện thoại..."
              name="phoneNumber"
              onChange={handleChange}
            />
          </div>
          <div className="box-input">
            <label htmlFor="password">Mật khẩu: </label>
            <input
              id="password"
              placeholder="Nhập mật khẩu..."
              name="password"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    </>
  );
}

export default Login;
