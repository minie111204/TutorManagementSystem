import { useEffect, useState } from "react";
import CustomizedTables from "../../component/ReportTutorModel";
import api from "../../api";
import { Backdrop, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeBackDrop, openBackDrop } from "../../redux/action";
import { useSnackbar } from "../../component/SnackbarProvider";

function ReportPage(){

    const listHeader = ["Mã gia sư", "Tên", "Số điện thoại", "Giới tính", "Ngày sinh", "Tiểu sử", "Số lớp học", "Tổng số tiền"];

    const [listTutor, setListTutor] = useState([]);

    const dispatch = useDispatch();

    const { showSnackbar } = useSnackbar();

    const open = useSelector(state => state.backdropAction);

    async function getReportList(){
        try{
            dispatch(openBackDrop());
            const response = await api.get(`api/v1/tutors/summary`);
            setListTutor(response.data);
        }catch(e){
            showSnackbar("Lỗi kết nối");
        }
        dispatch(closeBackDrop());
    }

    useEffect(() => {
        getReportList();
    }, []);

    return(
        <>
        <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
            <CustomizedTables listHeader={listHeader} listTutor={listTutor}/>
        </>
    );
}

export default ReportPage;