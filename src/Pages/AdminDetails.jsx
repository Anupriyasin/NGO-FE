import React, { useState, useEffect } from 'react'
import user from '../images/userIcon.png'
import '../components/Table/Table.css';
import '../components/Card/Card.css'
import '../Pages/Dashboard.css'
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import { getUserDetails, updateUserDetails } from '../api/Users';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { UilArrowLeft } from "@iconscout/react-unicons";
import { baseUrl } from '../api/constant';
import '../Pages/Dashboard.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import TopLoader from '../components/Loader/TopLoader';
import { getpincode } from '../api/Random';


const AdminDetails = ({ role }) => {
    const { id } = useParams();

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const { t } = useTranslation();
    const handleClick = (e) => {
        i18next.changeLanguage(e.target.value);
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    const [admin, setAdmin] = useState({
        img_path: '',
        username: '',
        role_id: 0,
        name: "",
        address: "",
        email: "",
        primary_contact: 0,
        secondary_contact: 0,
        pin_no: 0,
    })

    const { email, username, img_path, address, name, pin_no, primary_contact, secondary_contact, role_id } = admin


    useEffect(() => {
        setIsLoading(false);
        getAdminDetails()
    }, []);

    const handleChangeInput = (e) => {
        let { name, value } = e.target
        setAdmin({ ...admin, [name]: value })
    }
    
    const onSubmit = () => {
        setIsLoading(true);
        const formData = new FormData();
    
        formData.append("user_id", "");
        formData.append("role_id", "");
        formData.append("first_name", admin.name);
        formData.append("last_name", "");
        formData.append("phone_number", admin.primary_contact);
        formData.append("secondary_p_no", admin.secondary_contact);
        formData.append("pin_no", admin.pin_no);
        formData.append("address", admin.address);
        formData.append("email", admin.email);
    
        updateUserDetails(formData)
            .then((res) => {
                if (res.status === 'success') {
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
        setIsLoading(true)
        getUserDetails()
            .then((res) => {
                if (res.status === 'success') {
                    setIsLoading(false)
                    setLoading(100);
                    setAdmin({
                        img_path: '',
                        username: res.data.username,
                        role_id: res.data.role_id,
                        name: res.data.name,
                        address: res.data.address,
                        email: res.data.email,
                        primary_contact: res.data.mobile_no,
                        secondary_contact: res.data.secondary_ph_no,
                        pin_no: res.data.pin_no,
                    })    
                console.log(res, admin)
                } else {
                    toast.error(t(res.message));
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
    <>
                <TopLoader loading={isLoading ? '50' : '100'} />{admin && admin.length === 0 ? (
                    <div className='d-flex justify-content-center align-items-center' style={{ height: '70vh' }}>
                        <div className='spinner-border' role='status'>
                            <span className='visually-hidden'></span>
                        </div>
                    </div>
                ) : (
                    <div className='px-0 px-md-3'>
                        <p className="my-3"></p>
                        <div className="d-flex justify-content-start align-items-center">
                            <button className='btn btn-white' onClick={() => navigate(-1)} ><UilArrowLeft size="32" /></button>
                            <h3 className='m-0'>{admin.name}</h3>
                        </div>
                        <p className="my-3"></p>
                        <>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='row align-items-center justify-content-around'>
                                                <div className='col-10'>
                                                    <div className='px-0 px-md-3'>
                                                        <div className='card'>
                                                            <div className='card-body'>
                                                                <form onSubmit={handleSubmit(onSubmit)} id='myform'>
                                                                    <div className="row p-md-4 d-flex justify-content-around align-items-center">
                                                                        <div className='col-md-3 d-flex justify-content-center pe-0'>
                                                                            <div className='userImage d-flex justify-content-center align-items-center' style={{ backgroundImage: `url(${img_path ? baseUrl() + img_path : user})` }}>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="role_id" className="form-label">{t('Role')} </label>
                                                                            <input onChange={handleChangeInput} type="text" name="role_id" className="form-control" required
                                                                                defaultValue={role_id === 1 ? "Headquarter" : "Hostel" || ""} disabled
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="name" className="form-label">{t('Name')} </label>
                                                                            <input onChange={handleChangeInput} type="text" name="name" className="form-control" required
                                                                                defaultValue={name || ""}
                                                                            />
                                                                            {/* <span className="error-text">
                                                                                {firstNameError && <>{firstNameError}</>}
                                                                            </span> */}
                                                                        </div>
                                                                    </div>

                                                                    <div className='row'>
                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="username" className="form-label">{t('Username')} </label>
                                                                            <input onChange={handleChangeInput} type="text" name="username" className="form-control" required
                                                                                defaultValue={username || ""}
                                                                            />
                                                                            {/* <span className="error-text">
                                                                                {firstNameError && <>{firstNameError}</>}
                                                                            </span> */}
                                                                        </div>
                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="primary_contact" className="form-label">{t('Phone number')} </label>
                                                                            <input onChange={handleChangeInput} type="text" name="primary_contact" className="form-control"
                                                                                defaultValue={primary_contact || ""}
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="secondary_contact" className="form-label">{t('Secondary Phone number')} </label>
                                                                            <input onChange={handleChangeInput} type="text" name="secondary_contact" className="form-control"
                                                                                defaultValue={secondary_contact || ""}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className='row'>
                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="email" className="form-label">{t('Email')} </label>
                                                                            <input onChange={handleChangeInput} type="email" name="username" className="form-control" required
                                                                                defaultValue={email || ""}
                                                                            />
                                                                            {/* <span className="error-text">
                                                                                {firstNameError && <>{firstNameError}</>}
                                                                            </span> */}
                                                                        </div>
                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="pin_no" className="form-label">{t('Pin no.')} </label>
                                                                            <input onChange={handleChangeInput} type="number" name="pin_no" className="form-control"
                                                                                defaultValue={pin_no || ""}
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="address" className="form-label">{t('Adress')} </label>
                                                                            <input onChange={handleChangeInput} type="text" name="address" className="form-control"
                                                                                defaultValue={address || ""}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row d-flex justify-content-end mt-4'>
                                                                        <div className="col-md-3 mb-3">
                                                                                <button type="submit" style={{backgroundColor: "#102a83", color: 'white'}} className="btn form-control px-1">{t('Update')}</button>
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
                    </div >
                )
                }
            </>
    )
}

export default AdminDetails