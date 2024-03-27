import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Sidebar.css";
import title from "../../src/images/title.png";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PieChartIcon from "@mui/icons-material/PieChart";
import { logoutApi } from "../api/Users";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { UilBars } from "@iconscout/react-unicons";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Sidebars = (props) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [activeMenu, setActiveMenu] = useState("/dashboard");
  const [HostelActiveMenu, setHostelActiveMenu] = useState("/hosteldashboard");
  console.log("userData", props.role);
  useEffect(() => {
    debugger;
    // Update active menu based on location change
    setActiveMenu(location.pathname);
    setHostelActiveMenu(location.pathname);
  }, [location.pathname]);

  function logout() {
    logoutApi().then((res) => {});
    localStorage.setItem("alert", "Logged out");
    setTimeout(() => {
      sessionStorage.clear();
      Cookies.remove("userId");
      navigate("/login");
    }, 500);
  }

  const [expanded, setExpaned] = useState(true);

  function toggleSidebar() {
    setExpaned(!expanded);
  }
  return (
    <div className="maindiv" style={{ display: "flex", overflow: "none" }}>
      <div
        className="bars"
        style={{ left: "1%", top: "1%" }}
        onClick={toggleSidebar}
      >
        <UilBars />
      </div>

      <Sidebar
        className="sidebar hide-on-print"
        collapsed={!expanded} // Ensure the sidebar collapses when not expanded
        style={{ left: expanded ? "0" : "-250px" }} // Adjust the position based on 'expanded' state
      >
        {props.role === 1 ? (
          <Menu>
            {/* <MenuItem className="menu1" icon={<MenuRoundedIcon />}> */}

            <div className="logo">
              <span>
                <img src={title} alt="title" />
              </span>
            </div>
            {/* </MenuItem> */}
            <MenuItem
              icon={<GridViewRoundedIcon />}
              className={
                activeMenu === "/dashboard" ? "menuItem active " : "menuItem"
              }
            >
              <Link to="/dashboard">Dashboard</Link>
            </MenuItem>
            
            <SubMenu label="Manage Login" icon={<WalletRoundedIcon  />} className='SubMenu'>
            <MenuItem icon={<PersonAddIcon  />} className={activeMenu === '/create-hostel-login' ? 'menuItem active ' : 'menuItem'}><Link to="/create-hostel-login">Create Hostel Login</Link></MenuItem>
          </SubMenu>
            <SubMenu
              label="Requirement"
              icon={<PlaylistAddCheckIcon />}
              className="SubMenu"
            >
              <MenuItem
                icon={<AddCircleIcon />}
                className={
                  activeMenu === "/newrequirements"
                    ? "menuItem active "
                    : "menuItem"
                }
              >
                <Link to="/newrequirements">New Requirement</Link>
              </MenuItem>
              <MenuItem
                icon={<DescriptionIcon />}
                className={
                  activeMenu === "/trackrequirements"
                    ? "menuItem active "
                    : "menuItem"
                }
              >
                <Link to="/trackrequirements">Track Requirements</Link>
              </MenuItem>
              <MenuItem
                icon={<CancelIcon />}
                className={
                  activeMenu === "/rejectedrequirements"
                    ? "menuItem active "
                    : "menuItem"
                }
              >
                <Link to="/rejectedrequirements">Rejected Requirements</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu
              label="Manage Asset"
              className="SubMenu"
              icon={<BusinessIcon />}
            >
              <MenuItem
                icon={<AddCircleOutlineIcon />}
                className={
                  activeMenu === "/add-asset-type"
                    ? "menuItem active "
                    : "menuItem"
                }
              >
                {" "}
                <Link to="/add-asset-type">Create Asset Master </Link>
              </MenuItem>
              <MenuItem
                icon={<BusinessCenterIcon ndedIcon />}
                className={
                  activeMenu === "/add-assets" ? "menuItem active " : "menuItem"
                }
              >
                {" "}
                <Link to="/add-assets">Add Asset-Inverntory</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu
              label="Reports"
              icon={<EqualizerIcon />}
              className="SubMenu"
            >
              <MenuItem
                icon={<PieChartIcon />}
                className={
                  activeMenu === "/hostel-report"
                    ? "menuItem active "
                    : "menuItem"
                }
              >
                <Link to="/hostel-report">Hostel Wise Report</Link>
              </MenuItem>
              <MenuItem
                icon={<PieChartIcon />}
                className={
                  activeMenu === "/assetreport"
                    ? "menuItem active "
                    : "menuItem"
                }
              >
                <Link to="/assetreport">Inventory Report</Link>
              </MenuItem>
              <MenuItem
                icon={<PieChartIcon />}
                className={
                  activeMenu === "/requirementreport"
                    ? "menuItem active "
                    : "menuItem"
                }
              >
                <Link to="/requirementreport">Requirements Report</Link>
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<LogoutRoundedIcon />} onClick={logout}>
              {" "}
              Logout{" "}
            </MenuItem>
          </Menu>
        ) : (
          <Menu>
            {/* <MenuItem className="menu1" icon={<MenuRoundedIcon />}> */}

            <div className="logo">
              <span>
                <img src={title} alt="title" />
              </span>
            </div>
            {/* </MenuItem> */}
            <MenuItem
              icon={<GridViewRoundedIcon />}
              className={
                HostelActiveMenu === "/hosteldashboard" ? "menuItem active " : "menuItem"
              }
            >
              <Link to="/hosteldashboard">Dashboard</Link>
            </MenuItem>
            <SubMenu
              label="Requirement"
              icon={<PlaylistAddCheckIcon />}
              className="SubMenu"
            >
              <MenuItem
                icon={<AddCircleIcon />}
                className={
                  HostelActiveMenu === "/hostel-requirement"
                    ? "menuItem active "
                    : "menuItem"
                }
              >
                <Link to="/hostel-requirement">Raise Requirement</Link>
              </MenuItem>
              <MenuItem
                icon={<CheckCircleIcon/>}
                className={
                  HostelActiveMenu === "/completereq"
                    ? "menuItem active "
                    : "menuItem"
                }
              >
                <Link to="/completereq">Completed Requirements</Link>
              </MenuItem>
              <MenuItem
                icon={<CancelIcon />}
                className={
                  HostelActiveMenu === "/rejectreq"
                    ? "menuItem active "
                    : "menuItem"
                }
              >
                <Link to="/rejectreq">Rejected Requirements</Link>
              </MenuItem>
              <MenuItem
                icon={<DescriptionIcon />}
                className={
                  HostelActiveMenu === "/confirmdelivery"
                    ? "menuItem active "
                    : "menuItem"
                }
              >
                <Link to="/confirmdelivery">Confirm Delivery</Link>
              </MenuItem>
            </SubMenu>
           
              <MenuItem
                icon={<SupervisedUserCircleIcon />}
                className={
                  HostelActiveMenu === "/student-details"
                    ? "menuItem active "
                    : "menuItem"
                }
              >
                {" "}
                <Link to="/student-details">Student Details </Link>
              </MenuItem>
              <MenuItem
                icon={<AccountCircleIcon />}
                className={
                  HostelActiveMenu === "/staffdetails" ? "menuItem active " : "menuItem"
                }
              >
                {" "}
                <Link to="/staffdetails">Staff Details</Link>
              </MenuItem>
            
              
            <MenuItem icon={<LogoutRoundedIcon />} onClick={logout}>
              {" "}
              Logout{" "}
            </MenuItem>
          </Menu>
        )}
      </Sidebar>
    </div>
  );
};

export default Sidebars;
