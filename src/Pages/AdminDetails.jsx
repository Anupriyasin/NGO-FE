import React, { useState, useEffect } from "react";
import user from "../images/userIcon.png";
import "../components/Table/Table.css";
import "../components/Card/Card.css";
import "../Pages/Dashboard.css";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { getPincode, getUserDetails, updateUserDetails } from "../api/Users";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { UilArrowLeft } from "@iconscout/react-unicons";
import { baseUrl } from "../api/constant";
import "../Pages/Dashboard.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TopLoader from "../components/Loader/TopLoader";
import { getpincode } from "../api/Random";

const AdminDetails = ({ role }) => {
  const { id } = useParams();

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const { t } = useTranslation();
  const handleClick = (e) => {
    i18next.changeLanguage(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pinErr, setPinErr] = useState(false);
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    img_path: "",
    role_id: 0,
    name: "",
    address: "",
    email: "",
    primary_contact: 0,
    secondary_contact: 0,
    pin_no: 0,
  });

  const {
    email,
    img_path,
    address,
    name,
    pin_no,
    primary_contact,
    secondary_contact,
    role_id,
  } = admin;

  useEffect(() => {
    setIsLoading(false);
    getAdminDetails();
  }, []);

  const handleChangeInput = async (e) => {
    const { name, value } = e.target;

    if (name === "pin_no") {
      try {
        console.log(value);
        const response = await getPincode(value);
        console.log("API Response:", response);

        if (response[0].Status === "Success") {
          setAdmin((prevAdmin) => ({ ...prevAdmin, pin_no: value }));
          setPinErr(false);
        } else {
          setPinErr(true);
        }
      } catch (error) {
        console.log("API Error:", error);
        toast.error("Error fetching pincode data. Please try again later.");
      }
    } else {
      setAdmin((prevAdmin) => ({ ...prevAdmin, [name]: value }));
    }
  };

  const onSubmit = () => {
    setIsLoading(true);
    console.log("User ID:", admin.name);

    const data = {
      user_id: "",
      role_id: "",
      first_name: admin.name,
      last_name: "",
      phone_number: admin.primary_contact,
      secondary_p_no: admin.secondary_contact,
      pin_no: admin.pin_no,
      address: admin.address,
      email: admin.email,
    };

    updateUserDetails(data)
      .then((res) => {
        if (res.status === "success") {
          setIsLoading(false);
          setLoading(100);
          toast.success(t(res.message));
          getAdminDetails();
        } else {
          toast.error(t(res.message));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAdminDetails = () => {
    setIsLoading(true);
    getUserDetails()
      .then((res) => {
        if (res.status === "success") {
          setIsLoading(false);
          setLoading(100);
          setAdmin({
            img_path: "",
            role_id: res.data.role_id,
            name: res.data.name,
            address: res.data.address,
            email: res.data.email,
            primary_contact: res.data.mobile_no,
            secondary_contact: res.data.secondary_ph_no,
            pin_no: res.data.pin_no,
          });
        } else {
          toast.error(t(res.message));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      {admin && admin.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      ) : (
        <div className="px-0 px-md-3">
          <p className="my-3"></p>
          <div className="d-flex justify-content-start align-items-center">
            <button className="btn btn-white" onClick={() => navigate(-1)}>
              <UilArrowLeft size="32" />
            </button>
            <h3 className="m-0">{admin.name}</h3>
          </div>
          <p className="my-3"></p>
          <>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center justify-content-around">
                      <div className="col-10">
                        <div className="px-0 px-md-3">
                          <div className="card">
                            <div className="card-body">
                              <form
                                onSubmit={handleSubmit(onSubmit)}
                                id="myform"
                              >
                                <div className="row p-md-4 d-flex justify-content-around align-items-center">
                                  <div className="col-md-3 d-flex justify-content-center pe-0">
                                    <div
                                      className="userImage d-flex justify-content-center align-items-center"
                                      style={{
                                        backgroundImage: `url(${
                                          img_path ? baseUrl() + img_path : user
                                        })`,
                                      }}
                                    ></div>
                                  </div>
                                  <div className="col-md-4 mb-3">
                                    <label
                                      htmlFor="role_id"
                                      className="form-label"
                                    >
                                      {t("Role")}{" "}
                                    </label>
                                    <input
                                      onChange={handleChangeInput}
                                      type="text"
                                      name="role_id"
                                      className="form-control"
                                      required
                                      value={
                                        role_id === 1 ? "Headquarter" : "Hostel"
                                      }
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-4 mb-3">
                                    <label
                                      htmlFor="name"
                                      className="form-label"
                                    >
                                      {t("Name")}{" "}
                                    </label>
                                    <input
                                      onChange={handleChangeInput}
                                      type="text"
                                      name="name"
                                      className="form-control"
                                      required
                                      defaultValue={name || ""}
                                    />
                                    {/* <span className="error-text">
                                                                                {firstNameError && <>{firstNameError}</>}
                                                                            </span> */}
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-4 mb-3">
                                    <label
                                      htmlFor="primary_contact"
                                      className="form-label"
                                    >
                                      {t("Phone number")}{" "}
                                    </label>
                                    <input
                                      onChange={handleChangeInput}
                                      type="text" // Change type to text
                                      pattern="[0-9]*" // Use pattern to restrict input to numbers only
                                      name="primary_contact"
                                      className="form-control"
                                      required
                                      minLength={10}
                                      maxLength={10}
                                      value={primary_contact || ""}
                                    />
                                  </div>
                                  <div className="col-md-4 mb-3">
                                    <label
                                      htmlFor="secondary_contact"
                                      className="form-label"
                                    >
                                      {t("Secondary Phone number")}{" "}
                                    </label>
                                    <input
                                      onChange={handleChangeInput}
                                      type="text" // Change type to text
                                      pattern="[0-9]*" // Use pattern to restrict input to numbers only
                                      name="secondary_contact"
                                      className="form-control"
                                      required
                                      minLength={10}
                                      maxLength={10}
                                      value={secondary_contact || ""}
                                    />
                                  </div>

                                  <div className="col-md-4 mb-3">
                                    <label
                                      htmlFor="email"
                                      className="form-label"
                                    >
                                      {t("Email")}{" "}
                                    </label>
                                    <input
                                      onChange={handleChangeInput}
                                      type="email"
                                      name="email"
                                      className="form-control"
                                      required
                                      defaultValue={email || ""}
                                    />
                                    {/* <span className="error-text">
                                                                                {firstNameError && <>{firstNameError}</>}
                                                                            </span> */}
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-4 mb-3">
                                    <label
                                      htmlFor="pin_no"
                                      className="form-label"
                                    >
                                      {t("Pin no.")}{" "}
                                      {pinErr === false ? (
                                        ""
                                      ) : (
                                        <span className="text-danger fw-bold fs-6">
                                          Please enter a valid Pincode!
                                        </span>
                                      )}
                                    </label>
                                    <input
                                      onChange={handleChangeInput}
                                      type="number"
                                      name="pin_no"
                                      className="form-control"
                                      required
                                      defaultValue={pin_no || ""}
                                    />
                                  </div>
                                  <div className="col-md-4 mb-3">
                                    <label
                                      htmlFor="address"
                                      className="form-label"
                                    >
                                      {t("Address")}{" "}
                                    </label>
                                    <input
                                      onChange={handleChangeInput}
                                      type="text"
                                      name="address"
                                      className="form-control"
                                      required
                                      defaultValue={address || ""}
                                    />
                                  </div>
                                </div>
                                <div className="row d-flex justify-content-end mt-4">
                                  <div className="col-md-3 mb-3">
                                    <button
                                      type="submit"
                                      style={{
                                        backgroundColor: "#102a83",
                                        color: "white",
                                      }}
                                      className="btn form-control px-1"
                                    >
                                      {t("Update")}
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default AdminDetails;
