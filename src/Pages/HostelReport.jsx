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
import { allhostellogin } from '../api/Users';
import { toast } from 'react-toastify';
import { TextField, TablePagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const HostelReport = ({ role }) => {

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  // Search and pagination
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
      setIsLoading(true);
      allhostellogin().then(res => {
          if (res.status === "success") {
              setRows(res.data.result);
              setFilteredData(res.data.result);
          }
          else {
              setRows([]);
              toast.error(t("Something went wrong"));
          }

      });
      setIsLoading(false);
  }, []);

  // Update filteredData whenever searchQuery changes
  useEffect(() => {
    const filtered = rows.filter(item =>
      item.hostel_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.block_name.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    setFilteredData(filtered);
    setPage(0);
  }, [searchQuery, rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  let navigate = useNavigate();
  const view = (id) => {
    navigate(`/${role === 5 ? 'dealer' : 'admin'}/userdetails/${id}`);
  }

  return (
    <>
      <TopLoader loading={isLoading ? '50' : '100'} />
      <div className='px-0 px-md-3' >
      <div className="my-4 col-12 d-flex justify-content-between align-items-center">
                    <h5 className=" mt-2">{t("Hostel Login Report")}</h5>
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
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
            className='my-4'
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell>{t("Sr. No.")}</TableCell>
                  <TableCell align="left">{t("Hostel Name")}</TableCell>
                  <TableCell align="left">{t("Email ID")}</TableCell>
                  <TableCell align="left">{t("Address")}</TableCell>
                  <TableCell align="left">{t("Distric")}</TableCell>
                  <TableCell align="left">{t("Block")}</TableCell>
                  <TableCell align="left">{t("Action")}</TableCell>
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
                      <TableCell align="left">{row.hostel_name}</TableCell>
                      <TableCell align="left">{row.email_id}</TableCell>
                      <TableCell align="left">{row.address}</TableCell>
                      <TableCell align="left">{row.district_name}</TableCell>
                      <TableCell align="left">{row.block_name}</TableCell>
                      <TableCell align="left"><button className='btn btn-success btn-sm' onClick={() => view(row.party_code)}>{t('View')}</button></TableCell>
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

export default HostelReport