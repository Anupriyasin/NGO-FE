import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "./Sidebar.css";
import title from '../../src/images/title.png';
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import { logoutApi } from "../api/Users";
import { UilBars } from "@iconscout/react-unicons";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';




const App = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [activeMenu, setActiveMenu] = useState('');

  useEffect(() => {
    // Update active menu based on location change
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  function logout() {
    logoutApi().then(res => { })
    localStorage.setItem("alert", "Logged out");
    setTimeout(() => {
      sessionStorage.clear();
      Cookies.remove('userId');
      navigate("/login");
    }, 500);
  }

  const [expanded, setExpaned] = useState(false);
  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh" ,overflow:"none"}}>
        <div className="bars" style={{ left: '1%', top: '1%' }} onClick={() => setExpaned(!expanded)}>
        <UilBars />
      </div>
      <Sidebar className="sidebar hide-on-print"
       variants={sidebarVariants}
       animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        <Menu>
        {/* <MenuItem className="menu1" icon={<MenuRoundedIcon />}> */}
      
          <div className="logo">
            <span>
              <img src={title} alt="title" />
            </span>
          </div>
          {/* </MenuItem> */}
          <MenuItem icon={<GridViewRoundedIcon />} className={activeMenu === '/dashboard' ? 'menuItem active ' : 'menuItem'}><Link to="/dashboard">Dashboard</Link></MenuItem>
          <SubMenu label="Manage Login" icon={<WalletRoundedIcon  />} className='SubMenu'>
            <MenuItem icon={<AccountBalanceRoundedIcon />} className={activeMenu === '/create-hostel-login' ? 'menuItem active ' : 'menuItem'}><Link to="/create-hostel-login">Create Hostel Login</Link></MenuItem>
          </SubMenu>
          <SubMenu label="Requirement" icon={<PlaylistAddCheckIcon  />} className='SubMenu'>
            <MenuItem icon={<AccountBalanceRoundedIcon />} className={activeMenu === '/newrequirements' ? 'menuItem active ' : 'menuItem'}><Link to="/newrequirements">New Requirement</Link></MenuItem>
            <MenuItem icon={<SavingsRoundedIcon />} className={activeMenu === '/trackrequirements' ? 'menuItem active ' : 'menuItem'}><Link to="/trackrequirements">Track Requirements</Link></MenuItem>
            <MenuItem icon={<SavingsRoundedIcon />} className={activeMenu === '/rejectedrequirements' ? 'menuItem active ' : 'menuItem'}><Link to="/rejectedrequirements">Rejected Requirements</Link></MenuItem>
          </SubMenu>
          <SubMenu label="Manage Asset Master" className='SubMenu' icon={<SettingsApplicationsRoundedIcon />}>
            <MenuItem icon={<ShieldRoundedIcon />} className={activeMenu === '/add-asset-type' ? 'menuItem active ' : 'menuItem'}> <Link to="/add-asset-type">Add Asset Type</Link></MenuItem>
            <MenuItem icon={<AccountCircleRoundedIcon />} className={activeMenu === '/add-assets' ? 'menuItem active ' : 'menuItem'}> <Link to="/add-assets">Add Asset-Inverntory</Link></MenuItem>
          </SubMenu>
          <SubMenu label="Report" icon={<WalletRoundedIcon  />} className='SubMenu'>
          <MenuItem icon={<MonetizationOnRoundedIcon />} className={activeMenu === '//hostel-report' ? 'menuItem active ' : 'menuItem'}><Link to="/hostel-report">Hostel Wise Report</Link></MenuItem>
          </SubMenu>
          
          <MenuItem icon={<LogoutRoundedIcon />} onClick={logout}> Logout </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default App;
