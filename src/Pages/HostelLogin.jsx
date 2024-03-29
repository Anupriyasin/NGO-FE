import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { createhostellogin } from "../api/Users";
import "sweetalert2/dist/sweetalert2.min.css";
import "../components/Table/Table.css";
import TopLoader from "../components/Loader/TopLoader";
import "react-responsive-modal/styles.css";

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
    const [number, setNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [passwordMismatchError, setPasswordMismatchError] = useState('');
    const { register, formState: { errors } } = useForm();
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleHostnameChange = (event) => {
        setHostelname(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmailid(event.target.value);
        validateEmail(event.target.value);
    };

    const handleContactNoChange = (event) => {
        setNumber(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (ConfirmPassword && event.target.value !== ConfirmPassword) {
            setPasswordMismatchError("Passwords do not match");
        } else {
            setPasswordMismatchError('');
        }
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        if (Password && event.target.value !== Password) {
            setPasswordMismatchError("Passwords do not match");
        } else {
            setPasswordMismatchError('');
        }
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleDistrictChange = (event) => {
        setDistrict(event.target.value);
    };

    const handleBlockChange = (event) => {
        setBlock(event.target.value);
    };

    const validateEmail = (email) => {
        if (!/^[a-zA-Z0-9._%+-]+@gmail.com$/.test(email)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        if (emailError) {
            toast.error('Please provide a valid email address.');
            return;
        }
        if (Password !== ConfirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        const Postdata = {
            name: Hostelname,
            email: Emailid,
            district_code: District,
            block_code: Block,
            password: Password,
            address: Address,
            mobile_no: number
        };
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
                        {/* Hostel Name */}
                        <div className="col-md-4">
                            <label className="form-label">Hostel Name {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input
                                type="text"
                                name="asset_name"
                                className="form-control"
                                value={Hostelname}
                                onChange={handleHostnameChange}
                                required
                            />
                        </div>
                        {/* Email ID */}
                        <div className="col-md-4">
                            <label className="form-label">Email ID {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={Emailid}
                                onChange={handleEmailChange}
                                required
                            />
                            {emailError && <span className="text-danger">{emailError}</span>}
                        </div>
                        {/* Mobile No. */}
                        <div className="col-md-4">
                            <label className="form-label">Mobile No. {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input
                                type="text"
                                pattern="[0-9]*"
                                maxLength={10}
                                minLength={10}
                                name="mobile_no"
                                className="form-control"
                                onChange={handleContactNoChange}
                                required
                            />
                        </div>
                    </div>
                    {/* New Password */}
                    <div className="row" style={{ marginTop: "12px" }}>
                        <div className="col-md-4">
                            <label className="form-label">New Password {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <div className="input-group">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    name='password'
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    {...register('password', {
                                        required: t("Password is required"),
                                        pattern: {
                                            value: strongPasswordRegex,
                                            message: t('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'),
                                        },
                                    })}
                                    onChange={handlePasswordChange}
                                />
                                <span className='input-group-text' onClick={togglePasswordVisibility}>
                                    <IconButton size="small">
                                        {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </span>
                            </div>
                            {errors.password && (
                                <span className='error-text'>
                                    {errors.password?.message}
                                </span>
                            )}
                        </div>
                        {/* Confirm Password */}
                        <div className="col-md-4">
                            <label className="form-label">Confirm Password {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <div className="input-group">
                                <input
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    name='confirm_password'
                                    className={`form-control ${passwordMismatchError ? 'is-invalid' : ''}`}
                                    value={ConfirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                />
                                <span className='input-group-text' onClick={toggleConfirmPasswordVisibility}>
                                    <IconButton size="small">
                                        {confirmPasswordVisible ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </span>
                            </div>
                            {passwordMismatchError && (
                                <span className='error-text'>
                                    {passwordMismatchError}
                                </span>
                            )}
                        </div>
                        {/* Address */}
                        <div className="col-md-4 mb-3">
                            <label htmlFor="address1" className="form-label">{t('Address')} {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input type="text" name="address1" className="form-control" value={Address} onChange={handleAddressChange} required/>
                        </div>
                    </div>
                    <div className="row mt-3">
                        {/* District */}
                        <div className="col-md-4">
                            <label className="form-label">District {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input type="text" name="district" className="form-control" value={District} onChange={handleDistrictChange} required/>
                        </div>
                        {/* Block */}
                        <div className="col-md-4">
                            <label className="form-label">Block {markRequired && <span style={{ color: 'red' }}>*</span>}</label>
                            <input type="text" name="block" className="form-control" value={Block} onChange={handleBlockChange} required/>
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
