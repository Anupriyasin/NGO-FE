import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import "sweetalert2/dist/sweetalert2.min.css";
import "../components/Table/Table.css";
import TopLoader from "../components/Loader/TopLoader";
import "react-responsive-modal/styles.css";
import { Modal, Button } from "@mui/material";
import { toast } from 'react-toastify';
import { subassets, getAssetsName, AddAsset } from '../api/Users';


const AddAssets = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [type, setType] = useState("view");
  const [assetOptions, setAssetOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ExistAssetsType, setExistAssetsType] = useState([]);
  const [AssetsType, setAssetsType] = useState([]);
  const [AssetsTypes, setAssetsTypes] = useState([]);
  const [ExistAssetsSubTypes, setExistAssetsSubTypes] = useState([]);
  const [AssetsSubTypes, setAssetsSubTypes] = useState([]);
  const [ExistCategory, setExistCategory] = useState([]);
  const [CategoryHandle, setCategoryHandle] = useState([]);
  const [AssetSubtype, setAssetSubtype] = useState([]);
  const [IntakeHandle, setIntakeHandle] = useState([]);
  const [IntakeExitHandle, setIntakeExitHandle] = useState([]);
  const [NameHandle, setNameHandle] = useState('');
  const [ExistNameHandle, setExistNameHandle] = useState('');
  const [QuantityHandle, setQuantityHandle] = useState('');
  const [ExistQuantity, setExistQuantity] = useState('');
  const [ExistDonatedDate, setExistDonatedDate] = useState('');
  const [PurchaseDate, setPurchaseDate] = useState('');
  const [Amountperunit, setAmountperunit] = useState('');
  const [ExistGST, setExistGST] = useState('');
  const [ExistTotalAmount, setExistTotalAmount] = useState('');
  const [ExistDisHandle, setExistDisHandle] = useState('');
  const [ExistCurrentQuantity, setExistCurrentQuantity] = useState('');
  const [DisHandle, setDisHandle] = useState('');
  const [DateHandle, setDateHandle] = useState('');
  const [UnitsHandle, setUnitsHandle] = useState('');
  const [GstHandle, setGstHandle] = useState('');
  const [TotalAmountHandle, setTotalAmountHandle] = useState('');

  const [markRequired, setMarkRequired] = useState(true);

  useEffect(() => {
    debugger
    getAssetsName().then(res => {
      if (res.status === "success") {
        console.log("Assets data:", res.data);
        setAssetsTypes(res.data);
      }
    }).catch(err => {
      console.error("Error fetching assets:", err);
    });
  }, []);
  console.log("AssetsTypes.////", AssetsTypes)


  const AssetTypehandle = async (e) => {
    debugger;
    const newAssetType = e.target.value;
    setAssetsType((prevRow) => ({
      ...prevRow,
      asset_type: newAssetType,
    }));
console.log("AssetsType",AssetsType)
    try {
      const response = await subassets({ asset_id: newAssetType });
      if (response) {
        setAssetsSubTypes(response.data);
      } else {
        console.error("Invalid response format for subassets:", response);
      }
    } catch (error) {
      console.error("Error fetching subassets:", error);
    }
  };
  const ExistAssetTypehandle = async (e) => {
    debugger;
    const newAssetType = e.target.value;
    setExistAssetsType((prevRow) => ({
      ...prevRow,
      asset_type: newAssetType,
    }));
console.log("AssetsType",AssetsType)
    try {
      const response = await subassets({ asset_id: newAssetType });
      if (response) {
        setExistAssetsSubTypes(response.data);
      } else {
        console.error("Invalid response format for subassets:", response);
      }
    } catch (error) {
      console.error("Error fetching subassets:", error);
    }
  };

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


  const intakeexitHandle = (event) => {
    setIntakeExitHandle(event.target.value);
  };

  const categoryHandle = (event) => {
    setCategoryHandle(event.target.value);
  };
  const ExistcategoryHandle = (event) => {
    setExistCategory(event.target.value);
  };
  const nameHandle = (event) => {
    setNameHandle(event.target.value);
  };
  const ExistnameHandle = (event) => {
    setExistNameHandle(event.target.value);
  };
  const quantityHandle = (event) => {
    setQuantityHandle(event.target.value);
  };
  const ExistquantityHandle = (event) => {
    setExistQuantity(event.target.value);
  };
  const ExistDonatedDateHandle = (event) => {
    setExistDonatedDate(event.target.value);
  };
  const PurchaseDateHandle = (event) => {
    setPurchaseDate(event.target.value);
  };
  const AmountperunitHandle = (event) => {
    setAmountperunit(event.target.value);
  };
  const ExistGSTHandle = (event) => {
    setExistGST(event.target.value);
  };
  const ExistTotalAmountHandle = (event) => {
    setExistTotalAmount(event.target.value);
  };
  const disHandle = (event) => {
    setDisHandle(event.target.value);
  };
  const ExistdisHandle = (event) => {
    setExistDisHandle(event.target.value);
  };
  const ExistCurrentQuantityHandle = (event) => {
    setExistCurrentQuantity(event.target.value);
  };
  const dateHandle = (event) => {
    setDateHandle(event.target.value);
  };
  const unitsHandle = (event) => {
    setUnitsHandle(event.target.value);
  };
  const gstHandle = (event) => {
    setGstHandle(event.target.value);
  };
  const totalAmountHandle = (event) => {
    setTotalAmountHandle(event.target.value);
  };

  const intakeHandle = (event) => {
    setIntakeHandle(event.target.value);
  };

  const AssetSubtypehandle = (event) => {
    setAssetSubtype(event.target.value);
  };
  const ExistAssetSubtypehandle = (event) => {
    setExistAssetsSubTypes(event.target.value);
  };

  const handleSubmitForm = async (event) => {
    debugger
    event.preventDefault();

    const Postdata =
    {
      intake_type: IntakeHandle,
      category: CategoryHandle,
      asset_type: AssetsType.asset_type,
      asset_sub_type: AssetSubtype,
      asset_name: NameHandle,
      asset_quantity: QuantityHandle,
      asset_add_date: DateHandle,
      amount_per_unit: UnitsHandle,
      gst: GstHandle,
      total_amount: TotalAmountHandle,
      description: DisHandle

    }
    AddAsset(Postdata)
      .then(response => {
        toast.success(response.message);
        window.location.reload();
      })
      .catch(error => {
        console.error("Error rejecting requirement:", error);
        toast.error(error.response?.data?.message || "Failed to reject requirement");
      });
  };

  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      <div className="px-2 px-md-4">
        <h5 className="my-4">{t("Add Asset")}</h5>
        <button
          className={
            type === "assign"
              ? "btn btn-outline-success"
              : "btn btn-success"
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
          <form onSubmit={(e) => handleSubmitForm(e)} id="myform1" style={{ marginTop: "12px" }}>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Intake Time {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <select
                  name="intake_type"
                  value={IntakeHandle}
                  onChange={intakeHandle}
                  required
                  className="common-input form-select"
                >
                  <option value="">Select Intake Time</option>
                  <option value="Purchased">Purchased</option>
                  <option value="Donated">Donated</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Category {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <select name="category" onChange={categoryHandle} value={CategoryHandle} className="common-input form-select" required>
                  <option value="" >Select Category</option>
                  <option value="consumable" >Consumable</option>
                  <option value="non-consumable" >Non Consumable</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Asset Type {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <select
                  name="asset_type"
                  value={AssetsType}
                  className="common-input form-select"
                  onChange={AssetTypehandle}
                  required
                >
                  <option value="">Select Asset Type</option>
                  {/* Map assetOptions to generate option elements */}
                  {AssetsTypes.assets_name && AssetsTypes.assets_name.map((row) => (
                    <option key={row.asset_id} value={row.asset_id}>{row.asset_name}</option>
                  ))}

                </select>
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-md-4">
                <label className="form-label">Asset Sub Type {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <select
                  name="asset_sub_type"
                  value={AssetSubtype}
                  onChange={AssetSubtypehandle}
                  className="common-input form-select"
                  required
                >
                  <option value="">Select Asset Sub Type</option>

                  {AssetsSubTypes.new_asset_query && AssetsSubTypes.new_asset_query.map((row) => (
                    <option key={row.asset_sub_type_name} value={row.asset_sub_type_name}>{row.asset_sub_type_name}</option>
                  ))}
                </select>
              </div>
    
              <div className="col-md-4">
                <label className="form-label">Asset Name {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  value={NameHandle}
                  className="form-control"
                  onChange={nameHandle}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Asset Quantity {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_quantity"
                  value={QuantityHandle}
                  className="form-control"
                  onChange={quantityHandle}
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
                  value={DisHandle}
                  onChange={disHandle}
                ></textarea>
              </div>

              <div className="col-md-4">
                <label className="form-label">Asset Added Date </label>
                <input
                  type="Date"
                  name="asset_add_date"
                  value={DateHandle}
                  className="form-control"
                  onChange={dateHandle}
                  required
                />
              </div>

            </div>
            {IntakeHandle === "Purchased" && (

              <div className="row" style={{ marginTop: "12px" }}>
                <div className="col-md-4">
                  <label className="form-label">Amount Per Unit {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                  <input
                    type="text"
                    name="amount_per_unit"
                    value={UnitsHandle}
                    className="form-control"
                    onChange={unitsHandle}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">GST(%) {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                  <input
                    type="text"
                    name="gst"
                    value={GstHandle}
                    onChange={gstHandle}

                    // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Total Amount {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                  <input
                    type="text"
                    name="total_amount"
                    value={TotalAmountHandle}
                    onChange={totalAmountHandle}

                    // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                    className="form-control"

                  />
                </div>
              </div>
            )}
            <div className="row mt-5">
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
              <div className="col-md-4">
                <label className="form-label">Intake Time</label>
                <select
                  name="intake_type"
                 value={IntakeExitHandle}
                  onChange={intakeexitHandle}
                  className="common-input form-select"
                >
                  <option value="">Select Intake Time</option>
                  <option value="Purchased">Purchased</option>
                  <option value="Donated">Donated</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={ExistCategory}
                  onChange={ExistcategoryHandle}
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
                  className="common-input form-select"
                  value={ExistAssetsType}
                  onChange={ExistAssetTypehandle}
                  required
                >
                  <option value="">Select Asset Type</option>
                  {/* Map assetOptions to generate option elements */}
                  {AssetsTypes.assets_name && AssetsTypes.assets_name.map((row) => (
                    <option key={row.asset_id} value={row.asset_id}>{row.asset_name}</option>
                  ))}

                </select>
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-md-4">
                <label className="form-label">Asset Sub Type</label>
                <select
                  name="asset_sub_type"
                  value={ExistAssetsSubTypes}
                  onChange={ExistAssetSubtypehandle}
                  className="common-input form-select"
                >
                  <option value="">Select Asset Sub Type</option>

                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Asset Name</label>
                <select
                  name="asset_sub_type"
                  value={ExistNameHandle}
                  onChange={ExistnameHandle}
                  className="common-input form-select"
                >
                  <option value="">Select Asset Name</option>

                </select>
              </div>


              <div className="col-md-4">
                <label className="form-label">Description</label>
                <textarea
                  style={{ height: "100px", resize: "none" }}
                  className="form-control"
                  name="description"
                  value={ExistDisHandle}
                  onChange={ExistdisHandle}
                  required
                ></textarea>
              </div>


            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-md-4">
                <label className="form-label">Current Quantity</label>
                <input
                  type="text"
                  value={ExistCurrentQuantity}
                  name="asset_quantity"
                  onChange={ExistCurrentQuantityHandle}
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Asset Quantity</label>
                <input
                  type="text"
                  value={ExistQuantity}
                  onChange={ExistquantityHandle}
                  name="asset_quantity"
                  className="form-control"
                  required
                />
              </div>


              <div className="col-md-4">
                <label className="form-label">Donated Date </label>
                <input
                  type="Date"
                  name="asset_add_date"
                  value={ExistDonatedDate}
                  className="form-control"
                  onChange={ExistDonatedDateHandle}
                  required
                />
              </div>

            </div>
            {IntakeExitHandle === "Purchased" && (
              <div className="row" style={{ marginTop: "12px" }}>

                <div className="col-md-4">
                  <label className="form-label">Purchase Date </label>
                  <input
                    type="Date"
                    value=""
                    name="asset_add_date"
                    onChange={PurchaseDateHandle}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Amount Per Unit</label>
                  <input
                    type="text"
                    value={Amountperunit}
                    name="gst"
                    onChange={AmountperunitHandle}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">GST(%)</label>
                  <input
                    type="text"
                    value={ExistGST}
                    name="total_amount"
                    onChange={ExistGSTHandle}
                    className="form-control"
                    readOnly
                  />
                </div>
              </div>
            )}

            {IntakeExitHandle === "Purchased" && (

              <div className="row" style={{ marginTop: "12px" }}>

                <div className="col-md-4">
                  <label className="form-label">Total Amount</label>
                  <input
                    type="text"
                    value={ExistTotalAmount}
                    name="total_amount"
                    onChange={ExistTotalAmountHandle}
                    className="form-control"
                    readOnly
                  />
                </div>
              </div>
            )}

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
