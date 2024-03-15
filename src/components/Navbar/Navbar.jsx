import React, { useState, useEffect } from 'react'
import './Navbar.css';
import { getUserDetails } from '../../api/Users'
import { FaBell } from 'react-icons/fa';
import { motion } from 'framer-motion';
import user from '../../images/userIcon.png';
import { baseUrl } from '../../api/constant';
import { useForm } from "react-hook-form";
import i18next from "i18next";
import Languageoption from '../Language-Dropdown';
import { UilShoppingCart } from "@iconscout/react-unicons";
import { useNavigate } from 'react-router';
import { get_cart_items } from "../../api/Products";
import { Link } from 'react-router-dom';

const Navbar = ({ totalItems, role, userData }) => {

  const [cartIcon, showCartIcon] = useState(false)

  const handleClick = (e) => {
    i18next.changeLanguage(e.target.value)
    localStorage.setItem('selectedLanguage', e.target.value);
  }

  // Define variables
  const [fullName, setFullName] = useState();
  const [roleName, setRoleName] = useState();
  const [imgPath, setImgPath] = useState(user);

  useEffect(() => {
    if (userData.status === "success") {

      if (userData.data.role_id === 5) {
        setRoleName("Dealer");
        setFullName(userData.data.dealer_shop_name);
        showCartIcon(true);
      }
      else {
        setFullName(userData.data.name);
        if (userData.data.img_path) {
          setImgPath(baseUrl() + userData.data.img_path);
        }
        // set roles
        if (userData.data.role_id === 1) {
          setRoleName("Administration");
        }
        else if (userData.data.role_id === 2) {
          setRoleName("Sales");
        }
        else if (userData.data.role_id === 3) {
          setRoleName("Management");
        }
        else if (userData.data.role_id === 4) {
          setRoleName("Finance");
        }

      }
    }
  }, [userData])

  let details = useNavigate();

  function cartView() {
    details(`/cart`);
  }

  return (
    <>
      <div className='container1 justify-content-between px-2 hide-on-print'>
        <div className='userName mt-md-2'>
          <p><strong id='fullName'>{fullName}</strong></p>
          <p className='smallText'>{roleName}</p>
        </div>
        <div className='d-flex align-items-center col-gap'>
          {/* <div>
            <Languageoption onChange={(e) => handleClick(e)} />
          </div> */}

          {cartIcon ?
            <motion.div className="notification" animate={totalItems ? { x: [-5, 5, -5, 5, 0], rotate: [0, 5, -5, 5, 0] } : ""} >
              <button class="btn position-relative cart p-2 pt-1 pb-1" onClick={cartView}>
                <UilShoppingCart />
                {
                  totalItems > 0 &&
                  <span class="position-absolute top-40 start-100 translate-middle badge rounded-pill bg-light text-dark border border-2">
                    {totalItems}
                  </span>
                }
              </button>
            </motion.div>
            : ""
          }

          <Link >
            <img src={imgPath} alt="User" className='img-42' style={{ cursor: "pointer" }} />
          </Link>

        </div>
      </div>
    </>
  )
}

export default Navbar