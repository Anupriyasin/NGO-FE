import React, { useState, useEffect } from 'react';
import TopLoader from '../Loader/TopLoader';
import login from '../../images/ngo.jpg';
import logo from '../../images/NGO-Logo.jpg';
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
console.log(onChildData)
  const { t } = useTranslation();
  const handleClick = (e) => {
    i18next.changeLanguage(e.target.value);
    localStorage.setItem('selectedLanguage', e.target.value);
  }
  // Use this to show error after forceful browsing
  const msg = localStorage.getItem("alert");
  useEffect(() => {
    localStorage.removeItem("role"); // Remove the role from local storage

    if (msg) {
      toast.success(t(msg));
    }
    localStorage.removeItem('alert');
  }, [msg]);

  const [username, setUsername] = useState("");
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
    username: username,
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
    setLoading(100);
      //   if (role == "1") {
      //     localStorage.setItem("role", "1");
      //     onChildData();

      //     navigate(`/create-data`);
      // } else if (role == "3") {
      //     localStorage.setItem("role", "3");
      //     onChildData();

      //     navigate(`/create-ground-data`);
      // }
      //  else if (role == "4") {
      //     localStorage.setItem("role", "4");
      //     onChildData();

      //     navigate(`/create-ground-data`);
      // }

    loginApi(data).then(res => {
      if (res === 'failed') {
        toast.error(t(res.message));
      }
      else if (res == username) {
        if(role=="3"){
                    localStorage.setItem("role", "3");

        setLoading(100);
        onChildData();
        navigate(`/create-data`);
        
      }
        else if(role=="4"){
                    localStorage.setItem("role", "4");

          setLoading(100);
          onChildData();
          navigate(`/create-ground-data`);
        }
      }
      else {
        toast.error(t(res));
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
                <img className='text-center' src={logo} alt="logo"  width={150} height={80}/>
              </div>
              <div className='text-center mt-4'>
                <h2>{t('NGOs')}</h2>
                {/* <h5>{t('(Hostel Management)')}</h5> */}
              </div>
              <form className='myform'>
                <div className="form-outline">

                  <label className="form-label">{t('Role')} *</label>
                  <select name="role" onClick={myfunction}  className='form-select' {...register("role", { required: true })}>
                    <option value=""  selected={true}>{t('Select Role')} </option>
                    <option value="1">Admin</option>
                    <option value="3">Staff</option>
                    <option value="4">Ground</option>
                  </select>
                  <span className='error-text'>
                    {errors.role?.type === "required" && t("Role is required")}
                  </span>
                </div>
                <div className="form-outline">

                  <label className="form-label mt-3" htmlFor="form2Example11">{t('Username or Phone number')}</label>
                  <input type="text" name='username' className="form-control" onChange={e => setUsername(e.target.value)} />
                </div>

                <div className="form-outline">
                  <label className="form-label mt-3" htmlFor="form2Example22">{t('Password')}</label>
                  <div className="input-group">
                    <input type={passwordVisible ? 'text' : 'password'} className="form-control" onChange={e => setPassword(e.target.value)} />
                    <span className="input-group-text" onClick={togglePassword}><i className={`bi ${passwordVisible ? "bi-eye-fill" : "bi-eye-slash-fill"}`}></i></span>
                  </div>
                </div>
                <button disabled={username.length === 0 || password.length === 0} type="button" id='btn' className="form-control btn-block mt-4" onClick={submitForm}>{t('Login')}</button>
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