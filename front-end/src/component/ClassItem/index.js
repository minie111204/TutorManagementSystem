import { useNavigate } from "react-router-dom";
import "./ClassItem.css";
import { FaDeleteLeft } from "react-icons/fa6";
import dayjs from "dayjs";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import AlertClassDialogSlide from "../DeleteClassModel";
import { useDispatch, useSelector } from "react-redux";
import { closeBackDrop, dialogClassClose, dialogClassOpen, openBackDrop } from "../../redux/action";
import api from "../../api";
import { useSnackbar } from "../SnackbarProvider";

const formatDay = (str) => {
  return dayjs(str).format("DD/MM/YYYY");
}

function ClassItem(props){
  const { infoClass, deleteClass, setPage, setListClass, setHasMore } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = useSelector(state => state.backdropAction);
  const { showSnackbar } = useSnackbar();
  async function deleteClassFunc(id){
    try{
      dispatch(openBackDrop());
      await api.delete(`api/v1/classes/${id}`);
      dispatch(dialogClassClose());
      setListClass([]);
      setPage(0);
      setHasMore(true);
    }catch(e){
      showSnackbar("Xóa thất bại: " + e.response.data.message);
    }
    dispatch(closeBackDrop());
  }

  return (
    <>
    <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <AlertClassDialogSlide deleteClassFunc={deleteClassFunc}/>
      <div className="container-card">
        {deleteClass? 
        <IconButton onClick={() => dispatch(dialogClassOpen(infoClass.classId))} sx={{position: 'absolute', right: '-20px', top: '-20px'}}>
          <FaDeleteLeft color="#957DAD"/>
        </IconButton> : <></>
        }
        <div className="title-card" onClick={() => navigate("/class/" + infoClass.classId)}>
          Mã lớp học: <h4>{infoClass.classId}</h4>
        </div>
        <h5>
          Ngày bắt đầu: <p>{formatDay(infoClass.dateStart)}</p>
        </h5>
        <div className="content-card">
          <div className="left-content">
            <p>
              Trạng thái: <span className={"status " + (infoClass.classStatus === "Da giao"? "assigned" : "not-yet-assigned")}>{infoClass.classStatus}</span>
            </p>
            <p>
              Kiểu dạy: <span>{infoClass.teachingStyle}</span>
            </p>
            <p>
              Khối lớp: <span>{infoClass.classTypeNames}</span>
            </p>
          </div>
          <div className="right-content">
            <p>
              Khu vực: <span>{infoClass.districtName}</span>
            </p>
            <p>
              Môn học:{" "}
                <span>
                  {infoClass.subjectNames}
                </span>
            </p>
            <p>
              SĐT:{" "}
              <span>
                {infoClass.phoneNumber}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassItem;