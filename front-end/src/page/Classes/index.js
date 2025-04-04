import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../api";
import AddIcon from "../../assets/icons/AddIcon.svg";
import CalendarIcon from "../../assets/icons/CalendarIcon.svg";
import TrashIcon from "../../assets/icons/TrashIcon.svg";
import ClassItem from "../../component/ClassItem";
import SortSelect from "../../component/SortSelect";
import { closeBackDrop, openBackDrop } from "../../redux/action";
import "./Classes.css";
import { useSnackbar } from "../../component/SnackbarProvider";

function Classes() {
  const open = useSelector(state => state.backdropAction);
  // Variable + Hook
  const [listClass, setListClass] = useState([]);
  const sortList = [
    "Khối lớp",
    "Kiểu dạy",
    "Trạng thái",
    "Môn học",
    "Mã lớp học",
    "SĐT học viên",
  ];
  const [listItems, setListItems] = useState({
    grades: [],
    style: [],
    status: [],
    subject: [],
  });
  const navigate = useNavigate();

  // Function
  function handleFocus(e) {
    if (e.target.tagName !== "LABEL") {
      e.preventDefault();
      e.currentTarget.click();
    } else {
      const dateInput = document.getElementById(e.target.id + "-inp");
      console.log(dateInput);
      dateInput.showPicker();
    }
  }

  const { showSnackbar } = useSnackbar();

  async function getAllStyle() {
    try {
      dispatch(openBackDrop());
      const response = await api.get(`api/v1/styles`);
      listItems.style.push(...Array.from(response.data).map(it => ({...it, name: it.tsName})));
    } catch (e) {
      showSnackbar("Lỗi kết nối");
    }
    dispatch(closeBackDrop());
  }
  async function getAllSubject() {
    try {
      dispatch(openBackDrop());
      const response = await api.get(`api/v1/subjects`);
      listItems.subject.push(...Array.from(response.data).map(it => ({...it, name: it.subjectName})));
    } catch (e) {
      showSnackbar("Lỗi kết nối");
    }
    dispatch(closeBackDrop());
  }
  async function getAllClassType() {
    try {
      dispatch(openBackDrop());
      const response = await api.get(`api/v1/types`);
      listItems.grades.push(...Array.from(response.data).map(it => ({...it, name: it.classTypeName})));
    } catch (e) {
      showSnackbar("Lỗi kết nối");
    }
    dispatch(closeBackDrop());
  }

  useEffect(() => {
    getAllStyle();
    getAllSubject();
    getAllClassType();
    listItems.status.push({name: 'Da giao', id: 1}, {name: 'Chua giao', id: 2});
  }, []);

  const [page, setPage] = useState(0); // Trang hiện tại
  const [size] = useState(10); // Số lượng phần tử mỗi trang
  const [loading, setLoading] = useState(false); // Trạng thái tải
  const [hasMore, setHasMore] = useState(true); // Kiểm tra có thêm dữ liệu không

  const [filters, setFilters] = useState({
    classTypeName: "",
    tsName: "",
    classStatus: "",
    subjectName: "",
    phoneNumber: "",
    dateStartFrom: "",
    dateStartTo: "",
    sortOrder: ""
  });

  useEffect(() => {
    if (page === 0) {
      fetchClasses();
    }
  }, [page]);

  useEffect(() => {
    if (Object.values(filters).some((value) => value)) {
      setListClass([]); // Reset danh sách
      setPage(0);       // Reset trang
      setHasMore(true); // Reset trạng thái tải
    }
  }, [filters]);
  
  // Hàm cập nhật bộ lọc
  const handleFilterChange = (key, value) => {
    if(key === "subjectName"){
      if(value === 'ALL'){
        handleRenueve('ALL');
      } else {
        handleRenueve('Subject', value);
      }
    }
    setFilters((prev) => ({
      ...prev,
      [key]: value === 'ALL'? "" : value,
    }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const fetchClasses = useCallback(async () => {
    if (loading || !hasMore) return;
  
    setLoading(true);
    try {
      const nonEmptyFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== "")
      );
      dispatch(openBackDrop());
      const response = await api.get("api/v1/classes", {
        params: {
          page,
          size,
          ...nonEmptyFilters,
        },
      });
      
      const { content } = response.data;
      const totalPages = response.data.page.totalPages;
  
      setListClass((prevClasses) => [...prevClasses, ...content]);
      setHasMore(page + 1 < totalPages);
      setPage((prevPage) => prevPage + 1);
      setError("");
      dispatch(closeBackDrop());

    } catch (error) {
      console.error("Error fetching classes:", error);
      showSnackbar("Lỗi kết nối");
      dispatch(closeBackDrop());

    } finally {
      setLoading(false);
      dispatch(closeBackDrop());

    }
  }, [loading, hasMore, page, size, filters]);
  
  
  useEffect(() => {
    const handleScroll = debounce(() => {
      // Kiểm tra điều kiện cuộn gần cuối và không đang tải
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10
      ) {
        if (!loading && hasMore) {
          fetchClasses(); // Gọi fetchClasses nếu cuộn gần cuối trang
        }
      }
    }, 200);
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup khi component unmount
    };
  }, [fetchClasses, loading, hasMore]); // Thêm các dependency cần thiết

  const [revenue, setRevenue] = useState({
    currentRevenue: null,
    discountRevenue: null,
    errorMessage: null,
    expectedRevenue: null,
  });

  async function handleRenueve(key, value){
    try{
      dispatch(openBackDrop());
      const response = await api.get(`api/v1/revenue?type=${key}` + (key !== "ALL"? `&input=${value}` : ''));
      setRevenue(response.data);
    }catch(e){
      showSnackbar("Lỗi kết nối");
    }
    dispatch(closeBackDrop());
  }

  const [deleteClass, setDeleteClass] = useState(false);

  return (
    <>
      <div className="container-classes">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <h1>Danh sách lớp học</h1>
        <div className="container-filter-class">
          <div className="box-filter filter-from">
            <h3>Lọc từ ngày: </h3>
            <div className="box-inp">
              <label htmlFor="from-date" id="from-date" onClick={handleFocus}>
                <p>{filters.dateStartFrom || "nhập ngày bắt đầu..."}</p>
                <img src={CalendarIcon} alt="CalendarIcon" />
              </label>
              <input
                id="from-date-inp"
                onChange={(e) => handleFilterChange("dateStartFrom", e.target.value)}
                type="date"
              />
            </div>
          </div>
          <h3>đến ngày: </h3>
          <div className="filter-to box-filter">
            <div className="box-inp">
              <label htmlFor="to-date" id="to-date" onClick={handleFocus}>
                <p>{filters.dateStartTo || "nhập ngày kết thúc..."}</p>
                <img src={CalendarIcon} alt="CalendarIcon" />
              </label>
              <input id="to-date-inp" onChange={(e) => handleFilterChange("dateStartTo", e.target.value)} type="date" />
            </div>
          </div>
          <div className="option-btn">
            <IconButton onClick={() => navigate("/create-class")}>
              <FiPlusCircle size={48} color="#957DAD"/>
            </IconButton>
            <IconButton>
              <FaRegTrashAlt size={48} color="#957DAD" onClick={() => setDeleteClass(prev => !prev)}/>
            </IconButton>
            <div>
              <div>Doanh thu: {revenue.currentRevenue}</div>
              <div>Dự kiến: {revenue.expectedRevenue}</div>
              <div>Tổng giảm: {revenue.discountRevenue}</div>
            </div>
          </div>
        </div>
        <div className="sort-list">
        {sortList.map((item, index) => (
        <SortSelect key={index} item={item} filters={filters} handleFilterChange={handleFilterChange} index={index} sortList={sortList} handleRenueve={handleRenueve} listItems={listItems}/>
      ))}
        </div>
        <div className="container-card-list">
          {listClass.map((item) => (
            <ClassItem setPage={setPage} setHasMore={setHasMore} setListClass={setListClass} deleteClass={deleteClass} infoClass={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Classes;
