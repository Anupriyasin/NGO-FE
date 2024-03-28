import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import "sweetalert2/dist/sweetalert2.min.css";
import "../components/Table/Table.css";
import TopLoader from "../components/Loader/TopLoader";
import "react-responsive-modal/styles.css";
import { Modal, Button } from "@mui/material";
import { toast } from "react-toastify";
import {
  subassets,
  getAssetsName,
  AddAsset,
  Assetnameinfo,
  addStudent,
} from "../api/Users";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";

const AddStudent = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const rowData = location.state;
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    email: "",
    phone_number: 0,
    address: "",
    nationality: "",
    registration_number: 0,
    guardian_ph_no: 0,
    emergency_contact: 0,
  });

  useEffect(() => {
    setIsLoading(false);
  }, []);
console.log("rowData//////",rowData)
  const handleChangeInput = async (e) => {
    const { name, value } = e.target;
    setStudent((prevAdmin) => ({ ...prevAdmin, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      first_name: student.first_name,
      last_name: student.last_name,
      date_of_birth: student.date_of_birth,
      gender: student.gender,
      email: student.email,
      phone_number: student.phone_number,
      address: student.address,
      nationality: student.nationality,
      registration_number: student.registration_number,
      guardian_ph_no: student.guardian_ph_no,
      emergency_contact: student.emergency_contact,
    };

    console.log(data);

    addStudent(data)
      .then((res) => {
        if (res.status === "success") {
          setIsLoading(false);
          setLoading(100);
          toast.success(t(res.message));
        } else {
          toast.error(t(res.message));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let navigate = useNavigate();
  const back = () => {
    navigate(`/student-details`);
  };

  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      <div className="px-2 px-md-4">
        <div className="my-4 col-12 d-flex justify-content-between align-items-center">
          <h5 className="">{t("Add Student Details")}</h5>

          <AccountCircleIcon
            style={{
              width: 100,
              height: 100,
              marginRight: 4,
              background: "#fff",
              color: "whitesmoke",
            }}
          />
        </div>

        <form
          onSubmit={(e) => onSubmit(e)}
          id="myform"
          style={{ marginTop: "12px" }}
        >
          <div className="row">
    <div className="col-md-4">
        <label className="form-label">
            First Name {<span style={{ color: "red" }}>*</span>}
        </label>
        <input
            type="text"
            name="first_name"
            className="form-control"
            onChange={handleChangeInput}
            defaultValue={rowData ? rowData.first_name : ""}
            required
        />
    </div>
    <div className="col-md-4">
        <label className="form-label">
            Last Name {<span style={{ color: "red" }}>*</span>}
        </label>
        <input
            type="text"
            name="last_name"
            className="form-control"
            onChange={handleChangeInput}
            defaultValue={rowData ? rowData.last_name : ""}
            required
        />
    </div>
    <div className="col-md-4">
        <label className="form-label">
            Photo {<span style={{ color: "red" }}>*</span>}
        </label>
        <input
            type="file"
            name="photo_file"
            accept="image/*"
            className="form-control"
            onChange={handleChangeInput}
            // required
        />
    </div>
</div>

<div className="row" style={{ marginTop: "12px" }}>
    <div className="col-md-4">
        <label className="form-label">
            Date of Birth {<span style={{ color: "red" }}>*</span>}
        </label>
        <input
            type="date"
            name="date_of_birth"
            className="form-control"
            onChange={handleChangeInput}
            defaultValue={rowData ? rowData.date_of_birth : ""}
            required
        />
    </div>
    <div className="col-md-4">
        <label className="form-label">
            Nationality {<span style={{ color: "red" }}>*</span>}
        </label>
        <input
            type="text"
            name="nationality"
            className="form-control"
            onChange={handleChangeInput}
            defaultValue={rowData ? rowData.nationality : ""}
            required
        />
    </div>
    <div className="col-md-4">
        <label className="form-label">
            Gender {<span style={{ color: "red" }}>*</span>}
        </label>
        <select
            name="gender"
            onChange={handleChangeInput}
            className="common-input form-select"
            required
            value={rowData ? rowData.gender : ""}
        >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
    </div>
</div>

<div className="row" style={{ marginTop: "12px" }}>
    <div className="col-md-4">
        <label className="form-label">
            Address {<span style={{ color: "red" }}>*</span>}
        </label>
        <input
            type="text"
            name="address"
            className="form-control"
            onChange={handleChangeInput}
            defaultValue={rowData ? rowData.address : ""}
            required
        />
    </div>
    <div className="col-md-4">
        <label className="form-label">
            Email ID {<span style={{ color: "red" }}>*</span>}
        </label>
        <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChangeInput}
            defaultValue={rowData ? rowData.email : ""}
            required
        />
    </div>
    <div className="col-md-4">
        <label className="form-label">
            ID/Registration Number {<span style={{ color: "red" }}>*</span>}
        </label>
        <input
            type="text"
            name="registration_number"
            className="form-control"
            onChange={handleChangeInput}
            defaultValue={rowData ? rowData.registration_number : ""}
            required
        />
    </div>
</div>

<div className="row" style={{ marginTop: "12px" }}>
    <div className="col-md-4">
        <label className="form-label">
            Emergency Contact {<span style={{ color: "red" }}>*</span>}
        </label>
        <input
            type="text"
            name="emergency_contact"
            className="form-control"
            onChange={handleChangeInput}
            defaultValue={rowData ? rowData.emergency_contact : ""}
            required
        />
    </div>
    <div className="col-md-4">
        <label className="form-label">
            Parent/Guardian Phone Number{" "}
            {<span style={{ color: "red" }}>*</span>}
        </label>
        <input
            type="text"
            name="guardian_ph_no"
            className="form-control"
            onChange={handleChangeInput}
            defaultValue={rowData ? rowData.guardian_ph_no : ""}
            required
        />
    </div>
    <div className="col-md-4">
        <label className="form-label">
            Phone Number {<span style={{ color: "red" }}>*</span>}
        </label>
        <input
            onChange={handleChangeInput}
            type="text"
            pattern="[0-9]*"
            name="phone_number"
            className="form-control"
            defaultValue={rowData ? rowData.phone_number : ""}
            required
            maxLength={10}
        />
    </div>
</div>


          <div className="row mt-5">
            <div className="col-md-9"></div>
            <div className="col-md-3">
              <button type="submit" className="btn btn-primary me-2">
                Save & Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => back()}
              >
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
