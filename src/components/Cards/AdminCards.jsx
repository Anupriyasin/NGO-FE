import React, { useEffect, useState } from "react";
import "./Cards.css";
import { cardsData } from "../../Data/Data";
import { useTranslation } from 'react-i18next';
import { admin_data_count } from "../../api/Products";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiShoppingBag } from 'react-icons/fi';
import { FaCreditCard } from 'react-icons/fa';
import { BiMoney } from 'react-icons/bi';

const AdminCards = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    admin_data_count()
      .then((res) => {
        if (res.status === "success") {
          setRows(res.data);
        } else if (res.status === "failed") {
          toast.error(t(res.message));
        } else {
          toast.error(t("Something went wrong"));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(t("Something went wrong"));
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {rows.map((row) => (
        <div className="row justify-content-between mb-3" key={row}>
          <div className="col-md-4 mt-1">
            <div className="card card1">
              <div className="card-body hello1">
                <h3 className="card-title text-white">{t('Orders')}</h3>
                <motion.div>
                  <div className="radialBar">
                    <span><FiShoppingBag className="icon mt-2 text-white" size={20} /></span>
                    <span className="text-white larger-text">{row.total_orders}</span>
                  </div>
                  <div className="detail">
                    <span className="text-white smaller-text">{t('Total orders')}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-1">
            <div className="card card2">
              <div className="card-body hello2">
                <h3 className="card-title text-white">{t('Dealers')}</h3>
                <motion.div>
                  <div className="radialBar">
                    <span><FaCreditCard className="icon mt-2 text-white" size={20} /></span>
                    <span className="text-white larger-text">{row.total_dealers}</span>
                  </div>
                  <div className="detail">
                    <span className="text-white smaller-text">{t('Total dealers')}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-1">
            <div className="card card3">
              <div className="card-body hello3">
                <h3 className="card-title text-white">{t('Outstanding')}</h3>
                <motion.div>
                  <div className="radialBar">
                    <span><BiMoney className="icon mt-2 text-white" size={20} /></span>
                    <span className="text-white larger-text">₹{row.total_outstanding}</span>
                  </div>
                  <div className="detail">
                    <span className="text-white smaller-text">{t('Total outstanding')}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCards;
