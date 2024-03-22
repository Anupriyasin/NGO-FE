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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";



const AddStudent = () => {
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
  const [photo, setPhoto] = useState(null);
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

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };
  let navigate = useNavigate();
  const back = () => {
      navigate(`/student-details`);
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



  const categoryHandle = (event) => {
    setCategoryHandle(event.target.value);
  };
  const nameHandle = (event) => {
    setNameHandle(event.target.value);
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
      <div className="my-4 col-12 d-flex justify-content-between align-items-center">
          <h5 className="">{t("Add Student Details")}</h5>
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
                  name="First_name"
                  className="form-control" onChange={nameHandle}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Last Name {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control" 
                //   onChange={nameHandle}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Photo {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="file"
                  name="photo_file"
                  accept="image/*"
                  className="form-control"
                  onChange={handlePhotoChange} 
                  required
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              
    
              <div className="col-md-4">
                <label className="form-label">Date of Birth {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="date"
                  name="asset_name"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Nationality {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_quantity"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Gender {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <select name="createassets"  value={CategoryHandle}  onChange={categoryHandle} className="common-input form-select" required>
                            <option value="">Select Gender</option>
                            <option value="male" >Male</option>
                                <option value="female">Female</option>
                            </select>
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              
    
              <div className="col-md-4">
                <label className="form-label">Address {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Email ID {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="email"
                  name="asset_quantity"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">ID/Registration Number {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_quantity"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              
    
              <div className="col-md-4">
                <label className="form-label">Emergency Contact {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_name"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Parent/Guardian Phone Number {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_quantity"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Phone Number {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                <input
                  type="text"
                  name="asset_quantity"
                  className="form-control"
                  required
                />
              </div>
            </div>
           
          
            <div className="row mt-5">
              <div className="col-md-9"></div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-primary me-2">
                  Save & Update
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

export default AddStudent;
