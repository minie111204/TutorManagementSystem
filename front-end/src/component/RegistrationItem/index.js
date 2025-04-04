import { Backdrop, CircularProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FiChevronsDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { closeBackDrop, dialogClose, dialogOpen, openBackDrop } from "../../redux/action";
import OpenClassModel from "../OpenClassModel";
import { useSnackbar } from "../SnackbarProvider";
import "./RegistrationItem.css";

function RegistrationItem(props) {
  const { infoRegistration } = props;
  const { resetList } = props;
  const open = useSelector(state => state.backdropAction);
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function updateStatus(value, id){
    try{
      dispatch(openBackDrop());
      await api.put(`user/status-ta?id=${id}&status=${value}`);
      resetList();
      dispatch(dialogClose());
      showSnackbar("Cập nhật trạng thái thành công");
    }catch(e){
      showSnackbar("Lỗi kết nối. Vui lòng thử lại sau ít phút")
    }
    dispatch(closeBackDrop());
  }

  function handleChange(e){
    const { value } = e.target;
    if(value === 'Da mo lop'){
      dispatch(dialogOpen({id: infoRegistration.id, value: value}));
    } else {
      updateStatus(value, infoRegistration.id);
    }
  }
  return (
    <>
      <div className="container-card">
      <OpenClassModel updateStatus={updateStatus}/>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <div
          className="title-card"
          style={{cursor: "default"}}
        >
          Mã đơn đăng ký gia sư: <h4>{infoRegistration.id}</h4>
        </div>
        <div className="content-card">
          <div className="left-content">
            <p>
              Trạng thái:{" "}
              <span
                className={
                  "status drop " +
                  (infoRegistration.status === "Da mo lop"
                    ? "open"
                    : infoRegistration.status === "Da huy bo"
                    ? "cancel"
                    : infoRegistration.status === "Chua xu ly"
                    ? "not-yet-process"
                    : "process")
                }
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={infoRegistration.status}
                  onChange={handleChange}
                  sx={{
                    "& .MuiSelect-icon": {
                      color:
                        infoRegistration.status === "Da mo lop"
                          ? "#D291BC"
                          : infoRegistration.status === "Da huy bo"
                          ? "#FFDFD3"
                          : infoRegistration.status === "Dang xu ly"
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
                    value={"Da mo lop"}
                    sx={{ background: "#E0BBE4 !important" }}
                  >
                    Đã mở lớp
                  </MenuItem>
                  <MenuItem
                    value={"Da huy bo"}
                    sx={{ background: "#D291BC !important" }}
                  >
                    Đã hủy bỏ
                  </MenuItem>
                  <MenuItem
                    value={"Dang xu ly"}
                    sx={{ background: "#FFDFD3 !important" }}
                  >
                    Đang xử lý
                  </MenuItem>
                  <MenuItem
                    value={"Chua xu ly"}
                    sx={{ background: "#FEC8D8 !important" }}
                  >
                    Chưa xử lý
                  </MenuItem>
                </Select>
              </span>
            </p>
            <p onClick={() => navigate("/information-student/" + infoRegistration.idStudent)} style={{cursor: "pointer"}}>
              Học viên: <span>{infoRegistration.nameStudent}</span>
            </p>
            <p>
              Khối lớp: <span>{infoRegistration.grade}</span>
            </p>
            <p>
              Địa chỉ: <span>{infoRegistration.address}</span>
            </p>
            <p>
              Kiểu dạy: <span>{infoRegistration.styleTeaching}</span>
            </p>
          </div>
          <div className="right-content">
            <p>
              Môn học:{" "}
              {Array.from(infoRegistration.subjects).map((item, index) => (
                <span>
                  {index + 1 < Array.from(infoRegistration.subjects).length
                    ? item + ", "
                    : item}
                </span>
              ))}
            </p>
            <p onClick={() => navigate("/information-tutor/" + infoRegistration.idTutor)} style={{cursor: "pointer"}}>
              Gia sư: <span>{infoRegistration.nameTutor}</span>
            </p>
            <p>
              SĐT:{" "}
              <span>
                {infoRegistration.phoneNumber}
              </span>
            </p>
            <p>
              Yêu cầu: <span>{infoRegistration.requirement}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationItem;
