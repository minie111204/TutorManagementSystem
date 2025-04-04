import React from "react";
import "./RequestItem.css";
import { useNavigate } from "react-router-dom";

const enumerate = {
  "Da xu ly": "Đã xử lý",
  "Chua xu ly": "Chưa xử lý"
}

function RequestItem({ infoRequest }) {

  const navigate = useNavigate();

  return (
    <div className="container-card">
    <div className="title-card" style={{cursor: "default"}}>
      Mã đơn yêu cầu tư vấn: <h4>{infoRequest.id}</h4>
    </div>
    <div className="content-card">
      <div className="left-content">
        <p>
          Trạng thái: <span className={"status " + (infoRequest.status === "Da xu ly"? "processed" : "not-yet-processed")}>{enumerate[infoRequest.status]}</span>
        </p>
        <p onClick={() => navigate("/information-student/" + infoRequest.idStudent)} style={{cursor: "pointer"}}>
          Học viên: <span>{infoRequest.nameStudent}</span>
        </p>
        <p>
          Môn học: <span>{infoRequest.subjects.join(", ")}</span>
        </p>
        <p>
          Địa chỉ: <span>{infoRequest.address}</span>
        </p>
      </div>
      <div className="right-content">
        <p>
          Kiểu dạy: <span>{infoRequest.teachingStyle}</span>
        </p>
        <p>
          Khối lớp: <span>{infoRequest.grade}</span>
        </p>
        <p>
          SĐT:{" "}
          <span>
            {infoRequest.phoneNumber}
          </span>
        </p>
      </div>
    </div>
  </div>
  );
}

export default RequestItem;
