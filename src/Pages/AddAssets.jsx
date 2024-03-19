import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import "sweetalert2/dist/sweetalert2.min.css";
import "../components/Table/Table.css";
import TopLoader from "../components/Loader/TopLoader";
import "react-responsive-modal/styles.css";
import { Modal, Button } from "@mui/material";

const AddAssets = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [type, setType] = useState("view");

  const switchButton = (type) => {
    if (type === "assign") {
      setType("assign");
    } else {
      setType("view");
    }
  };

  const form1 = useForm();
  const form2 = useForm();

  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    formState: { errors: errorsForm1 },
  } = form1;
  const {
    register: registerForm2,
    formState: { errors: errorsForm2 },
  } = form2;

  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      <div className="px-2 px-md-4">
        <h3 className="my-4">{t("Add Asset Type")}</h3>
        <button
          className={
            type === "assign"
              ? "btn btn-outline-secondary"
              : "btn btn-secondary"
          }
          style={{ fontSize: "14px" }}
          onClick={(e) => switchButton("view")}
        >
          {t("Create New Asset")}{" "}
        </button>
        <span className="mx-2 d-inline-block"></span>
        <button
          className={
            type === "view" ? "btn btn-outline-success" : "btn btn-success"
          }
          style={{ fontSize: "14px" }}
          onClick={(e) => switchButton("assign")}
        >
          {t("Add In Existing Asset")}{" "}
        </button>

        {type === "view" ? (
          <form id="myform1" style={{ marginTop: "12px" }}>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Intake Time</label>
                <select
                  name="intake_type"
                  id=""
                  className="common-input form-select"
                >
                  <option value="">Select Intake Time</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  id=""
                  className="common-input form-select"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="consumable">Consumable</option>
                  <option value="nonconsumable">Non Consumable</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Asset Type</label>
                <select
                  name="asset_type"
                  id=""
                  className="common-input form-select"
                  required
                >
                  <option value="">Select Asset Type</option>
                </select>
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-md-4">
                <label className="form-label">Asset Sub Type</label>
                <select
                  name="asset_sub_type"
                  id=""
                  className="common-input form-select"
                >
                  <option value="">Select Asset Sub Type</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Asset ID</label>
                <select
                  name="newassets"
                  id=""
                  className="common-input form-select"
                  required
                >
                  <option value="">Select Asset ID</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Asset Name</label>
                <input
                  type="text"
                  value=""
                  name="asset_name"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-md-4">
                <label className="form-label">Description</label>
                <textarea
                  style={{ height: "100px", resize: "none" }}
                  className="form-control"
                  name="description"
                  required
                ></textarea>
              </div>
              <div className="col-md-4">
                <label className="form-label">Asset quantity</label>
                <input
                  type="text"
                  value=""
                  name="asset_quantity"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Asset Added Date </label>
                <input
                  type="Date"
                  value=""
                  name="asset_add_date"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-md-4">
                <label className="form-label">Amount Unit</label>
                <input
                  type="text"
                  value=""
                  name="amount_per_unit"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">GST(%)</label>
                <input
                  type="text"
                  value=""
                  name="gst"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Total Amount</label>
                <input
                  type="Date"
                  value=""
                  name="total_amount"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <button type="submit" className="btn btn-primary me-2">
                  Submit
                </button>
                <button type="button" className="btn btn-secondary">
                  Clear
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form id="myform2" style={{ marginTop: "12px" }}>
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">Category</label>
                <select
                  name="newassets"
                  id=""
                  className="common-input form-select"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="consumable">Consumable</option>
                  <option value="nonconsumable">Non Consumable</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Asset Type</label>
                <select
                  name="saleperson"
                  id=""
                  className="common-input form-select"
                >
                  <option value="" selected={true}>
                    Asset Type
                  </option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Asset Sub Type</label>
                {/* {assetSubTypes.map((subType, index) => ( */}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    value=""
                    // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                {/* ))} */}
              </div>
              <div className="col-md-2">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 32 }}
                >
                  Add
                </Button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <button type="submit" className="btn btn-primary me-2">
                  Submit
                </button>
                <button type="button" className="btn btn-secondary">
                  Clear
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default AddAssets;
