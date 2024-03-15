import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../components/Table/Table.css";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import TopLoader from "../components/Loader/TopLoader";
import { allUsers, updateBlockStatus } from "../api/Users";
import { toast } from "react-toastify";
import { TextField, TablePagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Requirements = ({ role, mainId }) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  // Search and pagination
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getAllUsers = () => {
    setIsLoading(true);
    allUsers().then((res) => {
      if (res.status === "success") {
        console.log(res);
        setRows(res.data);
        setFilteredData(res.data);
      } else {
        setRows([]);
        toast.error(t("Something went wrong"));
      }
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Update filteredData whenever searchQuery changes
  useEffect(() => {
    const filtered = rows.filter(
      (item) =>
        (item?.user_id &&
          item.user_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item?.user_name &&
          item.user_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item?.primary_contact &&
          item.primary_contact
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (item?.created_date &&
          item.created_date.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    setFilteredData(filtered);
    setPage(0);
  }, [searchQuery, rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let navigate = useNavigate();
  const view = (id) => {
    navigate(`/${role !== 5 ? "admin" : "dealer"}/admindetails/${id}`);
  };

  const setBlockStatus = async (id, status) => {
    const data = {
      user_id: id,
      status,
    };
    await updateBlockStatus(data).then((res) => {
      if (res.status === "success") {
        console.log(res);
        toast.success(t(res.message));
        getAllUsers();
      } else {
        toast.error(t("Something went wrong"));
      }
    });
  };

  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      <div className="px-0 px-md-3">
        <div className="my-4 col-12 d-flex justify-content-between align-items-center">
          <h3 className="">{t("Requirements")}</h3>
          <TextField
            label={t("Search")}
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </div>
        <div className="Table mb-6">
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029", border: "1px solid gray" }}
            className="my-4"
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("Sr. No.")}</TableCell>
                  <TableCell align="left">{t("Requirement")}</TableCell>
                  <TableCell align="left">{t("Hostel Name")}</TableCell>
                  <TableCell align="left">{t("Hostel Address")}</TableCell>
                  <TableCell align="left">{t("Quantity")}</TableCell>
                  <TableCell align="left">{t("Status")}</TableCell>
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
                        <TableCell align="left">{row.user_id}</TableCell>
                        <TableCell align="left" style={{ width: "15%" }}>
                          {row.user_name}
                        </TableCell>
                        <TableCell align="left">
                          {row.primary_contact}
                        </TableCell>
                        <TableCell align="left">{row.created_date}</TableCell>

                        {row.user_id === mainId ? (
                          <TableCell align="left">
                            {role === 1 ? (
                              <button
                                className="btn btn-success btn-sm m-sm-1 m-md-0 mx-md-1"
                                onClick={() => view(row.user_id)}
                              >
                                {t("View / Update")}
                              </button>
                            ) : (
                              <button
                                className="btn btn-success btn-sm m-sm-1 m-md-0 mx-md-1"
                                onClick={() => view(row.user_id)}
                              >
                                {t("View")}
                              </button>
                            )}
                          </TableCell>
                        ) : (
                          <TableCell align="left">
                            {role === 1 ? (
                              <button
                                className="btn btn-success btn-sm m-sm-1 m-md-0 mx-md-1"
                                onClick={() => view(row.user_id)}
                              >
                                {t("View / Update")}
                              </button>
                            ) : (
                              <button
                                className="btn btn-success btn-sm m-sm-1 m-md-0 mx-md-1"
                                onClick={() => view(row.user_id)}
                              >
                                {t("View")}
                              </button>
                            )}
                            {role === 1 ? (
                              row.is_blocked === 0 ? (
                                <button
                                  className="btn btn-danger btn-sm m-sm-1 m-md-0"
                                  onClick={() =>
                                    setBlockStatus(row.user_id, row.is_blocked)
                                  }
                                >
                                  {t("Block")}
                                </button>
                              ) : (
                                <button
                                  className="btn btn-secondary btn-sm m-sm-1 m-md-0"
                                  onClick={() =>
                                    setBlockStatus(row.user_id, row.is_blocked)
                                  }
                                >
                                  {t("Unblock")}
                                </button>
                              )
                            ) : (
                              ""
                            )}
                          </TableCell>
                        )}
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

export default Requirements;
