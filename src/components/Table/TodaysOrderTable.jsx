import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import { useState, useEffect } from "react";
import { get_today_orders } from '../../api/Products'
import { toast } from "react-toastify";
import Spinner from '../Loader/Spinner';

const makeStyle = (status) => {
  if (status === 'a') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if (status === 'r') {
    return {
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else {
    return {
      background: '#59bfff',
      color: 'white',
    }
  }
}

const TodaysOrderTable = () => {

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    get_today_orders().then(res => {
      if (res.status === 'success') {
        setRows(res.data);
      }
      else if (res.status === 'failed') {
        setRows([]);
      }
      else {
        setRows([]);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="Table">
      <h3 className="mb-4">{t("Today's Orders")}</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('Order ID')}</TableCell>
              <TableCell align="left">{t('Name')}</TableCell>
              <TableCell align="left">{t('Description')}</TableCell>
              <TableCell align="left">{t('Subtotal')}</TableCell>
              <TableCell align="left">{t('Status')}</TableCell>
            </TableRow>
          </TableHead>

          {!isLoading && rows && rows.length > 0 &&
            <TableBody style={{ color: "white" }}>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.po_number}</TableCell>
                  <TableCell align="left">{row.dealer_person_name}</TableCell>
                  <TableCell align="left">{row.dealer_shop_name}</TableCell>
                  <TableCell align="left">{row.total_cost}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.execution_status)}>{row.execution_status === 'p' ? 'Pending' : row.execution_status === 'a' ? 'Accepted' : 'Rejected'}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          }
          {!isLoading && (!rows || rows.length === 0) &&
            <TableRow>
              <TableCell align='center' colSpan={7} >
                <h4> <i>{t('No data available')}</i> </h4>
              </TableCell>
            </TableRow>
          }
        </Table>
      </TableContainer>

      {isLoading &&
        <Spinner />
      }

    </div>

  )
}

export default TodaysOrderTable
