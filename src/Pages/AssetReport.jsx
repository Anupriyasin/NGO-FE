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
import { getRejectedRequirements, getRequirements } from "../api/Users";
import { toast } from "react-toastify";
import { TextField, TablePagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const AssetReport = ({ role, mainId }) => {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);

    // Search and pagination
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const getAllrequirements = () => {
        setIsLoading(true);
        getRejectedRequirements().then((res) => {
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
        getAllrequirements();
    }, []);

    // Update filteredData whenever searchQuery changes
    useEffect(() => {
        const filtered = rows.filter(
            (item) =>
                (item?.requirement_name &&
                    item.requirement_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item?.hostel_id &&
                    item.hostel_id.toLowerCase().includes(searchQuery.toLowerCase()))
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



    return (
        <>
            <TopLoader loading={isLoading ? "50" : "100"} />
            <div className="px-0 px-md-3">
                <h5 className="">{t("Asset Report")}</h5>

                <div className="row">
                    <div className="col-sm-4" >
                        <label htmlfor="title" className="form-label mt-4">{t('Intake Type')}</label>
                        <select name="saleperson" id="" className="common-input form-select" >
                            <option value="" selected={true}>All</option>
                            <option value="" selected={true}>Purchased</option>
                            <option value="" selected={true}>Donated</option>

                            {/* {salepersons.map((saleperson) => (
                                <>
                                    <option value={saleperson.user_id}>{saleperson.first_name}</option>
                                </>
                            ))} */}
                        </select>

                    </div>

                    <div className="col-sm-4"  >
                        <label htmlfor="title" className="form-label mt-4">{t('Category')}</label>
                        <select name="saleperson" id="" className="common-input form-select" >
                            <option value="" selected={true}>All</option>
                            <option value="" selected={true}>Consumable</option>
                            <option value="" selected={true}>Non Consumable</option>

                            {/* {salepersons.map((saleperson) => (
                                <>
                                    <option value={saleperson.user_id}>{saleperson.first_name}</option>
                                </>
                            ))} */}
                        </select>

                    </div>

                    <div className="col-sm-4" >
                        <label htmlfor="title" className="form-label mt-4">{t('Asset Type')}</label>
                        <select name="saleperson" id="" className="common-input form-select" >
                            <option value="" selected={true}>All</option>
                            <option value="" selected={true}>A</option>
                            <option value="" selected={true}>B</option>

                            {/* {salepersons.map((saleperson) => (
                                <>
                                    <option value={saleperson.user_id}>{saleperson.first_name}</option>
                                </>
                            ))} */}
                        </select>

                    </div>

                </div>

                <div className="row">
                <div className="col-sm-4">
                        <label htmlfor="title" className="form-label mt-4">{t('Asset Sub Type')}</label>
                        <select name="saleperson" id="" className="common-input form-select" >
                            <option value="" selected={true}>All</option>
                            <option value="" selected={true}>P</option>
                            <option value="" selected={true}>D</option>

                            {/* {salepersons.map((saleperson) => (
                                <>
                                    <option value={saleperson.user_id}>{saleperson.first_name}</option>
                                </>
                            ))} */}
                        </select>

                    </div>
                    <div className="col-sm-4">
                        <label htmlfor="title" className="form-label mt-4">{t('Asset Name')}</label>
                        <select name="saleperson" id="" className="common-input form-select" >
                            <option value="" selected={true}>All</option>
                            <option value="" selected={true}>P</option>
                            <option value="" selected={true}>D</option>

                            {/* {salepersons.map((saleperson) => (
                                <>
                                    <option value={saleperson.user_id}>{saleperson.first_name}</option>
                                </>
                            ))} */}
                        </select>

                    </div>
                </div>

                <div className="col-sm-12 mt-3 d-flex justify-content-end align-items-center">
                    {/* <h5 className="">{t("Rejected Requirments")}</h5> */}
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
                        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                        className="my-4"
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t("Sr. No.")}</TableCell>
                                    <TableCell align="left">{t("Intake Type")}</TableCell>
                                    <TableCell align="left">{t("Category")}</TableCell>
                                    <TableCell align="left">{t("Asset Type")}</TableCell>
                                    <TableCell align="left">{t("Asset Sub Type")}</TableCell>
                                    <TableCell align="left">{t("Asset Name")}</TableCell>
                                    <TableCell align="left">{t("Quantity")}</TableCell>
                                    <TableCell align="left">{t("Description")}</TableCell>
                                    <TableCell align="left">{t("Last Purchased Date")}</TableCell>
                                    <TableCell align="left">{t("Donated Date")}</TableCell>

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
                                                    {row.requirement_name}
                                                </TableCell>
                                                <TableCell align="left" style={{ width: "15%" }}>
                                                    {row.hostel_name}
                                                </TableCell>
                                                <TableCell align="left">{row.address}</TableCell>
                                                <TableCell align="left">{row.quantity}</TableCell>
                                                <TableCell align="left text-danger">{"Rejected"}</TableCell>
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

export default AssetReport;
