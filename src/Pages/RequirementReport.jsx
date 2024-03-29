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
import {
  RejectRequirement,
  getRequirements,
  updateRequirement,
  modifydetails,
  getAllHostels,
  getHostelWiseRequirements,
} from "../api/Users";
import { toast } from "react-toastify";
import { TextField, TablePagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Modal, Button, Typography } from "@mui/material";

const RequirementsReport = ({ role, mainId }) => {
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
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReasonError, setRejectReasonError] = useState(false); // Change initial state to false

  const getAllrequirements = async (hostelName) => {
    debugger;
    setIsLoading(true);
    const HostelID = hostelName ? hostelName : "all";
    try {
      const res = await getHostelWiseRequirements({ hostel_id: HostelID });
      if (res.status === "success") {
        console.log(res);
        setFilteredData(res.data);
      } else {
        toast.error(t("Something went wrong"));
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error(t("Something went wrong"));
    }
    setIsLoading(false);
  };
  const getAllHostel = () => {
    setIsLoading(true);
    getAllHostels().then((res) => {
      if (res.status === "success") {
        console.log(res);
        setRows(res.data);
      } else {
        setRows([]);
        toast.error(t("Something went wrong"));
      }
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getAllHostel();
    getAllrequirements();
  }, []);

  // Update filteredData whenever searchQuery changes
//   useEffect(() => {
//     const filtered = rows.filter(
//       (item) =>
//         (item?.hostel_name &&
//           item.hostel_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         (item?.requirement_name &&
//           item.requirement_name
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()))
//     );

//     setFilteredData(filtered);
//     setPage(0);
//   }, [searchQuery, rows]);

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
  const handlesave = (selectedRow) => {
    debugger;
    const postData = {
      requirement_name: selectedRow.requirement_name,
      quantity: selectedRow.quantity,
      hostel_id: selectedRow.id,
      user_id: "",
      role_id: "",
      requirement_id: selectedRow.requirement_id,
    };

    modifydetails(postData)
      .then((response) => {
        setModalOpen(false);
        getAllrequirements();
        toast.success(response.message);
      })
      .catch((error) => {
        console.error("Error updating requirement:", error);
        toast.error(error.response.data.message);
      });
  };

  const handleRejectWithReason = () => {
    debugger;
    setShowRejectReason(true);
    if (rejectReason.trim() === "") {
      setRejectReasonError(true); // Show error message if reject reason is empty
      return;
    }

    const postData = {
      hostel_id: selectedRow.id,
      requirement_id: selectedRow.requirement_id,
      is_reject: true, // Set to true to indicate rejection
      remarks: rejectReason, // Pass the reject reason
    };

    RejectRequirement(postData)
      .then((response) => {
        setModalOpen1(false);
        getAllrequirements();
        toast.success(response.message || "Update successful");
      })
      .catch((error) => {
        console.error("Error rejecting requirement:", error);
        toast.error(
          error.response?.data?.message || "Failed to reject requirement"
        );
      });
  };

  const HostelNamehandel = async (e) => {
    debugger;
    // setExistAssetsSubTypes(e.target.value);
    const hostelName = e.target.value;

    getAllrequirements(hostelName);
  };
  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      <div className="px-0 px-md-3">
        <h5 className="mt-4">{t("Requirements Report")}</h5>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginRight: "12px" }}>
            <label htmlfor="title" className="form-label mt-4">
              {t("Hostel Name")}
            </label>
            <select
              name="hostelname"
              onChange={HostelNamehandel}
              id=""
              className="common-input form-select"
            >
              <option value="all" selected={true}>
                {t("All")}
              </option>
              {rows.map((row) => (
                <>
                  <option value={row.hostel_id}>{row.hostel_name}</option>
                </>
              ))}
            </select>
          </div>

          <div className="">
            <TextField
              label={t("Search")}
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state with the new value
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
              style={{ marginTop: "37px" }}
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
                  <TableCell align="left">{t("Requirement")}</TableCell>
                  <TableCell align="left">{t("Hostel Name")}</TableCell>
                  <TableCell align="left">{t("Hostel Address")}</TableCell>
                  <TableCell align="left">{t("Quantity")}</TableCell>
                  <TableCell align="left">{t("Raised On")}</TableCell>
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
                        <TableCell align="left">
                          {row.requirement_name}
                        </TableCell>
                        <TableCell align="left" style={{ width: "15%" }}>
                          {row.hostel_name}
                        </TableCell>
                        <TableCell align="left">{row.address}</TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>
                        <TableCell align="left">  {row.created_at.split('T')[0]}</TableCell>
                        <TableCell align="left" style={{
    color: (row.is_approve && row.admin_flag && row.is_received) ? 'green' :
           (row.is_approve && row.admin_flag && !row.is_received) ? 'orange' : 'inherit'
}}>
    {
        (row.is_approve==1 && row.admin_flag==1 && row.is_received==1) ? 'Completed' :
        (row.is_approve==1 && row.admin_flag==1 && row.is_received!= 1) ? 'Not Delivered' :
        (row.is_approve ==1 && row.admin_flag!=1 && row.is_received!=1) ? 'Pending by Admin' :
        ''
    }
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
      {/* {selectedRow && (
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
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
              Update Status
            </Typography>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Requirement</label>
                <input
                  type="text"
                  name="requirement"
                  defaultValue={selectedRow.requirement_name}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Hostel Name</label>
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
                <label className="form-label">Hostel Address</label>
                <input
                  type="text"
                  name="hostel-address"
                  defaultValue={selectedRow.address}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Quantity</label>
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
                <label className="form-label">Reason for Rejection</label>
                <input
                  type="text"
                  name="rejectreason"
                  value={rejectReason}
                  className={`form-control ${
                    rejectReasonError ? "border-danger" : ""
                  }`}
                  onChange={(e) => setRejectReason(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.target.value.length >= 5) {
                      setRejectReasonError(false);
                    }
                  }}
                  required
                />
                {rejectReasonError && (
                  <small className="text-danger">
                    Reason for Rejection is required.
                  </small>
                )}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: 8 }}
                onClick={() => handlesave(selectedRow)}
              >
                Save
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
              Update Status
            </Typography>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Requirement</label>
                <input
                  type="text"
                  name="requirement"
                  defaultValue={selectedRow.requirement_name}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Hostel Name</label>
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
                <label className="form-label">Hostel Address</label>
                <input
                  type="text"
                  name="hostel-address"
                  defaultValue={selectedRow.address}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Quantity</label>
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
                <label className="form-label">Reason for Rejection</label>
                <input
                  type="text"
                  name="rejectreason"
                  value={rejectReason}
                  className={`form-control ${
                    rejectReasonError ? "border-danger" : ""
                  }`}
                  onChange={(e) => setRejectReason(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.target.value.length >= 5) {
                      setRejectReasonError(false);
                    }
                  }}
                  required
                />
                {rejectReasonError && (
                  <small className="text-danger">
                    Reason for Rejection is required.
                  </small>
                )}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: 8 }}
                onClick={() => handleRejectWithReason(selectedRow)}
              >
                Reject
              </Button>
            </div>
          </div>
        </Modal>
      )} */}
    </>
  );
};

export default RequirementsReport;
