import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { registerExistingUser, registerNewUser } from "../api/Users";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TopLoader from "../components/Loader/TopLoader";

const GroundInputer = () => {
  const { t } = useTranslation();
  const [photo, setPhoto] = useState(null);
  const [markRequired, setMarkRequired] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [staff, setStaff] = useState({});
  const [modalData, setModalData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const rowData = location.state;

  useEffect(() => {
    setIsLoading(false);
    // Set initial state for edited data
    if (rowData) {
      setStaff(rowData);
    }
  }, [rowData]);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setStaff((prevStaff) => ({ ...prevStaff, [name]: value }));
    // Update editedData state with the edited field
    setEditedData((prevEditedData) => ({ ...prevEditedData, [name]: value }));
  };

  const handleView = (row) => {
    navigate(`/already-exist-user`, { state: row });
  };

  const handleClose = () => {
    setShowModal(false);
    navigate(`/create-ground-data`);
  };

  const handleNewUserSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      ...staff, // Include all staff data
      ...editedData, // Include edited data
    };

    registerNewUser(data)
      .then((res) => {
        setIsLoading(false);
        if (res.status === "Successfully added new member") {
          toast.success(t(res.status));
          setTimeout(() => {
            window.location.reload(); // Reload the page after 5 seconds
          }, 3000);
          setStaff({});

        } else {
          setShowModal(true);
          setModalData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleExistingUserSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      ...staff, // Include all staff data
      ...editedData, // Include edited data
    };

    registerExistingUser(data)
      .then((res) => {
        setIsLoading(false);
        if (res.status === "Successfully added new member") {
          toast.success(t(res.status));
          setTimeout(() => {
            window.location.reload(); // Reload the page after 5 seconds
          }, 3000);
          setStaff({});

        } else {
          setShowModal(true);
          setModalData(res.data);
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
      <div className="px-2 px-md-4">
        <div className="my-4 col-12 d-flex justify-content-between align-items-center">
        <h5 className="my-4">{rowData ? t("Existing User Registration") : t("User Registration")}</h5>  
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

        <form onSubmit={rowData ? handleExistingUserSubmit : handleNewUserSubmit} id="myform" style={{ marginTop: "12px" }}>

          <div className="row">
            <div className="col-md-4">
              <label className="form-label">
                First Name{" "}
                {markRequired && <span style={{ color: "red" }}>*</span>}
              </label>
              <input
                type="text"
                name="firstName"
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
                name="lastName"
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
                name="phoneNumber"
                className="form-control"
                defaultValue={rowData ? rowData.phoneNumber : ""}
                required
              />
            </div>

            <div className="col-md-4">
            <label className="form-label">
                Email ID{" "}
                {/* {markRequired && <span style={{ color: "red" }}>*</span>} */}
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChangeInput}
                defaultValue={rowData ? rowData.email : ""}
                // required
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
              <label className="form-label">Address{""} {markRequired && <span style={{ color: "red" }}>*</span>}
</label>
              <input
                // style={{ height: "100px", resize: "none" }}
                className="form-control"
                name="address"
                onChange={handleChangeInput}
                defaultValue={rowData ? rowData.address : ""}
                required
              ></input>
            </div>

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

          </div>
          <div className="row">
  <div className="col-md-4">
    <label className="form-label">
      Purpose {markRequired && <span style={{ color: "red" }}>*</span>}
    </label>
    <select
      name="purpose"
      onChange={handleChangeInput}
      className="common-input form-select"
      required
      defaultValue={rowData ? rowData.purpose : ""}
    >
      <option value="">Select Purpose</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Other">Other</option>
    </select>
  </div>
 
</div>


         

          <div className="row mt-5 mb-5">
            <div className="col-md-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary me-2">
                {t("Save")}
              </button>
              {/* <button
                type="button"
                className="btn btn-secondary"
                onClick={() => back()}
              >
                Back
              </button> */}
            </div>
          </div>
        </form>
     
        <div>
        <Modal
 open={showModal}   
    onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: "52%",
          transform: "translate(-50%, -50%)",
          maxWidth: "90vw",
          width: "70%",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
          padding: 20,
        }}
      >
        <Typography variant="h6" gutterBottom>
          User Already Exist
        </Typography>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>

          {modalData.map((row, index) => (
          <tbody>
            <tr>
              <td>{row.firstName +" " + row.lastName}</td>
              <td>{row.phoneNumber}</td>
              <td>{row.gender}</td>
              <td>
                <Button variant="contained" type="button" onClick={()=>handleView(row)}>
                  View
                </Button>
              </td>
            </tr>
          </tbody>
          ))}
        </table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" className="btn btn-primary me-2" color="primary" onClick={handleClose}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
      </div>
      </div>
    </>
  );
};

export default GroundInputer;
