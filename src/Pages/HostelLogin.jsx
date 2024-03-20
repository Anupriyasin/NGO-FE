import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import "sweetalert2/dist/sweetalert2.min.css";
import "../components/Table/Table.css";
import TopLoader from "../components/Loader/TopLoader";
import "react-responsive-modal/styles.css";
import { Modal, Button } from "@mui/material";


const HostelLogin = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [type, setType] = useState("view");
    const [assetOptions, setAssetOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [AssetsTypes, setAssetsTypes] = useState([]);
    const [AssetsSubTypes, setAssetsSubTypes] = useState([]);


 




    // const switchButton = (type) => {
    //     if (type === "assign") {
    //         setType("assign");
    //     } else {
    //         setType("view");
    //     }
    // };

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



    return (
        <>
            <TopLoader loading={isLoading ? "50" : "100"} />
            <div className="px-2 px-md-4">
                <h5 className="my-4">{t("Create Hostel Login")}</h5>
                <form id="myform1" style={{ marginTop: "12px" }}>
                    <div className="row">
                        <div className="col-md-4">
                            <label className="form-label">Hostel Name</label>
                            <input
                                type="text"
                                value=""
                                name="asset_name"
                                // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Email ID</label>
                            <input
                                type="text"
                                value=""
                                name="asset_name"
                                // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">New Password</label>
                            <input
                                type="text"
                                value=""
                                name="asset_name"
                                // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "12px" }}>
                        <div className="col-md-4">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="text"
                                value=""
                                name="asset_name"
                                // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="address1" className="form-label">{t('Address Line 1')}</label>
                            <input type="text" name="address1" className="form-control" />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="address1" className="form-label">{t('Address Line 2')}</label>
                            <input type="text" name="address1" className="form-control" />
                        </div>

                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <label className="form-label">Registration No.</label>
                            <input
                                type="text"
                                value=""
                                name="asset_name"
                                // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Distric</label>
                            <input
                                type="text"
                                value=""
                                name="asset_name"
                                // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Block</label>
                            <input
                                type="text"
                                value=""
                                name="asset_name"
                                // onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                    </div>
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
            </div>
        </>
    );
};

export default HostelLogin;
