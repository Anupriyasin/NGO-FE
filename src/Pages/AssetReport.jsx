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
import { Assetnameinfo, CurrentQuantity, getAssetReport, getAssetsName, getHostelWiseRequirements, getRejectedRequirements, getRequirements, subassets } from "../api/Users";
import { toast } from "react-toastify";
import { TextField, TablePagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Modal, Button, Typography } from "@mui/material";


const AssetReport = ({ role, mainId }) => {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);

    // Search and pagination
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [ExistAssetsType, setExistAssetsType] = useState([]);
    const [ExistAssetsSubTypes, setExistAssetsSubTypes] = useState([]);
    const [ExistNameHandle, setExistNameHandle] = useState('');
    const [storeExistAssetsType, setstoreExistAssetsType] = useState([]);
    const [CategoryHandle, setCategoryHandle] = useState([]);
    const [AssetsTypes, setAssetsTypes] = useState([]);
    const [IntakeHandle, setIntakeHandle] = useState([]);

    const categoryHandle = (event) => {
        setCategoryHandle(event.target.value);
      };
      const intakeHandle = (event) => {
        setIntakeHandle(event.target.value);
      };
    const getAssetsNames =  () => {
        getAssetsName().then(res => {
          if (res.status === "success") {
            console.log("Assets data:", res.data);
            setAssetsTypes(res.data);
            setExistAssetsType(res.data);
          }
        }).catch(err => {
          console.error("Error fetching assets:", err);
        });
      }
      useEffect(() => {
        getAssetsNames()
      
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
    const ExistAssetSubtypehandle = async (e) => {
        debugger
        // setExistAssetsSubTypes(e.target.value);
        const ExistAssetType = e.target.value;
        setExistAssetsSubTypes((prevRow) => ({
          ...prevRow,
          asset_sub_type: ExistAssetType,
        }));
        // const Assetstype = storeExistAssetsType
    
        try {
          const response = await Assetnameinfo({ asset_id: ExistAssetsType.asset_type, asset_sub_type_id: ExistAssetType });
          if (response) {
            setExistNameHandle(response.data);
          } else {
            console.error("Invalid response format for subassets:", response);
          }
        } catch (error) {
          console.error("Error fetching subassets:", error);
        }
      };
      const ExistAssetTypehandle = async (e) => {
        debugger;
        // setstoreExistAssetsType(e.target.value)
        const newAssetType = e.target.value;
        setExistAssetsType((prevRow) => ({
          ...prevRow,
          asset_type: newAssetType,
        }));
        console.log("AssetsType", ExistAssetsType)
        try {
          const response = await subassets({ asset_id: newAssetType });
          if (response) {
            setExistAssetsSubTypes(response.data);
          } else {
            console.error("Invalid response format for subassets:", response);
          }
        } catch (error) {
          console.error("Error fetching subassets:", error);
        }
      };
    const ExistnameHandle = async(e) => {
        debugger
        const ExistAssetname = e.target.value;
        setExistNameHandle((prevRow) => ({
          ...prevRow,
          asset_sub_type: ExistAssetname,
        }));
    
       
      };
      console.log("ExistAssetsType////",ExistAssetsType)
    //   const SearchHandle = async () => {
    //     debugger;
    //     setIsLoading(true);
    //     const data = {
    //         intake_type: IntakeHandle,
    //         category: CategoryHandle,
    //         asset_sub_type_id: ExistAssetsSubTypes.asset_sub_type,
    //         asset_name: ExistNameHandle.asset_sub_type,
    //         asset_id:  ExistAssetsType.asset_type,
    //     }
    //     try {
    //       const res = await getAssetReport(data);
    //       if (res.status === "success") {
    //         console.log(res);
    //         setFilteredData(res.data);
    //       } else {
    //         toast.error(t("Something went wrong"));
    //       }
    //     } catch (error) {
    //       console.error("Error occurred:", error);
    //       toast.error(t("Something went wrong"));
    //     }
    //     setIsLoading(false);
    //   };

      const SearchHandle = async () => {
        setIsLoading(true); 
        const data = {
            intake_type: IntakeHandle,
            category: CategoryHandle,
            asset_sub_type_id: ExistAssetsSubTypes.asset_sub_type,
            asset_name: ExistNameHandle.asset_sub_type,
            asset_id:  ExistAssetsType.asset_type,
        }
        try {
          const res = await getAssetReport(data);
          if (res.status === "success") {
            console.log(res);
            setFilteredData(res.data.result); // Assuming setFilteredData is a state setter function
          } else {
            toast.error(t("Something went wrong"));
          }
        } catch (error) {
          console.error("Error occurred:", error);
          toast.error(t("Something went wrong"));
        }
        setIsLoading(false);
      };
      
    return (
        <>
            <TopLoader loading={isLoading ? "50" : "100"} />
            <div className="px-0 px-md-3">
                <h5 className="">{t("Asset Report")}</h5>

                <div className="row">
                    <div className="col-sm-4" >
                        <label htmlfor="title" className="form-label mt-4">{t('Intake Type')}</label>
                        <select
                  name="intake_type"
                  value={IntakeHandle}
                  onChange={intakeHandle}
                  required
                  className="common-input form-select"
                >
                  <option value="">Select Intake Time</option>
                  <option value="Purchased">Purchased</option>
                  <option value="Donated">Donated</option>
                </select>

                    </div>

                    <div className="col-sm-4"  >
                        <label htmlfor="title" className="form-label mt-4">{t('Category')}</label>
                        <select name="category" onChange={categoryHandle} value={CategoryHandle} className="common-input form-select" required>
                  <option value="" >Select Category</option>
                  <option value="consumable" >Consumable</option>
                  <option value="non-consumable" >Non Consumable</option>
                </select>

                    </div>

                    <div className="col-sm-4" >
                        <label htmlfor="title" className="form-label mt-4">{t('Asset Type')}</label>
                        <select
                  name="asset_type"
                  className="common-input form-select"
                  onChange={ExistAssetTypehandle}
                  required
                >
                  <option value="">Select Asset Type</option>
                  {ExistAssetsType.assets_name && ExistAssetsType.assets_name.map((row) => (
                    <option key={row.asset_id} value={row.asset_id}>{row.asset_name}</option>
                  ))}

                </select>

                    </div>

                </div>

                <div className="row">
                <div className="col-sm-4">
                        <label htmlfor="title" className="form-label mt-4">{t('Asset Sub Type')}</label>
                        <select
                  name="asset_sub_type"
                  // value={ExistAssetsSubTypes}
                  onChange={ExistAssetSubtypehandle}
                  className="common-input form-select"
                >
                  <option value="">Select Asset Sub Type</option>
                  {ExistAssetsSubTypes.new_asset_query && ExistAssetsSubTypes.new_asset_query.map((row) => (
                    <option key={row.id} value={row.id}>{row.asset_sub_type_name}</option>
                  ))}

                </select>

                    </div>
                    <div className="col-sm-4">
                        <label htmlfor="title" className="form-label mt-4">{t('Asset Name')}</label>
                        <select
                  name="asset_sub_type"
                  // value={ExistNameHandle}
                  onChange={ExistnameHandle}
                  className="common-input form-select"
                >
                  <option value="">Select Asset Name</option>
                  {ExistNameHandle.asset_name && ExistNameHandle.asset_name.map((row) => (
                    <option key={row.asset_name} value={row.asset_name}>{row.asset_name}</option>
                  ))}

                </select>

                    </div>
                    <div className="col-sm-3">
                    
                        <Button
                            variant="contained"
                            color="success"
                            style={{ marginLeft: 8 }}
                            onClick={() => SearchHandle()}    
                          >
                            Search
                          </Button>

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
                                                    {row.intake_type}
                                                </TableCell>
                                                <TableCell align="left" style={{ width: "15%" }}>
                                                    {row.category}
                                                </TableCell>
                                                <TableCell align="left">{row.asset_name}</TableCell>
                                                <TableCell align="left">{row.asset_sub_type_id}</TableCell>
                                                <TableCell align="left">{row.asset_name}</TableCell>
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
