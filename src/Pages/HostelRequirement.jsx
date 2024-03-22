import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import "sweetalert2/dist/sweetalert2.min.css";
import "../components/Table/Table.css";
import TopLoader from "../components/Loader/TopLoader";
import "react-responsive-modal/styles.css";
import { Modal, Button } from "@mui/material";
import { toast } from 'react-toastify';
import { subassets, getAssetsName, AddAsset, Assetnameinfo } from '../api/Users';


const HostelRequirement = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [type, setType] = useState("view");

  const [ExistAssetsType, setExistAssetsType] = useState([]);
  const [AssetsType, setAssetsType] = useState([]);
  const [AssetsTypes, setAssetsTypes] = useState([]);
  const [AssetsSubTypes, setAssetsSubTypes] = useState([]);
  const [CategoryHandle, setCategoryHandle] = useState([]);
  const [AssetSubtype, setAssetSubtype] = useState([]);
  const [IntakeHandle, setIntakeHandle] = useState([]);
  const [NameHandle, setNameHandle] = useState('');
  const [QuantityHandle, setQuantityHandle] = useState('');
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
        setExistAssetsType(res.data);
      }
    }).catch(err => {
      console.error("Error fetching assets:", err);
    });
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



  const categoryHandle = (event) => {
    setCategoryHandle(event.target.value);
  };
  const nameHandle = (event) => {
    setNameHandle(event.target.value);
  };
  const quantityHandle = (event) => {
    setQuantityHandle(event.target.value);
  };
 
  const disHandle = (event) => {
    setDisHandle(event.target.value);
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
        <h5 className="my-4">{t("Add Requirement")}</h5>
       

          <form onSubmit={(e) => handleSubmitForm(e)} id="myform1" style={{ marginTop: "12px" }}>
            <div className="row">
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
                  {/* Map assetOptions to generate option elements */}
                  {AssetsTypes.assets_name && AssetsTypes.assets_name.map((row) => (
                    <option key={row.asset_id} value={row.asset_id}>{row.asset_name}</option>
                  ))}

                </select>
              </div>
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
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              
    
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
            </div>
           
          
            <div className="row mt-5">
              <div className="col-md-10"></div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary me-2">
                  Save
                </button>
                <button type="button" className="btn btn-secondary">
                  Back
                </button>
              </div>
            </div>
          </form>
      </div>
    </>
  );
};

export default HostelRequirement;
