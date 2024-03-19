import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { Typography } from "@mui/material";
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
import { Modal, Button } from "@mui/material";
// import { Typography } from '@material-ui/core';
import { Assignment, LocalShipping, Home } from '@material-ui/icons';
import RedeemIcon from '@mui/icons-material/Redeem';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBCard,
    MDBModal,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBCardBody,
    MDBModalBody,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

const TrackRequirements = ({ role, mainId }) => {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);

    // Search and pagination
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalOpen, setModalOpen] = useState(false);

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);


    const getAllUsers = () => {
        setIsLoading(true);
        allUsers().then((res) => {
            if (res.status === "success") {
                console.log(res);
                setRows(res.data);
                setFilteredData(res.data);
            } else {
                setRows([]);
                // toast.error(t("Something went wrong"));s
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

    const handleUpdateClick = () => {
        // Logic to open modal
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        // Logic to close modal
        setModalOpen(false);
    };

    return (
        <>
            <TopLoader loading={isLoading ? "50" : "100"} />
            <div className="px-0 px-md-3">
                <h3 className=" mt-2">{t("Track Requirements")}</h3>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className='col-md-2' style={{ marginRight: "12px" }}>
                        <label htmlfor="title" className="form-label mt-4">{t('Status')}</label>
                        <select name="saleperson" id="" className="common-input form-select" >
                            <option value="0" selected="selected" >All</option>
                            {/* {salepersons.map((saleperson) => (
                                <>
                                    <option value={saleperson.user_id}>{saleperson.first_name}</option>
                                </>
                            ))} */}
                        </select>

                    </div>

                    <div className=''>
                        <TextField
                            label={t('Search')}
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            InputProps={{
                                endAdornment: <SearchIcon />,
                            }}
                            style={{ marginTop: '37px' }}
                        />
                    </div>

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
                                    <TableCell align="left">{t("Action")}</TableCell>

                                </TableRow>
                            </TableHead>
                            {/* {!isLoading && filteredData && filteredData.length > 0 && ( */}
                            <TableBody style={{ color: "white" }}>
                                <TableRow
                                    // key={index}
                                    sx={{
                                        "&:last-child td, &:last-child th": { border: 0 },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        1
                                    </TableCell>
                                    <TableCell align="left">uyt</TableCell>
                                    <TableCell align="left" style={{ width: "15%" }}>
                                        test
                                    </TableCell>
                                    <TableCell align="left">
                                        876543
                                    </TableCell>
                                    <TableCell align="left">65</TableCell>
                                    <TableCell align="left">

                                        <section>
                                            <MDBContainer className="">
                                                <MDBRow className="justify-content-center align-items-center text-center">
                                                    <MDBCol>
                                                        <MDBBtn size="" onClick={toggleShow}>
                                                            Track your order
                                                        </MDBBtn>
                                                        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                                                            <MDBModalDialog size="lg">
                                                                <MDBModalContent
                                                                    className="text-white"
                                                                    style={{ backgroundColor: "#6d5b98", borderRadius: "10px" }}
                                                                >

                                                                    <MDBCard

                                                                        className="card-stepper text-black"
                                                                        style={{ borderRadius: "16px" }}
                                                                    >
                                                                        <MDBModalHeader className="border-bottom-0">
                                                                            <MDBBtn
                                                                                className="btn-close btn-close-white"
                                                                                color="none"
                                                                                onClick={toggleShow}
                                                                            ></MDBBtn>
                                                                        </MDBModalHeader>
                                                                        <MDBCardBody className="p-5">
                                                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                                                <div>
                                                                                    <MDBTypography tag="h5" className="mb-0">
                                                                                        INVOICE{" "}
                                                                                        <span className="text-primary font-weight-bold">
                                                                                            #Y34XDHR
                                                                                        </span>
                                                                                    </MDBTypography>
                                                                                </div>
                                                                                <div className="text-end">
                                                                                    <p className="mb-0">
                                                                                        Expected Arrival <span>01/12/19</span>
                                                                                    </p>
                                                                                    <p className="mb-0">
                                                                                        USPS{" "}
                                                                                        <span className="font-weight-bold">
                                                                                            234094567242423422898
                                                                                        </span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <ul
                                                                                id="progressbar-2"
                                                                                className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                                                                            >
                                                                                <li className="step0 active text-center" id="step1">
                                                                                </li>
                                                                                <li className="step0 active text-center" id="step2">
                                                                                </li>
                                                                                <li className="step0 active text-center" id="step3">
                                                                                </li>
                                                                                <li className="step0 text-muted text-end" id="step4"></li>
                                                                            </ul>

                                                                            <div className="d-flex justify-content-between">
                                                                                <div className="d-lg-flex align-items-center">
                                                                                    <Assignment fas icon="clipboard-list" className="me-lg-4 mb-3 mb-lg-0" style={{ fontSize: "2.5rem" }} />
                                                                                    <div>
                                                                                        <p className="fw-bold mb-1">Order</p>
                                                                                        <p className="fw-bold mb-0">Processed</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-lg-flex align-items-center">
                                                                                    <RedeemIcon fas icon="box-open me-lg-4 mb-3 mb-lg-0 ml-3" style={{ fontSize: "2.5rem" }} />
                                                                                    <div className="ms-3">
                                                                                        <p className="fw-bold mb-1">Order</p>
                                                                                        <p className="fw-bold mb-0">Shipped</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-lg-flex align-items-center">
                                                                                    <LocalShippingIcon fas icon="shipping-fast me-lg-10 mb-3 mb-lg-0" style={{ fontSize: "2.5rem" }} />
                                                                                    <div className="ms-3">
                                                                                        <p className="fw-bold mb-1">Order</p>
                                                                                        <p className="fw-bold mb-0">En Route</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-lg-flex align-items-center">
                                                                                    <Home fas icon="home me-lg-4 mb-3 mb-lg-0" style={{ fontSize: "2.5rem" }} />
                                                                                    <div className="ms-3">
                                                                                        <p className="fw-bold mb-1">Order</p>
                                                                                        <p className="fw-bold mb-0">Arrived</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </MDBCardBody>
                                                                    </MDBCard>
                                                                </MDBModalContent>
                                                            </MDBModalDialog>
                                                        </MDBModal>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBContainer>
                                        </section>

                                    </TableCell>

                                </TableRow>
                            </TableBody>
                            {/* )} */}
                            {/* {!isLoading && (!filteredData || filteredData.length === 0) && ( */}
                            <TableRow>
                                <TableCell align="center" colSpan={7}>
                                    <h4>
                                        {" "}
                                        <i>{t("No data available")}</i>{" "}
                                    </h4>
                                </TableCell>
                            </TableRow>
                            {/* )} */}
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


            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={{ position: "absolute", top: "30%", left: "58%", transform: "translate(-50%, -50%)", width: 900, backgroundColor: '#ffffff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: 8, padding: 20 }}>
                    <Typography variant="h6" gutterBottom>
                        {t("Update Status")}
                    </Typography>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">{t('Requirement')}</label>
                            <input type="text" name="requirement" defaultValue="uyt" className="form-control" readOnly required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('Hostel Name')}</label>
                            <input type="text" name="hostel-name" defaultValue="test" className="form-control" readOnly required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">{t('Hostel Address')}</label>
                            <input type="text" name="hostel-address" defaultValue="876543" className="form-control" readOnly required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('Quantity')}</label>
                            <input type="text" name="quantity" defaultValue="65" className="form-control" readOnly required />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" style={{ marginRight: 8 }}>Accept</Button>
                        <Button variant="contained" color="secondary" style={{ marginRight: 8 }}>Reject</Button>
                        <Button variant="contained" onClick={handleCloseModal}>Cancel</Button>
                    </div>
                </div>
            </Modal>


        </>
    );
};

export default TrackRequirements;
