import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import "../components/Table/Table.css";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import TopLoader from "../components/Loader/TopLoader";
import { getAllUserDetails, getRejectedRequirements, getRequirements, getstudentinfo } from "../api/Users";
import { toast } from "react-toastify";
import { TextField, TablePagination } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Modal, Button, Typography } from "@mui/material";

const Checker = ({ role, mainId }) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getUserDetails = () => {
    debugger
    setIsLoading(true);
    getAllUserDetails().then(res => {
        if (res) {
            setFilteredData(res);
        }
        else {
            setRows([]);
            toast.error(t("Something went wrong"));
        }

    });
    setIsLoading(false);
}
useEffect(() => {
    debugger
    getUserDetails();
  
}, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  let navigate = useNavigate();
  const view = (row) => {
    navigate(`/Viewdetails`, { state: row });
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      <div className="px-0 px-md-3">
        <div className="my-4 col-12 d-flex justify-content-between align-items-center">
          <h5 className="">{t("Users List")}</h5>
          <div>
            {/* <button className='btn btn-primary btn-sm' onClick={() => view()}><AddIcon />{t("Add Student")}</button> */}
          </div>
        </div>
        <div className="Table mb-6">
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
            className="my-4"
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("Sr. No.")}</TableCell>
                  <TableCell align="left">{t("First Name")}</TableCell>
                  <TableCell align="left">{t("Last Name")}</TableCell>
                  <TableCell align="left">{t("Contact No.")}</TableCell>
                  <TableCell align="left">{t("Email Id")}</TableCell>
                  <TableCell align="left">{t("Gender")}</TableCell>
                  <TableCell align="left">{t("Address")}</TableCell>
                  <TableCell align="left">{t("Pincode")}</TableCell>
                  <TableCell align="left">{t("Purpose")}</TableCell>
                  <TableCell align="left">{t("Date of Birth")}</TableCell>
                  <TableCell align="left">{t("Action")}</TableCell>
                </TableRow>
              </TableHead>
              {!isLoading && filteredData && filteredData.length > 0 && (
                <TableBody style={{ color: "white" }}>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                        <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell align="left">{row.firstName}</TableCell>
                        <TableCell align="left">{row.lastName}</TableCell>
                        <TableCell align="left">{row.phoneNumber}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.gender}</TableCell>
                        <TableCell align="left">{row.address}</TableCell>
                        <TableCell align="left">{row.pincode}</TableCell>
                        <TableCell align="left">{row.purpose}</TableCell>
                        <TableCell align="left">{row.dob.split("T")[0]}</TableCell>
                        <TableCell align="left">
                            <BorderColorOutlinedIcon style={{ color: "#4eb2e7" }} onClick={() => view(row)} />
                        </TableCell>
                    </TableRow>
                    
                    ))}
                </TableBody>
              )}
              {!isLoading && (!filteredData || filteredData.length === 0) && (
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    <h4>
                      {" "}
                      <i>{t("No data available")}</i>{" "}
                    </h4>
                  </TableCell>
                </TableRow>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default Checker;
