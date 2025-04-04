import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api";
import AddIcon from "../../assets/icons/AddIcon.svg";
import { useSnackbar } from "../../component/SnackbarProvider";
import { closeBackDrop, openBackDrop } from "../../redux/action";
import "./CreateClass.css";
import { FiPlusCircle } from "react-icons/fi";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

function CreateClass() {
  const dispatch = useDispatch();
  const open = useSelector(state => state.backdropAction);
  const [formCreateClass, setFormCreateClass] = useState({
    classStatus: "Da giao",
    dateStart: "",
    salary: 0,
    classDeposit: 0,
    commissionFee: 0,
    tsId: null,
    studentPhoneNumber: "0912 987 654",
    tutorPhoneNumber: "",
    subjectIds: [],
    classTypeIds: [],
    dateAndTimeDtoList: [],
    addrId: null,
    requirements: "",
  });

  const [rows, setRows] = useState(1);

  const [dateAndTimeDtoSelect, setDateAndTimeDtoSelect] = useState({
    weekId: "",
    slotId: "",
  });

  const listTitle = [
    {
      title1: "Trạng thái",
      title2: "Ngày bắt đầu",
      item1: formCreateClass.classStatus,
      item2: formCreateClass.dateStart,
    },
    {
      title1: "Mức lương",
      title2: "Tiền đặt cọc",
      item1: formCreateClass.salary,
      item2: formCreateClass.classDeposit,
    },
    {
      title1: "Tiền hoa hồng",
      title2: "Kiểu dạy",
      item1: formCreateClass.commissionFee,
      item2: formCreateClass.tsId,
    },
    {
      title1: "SDT Học viên",
      title2: "SDT Gia sư",
      item1: formCreateClass.studentPhoneNumber,
      item2: formCreateClass.tutorPhoneNumber,
    },
    {
      title1: "Môn học",
      title2: "Khối lớp",
      item1: formCreateClass.subjectIds,
      item2: formCreateClass.classTypeIds,
    },
    {
      title1: "Buổi dạy",
      title2: "Giờ dạy",
      item1: dateAndTimeDtoSelect.weekId,
      item2: dateAndTimeDtoSelect.slotId,
    },
  ];

  const titleBottom = [
    {
      title: "Địa chỉ",
      item: formCreateClass.addrId,
    },
    {
      title: "Yêu cầu",
      item: formCreateClass.requirements,
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
  }
  const { showSnackbar } = useSnackbar();
  async function createClass() {
    try {
      dispatch(openBackDrop());
      await api.post(`api/v1/classes`, formCreateClass);
      showSnackbar("Tạo lớp mới thành công");
    } catch (e) {
      if(e.response.data.message){
        showSnackbar(e.response.data.message)
      }else{
        showSnackbar("Lỗi không xác định");
      }
    }
    dispatch(closeBackDrop());
  }

  function handleAddTime() {
    console.log(dateAndTimeDtoSelect);
    if (!dateAndTimeDtoSelect.weekId || !dateAndTimeDtoSelect.slotId) {
      alert("Vui lòng nhập cả buổi và giờ học!");
      return;
    }
    formCreateClass.dateAndTimeDtoList.push(dateAndTimeDtoSelect);
    setRows((prev) => prev + 1);
  }

  function handChangeForm(e) {
    const { name, value } = e.target;
    console.log(name);
    if (
      name === "salary" ||
      name === "classDeposit" ||
      name === "commissionFee"
    ) {
      // Xử lý giá trị nhập vào: Loại bỏ các ký tự không phải số
      const numericValue = value.replace(/[^0-9]/g, "");

      // Định dạng giá trị theo tiền tệ
      const formattedValue = formatCurrency(numericValue);

      setFormCreateClass((prev) => ({
        ...prev,
        [name]: numericValue, // Lưu giá trị số (không format) để xử lý logic
        [`${name}Formatted`]: formattedValue, // Lưu giá trị đã format để hiển thị
      }));
    } else {
      setFormCreateClass((prev) => ({ ...prev, [name]: value }));
    }
  }

  const [teachingStyle, setTeachingStyle] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classTypes, setClassTypes] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);
  const [weekDay, setWeekDay] = useState([]);

  async function getAllStyle() {
    try {
      dispatch(openBackDrop());
      const response = await api.get(`api/v1/styles`);
      setTeachingStyle(response.data);
    } catch (e) {
      showSnackbar("Lỗi kết nối");
    }
    dispatch(closeBackDrop());
  }
  async function getAllSubject() {
    try {
      dispatch(openBackDrop());
      const response = await api.get(`api/v1/subjects`);
      setSubjects(response.data);
    } catch (e) {
      showSnackbar("Lỗi kết nối");
    }
    dispatch(closeBackDrop());
  }
  async function getAllClassType() {
    try {
      dispatch(openBackDrop());
      const response = await api.get(`api/v1/types`);
      setClassTypes(response.data);
    } catch (e) {
      showSnackbar("Lỗi kết nối");
    }
    dispatch(closeBackDrop());
  }
  async function getAllAddress() {
    try {
      dispatch(openBackDrop());
      const response = await api.get(
        `api/v1/addresses/${formCreateClass.studentPhoneNumber}`
      );
      setAddresses(response.data);
    } catch (e) {
      showSnackbar("Lỗi kết nối");
    }
    dispatch(closeBackDrop());
  }
  async function getAllTimeSlot() {
    try {
      dispatch(openBackDrop());
      const response = await api.get(`api/v1/times`);
      setTimeSlot(response.data);
    } catch (e) {
      showSnackbar("Lỗi kết nối");
    }
    dispatch(closeBackDrop());
  }
  async function getAllWeekenDay() {
    try {
      dispatch(openBackDrop());
      const response = await api.get(`api/v1/days`);
      console.log(response);
      setWeekDay(response.data);
    } catch (e) {
      showSnackbar("Lỗi kết nối");
    }
    dispatch(closeBackDrop());
  }

  useEffect(() => {
    getAllAddress();
  }, [formCreateClass.studentPhoneNumber]);

  useEffect(() => {
    getAllStyle();
    getAllSubject();
    getAllTimeSlot();
    getAllClassType();
    getAllWeekenDay();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormCreateClass({
      ...formCreateClass,
      subjectIds: typeof value === "string" ? value.split(",") : value,
    });
  };
  const handleChangeTypeClass = (event) => {
    const {
      target: { value },
    } = event;
    setFormCreateClass({
      ...formCreateClass,
      classTypeIds: typeof value === "string" ? value.split(",") : value,
    });
  };

  const getDefaultTimeValue = (index) => {
    const time = timeSlot.find(
      (it) =>
        it.id ===
        Array.from(formCreateClass.dateAndTimeDtoList).at(index).slotId
    );

    if (!time) return ""; // Nếu không tìm thấy timeSlot, trả về chuỗi rỗng

    const formatTime = (date) =>
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0");

    return (
      formatTime(new Date(time.startTime)) +
      "-" +
      formatTime(new Date(time.endTime))
    );
  };
  const getWeekDayDefault = (index) => {
    const time = weekDay.find(
      (it) =>
        it.id ===
        Array.from(formCreateClass.dateAndTimeDtoList).at(index).weekId
    );

    if (!time) return ""; // Nếu không tìm thấy timeSlot, trả về chuỗi rỗng

    return time.name;
  };

  return (
    <>
    <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="container-create-class">
        <h1>Thêm lớp học</h1>
        <form onSubmit={handleSubmit}>
          {listTitle.map((item) => {
            return (
              <>
                {item.title1 === "Buổi dạy" && item.title2 === "Giờ dạy" ? (
                  Array(rows)
                    .fill()
                    .map((_, index) => (
                      <Grid className="top-grid" container>
                        <Grid item className={"title-inp"} xs={2.5}>
                          {index === 0 ? item.title1 + ":" : ""}
                        </Grid>
                        {Array.from(formCreateClass.dateAndTimeDtoList).length >
                        index ? (
                          <Grid item className={"item-inp"} xs={3.5}>
                            <>
                              <input
                                className={item.title1}
                                defaultValue={getWeekDayDefault(index)}
                                disabled
                              />
                            </>
                          </Grid>
                        ) : (
                          <Grid
                            item
                            className={
                              item.title1 === "Buổi dạy" ? "" : "item-inp"
                            }
                            xs={3.5}
                          >
                            <>
                              <Select
                                sx={{
                                  width: "426px",
                                  background: '#FEC8D8',
                                borderRadius: '20px',
                                border: '3px solid #957DAD'
                                }}
                                value={dateAndTimeDtoSelect.weekId}
                                onChange={(e) =>
                                  setDateAndTimeDtoSelect({
                                    ...dateAndTimeDtoSelect,
                                    weekId: e.target.value,
                                  })
                                }
                                displayEmpty
                              >
                                <MenuItem
                                  value={""}
                                  sx={{ background: "#E0BBE4 !important" }}
                                >
                                  Chọn buổi dạy
                                </MenuItem>
                                {weekDay.map((it) => (
                                  <MenuItem
                                    value={it.id}
                                    sx={{ background: "#E0BBE4 !important" }}
                                  >
                                    {it.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </>
                          </Grid>
                        )}
                        <Grid item className="title-inp" xs={2.5}>
                          {index === 0 ? item.title2 + ":" : ""}
                        </Grid>
                        <Grid
                          item
                          className={
                            item.title2 === "Giờ dạy" ? "" : "item-inp"
                          }
                          xs={3.5}
                        >
                          {Array.from(formCreateClass.dateAndTimeDtoList)
                            .length > index ? (
                            <Grid item className={"item-inp"} xs={3.5}>
                              <input
                                className={item.title2}
                                defaultValue={getDefaultTimeValue(index)}
                                disabled
                              />
                            </Grid>
                          ) : (
                            <>
                              <Grid
                                item
                                className={
                                  item.title2 === "Giờ dạy" ? "" : "item-inp"
                                }
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                xs={12}
                              >
                                <Select
                                  sx={{
                                    width: "426px",
                                    background: '#FEC8D8',
                                borderRadius: '20px',
                                border: '3px solid #957DAD'
                                  }}
                                  value={dateAndTimeDtoSelect.slotId}
                                  onChange={(e) =>
                                    setDateAndTimeDtoSelect({
                                      ...dateAndTimeDtoSelect,
                                      slotId: e.target.value,
                                    })
                                  }
                                  displayEmpty
                                >
                                  <MenuItem
                                    value={""}
                                    sx={{ background: "#E0BBE4 !important" }}
                                  >
                                    Chọn giờ dạy
                                  </MenuItem>
                                  {timeSlot.map((it) => (
                                    <MenuItem
                                      value={it.id}
                                      sx={{ background: "#E0BBE4 !important" }}
                                    >
                                      {new Date(it.startTime)
                                        .getHours()
                                        .toString()
                                        .padStart(2, "0") +
                                        ":" +
                                        new Date(it.startTime)
                                          .getMinutes()
                                          .toString()
                                          .padStart(2, "0") +
                                        "-" +
                                        new Date(it.endTime)
                                          .getHours()
                                          .toString()
                                          .padStart(2, "0") +
                                        ":" +
                                        new Date(it.endTime)
                                          .getMinutes()
                                          .toString()
                                          .padStart(2, "0")}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {item.title2 === "Giờ dạy" ? (
                                 <IconButton onClick={handleAddTime}>
                                 <FiPlusCircle size={48} color="#957DAD"/>
                                 </IconButton>
                                ) : (
                                  <></>
                                )}
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </Grid>
                    ))
                ) : (
                  <Grid className="top-grid" container>
                    <Grid item className="title-inp" xs={2.5}>
                      {item.title1}:
                    </Grid>
                    <Grid
                      item
                      className={
                        item.title1 === "Môn học" || item.title1 === "Buổi dạy"
                          ? ""
                          : "item-inp"
                      }
                      style={{ display: "flex", alignItems: "center" }}
                      xs={3.5}
                    >
                      {item.title1 !== "Trạng thái" ? (
                        item.title1 === "Môn học" ? (
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={formCreateClass.subjectIds}
                            onChange={handleChange}
                            sx={{
                              width: "426px",
                              background: '#FEC8D8',
                                borderRadius: '20px',
                                border: '3px solid #957DAD'
                            }}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) =>
                              selected.length > 0
                                ? subjects
                                    .filter((it) => selected.includes(it.id))
                                    .map((it) => it.subjectName)
                                    .join(", ")
                                : "Chọn môn học"
                            }
                            displayEmpty
                            MenuProps={MenuProps}
                          >
                            {subjects.map((name) => (
                              <MenuItem key={name.id} value={name.id}>
                                <Checkbox
                                  checked={formCreateClass.subjectIds.includes(
                                    name.id
                                  )}
                                />
                                <ListItemText primary={name.subjectName} />
                              </MenuItem>
                            ))}
                          </Select>
                        ) : item.title1 === "Tiền hoa hồng" ||
                          item.title1 === "Mức lương" ? (
                          <input
                            className={item.title1}
                            name={
                              item.title1 === "Tiền hoa hồng"
                                ? "commissionFee"
                                : item.title1 === "Mức lương"
                                ? "salary"
                                : item.title1 === "SDT Học viên"
                                ? "studentPhoneNumber"
                                : ""
                            }
                            value={
                              formCreateClass[
                                item.title1 === "Tiền hoa hồng"
                                  ? "commissionFeeFormatted"
                                  : item.title1 === "Mức lương"
                                  ? "salaryFormatted"
                                  : ""
                              ] || ""
                            }
                            onChange={handChangeForm}
                          />
                        ) : (
                          <input
                            className={item.title1}
                            name="studentPhoneNumber"
                            onChange={handChangeForm}
                          />
                        )
                      ) : (
                        <Button
                          type="button"
                          sx={{
                            textTransform: "capitalize",
                            borderRadius: "15px",
                            color: "#000",
                            background: formCreateClass.classStatus === "Da giao"? "#FEC8D8" : "#D291BC"
                          }}
                          onClick={() => {
                            setFormCreateClass({
                              ...formCreateClass,
                              classStatus:
                                formCreateClass.classStatus === "Da giao"
                                  ? "Chua giao"
                                  : "Da giao",
                            });
                          }}
                        >
                          {formCreateClass.classStatus}
                        </Button>
                      )}
                    </Grid>
                    <Grid item className="title-inp" xs={2.5}>
                      {item.title2}:
                    </Grid>
                    <Grid
                      item
                      className={
                        item.title2 === "Kiểu dạy" || item.title2 === "Khối lớp"
                          ? ""
                          : "item-inp"
                      }
                      xs={3.5}
                    >
                      {item.title2 === "Kiểu dạy" ? (
                        <Select
                          sx={{
                            width: "426px",
                            background: '#FEC8D8',
                                borderRadius: '20px',
                                border: '3px solid #957DAD'
                          }}
                          value={formCreateClass.tsId}
                          onChange={(e) =>
                            setFormCreateClass({
                              ...formCreateClass,
                              tsId: e.target.value,
                            })
                          }
                          displayEmpty
                        >
                          <MenuItem
                            value={null}
                            sx={{ background: "#E0BBE4 !important" }}
                          >
                            Chọn kiểu dạy
                          </MenuItem>
                          {teachingStyle.map((it) => (
                            <MenuItem
                              value={it.id}
                              sx={{ background: "#E0BBE4 !important" }}
                            >
                              {it.tsName}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : item.title2 === "Khối lớp" ? (
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={formCreateClass.classTypeIds}
                          onChange={handleChangeTypeClass}
                          sx={{
                            width: "426px",
                            background: '#FEC8D8',
                                borderRadius: '20px',
                                border: '3px solid #957DAD'
                          }}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) =>
                            selected.length > 0
                              ? classTypes
                                  .filter((it) => selected.includes(it.id))
                                  .map((it) => it.classTypeName)
                                  .join(", ")
                              : "Chọn khối lớp"
                          }
                          MenuProps={MenuProps}
                          displayEmpty
                        >
                          {classTypes.map((name) => (
                            <MenuItem key={name.id} value={name.id}>
                              <Checkbox
                                checked={formCreateClass.classTypeIds.includes(
                                  name.id
                                )}
                              />
                              <ListItemText primary={name.classTypeName} />
                            </MenuItem>
                          ))}
                        </Select>
                      ) : item.title2 === "Ngày bắt đầu" ? (
                        <input
                          type="date"
                          name="dateStart"
                          onChange={handChangeForm}
                        />
                      ) : (
                        item.title2 === "Tiền đặt cọc"?
                        <input
                            className={item.title2}
                            name={
                              item.title2 === "Tiền đặt cọc"
                                ? "classDeposit"
                                : item.title2 === "SDT Học viên"
                                ? "studentPhoneNumber"
                                : ""
                            }
                            value={
                              formCreateClass[
                                item.title2 === "Tiền đặt cọc"
                                  ? "classDepositFormatted"
                                  : item.title2 === "Mức lương"
                                  ? "salaryFormatted"
                                  : ""
                              ] || ""
                            }
                            onChange={handChangeForm}
                          />:
                        <input
                          name={
                            item.title2 === "Tiền đặt cọc"
                              ? "classDeposit"
                              : item.title2 === "SDT Gia sư"
                              ? "tutorPhoneNumber"
                              : ""
                          }
                          onChange={handChangeForm}
                        />
                      )}
                    </Grid>
                  </Grid>
                )}
              </>
            );
          })}
          <div className="bottom-grid">
            {titleBottom.map((item) => {
              return (
                <>
                  <Grid container>
                    <Grid item className="title-inp" xs={2.5}>
                      {item.title}:
                    </Grid>
                    <Grid
                      item
                      className={item.title === "Địa chỉ" ? "" : "item-inp"}
                      xs={8.67}
                    >
                      {item.title === "Địa chỉ" ? (
                        <Select
                          sx={{
                            width: "426px",
                            background: '#FEC8D8',
                                borderRadius: '20px',
                                border: '3px solid #957DAD'
                          }}
                          value={formCreateClass.addrId}
                          onChange={(e) =>
                            setFormCreateClass({
                              ...formCreateClass,
                              addrId: e.target.value,
                            })
                          }
                          displayEmpty
                        >
                          <MenuItem
                            value={null}
                            sx={{ background: "#E0BBE4 !important" }}
                          >
                            Chọn địa chỉ
                          </MenuItem>
                          {addresses.map((it) => (
                            <MenuItem
                              value={it.id}
                              sx={{ background: "#E0BBE4 !important" }}
                            >
                              {it.houseNumber + ", " + it.streetName}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        <input name="requirements" onChange={handChangeForm} />
                      )}
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </div>
          <Button
            sx={{
              color: "#000",
              background: "#E0BBE4",
              width: "150px",
              height: "70px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onClick={createClass}
          >
            Xác nhận
          </Button>
        </form>
      </div>
    </>
  );
}

export default CreateClass;
