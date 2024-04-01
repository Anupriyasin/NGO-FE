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
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


const VendorReport = ({ role, mainId }) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  // Search and pagination
  const [modalOpen, setModalOpen] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);


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



  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);


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

  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      <div className="px-0 px-md-3">
        <h5 className="my-3">{t("Vendor Report")}</h5>

        <div className=""  style={{ display: "flex", justifyContent: "space-between" }}>
          <div className='col-md-2' style={{ marginRight: "12px" }}>
            <label htmlfor="title" >{t('District')}</label>
            <select name="asset_sub_type"
              // value={ExistAssetsSubTypes}
              // onChange={ExistAssetSubtypehandle}
              className="common-input form-select"
            >
              <option value="">Select District</option>
              {/* {ExistAssetsSubTypes.new_asset_query && ExistAssetsSubTypes.new_asset_query.map((row) => (
                    <option key={row.id} value={row.id}>{row.asset_sub_type_name}</option>
                  ))} */}

            </select>

          </div>
          <div className="mt-2">
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
                  <TableCell align="left">{t("Vendor Type")}</TableCell>
                  <TableCell align="center">{t("Vendor Name")}</TableCell>
                  <TableCell align="center">{t("GST No.")}</TableCell>
                  <TableCell align="left">{t("Inventory Name")}</TableCell>
                  <TableCell align="left">{t("Quantity")}</TableCell>
                  <TableCell align="left">{t("Invoice Name")}</TableCell>
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
                        <TableCell align="left">
                          dis
                        </TableCell>
                        <TableCell align="left">
                          block
                        </TableCell>
                        <TableCell align="left" style={{ width: "15%" }}>
                          {row.hostel_name}
                        </TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>
                        <TableCell align="left text-danger" onClick={onOpenModal}>{t("Rejected")} </TableCell>
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
      <div>
        <Modal open={open} onClose={onCloseModal} center>
          <h5>Reason for Rejection</h5>
          <textarea
            // ref={textareaRef}
            // value={transcription}
            // onChange={(e) => setTranscription(e.target.value)}
            name=""
            id=""
            cols="50"
            rows="10"
            placeholder="Reason for Rejection"
            style={{ width: '100%', border: 'none', outline: 'none' }}
            readOnly
          ></textarea>
        </Modal>




      </div>
    </>
  );
};

export default VendorReport;
