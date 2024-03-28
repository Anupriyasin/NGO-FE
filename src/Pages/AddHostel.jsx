import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import "sweetalert2/dist/sweetalert2.min.css";
import "../components/Table/Table.css";
import TopLoader from "../components/Loader/TopLoader";
import "react-responsive-modal/styles.css";
import { useNavigate } from "react-router";



const AddHostel = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [markRequired, setMarkRequired] = useState(true);

    let navigate = useNavigate();
    const back = () => {
        navigate(`/hosteldetails`);
    };

    return (
        <>
            <TopLoader loading={isLoading ? "50" : "100"} />
            <div className="px-2 px-md-4">
                <h5 className="my-4">{t("Add Hostel")}</h5>
                <form id="myform1" style={{ marginTop: "12px" }}>
                    <div className="row">
                        <div className="col-md-4">
                            <label className="form-label">Hostel Name {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
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
                                type="text"
                                name="asset_name"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">New Password {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input
                                type="text"
                                name="asset_name"
                                className="form-control"
                                required
                            />
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "12px" }}>
                        <div className="col-md-4">
                            <label className="form-label">Confirm Password {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input
                                type="text"
                                name="asset_name"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="address1" className="form-label">{t('Address Line')} {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input type="text" name="address1" className="form-control" required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Registration No. {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input
                                type="text"
                                name="asset_name"
                                className="form-control"
                                required
                            />
                        </div>
                      

                    </div>
                    <div className="row mt-3">
                  
                        <div className="col-md-4">
                            <label className="form-label">Distric {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input
                                type="text"
                                name="asset_name"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Block {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input
                                type="text"
                                name="asset_name"
                                className="form-control"
                                required
                            />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-12 d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary me-2">
                                Submit
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

export default AddHostel;
