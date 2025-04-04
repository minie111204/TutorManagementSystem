import { IconButton, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { FiChevronsDown } from "react-icons/fi";
import { GoSearch } from "react-icons/go";

const SortSelect = ({
  item,
  index,
  sortList,
  listItems,
  handleFilterChange,
  filters,
}) => {
  const [sort, setSort] = useState("ASC");
  return (
    <div className="sort-item">
      {index !== sortList.length - 1 && index !== sortList.length - 2 ? (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filters[Object.keys(filters)[index]] || ""}
          name={Object.keys(filters)[index]}
          onChange={(event) =>
            handleFilterChange(Object.keys(filters)[index], event.target.value)
          }
          sx={{
            width: "170px",
            fontFamily: "Itim",
            fontSize: "25px",
            fontStyle: "normal",
            fontWeight: "400",
            color: "#957dad",
            lineHeight: "normal",
          }}
          displayEmpty
          IconComponent={
            index === sortList.length - 2 ? FaSortAmountUp : FiChevronsDown
          }
        >
          <MenuItem value={""} key={""} sx={{ background: "#E0BBE4 !important" }}>
            {item}
          </MenuItem>
          {Object.keys(filters)[index] === "subjectName"? 
          <MenuItem value={"ALL"} key={"ALL"} sx={{ background: "#E0BBE4 !important" }}>
            {"Tat ca"}
          </MenuItem> : <></>}
          {Object.values(listItems)
            .at(index)
            .map((it) => (
              <MenuItem
                key={it.name}
                value={it.name}
                sx={{ background: "#E0BBE4 !important" }}
              >
                {it.name}
              </MenuItem>
            ))}
        </Select>
      ) : index === sortList.length - 2 ? (
        <h4
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={(e) => {
            sort === "ASC"? setSort("DESC") : setSort("ASC");
            handleFilterChange("sortOrder", sort === "ASC"? "DESC" : "ASC");
          }}
        >
          {item}
          <IconButton>
          {sort === "ASC"?<FaSortAmountUp /> : <FaSortAmountDown/>}
          </IconButton>
        </h4>
      ) : (
        <h4 style={{ display: "flex", alignItems: "center" }}>
          <input placeholder={item} style={{ all: "unset" }} onChange={(e) => handleFilterChange("phoneNumber", e.target.value)} />
          <GoSearch />
        </h4>
      )}
    </div>
  );
};

export default SortSelect;
