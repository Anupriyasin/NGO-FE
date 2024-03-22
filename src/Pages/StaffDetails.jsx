import React, { useState, useEffect } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import '../components/Table/Table.css';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import TopLoader from '../components/Loader/TopLoader';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { TextField, TablePagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const StaffDetails = ({ role }) => {

    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);

    // Search and pagination
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // useEffect(() => {
    //     setIsLoading(true);
    //     alldealers().then(res => {
    //         if (res.status === "success") {
    //             setRows(res.data);
    //             setFilteredData(res.data);
    //         }
    //         else {
    //             setRows([]);
    //             toast.error(t("Something went wrong"));
    //         }

    //     });
    //     setIsLoading(false);
    // }, []);

    // Update filteredData whenever searchQuery changes
    // useEffect(() => {
    //     const filtered = rows.filter(item =>
    //         item.dealer_person_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         item.dealer_shop_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         item.dealer_contact.toLowerCase().includes(searchQuery.toLowerCase())
    //     );
    //     setFilteredData(filtered);
    //     setPage(0);
    // }, [searchQuery, rows]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    let navigate = useNavigate();
    const view = () => {
        navigate(`/addstaff`);
    }

    return (
        <>
            <TopLoader loading={isLoading ? '50' : '100'} />
            <div className='px-0 px-md-3'>
            <div className="my-4 col-12 d-flex justify-content-between align-items-center">
                    <h5 className=" mt-2">{t("Staff Details")}</h5>
                    <div>
                    <button className='btn btn-primary' onClick={() => view()}><AddIcon/>Add Staff</button>

                    </div>

                </div>
                <div className="Table mb-6">
                    <TableContainer
                        component={Paper}
                        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                        className='my-4'
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('Sr. No.')}</TableCell>
                                    <TableCell align="left">{t('First Name')}</TableCell>
                                    <TableCell align="left">{t('Last Name')}</TableCell>
                                    <TableCell align="left">{t('DOB')}</TableCell>
                                    <TableCell align="left">{t('Nationality')}</TableCell>
                                    <TableCell align="left">{t('Gender')}</TableCell>
                                    <TableCell align="left">{t('Address')}</TableCell>
                                    <TableCell align="left">{t('Email ID')}</TableCell>
                                    <TableCell align="left">{t('Staff ID/Employee No.')}</TableCell>
                                    <TableCell align="left">{t('Job Title/Position')}</TableCell>
                                    <TableCell align="left">{t('Employment Status')}</TableCell>
                                    <TableCell align="left">{t('Phone Number')}</TableCell>
                                    <TableCell align="left">{t('Date of Employment')}</TableCell>
                                    <TableCell align="left">{t('Action')}</TableCell>

                                </TableRow>
                            </TableHead>
                            {!isLoading && filteredData && filteredData.length > 0 &&
                                <TableBody style={{ color: "white" }}>
                                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                                            <TableCell align="left">a</TableCell>
                                            <TableCell align="left">b</TableCell>
                                            <TableCell align="left">c</TableCell>
                                            <TableCell align="left">d</TableCell>
                                            <TableCell align="left">e</TableCell>
                                            <TableCell align="left"><button className='btn btn-success btn-sm' onClick={() => view()}>{t('View')}</button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            }
                            {!isLoading && (!filteredData || filteredData.length === 0) &&
                                <TableRow>
                                    <TableCell align='center' colSpan={7} >
                                        <h4> <i>{t('No data available')}</i> </h4>
                                    </TableCell>
                                </TableRow>
                            }
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
    )
}

export default StaffDetails