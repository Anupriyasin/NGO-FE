import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TopLoader from "../components/Loader/TopLoader";
import { getstudentinfo } from "../api/Users";
import { toast } from "react-toastify";
import { TablePagination } from "@mui/material";

const AlreadyExistUser = ({ role, mainId }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const rowData = location.state;
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (rowData) {
      setFilteredData([rowData]);
      setIsLoading(false);
    } else {
      getAlreadyExistUser();
    }
  }, [rowData]);

  const getAlreadyExistUser = () => {
    setIsLoading(true);
    getstudentinfo().then((res) => {
      if (res.status === "success") {
        setFilteredData(res.data.staff_data || []);
      } else {
        setFilteredData([]);
        toast.error(t("Something went wrong"));
      }
      setIsLoading(false);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let navigate = useNavigate();

  const view = (row) => {
    navigate(`/existing-user`, { state: row });
  };

  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      <div className="px-0 px-md-3">
        <div className="my-4 col-12 d-flex justify-content-between align-items-center">
          <h5 className="">{t("Exist User Details")}</h5>
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
                  <TableCell align="left">{t("Gender")}</TableCell>
                  <TableCell align="left">{t("Action")}</TableCell>
                </TableRow>
              </TableHead>
              {!isLoading && filteredData && filteredData.length > 0 && (
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell align="left">{row.firstName}</TableCell>
                        <TableCell align="left">{row.lastName}</TableCell>
                        <TableCell align="left">{row.phoneNumber}</TableCell>
                        <TableCell align="left">{row.gender}</TableCell>
                        <TableCell align="left">
                          <button className="btn btn-primary me-2" type="button" onClick={() => view(row)}>Add Another</button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              )}

              {!isLoading && (!filteredData || filteredData.length === 0) && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      <h4>
                        <i>{t("No data available")}</i>
                      </h4>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredData ? filteredData.length : 0}
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

export default AlreadyExistUser;
