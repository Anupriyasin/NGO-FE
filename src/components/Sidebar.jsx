import React, { useState, useEffect } from "react";
import "./Sidebar.css";
// import Logo from "../imgs/logo.png";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import title from '../../src/images/title.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import TopLoader from "./Loader/TopLoader";
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import { getUserDetails } from "../api/Users";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  // UilChart,
  // UilSignOutAlt,
  UilCommentAltVerify,
  UilInvoice,
  UilUserPlus,
  UilEye,
  UilSetting,
  UilSignOutAlt,
  UilShoppingCart,
  UilCloudUpload

} from "@iconscout/react-unicons";
import { logoutApi } from "../api/Users";

const Sidebar = (props) => {

  const { t } = useTranslation();
  const handleClick = (e) => {
    i18next.changeLanguage(e.target.value)
  }
  const location = useLocation();
  const [loading, setLoading] = useState(0);
  const [activeLink, setActiveLink] = useState('dashboard');
  const [SidebarData, setSidebarData] = useState([]);

  useEffect(() => {
    // Update activeLink when the location changes
    let currentPath = location.pathname;
    currentPath = currentPath.split("/");
    setActiveLink(currentPath[1]);
  }, [location]);

  useEffect(() => {
    if (props.role && (props.role === 1 )) {
      setSidebarData(
        [
          {
            icon: UilEstate,
            heading: "Dashboard",
            url: "/dashboard",
          },
          {
            icon: UilPackage,
            heading: "New Requirements",
            url: "/requirements",
          },
          {
            icon: UilPackage,
            heading: "Track Requirements",
            url: "/track_requirements",
          },
          {
            icon: UilPackage,
            heading: "Rejected Requirements",
            url: "/rejected_requirements",
          },
        ]
      )
    } else if (props.role && (props.role === 2)) {
      setSidebarData(
        [
          {
            icon: UilEstate,
            heading: "Dashboard",
            url: "/dashboard",
          },
          {
            icon: UilCommentAltVerify,
            heading: "Manage Orders",
            url: "/manage-orders"
          },
          {
            icon: UilCommentAltVerify,
            heading: "Order Reports",
            url: "/order-reports"
          },
          {
            icon: UilShoppingCart,
            heading: "Products",
            url: "/categories"
          },
          {
            icon: UilShoppingCart,
            heading: "Products Images",
            url: "/products-images"
          },
          {
            icon: UilInvoice,
            heading: "Invoices",
            url: "/invoice"
          },
          {
            icon: UilInvoice,
            heading: "Sales Order",
            url: "/sales-order"
          },
          {
            icon: UilUsersAlt,
            heading: 'Dealers',
            url: "/dealers-details"

          },
          {
            icon: UilUsersAlt,
            heading: 'Assigned Dealer Report',
            url: "/admin/assignedreport"

          },
          {
            icon: UilUsersAlt,
            heading: 'Check IN/OUT',
            url: "/checkinout"

          },
          {
            icon: UilUsersAlt,
            heading: 'Check IN/OUT Report',
            url: "/inoutreport"

          },
          {
            icon: UilUsersAlt,
            heading: 'New Dealer Visit',
            url: "/newdealervisit"
          },
          {
            icon: UilCloudUpload,
            heading: 'Upload Records',
            url: "/upload-records"
          },
          {
            icon: UilSetting,
            heading: 'Settings',
            url: "/settings"
          }
        ]
      )
    } else if (props.role && props.role === 5) {
      setSidebarData(
        [
          {
            icon: UilEstate,
            heading: "Dashboard",
            url: "/dashboard",
          },
          {
            icon: UilShoppingCart,
            heading: "Products",
            url: "/categories"
          },
          {
            icon: UilInvoice,
            heading: "Invoice",
            url: "/invoice"
          },
          {
            icon: UilUsersAlt,
            heading: 'My Orders',
            url: "/my-orders"

          },
          {
            icon: UilSetting,
            heading: 'Settings',
            url: "/settings"
          }
        ]
      );
    } else if (props.role && props.role === 4) {
      setSidebarData(
        [
          {
            icon: UilEstate,
            heading: "Dashboard",
            url: "/dashboard",
          },
          {
            icon: UilCommentAltVerify,
            heading: "Manage Orders",
            url: "/manage-orders"
          },
          {
            icon: UilCommentAltVerify,
            heading: "Order Reports",
            url: "/order-reports"
          },
          {
            icon: UilShoppingCart,
            heading: "Products",
            url: "/categories"
          },
          {
            icon: UilShoppingCart,
            heading: "Products Images",
            url: "/products-images"
          },
          {
            icon: UilInvoice,
            heading: "Invoices",
            url: "/invoice"
          },
          {
            icon: UilInvoice,
            heading: "Sales Order",
            url: "/sales-order"
          },
          {
            icon: UilUsersAlt,
            heading: 'Dealers',
            url: "/dealers-details"
          },
          {
            icon: UilCloudUpload,
            heading: 'Upload Records',
            url: "/upload-records"
          },
          {
            icon: UilSetting,
            heading: 'Settings',
            url: "/settings"
          }
        ]
      );
    }
  }, [props.role])

  const [expanded, setExpaned] = useState(false);

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  }

  let navigate = useNavigate();
  function logout() {
    logoutApi().then(res => { })
    setActiveLink("logout");
    localStorage.setItem("alert", "Logged out");
    setLoading(100);
    setTimeout(() => {
      sessionStorage.clear();
      Cookies.remove('userId');
      navigate("/login");
    }, 500);
  }

  return (
    <>
      <TopLoader loading={loading} />
      <div className="bars" style={{ left: '1%', top: '1%' }} onClick={() => setExpaned(!expanded)}>
        <UilBars />
      </div>
      <motion.div className='sidebar hide-on-print'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="logo">
          <span>
            <img src={title} alt="title" />
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div key={index}>
                <Link to={item.url} className={activeLink === item.url.split("/")[1] ? "menuItem active" : "menuItem"} >
                  <item.icon />
                  <span>{t(item.heading)}</span>
                </Link>
              </div>
            );
          })}
          <div className={activeLink === 'logout' ? "menuItem active" : "menuItem"}
            onClick={logout}>
            <UilSignOutAlt />
            <span>{t('Logout')}</span>
          </div>
        </div>
        <div className="menu logoutMenu mb-5">
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
