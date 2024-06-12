import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import "sweetalert2/dist/sweetalert2.min.css";
import "../components/Table/Table.css";
import TopLoader from "../components/Loader/TopLoader";
import "react-responsive-modal/styles.css";
import { Modal, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterEmp, addStaff, getAssetsName } from "../api/Users";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Video from '../components/omjaapVideo.mp4';
// import "../styles/BackgroundVideo.css"; // Import the CSS file for background video

const Inputer = () => {
  const { t } = useTranslation();

  const [CategoryHandle, setCategoryHandle] = useState([]);
  const [markRequired, setMarkRequired] = useState(true);
  const [photo, setPhoto] = useState(null);
  
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [staff, setStaff] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    email: "",
    phone_number: 0,
    address: "",
    job_title: "",
    department: "",
    hire_date: "",
    salary: 0,
    staff_id: 0,
    employment_status: "",
    nationality: "",
  });

  const location = useLocation();
  const rowData = location.state;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (rowData) {
      setStaff((prevStaff) => ({
        ...prevStaff,
        ...rowData,
      }));
    }
  }, [rowData]);

  const handleChangeInput = async (e) => {
    const { name, value } = e.target;
    setStaff((prevAdmin) => ({ ...prevAdmin, [name]: value }));
    if (name === 'dob') {
      const selectedDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();
      if (age < 18) {
        toast.error('User must be at least 18 years old.');
        setStaff((prevAdmin) => ({ ...prevAdmin, [name]: "" }));
        e.target.value = "";
        return;
      }
    }
    setStaff((prevAdmin) => ({ ...prevAdmin, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      firstName: staff.first_name,
      lastName: staff.last_name,
      phoneNumber: staff.phone_number,
      email: staff.email,
      gender: staff.gender,
      dob: staff.dob,
      address: staff.address,
      pincode: staff.pincode,
      role: staff.role,
      password: staff.password, 
    };

    RegisterEmp(data)
      .then((res) => {
        if (res === "Registration successfully completed") {
          setLoading(100);
          toast.success(t(res));
          setTimeout(() => {
            window.location.reload(); 
          }, 3000);
        } else {
          toast.error(t(res));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();

  const updateHandle = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      firstName: staff.first_name,
      lastName: staff.last_name,
      phoneNumber: staff.phone_number,
      email: staff.email,
      gender: staff.gender,
      dob: staff.date_of_birth,
      address: staff.address,
      pincode: staff.pincode,
      role: staff.role,
      password: "12345678",
    };

    addStaff(data)
      .then((res) => {
        if (res.status === "success") {
          setIsLoading(false);
          toast.success(t(res.message));
          navigate(`/staffdetails`);
        } else {
          toast.error(t(res.message));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      <div className="video-background">
        <video className="video-tag" src={Video} autoPlay loop  />
      </div>
      <div className="form-container">
        <div className="px-2 px-md-4">
          <div className="my-4 col-12 d-flex justify-content-between align-items-center">
            <h5 className="my-4">{rowData ? t("Edit Employee Details") : t("Employee Register")}</h5>
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="Uploaded Photo"
                width={100}
                height={100}
                className="mr-4"
              />
            ) : (
              <AccountCircleIcon
                style={{
                  width: 100,
                  height: 100,
                  marginRight: 4,
                  background: "#fff",
                  color: "whitesmoke",
                }}
              />
            )}
          </div>

          <form onSubmit={(e) => onSubmit(e)} id="myform" style={{ marginTop: "12px" }}>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">
                  First Name{" "}
                  {markRequired && <span style={{ color: "red" }}>*</span>}
                </label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  defaultValue={rowData ? rowData.firstName : ""}
                  onChange={handleChangeInput}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Last Name{" "}
                  {markRequired && <span style={{ color: "red" }}>*</span>}
                </label>
                <input
                  type="text"
                  name="last_name"
                  defaultValue={rowData ? rowData.lastName : ""}
                  className="form-control"
                  onChange={handleChangeInput}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Photo {markRequired && <span style={{ color: "red" }}>*</span>}
                </label>
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
                <label className="form-label">
                  Phone Number{" "}
                  {markRequired && <span style={{ color: "red" }}>*</span>}
                </label>
                <input
                  onChange={handleChangeInput}
                  type="text"
                  pattern="[0-9]*"
                  maxLength={10}
                  minLength={10}
                  name="phone_number"
                  className="form-control"
                  defaultValue={rowData ? rowData.phoneNumber : ""}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Email ID{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={handleChangeInput}
                  defaultValue={rowData ? rowData.email : ""}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Gender {markRequired && <span style={{ color: "red" }}>*</span>}
                </label>
                <select
                  name="gender"
                  onChange={handleChangeInput}
                  className="common-input form-select"
                  required
                  defaultValue={rowData ? rowData.gender : ""}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-md-4">
                <label className="form-label">Address{" "}{markRequired && <span style={{ color: "red" }}>*</span>}</label>
                <input
                  className="form-control"
                  name="address"
                  onChange={handleChangeInput}
                  defaultValue={rowData ? rowData.address : ""}
                  required
                ></input>
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  State {markRequired && <span style={{ color: "red" }}>*</span>}
                </label>
                <select
                  name="state"
                  onChange={handleChangeInput}
                  className="common-input form-select"
                  required
                  defaultValue={rowData ? rowData.state : ""}
                >
                  <option value="">Select State</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  City {markRequired && <span style={{ color: "red" }}>*</span>}
                </label>
                <select
                  name="city"
                  onChange={handleChangeInput}
                  className="common-input form-select"
                  required
                  defaultValue={rowData ? rowData.city : ""}
                >
                  <option value="">Select City</option>
                </select>
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-md-4">
                <label className="form-label">
                  Pincode{" "}
                  {markRequired && <span style={{ color: "red" }}>*</span>}
                </label>
                <input
                  type="text"
                  name="pincode"
                  className="form-control"
                  onChange={handleChangeInput}
                  defaultValue={rowData ? rowData.pincode : ""}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Date of Birth {markRequired && <span style={{ color: "red" }}>*</span>}
                </label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  onChange={handleChangeInput}
                  defaultValue={rowData ? rowData.dob.split("T")[0] : ""}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Role {markRequired && <span style={{ color: "red" }}>*</span>}
                </label>
                <select
                  name="role"
                  onChange={handleChangeInput}
                  className="common-input form-select"
                  required
                  defaultValue={rowData ? rowData.role : ""}
                >
                  <option value="">Select Role</option>
                  <option value="3">Staff</option>
                  <option value="4">Ground</option>
                </select>
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-md-4">
                <label className="form-label">
                  Password{" "}
                  {markRequired && <span style={{ color: "red" }}>*</span>}
                </label>
                <input
                  type="text"
                  name="password"
                  className="form-control"
                  onChange={handleChangeInput}
                  defaultValue={rowData ? rowData.password : ""}
                  required
                />
              </div>
            </div>

            <div className="row mt-5 mb-5">
              <div className="col-md-12 d-flex justify-content-end">
                {!rowData ? (
                  <button type="submit" className="btn btn-primary me-2">
                    {t("Save")}
                  </button>
                ) : (
                  <>
                    <button type="button" className="btn btn-primary me-2" onClick={(e) => updateHandle(e)}>
                      {t("Update")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => navigate(`/employee-data`)}
                    >
                      {t("Back")}
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Inputer;
