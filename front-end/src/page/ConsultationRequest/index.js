import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "../../assets/icons/AddIcon.svg";
import CalendarIcon from "../../assets/icons/CalendarIcon.svg";
import ChevronsDownIcon from "../../assets/icons/ChevronsDown.svg";
import SearchIcon from "../../assets/icons/SearchIcon.svg";
import TrashIcon from "../../assets/icons/TrashIcon.svg";
import RequestItem from "../../component/RequestItem";
import "./ConsultationRequest.css";
import api from "../../api";
import { Backdrop, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeBackDrop, openBackDrop } from "../../redux/action";
import { useSnackbar } from "../../component/SnackbarProvider";

function ConsultationRequest() {
  // Variable + Hook
  const [listRequests, setListRequests] = useState([]);
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const open = useSelector(state => state.backdropAction);

  const sortList = [
    "Khối lớp",
    "Kiểu dạy",
    "Trạng thái",
    "Môn học",
    "SĐT học viên",
  ];

  const [selectedDateFrom, setSelectedDateFrom] = useState();
  const [selectedDateTo, setSelectedDateTo] = useState();
  const navigate = useNavigate();

  function handleFocus(e) {
    if (e.target.tagName !== "LABEL") {
      e.preventDefault();
      e.currentTarget.click();
    } else {
      const dateInput = document.getElementById(e.target.id + "-inp");
      dateInput.showPicker();
    }
  }

  function handleChangeDate(e) {
    if (e.target.id === "from-date-inp") {
      setSelectedDateFrom(e.target.value);
    } else {
      setSelectedDateTo(e.target.value);
    }
  }

  async function getListConsultation(){
    try{
      dispatch(openBackDrop());
      const response = await api.get(`user/consultation-reqs`);
      setListRequests(response.data.content);
    }catch(e){
      showSnackbar("Lỗi kết nối, vui lòng thử lại sau ít phút");
    }
    dispatch(closeBackDrop());
  }

  useEffect(() => {
    getListConsultation();
  }, []);

  return (
    <>
      <div className="container-classes">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <h1>Danh sách đơn yêu cầu tư vấn</h1>
        <div className="container-filter-class">
          <div className="box-filter filter-from">
            <h3>Lọc từ ngày: </h3>
            <div className="box-inp">
              <label htmlFor="from-date" id="from-date" onClick={handleFocus}>
                <p>{selectedDateFrom || "nhập ngày bắt đầu..."}</p>
                <img src={CalendarIcon} alt="CalendarIcon" />
              </label>
              <input
                id="from-date-inp"
                onChange={handleChangeDate}
                type="date"
              />
            </div>
          </div>
          <h3>đến ngày: </h3>
          <div className="filter-to box-filter">
            <div className="box-inp">
              <label htmlFor="to-date" id="to-date" onClick={handleFocus}>
                <p>{selectedDateTo || "nhập ngày kết thúc..."}</p>
                <img src={CalendarIcon} alt="CalendarIcon" />
              </label>
              <input id="to-date-inp" onChange={handleChangeDate} type="date" />
            </div>
          </div>
        </div>
        <div className="sort-list">
        {sortList.map((item, index) => {
            return (
              <>
                <div className="sort-item">
                <h4>{item}</h4>
              {index === sortList.length - 1? 
                <img src={SearchIcon} alt="SearchIcon" /> : <img src={ChevronsDownIcon} alt="ChevronsDownIcon" />
              }
              </div>
              </>
            );
          })}
        </div>
        <div className="container-card-list">
          {listRequests.map((item) => (
            <RequestItem infoRequest={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ConsultationRequest;
