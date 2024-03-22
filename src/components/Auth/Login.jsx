import React, { useState, useEffect } from 'react';
import TopLoader from '../Loader/TopLoader';
import login from '../../images/login.png';
import logo from '../../images/logo192.png';
import { loginApi } from '../../api/Auth';
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Languageoption from '../Language-Dropdown';
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import { useForm } from 'react-hook-form';

// import Cookies from 'js-cookie';

const Login = ({ onChildData}) => {

  const { t } = useTranslation();
  const handleClick = (e) => {
    i18next.changeLanguage(e.target.value);
    localStorage.setItem('selectedLanguage', e.target.value);
  }
  // Use this to show error after forceful browsing
  const msg = localStorage.getItem("alert");
  useEffect(() => {
    if (msg) {
      toast.success(t(msg));
    }
    localStorage.removeItem('alert');
  }, [msg]);

  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { register, formState: { errors }, handleSubmit, reset } = useForm();


  const togglePassword = () => {
    if (!passwordVisible) {
      setPasswordVisible(true);
    }
    else {
      setPasswordVisible(false);
    }
  }

  let data = {
    mobile: mobile,
    password: password,
    role: role
  }
  console.log("role",role)

  let navigate = useNavigate();
function myfunction (e){
  debugger
  setRole(e.target.value)
  console.log("role",role)
}
  function submitForm() {
    debugger
    loginApi(data).then(res => {
      if (res.status === 'failed') {
        toast.error(t(res.message));
      }
      else if (res.status === 'success') {
        if(role=="admin"){
        setLoading(100);
        onChildData();
        navigate(`/dashboard`);
        }
        else{
          setLoading(100);
          onChildData();
          navigate(`/hosteldashboard`);
        }
      }
      else {
        toast.error(t("Something went wrong!"));
        console.log(res.error);
      }
    }).catch(err => {
      console.log(err)
    })
  }

  $('input').on("keyup", function () {
    $(this).next('p.validation').hide();
  })

  return (
    <>
      <TopLoader loading={loading} />
      <div className="container" style={{ marginTop: "5%" }}>
        <div className="row justify-content-center align-items-center">

          <div className="col-md-6 text-center vl d-none d-sm-block">
            <img src={login} alt="login" />
          </div>
          <div className="col-md-6 d-md-flex justify-content-center ">
            <div>
              <div className='text-center'>
                <img className='text-center' src={logo} alt="logo" />
              </div>
              <div className='text-center mt-4'>
                <h2>{t('SC-ST Department, Odisha')}</h2>
                <h5>{t('(Hostel Management)')}</h5>
              </div>
              <form className='myform'>
                <div className="form-outline">

                  <label className="form-label">{t('Role')} *</label>
                  <select name="role" onClick={myfunction}  className='form-select' {...register("role", { required: true })}>
                    <option value=""  selected={true}>{t('Select Role')} </option>
                    <option value="admin">Head Office</option>
                    <option value="hostel">Hostel</option>
                  </select>
                  <span className='error-text'>
                    {errors.role?.type === "required" && t("Role is required")}
                  </span>
                </div>
                <div className="form-outline">

                  <label className="form-label mt-3" htmlFor="form2Example11">{t('Email or Mobile number')}</label>
                  <input type="text" className="form-control" onChange={e => setMobile(e.target.value)} />
                </div>

                <div className="form-outline">
                  <label className="form-label mt-3" htmlFor="form2Example22">{t('Password')}</label>
                  <div className="input-group">
                    <input type={passwordVisible ? 'text' : 'password'} className="form-control" onChange={e => setPassword(e.target.value)} />
                    <span className="input-group-text" onClick={togglePassword}><i className={`bi ${passwordVisible ? "bi-eye-fill" : "bi-eye-slash-fill"}`}></i></span>
                  </div>
                </div>
                <button disabled={mobile.length === 0 || password.length === 0} type="button" id='btn' className="form-control btn-block mt-4" onClick={submitForm}>{t('Login')}</button>
              </form>
              <div className="text-center my-3">
                <Link to="/forgotpassword" style={{ color: 'red', fontWeight: '500' }}>
                  {t('Forget Password?')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login