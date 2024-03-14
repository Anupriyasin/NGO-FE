import React, { useEffect, useState } from 'react';
import login from '../images/login.png';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import i18next from "i18next";
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { resetPassword, sendOTP, validateOTP } from '../api/Auth';

const ForgetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('OTP');
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(180);
  const [otpExpired, setOtpExpired] = useState(false);

  useEffect(() => {
    let interval;

    if (showModal && modalType === 'OTP') {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showModal, modalType]);

  useEffect(() => {
    if (timer === 0) {
      setShowModal(false);
      setOtpExpired(true);
      setTimer(180);
    }
  }, [timer]);


  const handleBackClick = () => {
    navigate('/login');
  };

  let data = {
    mobileNumber: mobile,
  }
  let data1 = {
    enterOtp: otp
  }
  let data2 = {
    enterOtp: otp,
    newPass: newPassword,
    confirmPass: confirmPassword
  }


  const handleSendOTPClick = () => {
    setModalType('OTP');
    // Add logic here for sending OTP
    sendOTP(data).then(res => {
      if (res.status === 'failed') {
        toast.error(t(res.message));
      }
      else if (res.status === 'success') {
        setShowModal(true);
        setTimer(180);
        setOtpExpired(false);

        setTimeout(() => {
          setOtpExpired(true);
          setShowModal(true);
        }, 180000);
        toast.success(t(res.message));
      }
      else {
        toast.error(t("Something went wrong!"));
        console.log(res.error);
      }
    }).catch(err => {
      console.log(err)
    })
  };

  const handleEnterOTPClick = () => {
    // Add logic here to verify OTP
    validateOTP(data1).then(res => {
      if (res.status === 'failed') {
        toast.error(t(res.message));
      }
      else if (res.status === 'success') {
        setModalType('NewPassword');
        toast.success(t(res.message));
      }
      else {
        toast.error(t("Something went wrong!"));
        console.log(res.error);
      }
    }).catch(err => {
      console.log(err)
    })
  };

  const handleSavePasswordClick = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Add logic here to save the new password
    resetPassword(data2).then(res => {
      if (res.status === 'success') {
        toast.success(res.message);
        handleCloseModal();
      }
      else {
        toast.error("Something went wrong!");
        console.log(res.error);
      }
    }).catch(err => {
      console.log(err)
    })
    // Display success message or navigate to another page
    handleBackClick();

  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimer(180);
  };

  return (
    <>
      <div className="container" style={{ marginTop: "12%" }}>
        <div className="row justify-content-center align-items-end">
          <div className="col-md-6 text-center vl d-none d-sm-block">
            <img src={login} alt="login" />
          </div>
          <div className="col-md-6 d-flex justify-content-center ">
            <div className='mb-5'>
              <div className='text-center mt-4'>
                <h2>{t('Forgot Password')}</h2>
              </div>
              <form className='align-items-center' style={{ width: '20rem' }}>
                <div className="form-outline">
                  <label className="form-label mt-3" htmlFor="form2Example11">{t('Mobile number')}</label>
                  <input type="text" className="form-control" onChange={e => setMobile(e.target.value)} />
                </div>
                <button typeof="button" className="btn btn-outline-secondary mt-4 me-3 px-4" onClick={handleBackClick}>
                  {t('Back')}
                </button>
                <button type="button" className="btn btn-danger mt-4 float-end" onClick={handleSendOTPClick}>
                  {t('Send OTP')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} backdrop="static">
        <Modal.Header closeButton>
          {modalType === 'OTP' ? (
            <h1><Modal.Title>{t('Enter OTP')}</Modal.Title></h1>
          ) : (
            <h1><Modal.Title>{t('Create New Password')}</Modal.Title></h1>
          )}
        </Modal.Header>
        <Modal.Body>
          {modalType === 'OTP' ? (
            <>
              <p>{t('Please enter the OTP sent to your mobile number.')}</p>
              <input type="text" className="form-control mt-2" placeholder={t('Enter OTP')} onChange={e => setOtp(e.target.value)} />
              {otpExpired ? (
                <p>{t('OTP has expired.')} <button className="btn btn-link" onClick={handleSendOTPClick}>{t('Resend OTP')}</button></p>
              ) : (
                <p>{t('OTP will expire in')} {Math.floor(timer / 60)}:{timer % 60}</p>
              )}
            </>
          ) : (
            <>
              <p>{t('Create a New Password for your account.')}</p>
              <input type="password" className="form-control mt-2" placeholder={t('New Password')} onChange={e => setNewPassword(e.target.value)} />
              <input type="password" className="form-control mt-3" placeholder={t('Confirm Password')} onChange={e => setConfirmPassword(e.target.value)} />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>{t('Cancel')}</Button>
          {modalType === 'OTP' ? (
              <Button variant="danger" onClick={handleEnterOTPClick}>{t('Enter')}</Button>
            ) : (
            <Button variant="danger" onClick={handleSavePasswordClick}>{t('Save')}</Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ForgetPassword;
