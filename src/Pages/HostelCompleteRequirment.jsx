import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import TopLoader from "../components/Loader/TopLoader";
import { CompletedRequirements } from "../api/Users";
import { TextField, TablePagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const CompleteRequirement = ({ role, mainId ,userData}) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

console.log("userData////",userData)
  const fetchCompletedRequirements = async () => {
    debugger
    const hostelId = userData.data.hostel_id
    try {
      const data = await CompletedRequirements({ hostel_id: hostelId });
      setRows(data.data.result);
      setFilteredData(data.data.result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      // You can add some error handling here, like showing a toast
      // toast.error("Failed to fetch data");
    }
  };
  
  useEffect(() => {
    fetchCompletedRequirements();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = rows.filter(
      (item) =>
        item.requirement_name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setPage(0); // Reset page when searching
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      <div className="px-0 px-md-3">
        <div className="my-4 col-12 d-flex justify-content-between align-items-center">
          <h5 className="">{t("Completed Requirments")}</h5>
          <TextField
            label={t("Search")}
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
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
                  <TableCell align="left">{t("Requirement Name")}</TableCell>
                  <TableCell align="left">{t("Description")}</TableCell>
                  <TableCell align="left">{t("Quantity")}</TableCell>
                  <TableCell align="left">{t("Completed Date")}</TableCell>
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
                          {index + 1 + page * rowsPerPage}
                        </TableCell>
                        <TableCell align="left">{row.requirement_name}</TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>
                        <TableCell align="left">{row.updated_at}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              )}
              {!isLoading && (!filteredData || filteredData.length === 0) && (
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    <h4>
                      <i>{t("No data available")}</i>
                    </h4>
                  </TableCell>
                </TableRow>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={(filteredData || []).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default CompleteRequirement;
