import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import "sweetalert2/dist/sweetalert2.min.css";
import "../components/Table/Table.css";
import TopLoader from "../components/Loader/TopLoader";
import "react-responsive-modal/styles.css";
import { Modal, Button } from "@mui/material";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { subassets, getAssetsName, AddAsset } from '../api/Users';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const AddStaff = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [type, setType] = useState("view");
  const [assetOptions, setAssetOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [AssetsType, setAssetsType] = useState([]);
  const [AssetsTypes, setAssetsTypes] = useState([]);
  const [AssetsSubTypes, setAssetsSubTypes] = useState([]);
  const [CategoryHandle, setCategoryHandle] = useState([]);
  const [AssetSubtype, setAssetSubtype] = useState([]);
  const [IntakeHandle, setIntakeHandle] = useState([]);
  const [IntakeExitHandle, setIntakeExitHandle] = useState([]);
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
      }
    }).catch(err => {
      console.error("Error fetching assets:", err);
    });
  }, []);
  console.log("AssetsTypes.////", AssetsTypes)

 

  const [photo, setPhoto] = useState(null);
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };
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

  let navigate = useNavigate();
  const back = () => {
      navigate(`/staffdetails`);
  }

  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      <div className="px-2 px-md-4">
        <div className="my-4 col-12 d-flex justify-content-between align-items-center">
        <h5 className="my-4">{t("Add Staff")}</h5>
            {photo ? (
              <img src={URL.createObjectURL(photo)} alt="Uploaded Photo" width={100} height={100} className="mr-4"/>
            ) : (
              <AccountCircleIcon style={{ width: 100, height: 100, marginRight: 4 ,background: "#fff" ,color:"whitesmoke"}} />
            )}
        </div>


          <form onSubmit={(e) => handleSubmitForm(e)} id="myform1" style={{ marginTop: "12px" }}>

            <div className="row">
              <div className="col-md-4">
                <label className="form-label">First Name {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  onChange={nameHandle}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Last Name {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  onChange={nameHandle}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Photo {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  accept="image/*"
                  onChange={handlePhotoChange}
                   required
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-4">
                <label className="form-label">Date of Birth {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  onChange={nameHandle}
                  required
                />
              </div>
    
              <div className="col-md-4">
                <label className="form-label">Nationality {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  onChange={nameHandle}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Gender {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_quantity"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  onChange={quantityHandle}
                  required
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-md-4">
                <label className="form-label">Address</label>
                <textarea
                  style={{ height: "100px", resize: "none" }}
                  className="form-control"
                  name="description"
                  onChange={disHandle}
                ></textarea>
              </div>

              <div className="col-md-4">
                <label className="form-label">Email ID {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  onChange={nameHandle}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Phone Number {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  onChange={nameHandle}
                  required
                />
              </div>

            </div>
        
              <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-md-4">
                <label className="form-label">Staff ID/ Employee Number {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  onChange={nameHandle}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Job Title/ Position{markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  onChange={nameHandle}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Employment Status {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  onChange={nameHandle}
                  required
                />
              </div>
              </div>

              <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-4">
                <label className="form-label">Date of Employment{markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                  className="form-control"
                  onChange={nameHandle}
                  required
                />
              </div>
              </div>
        
            <div className="row mt-5">
              <div className="col-md-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                  Submit
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => back()}>
                  Back
                </button>
              </div>
            </div>
          </form>
       
      </div>
    </>
  );
};

export default AddStaff;
