import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useParams } from "react-router-dom";
import EditIcon from "../../assets/icons/EditIcon.svg";
import "./TeachingApplication.css";
import { FiChevronsDown } from "react-icons/fi";
import { MenuItem, Select } from "@mui/material";

function TeachingApplication(){
    const { idTa } = useParams("idTa");
    const [data, setData] = useState({
        status: 'Chấp nhận',
        dateCreate: '15/06/2022',
        classId: '3',
        tutor: 'Trần Khánh',
        type: 'Đóng tiền cọc',
        deposit: '200.000',
        voucherId: '3',
        admin: 'Trần Kim Ngân',
    });
    const listTitleTop = [
        {
            title1: "Trạng thái",
            title2: "Ngày tạo",
            data1: data.status,
            data2: data.dateCreate,
        },
        {
            title1: "Mã lớp học",
            title2: "Gia sư",
            data1: data.classId,
            data2: data.tutor,
        },
    ];
    return(
        <>
            <div className="container-ta">
                <h1>Mã đơn đăng ký dạy: <p>{idTa}</p></h1>
                <img src={EditIcon} alt="EditIcon"/>
                <div className="form-ta">
                    {listTitleTop.map((item) => 
                    <Grid container className="grid-container-top">
                        <Grid item xs={6}>
                            <Grid container className="grid-item-top top1">
                                <Grid item className="title item" xs={6}>{item.title1}</Grid>
                                <Grid item xs={6} className="item">
                                    {item.title1 === "Trạng thái"? 
                                        <span
                                        className={
                                          "status drop"
                                        }
                                      >
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={data.status}
                                          // onChange={handleChange}
                                          sx={{
                                            "& .MuiSelect-icon": {
                                              color: "#957DAD",
                                              fontSize: 24,
                                              marginRight: "10px",
                                            },
                                            fontFamily: 'Itim',
                                            fontSize: '20px',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            lineHeight: 'normal',
                                            background: '#E0BBE4',
                                            borderRadius: '15px',
                                            padding: '4px 6px 4px 24px'
                                          }}
                                          IconComponent={FiChevronsDown}
                                        >
                                          <MenuItem
                                            value={"Chưa duyệt"}
                                            sx={{ background: "#E0BBE4 !important" }}
                                          >
                                            Chưa duyệt
                                          </MenuItem>
                                          <MenuItem
                                            value={"Chấp nhận"}
                                            sx={{ background: "#E0BBE4 !important" }}
                                          >
                                            Chấp nhận
                                          </MenuItem>
                                          <MenuItem
                                            value={"Từ chối"}
                                            sx={{ background: "#E0BBE4 !important" }}
                                          >
                                            Từ chối
                                          </MenuItem>
                                        </Select>
                                      </span>
                                    : item.data1}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container className="grid-item-top">
                                <Grid item className="title item" xs={6}>{item.title2}</Grid>
                                <Grid item xs={6} className="item">{item.data2}</Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    )}
                </div>
            </div>
        </>
    );
}

export default TeachingApplication;