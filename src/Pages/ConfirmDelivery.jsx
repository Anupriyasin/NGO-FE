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
import { received } from "../api/Users";
import { toast } from "react-toastify";
import { TextField, TablePagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Modal, Button } from "@mui/material";
// import { Typography } from '@material-ui/core';
import { Assignment, LocalShipping, Home } from '@material-ui/icons';
import { hostelconfirmRequirements } from '../api/Users';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

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

const ConfirmDelivery = ({ role, mainId, userData }) => {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);

    // Search and pagination
    const [filteredData, setFilteredData] = useState([]);
    const [track, settrack] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalOpen, setModalOpen] = useState(false);

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    const [selectedRow, setSelectedRow] = useState(null);
    const [confirmedRow, setconfirmedRow] = useState(null);



    const fetchconfirmRequirements = async () => {
        debugger
        const hostelId = userData.data.hostel_id
        try {
            const data = await hostelconfirmRequirements({ hostel_id: hostelId });
            setRows(data.data);
            setFilteredData(data.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
            // You can add some error handling here, like showing a toast
            // toast.error("Failed to fetch data");
        }
    };

    useEffect(() => {
        fetchconfirmRequirements();
    }, []);

    // Update filteredData whenever searchQuery changes
    useEffect(() => {
        debugger
        const filtered = rows.filter(
            (item) =>
                (item?.requirement_name &&
                    item.requirement_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item?.requirement_id &&
                    item.requirement_id.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        setFilteredData(filtered);
        setPage(0);
    }, [searchQuery, rows]);



    const [activeStep, setActiveStep] = useState(); // Assuming step 1 is the default active step
    const [approveStep, setapproveStep] = useState(); // Assuming step 1 is the default active step
    const [receivedStep, setreceivedStep] = useState(); // Assuming step 1 is the default active step


    // Fetch hostel data and update progress bar based on hostel ID
    const fetchAndSetActiveStep = async () => {
        try {
            const res = await hostelconfirmRequirements();
            if (res.status === "success" && res.data.length > 0) {
                const hostelId = res.data[0].hostel_id;
                const approved = res.data[0].is_approve;
                const received = res.data[0].is_received

                setActiveStep(hostelId); // Update active step based on hostel ID
                setapproveStep(approved); // Update active step based on hostel ID
                setreceivedStep(received); // Update active step based on hostel ID

            }
        } catch (error) {
            console.error('Error fetching track requirements data: ', error);
        }
    };

    // Fetch hostel data and set active step when the component mounts
    useEffect(() => {
        fetchAndSetActiveStep();
    }, []);


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

    const handleUpdateClick = (row) => {
        setSelectedRow(row);
        console.log("selectedRow", selectedRow);
        setModalOpen(true);
    };

    const handleconfirm = (row) => {
        debugger
        const hostelId = userData.data.hostel_id;
        const requirementId = row.requirement_id;

        // Assuming setconfirmedRow and userData are properly defined elsewhere in your code
        setconfirmedRow(row);
        const requestBody = {
            is_received: 1,
            hostel_id: hostelId,
            requirement_id: requirementId
        };
        if (hostelId && requirementId) {
            received(requestBody)
                .then(response => {
                    // Handle successful response
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Your request has been confirmed successfully.'
                    });
                })
                .catch(error => {
                    // Handle error if needed
                    console.error('Error:', error);
                });
        }
    }



    const handleCloseModal = () => {
        // Logic to close modal
        setModalOpen(false);
    };

    return (
        <>
            <TopLoader loading={isLoading ? "50" : "100"} />
            <div className="px-0 px-md-3">
                <div className="my-4 col-12 d-flex justify-content-between align-items-center">
                    <h5 className=" mt-2">{t("Confirm Delivery")}</h5>
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
                            <TableHead >
                                <TableRow>
                                    <TableCell>{t("Sr. No.")}</TableCell>
                                    <TableCell align="left">{t("Requirement")}</TableCell>
                                    <TableCell align="left">{t("Hostel Name")}</TableCell>
                                    <TableCell align="left">{t("Hostel Address")}</TableCell>
                                    <TableCell align="left">{t("Quantity")}</TableCell>
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
                                                    {row.requirement_name}
                                                </TableCell>
                                                <TableCell align="left" style={{ width: "15%" }}>
                                                    {row.hostel_name}
                                                </TableCell>
                                                <TableCell align="left">{row.address}</TableCell>
                                                <TableCell align="left">{row.quantity}</TableCell>
                                                <TableCell align="">
                                                    <Typography
                                                        variant="contained"
                                                        className="primary-btn btn btn-sm"
                                                        id="btn"
                                                        onClick={() => handleUpdateClick(row)}
                                                    >
                                                        Track
                                                    </Typography>
                                                    <Typography
                                                        // variant="button"
                                                        className="success-btn btn btn-sm"
                                                        // id="btn1"
                                                        marginLeft={"12px"}
                                                        variant="contained"
                                                        // color="secondary"
                                                        onClick={() => handleconfirm(row)}
                                                        style={{ marginRight: 8, backgroundColor: "green", color: "white" }}
                                                        disabled={approveStep === 0 ? true : false} // Ternary operator to conditionally disable the button
                                                    >
                                                        Confirm Delivery
                                                    </Typography>
                                                </TableCell>

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

            {selectedRow && (
                <Modal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div style={{ position: "absolute", top: "30%", left: "58%", transform: "translate(-50%, -50%)", width: 900, backgroundColor: '#ffffff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: 8, padding: 20 }}>
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <div>
                                <MDBTypography tag="h5" className="mb-0">
                                    Tracker{" "}
                                    {/* <span className="text-primary font-weight-bold">
                                        #Y34XDHR
                                    </span> */}
                                </MDBTypography>
                            </div>
                            {/* <div className="text-end">
                            <p className="mb-0">
                                Expected Arrival <span>01/12/19</span>
                            </p>
                            <p className="mb-0">
                                USPS{" "}
                                <span className="font-weight-bold">
                                    234094567242423422898
                                </span>
                            </p>
                        </div> */}
                        </div>
                        <ul id="progressbar-2" class="d-flex justify-content-between mx-0 mt-0 mb-3 px-0 pt-0 pb-2">
                            {/* <li className={`step0 text-center ${activeStep == 1 ? 'active' : ''}`} id="step1"></li>
                            <li className={`step0 text-center ${activeStep == 1 ? 'active' : ''}`} id="step1"></li>
                            <li className={`step0 text-center ${approveStep == 1 ? 'active' : ''}`} id="step2"></li> */}
                            <li className={`step0 text-center ${activeStep == 1 ? 'active' : ''}`} id="step1"></li>
                            <li className={`step0 text-center ${approveStep == 1 ? 'active' : ''}`} id="step2"></li>
                            <li className={`step0 text-center ${approveStep == 1 ? 'active' : ''}`} id="step3"></li>
                            <li className={`step0 text-center ${receivedStep == 1 ? 'active' : ''}`} id="step4"></li>
                        </ul>

                        <div className="d-flex justify-content-between mb-5">
                            <div className="d-lg-flex align-items-center">
                                <Assignment fas icon="clipboard-list" className="me-lg-4 mb-3 mb-lg-0" style={{ fontSize: "2.5rem" }} />
                                <div>
                                    <p className="fw-bold mb-1">Request</p>
                                    <p className="fw-bold mb-0">Raised</p>
                                </div>
                            </div>
                            <div className="d-lg-flex align-items-center">
                                <RedeemIcon fas icon="shipping-fast me-lg-10 mb-3 mb-lg-0" style={{ fontSize: "2.5rem" }} />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Request</p>
                                    <p className="fw-bold mb-0">Approved</p>
                                </div>
                            </div>
                            <div className="d-lg-flex align-items-center">
                                <LocalShippingIcon fas icon="box-open me-lg-4 mb-3 mb-lg-0 ml-3" style={{ fontSize: "2.5rem" }} />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Under</p>
                                    <p className="fw-bold mb-0">Processing</p>
                                </div>
                            </div>
                            <div className="d-lg-flex align-items-center">
                                <Home fas icon="home me-lg-4 mb-3 mb-lg-0" style={{ fontSize: "2.5rem" }} />
                                <div className="ms-3">
                                    {/* <p className="fw-bold mb-1">Request</p> */}
                                    <p className="fw-bold mb-0">Delivered</p>
                                </div>
                            </div>
                        </div>


                        {/* <div className="d-flex justify-content-between mb-5">
                            <div className="d-lg-flex align-items-center">
                                <Assignment fas icon="clipboard-list" className="me-lg-4 mb-3 mb-lg-0" style={{ fontSize: "2.5rem" }} />
                                <div>
                                    <p className="fw-bold mb-1">Requirement</p>
                                    <p className="fw-bold mb-0">Raised</p>
                                </div>
                            </div>
                            <div className="d-lg-flex align-items-center">
                                <LocalShippingIcon fas icon="shipping-fast me-lg-10 mb-3 mb-lg-0" style={{ fontSize: "2.5rem" }} />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Request</p>
                                    <p className="fw-bold mb-0">Processing</p>
                                </div>
                            </div>
                            <div className="d-lg-flex align-items-center " >
                                <RedeemIcon fas icon="box-open me-lg-4 mb-3 mb-lg-0 ml-3" style={{ fontSize: "2.5rem" }} />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Requirement</p>
                                    <p className="fw-bold mb-0">Approved</p>
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
                        </div> */}
                    </div>
                </Modal>
            )}


        </>
    );
};

export default ConfirmDelivery;
