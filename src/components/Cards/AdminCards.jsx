import React, { useEffect, useState } from "react";
import "./Cards.css";
import { useTranslation } from "react-i18next";
import { motion, AnimateSharedLayout } from "framer-motion";
import { toast } from "react-toastify";
import { FiShoppingBag } from "react-icons/fi";
import { FaCreditCard } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
// import i18next from "i18next";

const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "0px !important",
  p: 4,
};

const AdminCards = (props) => {
  const { t } = useTranslation();

  const [modalHeader, setModalHeader] = useState("");
  const [modalData, setModalData] = useState([]);

  const [open, setOpen] = React.useState(false);
  const onOpenModal = (data) => {
    if (data === 0) {
      setModalHeader("Total Students");
      setModalData(props.hostelWiseStudents);
    } else if (data === 1) {
      setModalHeader("Total Staff");
      setModalData(props.hostelWiseStaff);
    }
    setOpen(true);
  };
  
  const onCloseModal = () => setOpen(false);

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
          <div onClick={() => onOpenModal(0)} className="card ">
            <div
              className="card-body border"
              style={{ backgroundColor: "white" }}
            >
              <h3 className="card-title text-dark">{t("Total Students")}</h3>
              <motion.div>
                <div className="radialBar d-flex justify-content-end">
                  <span className="text-dark fs-2">
                    {props.students > 0 ? props.students : 0}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-1 ">
          <div onClick={() => onOpenModal(1)} className="card ">
            <div
              className="card-body border"
              style={{ backgroundColor: "white" }}
            >
              <h3 className="card-title text-dark">{t("Staff")}</h3>
              <motion.div>
                <div className="radialBar d-flex justify-content-end">
                  <span className="text-dark fs-2">
                    {props.staff > 0 ? props.staff : 0}
                  </span>
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
                    <span className="text-dark fs-2">
                      {props.hostels > 0 ? props.hostels : 0}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        <Modal
          open={open}
          onClose={onCloseModal}
          center
        >
          <h5 style={{width: '500px'}} className="fs-3 fw-bold p-3">{modalHeader}</h5>
          <ul class="list-group list-group-flush">
            {
              modalData.map(item => (
                <li class="list-group-item col-12 d-flex justtify-content-around">
                  <p className="col-6 fs-5">{item.name}</p>
                  <p className="col-6 fs-5 text-end">{item.count}</p>
                </li>
              ))
            }
          </ul>
        </Modal>
      </div>
    </div>
  );
};

export default AdminCards;
