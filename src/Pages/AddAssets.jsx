import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import "sweetalert2/dist/sweetalert2.min.css";
import "../components/Table/Table.css";
import TopLoader from "../components/Loader/TopLoader";
import "react-responsive-modal/styles.css";
import { Modal, Button } from "@mui/material";
import { toast } from 'react-toastify';
import { subassets, getAssetsName, AddAsset, Assetnameinfo, AddExistingAsset, CurrentQuantity } from '../api/Users';


const AddAssets = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [type, setType] = useState("view");
  const [assetOptions, setAssetOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ExistAssetsType, setExistAssetsType] = useState([]);
  const [storeExistAssetsType, setstoreExistAssetsType] = useState([]);
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
  const getAssetsNames =  () => {
    getAssetsName().then(res => {
      if (res.status === "success") {
        console.log("Assets data:", res.data);
        setAssetsTypes(res.data);
        setExistAssetsType(res.data);
      }
    }).catch(err => {
      console.error("Error fetching assets:", err);
    });
  }
  useEffect(() => {
    getAssetsNames()
  
  }, []);
  console.log("AssetsTypes.////", AssetsTypes)
  console.log("ExistAssetsType.////", ExistAssetsType)


  const AssetTypehandle = async (e) => {
    debugger;
    const newAssetType = e.target.value;
    setAssetsType((prevRow) => ({
      ...prevRow,
      asset_type: newAssetType,
    }));
    console.log("AssetsType", AssetsType)
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
    setstoreExistAssetsType(e.target.value)
    const newAssetType = e.target.value;
    setExistAssetsType((prevRow) => ({
      ...prevRow,
      asset_type: newAssetType,
    }));
    console.log("AssetsType", ExistAssetsType)
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
  useEffect(() => {
    resetFields();
  }, [type]);

  const resetFields = () => {
    setExistAssetsType([]);
    setAssetsType([]);
    setAssetsTypes([]);
    setExistAssetsSubTypes([]);
    setAssetsSubTypes([]);
    setExistCategory([]);
    setCategoryHandle([]);
    setAssetSubtype([]);
    setIntakeHandle([]);
    setIntakeExitHandle([]);
    setNameHandle('');
    setExistNameHandle('');
    setQuantityHandle('');
    setExistQuantity('');
    setExistDonatedDate('');
    setPurchaseDate('');
    setAmountperunit('');
    setExistGST('');
    setExistTotalAmount('');
    setExistDisHandle('');
    setExistCurrentQuantity('');
    setDisHandle('');
    setDateHandle('');
    setUnitsHandle('');
    setGstHandle('');
    setTotalAmountHandle('');
    setMarkRequired(true);
  };
  
  const switchButton = (type) => {
    debugger
    if (type === 'assign') {
      setType('assign');
      
      setAssetsType('');
      getAssetsNames();
      console.log("CategoryHandle", CategoryHandle)
    } else {
      setType('view');
      getAssetsNames();
      
      setExistAssetsType('')
      setExistAssetsType('');
    }
  }

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
  const ExistnameHandle = async(e) => {
    debugger
    const ExistAssetname = e.target.value;
    setExistNameHandle((prevRow) => ({
      ...prevRow,
      asset_sub_type: ExistAssetname,
    }));

    const Assetstype = ExistAssetname

    try {
      const response = await CurrentQuantity({ asset_id: ExistAssetsType.asset_type, asset_sub_type_id: ExistAssetsSubTypes.asset_sub_type
        ,asset_name:ExistAssetname});
      if (response) {
        setExistCurrentQuantity(response.data.asset_quantity[0].asset_quantity);
      } else {
        console.error("Invalid response format for subassets:", response);
      }
    } catch (error) {
      console.error("Error fetching subassets:", error);
    }
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
  const ExistAssetSubtypehandle = async (e) => {
    debugger
    // setExistAssetsSubTypes(e.target.value);
    const ExistAssetType = e.target.value;
    setExistAssetsSubTypes((prevRow) => ({
      ...prevRow,
      asset_sub_type: ExistAssetType,
    }));
    const Assetstype = storeExistAssetsType

    try {
      const response = await Assetnameinfo({ asset_id: Assetstype, asset_sub_type_id: ExistAssetType });
      if (response) {
        setExistNameHandle(response.data);
      } else {
        console.error("Invalid response format for subassets:", response);
      }
    } catch (error) {
      console.error("Error fetching subassets:", error);
    }
  };
 
const clearAssetsFields = () => {
    window.location.reload();
}
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
  const handleSubmitExistingassetForm = async (event) => {
    debugger
    event.preventDefault();

    const Postdata =
    {
      asset_sub_type_id: ExistAssetsSubTypes.asset_sub_type,
      asset_id: ExistAssetsType.asset_type,
      asset_quantity: ExistQuantity,
      amount_per_unit: Amountperunit,
      gst: ExistGST,
      total_amount: ExistTotalAmount,
      donated_updated_date: ExistDonatedDate,
      purchase_update_date: PurchaseDate,


    }
    AddExistingAsset(Postdata)
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
        <h5 className="my-4">{t("Add Inventory Data")}</h5>
        <button
          className={
            type === "assign"
              ? "btn btn-outline-success"
              : "btn btn-success"
          }
          style={{ fontSize: "14px" }}
          onClick={(e) => switchButton("view")}
        >
          {t("New Inventory")}{" "}
        </button>
        <span className="mx-2 d-inline-block"></span>
        <button
          className={
            type === "view" ? "btn btn-outline-success" : "btn btn-success"
          }
          style={{ fontSize: "14px" }}
          onClick={(e) => switchButton("assign")}
        >
          {t("Add Existing Inventory")}{" "}
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
                  // value={AssetsType}
                  className="common-input form-select"
                  onChange={AssetTypehandle}
                  required
                >
                  <option value="">Select Asset Type</option>
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
                  // value={AssetSubtype}
                  onChange={AssetSubtypehandle}
                  className="common-input form-select"
                  required
                >
                  <option value="">Select Asset Sub Type</option>

                  {AssetsSubTypes.new_asset_query && AssetsSubTypes.new_asset_query.map((row) => (
                    <option key={row.id} value={row.id}>{row.asset_sub_type_name}</option>
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

              {IntakeHandle === "Donated" && (
                <div className="col-md-4">
                  <label className="form-label">Donated Date {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                  <input
                    type="Date"
                    name="asset_add_date"
                    value={ExistDonatedDate}
                    className="form-control"
                    onChange={ExistDonatedDateHandle}
                    required
                  />
                </div>
              )}

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
                <button type="button" className="btn btn-secondary" onClick={clearAssetsFields}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form id="myform2" onSubmit={(e) => handleSubmitExistingassetForm(e)} style={{ marginTop: "12px" }}>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Intake Time {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
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
                <label className="form-label">Category {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
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
                <label className="form-label">Asset Type {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <select
                  name="asset_type"
                  className="common-input form-select"
                  onChange={ExistAssetTypehandle}
                  required
                >
                  <option value="">Select Asset Type</option>
                  {ExistAssetsType.assets_name && ExistAssetsType.assets_name.map((row) => (
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
                  // value={ExistAssetsSubTypes}
                  onChange={ExistAssetSubtypehandle}
                  className="common-input form-select"
                >
                  <option value="">Select Asset Sub Type</option>
                  {ExistAssetsSubTypes.new_asset_query && ExistAssetsSubTypes.new_asset_query.map((row) => (
                    <option key={row.id} value={row.id}>{row.asset_sub_type_name}</option>
                  ))}

                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Asset Name {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <select
                  name="asset_sub_type"
                  // value={ExistNameHandle}
                  onChange={ExistnameHandle}
                  className="common-input form-select"
                >
                  <option value="">Select Asset Name</option>
                  {ExistNameHandle.asset_name && ExistNameHandle.asset_name.map((row) => (
                    <option key={row.asset_name} value={row.asset_name}>{row.asset_name}</option>
                  ))}

                </select>
              </div>


              <div className="col-md-4">
                <label className="form-label">Description </label>
                <textarea
                  style={{ height: "100px", resize: "none" }}
                  className="form-control"
                  name="description"
                  value={ExistDisHandle}
                  onChange={ExistdisHandle}
                ></textarea>
              </div>


            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-md-4">
                <label className="form-label">Current Quantity {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  value={ExistCurrentQuantity}
                  name="asset_quantity"
                  onChange={ExistCurrentQuantityHandle}
                  className="form-control"
                  required
                  readOnly
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Asset Quantity {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  value={ExistQuantity}
                  onChange={ExistquantityHandle}
                  name="asset_quantity"
                  className="form-control"
                  required
                />
              </div>

              {IntakeExitHandle === "Donated" && (
                <div className="col-md-4">
                  <label className="form-label">Donated Date {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                  <input
                    type="Date"
                    name="asset_add_date"
                    value={ExistDonatedDate}
                    className="form-control"
                    onChange={ExistDonatedDateHandle}
                    required
                  />
                </div>
              )}
            </div>
            {IntakeExitHandle === "Purchased" && (
              <div className="row" style={{ marginTop: "12px" }}>

                <div className="col-md-4">
                  <label className="form-label">Purchase Date {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                  <input
                    type="Date"
                    name="asset_add_date"
                    onChange={PurchaseDateHandle}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Amount Per Unit {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
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
                  <label className="form-label">GST(%) {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                  <input
                    type="text"
                    value={ExistGST}
                    name="total_amount"
                    onChange={ExistGSTHandle}
                    className="form-control"
                  />
                </div>
              </div>
            )}

            {IntakeExitHandle === "Purchased" && (

              <div className="row" style={{ marginTop: "12px" }}>

                <div className="col-md-4">
                  <label className="form-label">Total Amount {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                  <input
                    type="text"
                    value={ExistTotalAmount}
                    name="total_amount"
                    onChange={ExistTotalAmountHandle}
                    className="form-control"
                  />
                </div>
              </div>
            )}

            <div className="row mt-3">
              <div className="col-md-12">
                <button type="submit" className="btn btn-primary me-2">
                  Submit
                </button>
                <button type="button" className="btn btn-secondary" onClick={clearAssetsFields}>
                  Cancel
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
