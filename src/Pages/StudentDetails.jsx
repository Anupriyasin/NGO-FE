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
import { getRejectedRequirements, getRequirements, getstudentinfo } from "../api/Users";
import { toast } from "react-toastify";
import { TextField, TablePagination } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Modal, Button, Typography } from "@mui/material";

const StudentDetails = ({ role, mainId }) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  // Search and pagination
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getStudentDetails = () => {
    setIsLoading(true);
    getstudentinfo().then((res) => {
      if (res.status === "success") {
        console.log(res);
        setFilteredData(res.data.staff_data);
      } else {
        setRows([]);
        toast.error(t("Something went wrong"));
      }
    });
    setIsLoading(false);
  };

  useEffect(() => {
    debugger
    getStudentDetails();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  let navigate = useNavigate();
  const view = (row) => {
    navigate(`/add-student-details`, { state: row });
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
          <h5 className="">{t("Student Details")}</h5>
         <Button
                variant="contained"
                color="primary"
                style={{ marginRight: 8 }}
                onClick={() => view()}
              >
                <AddIcon/>Add Student
              </Button>
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
                  <TableCell align="left">{t("First name")}</TableCell>
                  <TableCell align="left">{t("Last Name")}</TableCell>
                  <TableCell align="left">{t("DOB")}</TableCell>
                  <TableCell align="left">{t("Nationality")}</TableCell>
                  <TableCell align="left">{t("Gender")}</TableCell>
                  <TableCell align="left">{t("Address")}</TableCell>
                  <TableCell align="left">{t("Email ID")}</TableCell>
                  <TableCell align="left">{t("ID/Registration Number")}</TableCell>
                  <TableCell align="left">{t("Emergency Contact")}</TableCell>
                  <TableCell align="left">{t("Guardian Contact")}</TableCell>
                  <TableCell align="left">{t("Phone Number")}</TableCell>
                  <TableCell align="left">{t("Check In Date")}</TableCell>
                  <TableCell align="left">{t("Action")}</TableCell>
                </TableRow>
              </TableHead>
              {!isLoading && filteredData && filteredData.length > 0 && (
                <TableBody style={{ color: "white" }}>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="left">
                          {row.first_name}
                        </TableCell>
                        <TableCell align="left" style={{ width: "15%" }}>
                          {row.last_name}
                        </TableCell>
                        <TableCell align="left">{row.date_of_birth}</TableCell>
                        <TableCell align="left">{row.nationality}</TableCell>
                        <TableCell align="left">{row.gender}</TableCell>
                        <TableCell align="left">{row.address}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.registration_no}</TableCell>
                        <TableCell align="left">{row.emccontact}</TableCell>
                        <TableCell align="left">{row.gurardiancontact}</TableCell>
                        <TableCell align="left">{row.phone_number}</TableCell>
                        <TableCell align="left">{row.created_at}</TableCell>
                        <TableCell align="left text-danger"><BorderColorOutlinedIcon style={{ color: "#4eb2e7" }} onClick={()=>view(row)} /></TableCell>


                      </TableRow>
                    ))}
                </TableBody>
              )}
              {!isLoading && (!filteredData || filteredData.length === 0) && (
                <TableRow>
                  <TableCell align="center" colSpan={7}>
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

export default StudentDetails;
