import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "../../assets/icons/AddIcon.svg";
import CalendarIcon from "../../assets/icons/CalendarIcon.svg";
import ChevronsDownIcon from "../../assets/icons/ChevronsDown.svg";
import { debounce } from "lodash";
import TrashIcon from "../../assets/icons/TrashIcon.svg";
import SearchIcon from "../../assets/icons/SearchIcon.svg";
import RegistrationItem from "../../component/RegistrationItem";
import "./TutorRegistration.css";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import { closeBackDrop, openBackDrop } from "../../redux/action";
import api from "../../api";
import { useSnackbar } from "../../component/SnackbarProvider";

function TutorRegistration() {
  // Variable + Hook

  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const componentRef = useRef(null);
    const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const open = useSelector(state => state.backdropAction);

  const [listRegistration, setListRegistration] = useState([]);

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

  async function getListTutorApplication(pageReq = page){
    try{
      dispatch(openBackDrop());
      const response = await api.get(`user/teaching-applications?pageNo=${pageReq}&pageSize=`);
      if(Array.isArray(response.data.content) && Array.from(response.data.content).length > 0){
      setListRegistration((prev) => [
        ...prev,
        ...response.data.content
      ])
    } else{
      setHasMore(false);
    }
    }catch(e){
      showSnackbar("Lỗi kết nối. Vui lòng thử lại sau ít phút");
    }
    dispatch(closeBackDrop());
  }

  useEffect(() => {
    getListTutorApplication();
  }, []);

   // Kiểm tra nếu mà người dùng kéo xuống thì sẽ load thêm trang
   useEffect(() => {
    if (!hasMore) return;
    const handleScroll = debounce(() => {
        if (componentRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = componentRef.current;
    
          if (scrollTop + clientHeight >= scrollHeight - 100) {
            const newPage = page + 1;
            getListTutorApplication(newPage);
            setPage(newPage);
          }
        }
      }, 300); // Chỉ gọi sau mỗi 300ms
    

    const refCurrent = componentRef.current;
    if (refCurrent) {
        refCurrent.addEventListener('scroll', handleScroll);
    }

    // Cleanup sự kiện khi component bị hủy
    return () => {
        if (refCurrent) {
            refCurrent.removeEventListener('scroll', handleScroll);
        }
    };
}, [hasMore, page]);

  function resetList(){
    setListRegistration([]);
    setPage(0);
    getListTutorApplication(page);
  }

  return (
    <>
    <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="container-classes">
        <h1>Danh sách đơn đăng ký gia sư</h1>
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
          {listRegistration.map((item) => (
            <RegistrationItem infoRegistration={item} resetList={resetList}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default TutorRegistration;
