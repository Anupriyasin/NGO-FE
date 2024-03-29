import React, { useEffect, useState } from "react";
import "./Cards.css";
import { useTranslation } from "react-i18next";
import { motion, AnimateSharedLayout } from "framer-motion";
import { toast } from "react-toastify";
import { FiShoppingBag } from "react-icons/fi";
import { FaCreditCard } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
// import i18next from "i18next";

const AdminCards = (props) => {
  const { t } = useTranslation();

  return (
    <div className="row">
      <div className="row justify-content-between mb-3">
        <div className="col-md-3 mt-1">
          <div className="card card1">
            <div className="card-body hello1">
              <h3 className="card-title text-white">{t("New")}</h3>
              <h6 className="text-white">{t("Requirements")}</h6>
              <motion.div>
                <div className="radialBar d-flex justify-content-end">
                  <span className="text-white larger-text fs-3">
                    {props.newReq > 0 ? props.newReq : 0}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mt-1">
          <div className="card card2">
            <div className="card-body hello2">
              <h3 className="card-title text-white">{t("Pending")}</h3>
              <h6 className="text-white">{t("Requirements")}</h6>
              <motion.div>
                <div className="radialBar d-flex justify-content-end">
                  <span className="text-white larger-text fs-3">
                    {props.PendingReq > 0 ? props.PendingReq : 0}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mt-1">
          <div className="card card3">
            <div className="card-body hello3">
              <h3 className="card-title text-white">{t("Completed")}</h3>
              <h6 className="text-white">{t("Requirements")}</h6>
              <motion.div>
                <div className="radialBar d-flex justify-content-end">
                  <span className="text-white larger-text fs-3">
                    {props.completedReq > 0 ? props.completedReq : 0}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mt-1">
          <div className="card card3">
            <div className="card-body hello4">
              <h3 className="card-title text-white">{t("All")}</h3>
              <h6 className="text-white">{t("Requirements")}</h6>
              <motion.div>
                <div className="radialBar d-flex justify-content-end">
                  <span className="text-white larger-text fs-3">
                    {props.allReq > 0 ? props.allReq : 0}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-between mb-3">
        <div className="col-md-4 mt-1 ">
          <div className="card ">
            <div
              className="card-body border"
              style={{ backgroundColor: "white" }}
            >
              <h3 className="card-title text-dark">{t("Total Students")}</h3>
              <motion.div>
                <div className="radialBar d-flex justify-content-end">
                  <span className="text-dark fs-2">{props.students > 0 ? props.students : 0}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-1 ">
          <div className="card ">
            <div
              className="card-body border"
              style={{ backgroundColor: "white" }}
            >
              <h3 className="card-title text-dark">{t("Staff")}</h3>
              <motion.div>
                <div className="radialBar d-flex justify-content-end">
                  <span className="text-dark fs-2">{props.staff > 0 ? props.staff : 0}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        {props.role === 1 ? (
          <div className="col-md-4 mt-1 ">
            <div className="card">
              <div
                className="card-body border"
                style={{ backgroundColor: "white" }}
              >
                <h3 className="card-title text-dark">{t("Total Ashram")}</h3>
                <motion.div>
                  <div className="radialBar d-flex justify-content-end">
                    <span className="text-dark fs-2">{props.hostels > 0 ? props.hostels : 0}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdminCards;
