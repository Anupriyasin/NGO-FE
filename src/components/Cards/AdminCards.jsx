import React, { useEffect, useState } from "react";
import "./Cards.css";
import { useTranslation } from "react-i18next";
import Card2 from "../Card/Card1";
import { dealer_data_count } from "../../api/Products";
import { motion, AnimateSharedLayout } from "framer-motion";
import { toast } from "react-toastify";
import { FiShoppingBag } from 'react-icons/fi';
import { FaCreditCard } from 'react-icons/fa';
import { BiMoney } from 'react-icons/bi';
// import i18next from "i18next";

const AdminCards = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // dealer_data_count()
    //   .then((res) => {
    //     if (res.status === "success") {
    //       setRows(res.data.dealer_cards_Data);
    //       setCurrentOrders(res.data.current_orders)
    //     } else if (res.status === "failed") {
    //       toast.error(t(res.message));
    //     } else {
    //       toast.error(t("Something went wrong"));
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     toast.error(t("Something went wrong"));
    //     setIsLoading(false);
    //   });
  }, []);


  return (
    <div>
      {/* {rows.map((row) => ( */}
        <div className="row justify-content-between mb-3">
          <div className="col-md-3 mt-1">
            <div className="card card1">
              <div className="card-body hello1">
                <h3 className="card-title text-white">{t('New')}</h3>
                <motion.div>
                  <div className="radialBar">
                    <span><FiShoppingBag className="icon mt-2 text-white" size={20} /></span>
                    <span className="text-white larger-text">{0}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="col-md-3 mt-1">
            <div className="card card2">
              <div className="card-body hello2">
                <h3 className="card-title text-white">{t('Pending')}</h3>
                <motion.div>
                  <div className="radialBar">
                    <span><FaCreditCard className="icon mt-2 text-white" size={20} /></span>
                    <span className="text-white larger-text">{0}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="col-md-3 mt-1">
            <div className="card card3">
              <div className="card-body hello3">
                <h3 className="card-title text-white">{t('Completed')}</h3>
                <motion.div>
                  <div className="radialBar">
                    <span><BiMoney className="icon mt-2 text-white" size={20} /></span>
                    <span className="text-white larger-text">{0}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="col-md-3 mt-1">
            <div className="card card3">
              <div className="card-body hello3">
                <h3 className="card-title text-white">{t('All')}</h3>
                <motion.div>
                  <div className="radialBar">
                    <span><BiMoney className="icon mt-2 text-white" size={20} /></span>
                    <span className="text-white larger-text">{0}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* <div className="col-md-12 mt-1 mt-md-3">
            <div className="card card4">
              <div className="card-body hello4 p-md-4">
                <h3 className="card-title text-white">{t('Current Orders')}</h3>
                <motion.div>
                  <span><FiShoppingBag className="icon mt-2 text-white" size={20} /></span>
                  <div className="mt-3 col-md-12 d-flex justify-content-center row">

                    <>
                      <div className="d-flex col-12 col-md-8 mb-2" style={{borderBottom: "2px solid white"}}>
                        <p className="col-6 text-white fw-bold pb-1 fs-4">{ t("Order Number")}</p>
                        <p className="col-6 text-end text-white fw-bold pb-1 fs-4">{t('Status')}</p>
                      </div>
                      {
                        currentOrders.map((order, index) => (
                          <div className="d-flex col-11 col-md-8 p-1" key={index}>
                            <p className="col-6 text-white">{index + 1 + ". " + order.po_number}</p>
                            <p className="col-6 text-end text-white">{order.execution_status == "a" ? t("Accepted") : t("Pending")}</p>
                          </div>
                        ))
                      }
                    </>
                  </div>
                  <div className="radialBar d-flex justify-content-end">
                    <span className="text-white larger-text fs-3">{currentOrders.length}</span>
                  </div>
                  <div className="detail">
                    <span className="text-white smaller-text">{ t("Total current orders")}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div> */}
        </div>
      {/* ))} */}
    </div>
  );
};

export default AdminCards;
