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
import { RejectRequirement, getRequirements, updateRequirement, modifydetails,getdistictName } from "../api/Users";
import { toast } from "react-toastify";
import { TextField, TablePagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Modal, Button, Typography } from "@mui/material";

const Requirements = ({ role, mainId }) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  // Search and pagination
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReasonError, setRejectReasonError] = useState(false); // Change initial state to false
  const [DistrictName, setDistrictName] = useState([]);

  const getDistictNames = () => {
    getdistictName()
      .then((res) => {
        if (res.status === "success") {
          console.log("dis data:", res.data);
          setDistrictName(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching assets:", err);
      });
  };
  useEffect(() => {
    getDistictNames();
  }, []);

  const districtHandle = (e) => {
    // debugger;
    const selectedDistrictId = e.target.value;
    const selectedDistrict = DistrictName.find(district => district.id === selectedDistrictId);
    if (selectedDistrict) {
        setDistrictName(selectedDistrict);
        getAllrequirements(selectedDistrict)
    } else {
        // Handle the case where the selected district is not found
        console.error("Selected district not found");
    }
};

  const getAllrequirements = (selectedDistrict) => {
    setIsLoading(true);
    const dis = selectedDistrict ? selectedDistrict : " ";
    getRequirements().then((res) => {
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

  let navigate = useNavigate();
  const view = (id) => {
    navigate(`/${role !== 5 ? "admin" : "dealer"}/admindetails/${id}`);
  };
  const handleUpdateClick = (row) => {
    setSelectedRow(row);
    console.log("selectedRow", selectedRow);
    setModalOpen(true);
  };
  const handlerejectClick = (row) => {
    setSelectedRow(row);
    console.log("selectedRow", selectedRow);

    setModalOpen1(true);
  };

  const handleCloseModal = () => {
    // Logic to close modal
    setShowRejectReason(false);
    setModalOpen(false);
  };
  const handleCloseModal1 = () => {
    // Logic to close modal
    setShowRejectReason(false);
    setModalOpen1(false);
  };
  const handleAccept = (selectedRow) => {
    // debugger
    const postData = {
      requirement_name: selectedRow.requirement_name,
      quantity: selectedRow.quantity,
      hostel_id: selectedRow.id,
      user_id: "",
      role_id: "",
      requirement_id: selectedRow.requirement_id,
      admin_flag: ""
    };

    updateRequirement(postData)
      .then(response => {
        setModalOpen(false);
        getAllrequirements();
        toast.success(response.message || "Update successful");
      })
      .catch(error => {
        console.error("Error updating requirement:", error);
        toast.error(error.response.data.message);
      });
  };
  const handlesave = (selectedRow) => {
    debugger
    const postData = {
      requirement_name: selectedRow.requirement_name,
      quantity: selectedRow.quantity,
      hostel_id: selectedRow.id,
      user_id: "",
      role_id: "",
      requirement_id: selectedRow.requirement_id,
    };

    modifydetails(postData)
      .then(response => {
        setModalOpen(false);
        getAllrequirements();
        toast.success(response.message);
      })
      .catch(error => {
        console.error("Error updating requirement:", error);
        toast.error(error.response.data.message);
      });
  };


  const handleRejectWithReason = () => {
    debugger
    setShowRejectReason(true);
    if (rejectReason.trim() === '') {
      setRejectReasonError(true); // Show error message if reject reason is empty
      return;
    }

    const postData = {
      hostel_id: selectedRow.id,
      requirement_id: selectedRow.requirement_id,
      is_reject: true, // Set to true to indicate rejection
      remarks: rejectReason // Pass the reject reason
    };

    RejectRequirement(postData)
      .then(response => {
        setModalOpen1(false);
        getAllrequirements();
        toast.success(response.message || "Update successful");
      })
      .catch(error => {
        console.error("Error rejecting requirement:", error);
        toast.error(error.response?.data?.message || "Failed to reject requirement");
      });
  };

  const handleClearRejectReason = () => {
    setRejectReason(''); // Clear the reject reason field
    setRejectReasonError(false); // Reset the error state
  };
  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      <div className="px-0 px-md-3">
      <h5 className="my-4">{t("New Requirements")}</h5>

        <div className="my-3 col-12 d-flex justify-content-between align-items-center">
        <div className="col-sm-3">
            <label htmlfor="title" className="form-label mt-4">{t('District')}</label>
            <select
              name="asset_sub_type"
              // value={ExistAssetsSubTypes}
              onChange={districtHandle}
              className="common-input form-select"
            >
              <option value="">All</option>
              {DistrictName && DistrictName.map((row) => (
                    <option key={row.id} value={row.id}>{row.district_name}</option>
                  ))}

            </select>

          </div>
          <div>
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
                  <TableCell align="center">{t("Requirement")}</TableCell>
                  <TableCell align="center">{t("Ashram Name")}</TableCell>
                  <TableCell align="center">{t("District")}</TableCell>
                  <TableCell align="center">{t("Block")}</TableCell>
                  <TableCell align="center">{t("Quantity")}</TableCell>
                  <TableCell align="center">{t("Tentative Amount")}</TableCell>
                  <TableCell align="center">{t("Raised On")}</TableCell>
                  <TableCell align="center">{t("Pending Date Count")}</TableCell>
                  <TableCell align="center">{t("Action")}</TableCell>
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
                        <TableCell align="center">{row.requirement_name}</TableCell>
                        <TableCell align="center" style={{ width: "15%" }}>{row.hostel_name}</TableCell>
                        <TableCell align="center">{row.district}</TableCell>
                        <TableCell align="center">{row.block}</TableCell>
                        <TableCell align="center">{row.quantity}</TableCell>
                        <TableCell align="center">{row.tentative_amount}</TableCell>
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell align="center">{row.pendingdate}</TableCell>
                        <TableCell align="center" style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="button"
                            className="primary-btn btn btn-sm"
                            id="btn2"
                            style={{ margin: "8px" }}
                            onClick={() => handleAccept(row)}
                          >
                            {t("Accept")}
                          </Typography>
                          <Typography
                            variant="button"
                            className="primary-btn btn btn-sm"
                            style={{ margin: "8px" }}
                            id="btn1"
                            onClick={() => handleUpdateClick(row)}
                          >
                            {t("Modify")}
                          </Typography>
                          <Typography
                            variant="button"
                            style={{ margin: "8px" }}
                            className="primary-btn btn btn-sm"
                            id="btn3"
                            onClick={() => { handleRejectWithReason(); handlerejectClick(row); }}
                          >
                            {t("Reject")}
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
          <div
            style={{
              position: "absolute",
              top: "32%",
              left: "52%",
              transform: "translate(-50%, -50%)",
              maxWidth: "90vw",
              width: "70%",
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: 8,
              padding: 20,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {t("Update Requirement")}
            </Typography>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">{t("Requirement")}</label>
                <input
                  type="text"
                  name="requirement"
                  defaultValue={selectedRow.requirement_name}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t("Hostel Name")}</label>
                <input
                  type="text"
                  name="hostel-name"
                  defaultValue={selectedRow.hostel_name}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">{t("Hostel Address")}</label>
                <input
                  type="text"
                  name="hostel-address"
                  defaultValue={selectedRow.address}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t("Actual Quantity")}</label>
                <input
                  type="text"
                  name="quantity"
                  readOnly
                  defaultValue={selectedRow.quantity}
                  className="form-control"
                  onChange={(e) => {
                    setSelectedRow((prevRow) => ({
                      ...prevRow,
                      quantity: e.target.value,
                    }));
                  }}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">{t("Proposed  Quantity")}</label>
                <input
                  type="text"
                  name="quantity"
                  defaultValue={selectedRow.quantity}
                  className="form-control"
                  onChange={(e) => {
                    setSelectedRow((prevRow) => ({
                      ...prevRow,
                      quantity: e.target.value,
                    }));
                  }}
                  required
                />
              </div>

            </div>
            {showRejectReason && (
              <div className="mb-3">
                <label className="form-label">{t("Reason for Rejection")}</label>
                <input
                  type="text"
                  name="rejectreason"
                  value={rejectReason}
                  className={`form-control ${rejectReasonError ? 'border-danger' : ''}`}
                  onChange={(e) => setRejectReason(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.target.value.length >= 5) {
                      setRejectReasonError(false);
                    }
                  }}
                  required
                />
                {rejectReasonError && <small className="text-danger">{t("Reason for Rejection is required")}.</small>}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* <Button
           variant="contained"
           color="primary"
           style={{ marginRight: 8 }}
           onClick={handleAccept}
         >
           Accept
         </Button>
         <Button
           variant="contained"
           color="secondary"
           style={{ marginRight: 8 }}
           onClick={handleRejectWithReason}
         >
           Reject
         </Button> */}
              {/* <Button variant="contained" onClick={handleCloseModal}>
                Cancel
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: 8 }}
                onClick={() => handleAccept(selectedRow)}
              >
                {t("Update")}
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {selectedRow && (
        <Modal
          open={modalOpen1}
          onClose={handleCloseModal1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "52%",
              transform: "translate(-50%, -50%)",
              maxWidth: "90vw",
              width: "70%",
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: 8,
              padding: 20,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {t("Update Requirement")}
            </Typography>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">{t("Requirement")}</label>
                <input
                  type="text"
                  name="requirement"
                  defaultValue={selectedRow.requirement_name}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t("Hostel Name")}</label>
                <input
                  type="text"
                  name="hostel-name"
                  defaultValue={selectedRow.hostel_name}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">{t("Hostel Address")}</label>
                <input
                  type="text"
                  name="hostel-address"
                  defaultValue={selectedRow.address}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t("Quantity")}</label>
                <input
                  type="text"
                  name="quantity"
                  defaultValue={selectedRow.quantity}
                  className="form-control"
                  onChange={(e) => {
                    setSelectedRow((prevRow) => ({
                      ...prevRow,
                      quantity: e.target.value,
                    }));
                  }}
                  required
                />
              </div>
            </div>
            {showRejectReason && (
              <div className="mb-3">
                <label className="form-label">{t("Reason for Rejection")}</label>
                <input
                  type="text"
                  name="rejectreason"
                  value={rejectReason}
                  className={`form-control ${rejectReasonError ? 'border-danger' : ''}`}
                  onChange={(e) => setRejectReason(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.target.value.length >= 5) {
                      setRejectReasonError(false);
                    }
                  }}
                  required
                />
                {rejectReasonError && <small className="text-danger">{t("Reason for Rejection is required")}.</small>}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* <Button
           variant="contained"
           color="primary"
           style={{ marginRight: 8 }}
           onClick={handleAccept}
         >
           Accept
         </Button>
         <Button
           variant="contained"
           color="secondary"
           style={{ marginRight: 8 }}
           onClick={handleRejectWithReason}
         >
           Reject
         </Button> */}
              {/* <Button variant="contained" onClick={handleCloseModal}>
                Cancel
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: 8 }}
                onClick={() => handleRejectWithReason(selectedRow)}
              >
                {t("Reject")}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Requirements;
