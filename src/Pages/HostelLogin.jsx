import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import "sweetalert2/dist/sweetalert2.min.css";
import "../components/Table/Table.css";
import TopLoader from "../components/Loader/TopLoader";
import "react-responsive-modal/styles.css";
import {createhostellogin} from "../api/Users";
import { toast } from 'react-toastify';



const HostelLogin = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [markRequired, setMarkRequired] = useState(true);
    const [Hostelname, setHostelname] = useState('');
    const [Emailid, setEmailid] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Address, setAddress] = useState('');
    const [District, setDistrict] = useState('');
    const [Block, setBlock] = useState('');


    const hostname = (event) => {
        setHostelname(event.target.value);
      };
    const emailid = (event) => {
        setEmailid(event.target.value);
      };
    const password = (event) => {
        setPassword(event.target.value);
      };
    const confirmpassword = (event) => {
        setConfirmPassword(event.target.value);
      };
    const address = (event) => {
        setAddress(event.target.value);
      };
    const district = (event) => {
        setDistrict(event.target.value);
      };
    const block = (event) => {
        setBlock(event.target.value);
      };

    const handleSubmitForm = async (event) => {
        debugger
        event.preventDefault();
    
        const Postdata =
        {
            name: Hostelname,
            email: Emailid,
            district_code: District,
            block_code: Block,
            password: Password,
            address: Address
    
        }
        createhostellogin(Postdata)
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
                <h5 className="my-4">{t("Create Hostel Login")}</h5>
                <form id="myform1" onSubmit={(e) => handleSubmitForm(e)} style={{ marginTop: "12px" }}>
                    <div className="row">
                        <div className="col-md-4">
                            <label className="form-label">Hostel Name {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input
                                type="text"
                                name="asset_name"
                                className="form-control"
                                value={Hostelname}
                                onChange={hostname}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Email ID {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input
                                type="text"
                                name="asset_name"
                                className="form-control"
                                value={Emailid}
                                onChange={emailid}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">New Password {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input
                                type="text"
                                name="asset_name"
                                className="form-control"
                                value={Password}
                                onChange={password}
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
                                value={ConfirmPassword}
                                onChange={confirmpassword}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="address1" className="form-label">{t('Address')} {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input type="text" name="address1" className="form-control" value={Address}
                                onChange={address} required/>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">District {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input
                                type="text"
                                name="asset_name"
                                className="form-control"
                                value={District}
                                onChange={district}
                                required
                            />
                        </div>

                    </div>
                    <div className="row mt-3">
                      
                        
                        <div className="col-md-4">
                            <label className="form-label">Block {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input
                                type="text"
                                name="asset_name"
                                className="form-control"
                                value={Block}
                                onChange={block}
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
