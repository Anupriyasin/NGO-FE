import React, { useState, useEffect } from 'react'
import user from '../images/userIcon.png'
import '../components/Table/Table.css';
import '../components/Card/Card.css'
import '../Pages/Dashboard.css'
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import { admindetails, updateUserDetails } from '../api/Users';
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

    const styles = {
        colorSlice: "#EB5757",
        colorCircle: "rgba(37, 37, 37, 0.5)",
        fontSize: "1rem",
        size: "160"
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const { t } = useTranslation();
    const handleClick = (e) => {
        i18next.changeLanguage(e.target.value);
    };


    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(0);
    const [DOB, setDOB] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [updateFlag, setUpdateFlag] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    let date = yyyy + '-' + mm + '-' + dd;

    const [maxDate, setMaxDate] = useState(date);

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSubmit = () => {
        setIsLoading(true)
        const ele = document.getElementById('myform');
        const formData = new FormData(ele);
        formData.append("user_id", id);
        const utcDOB = new Date(DOB).toISOString().split('T')[0];
        formData.append("dob", utcDOB);
        updateUserDetails(formData)
            .then((res) => {
                if (res.status === 'success') {
                    setIsLoading(false)
                    // reset();
                    setLoading(100);
                    toast.success(t(res.message));
                    // getAdminDetails()
                } else {
                    toast.error(t(res.message));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // const [pincodeData, setPincodeData] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [roleId, setRoleId] = useState(0)
    const [district_, setDistrict] = useState('');
    const [city_name, setCityName] = useState('');
    const [selectedCityName, setSelectedCityName] = useState('');
    const [state_name, setStateName] = useState('');
    const [cityList, setCityList] = useState([]);
    const [error, setError] = useState('');


    function convertDateFormat(responseDate) {
        const responseDateFormat = new Date(responseDate);

        // Adjust for the time zone offset
        const offsetMinutes = responseDateFormat.getTimezoneOffset();
        responseDateFormat.setMinutes(responseDateFormat.getMinutes() - offsetMinutes);

        const year = responseDateFormat.getUTCFullYear();
        const month = (responseDateFormat.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = responseDateFormat.getUTCDate().toString().padStart(2, '0');

        console.log("dob day------------------------------------------->>>", day);

        return `${year}-${month}-${day}`;
    }


    const init = {
        address1: "",
        address2: "",
        city: city_name,
        district: district_,
        dob: DOB,
        first_name: firstName,
        img_path: "",
        last_name: lastName,
        pin_no: 0,
        primary_contact: 0,
        secondary_contact: 0,
        state: state_name,
        role_id: roleId
    }

    const [admin, setAdmin] = useState(init);
    const { address1, address2, district, city, dob, first_name, img_path, last_name, pin_no, primary_contact, secondary_contact, state, role_id } = admin


    useEffect(() => {
        setIsLoading(false);
        // getAdminDetails()
    }, [id]);

    // const getAdminDetails = () => {
    //     setLoading(true)
    //     admindetails(id)
    //         .then((res) => {
    //             console.log(res)
    //             if (res.status === 'success') {
    //                 setLoading(false)
    //                 setAdmin(res.data.admin_details[0]);
    //                 setIsLoading(false);
    //                 setSelectedCityName(res.data.admin_details[0].city);
    //                 onPincodeChange(res.data.admin_details[0].pin_no);
    //                 let dateOfBirth = convertDateFormat(res.data.admin_details[0].dob)
    //                 setDOB(dateOfBirth);
    //             } else {
    //                 navigate(`/${role !== 5 ? 'admin' : 'dealer'}/viewusers`);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }

    const onFirstNameChange = (e) => {
        const { value } = e.target;
        console.log('Input value:', value);

        if (value.trim() === '') {
            setFirstNameError('First name is required');
            setUpdateFlag(false)
        } else if (/^[A-Za-z]+$/.test(value)) {
            setUpdateFlag(true)
            setFirstNameError('');
            setFirstName(value);
        } else {
            setUpdateFlag(false)
            setFirstNameError('Invalid input. Please enter only alphabets.');
        }
    };

    const onLastNameChange = (e) => {
        const { value } = e.target;
        console.log('Input value:', value);

        if (value.trim() === '') {
            setLastNameError('First name is required');
            setUpdateFlag(false)
        } else if (/^[A-Za-z]+$/.test(value)) {
            setUpdateFlag(true)
            setLastNameError('');
            setLastName(value);
        } else {
            setUpdateFlag(false)
            setLastNameError('Invalid input. Please enter only alphabets.');
        }
    };

    const onDistrictChange = (e) => {
        const { value } = e.target;
        console.log('Input value:', value);
        const re = /^[A-Za-z]+$/;
        if (value === "" || re.test(value)) {
            setDistrict(value);
        }
    };

    const onStateNameChange = (e) => {
        const { value } = e.target;
        console.log('Input value:', value);
        const re = /^[A-Za-z]+$/;
        if (value === "" || re.test(value)) {
            setStateName(value);
        }
    };

    function onPincodeChange(value) {
        const re = /^[0-9]+$/;
        setError('');

        if (value.length === 6 && re.test(value)) {
            getpincode(value)
                .then((response) => {
                    if (response && response.length > 0 && response[0].Status === 'Success') {
                        const data = response[0].PostOffice;
                        const cities = data.map((item) => item.Name);
                        setCityList(cities);
                        if (cities.length === 1) {
                            setCityName(cities[0]);
                        } else {
                            setCityName('');
                        }
                        setStateName(data[0].State);
                        setDistrict(data[0].District);
                    } else {
                        setError(t('Invalid pincode. Please enter a valid pincode.'));
                        setCityName('');
                        setStateName('');
                        setDistrict('');
                        setCityList([]);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching pincode data:', error);
                    setError(t('Error fetching pincode data. Please try again later.'));
                    setCityName('');
                    setStateName('');
                    setDistrict('');
                    setCityList([]);
                });
        } else if (value.length !== 6) {
            setError(t('Invalid pincode. Please enter a valid pincode.'));
            setCityName('');
            setStateName('');
            setDistrict('');
            setCityList([]);
        } else {
            setCityName('');
            setStateName('');
            setDistrict('');
            setCityList([]);
        }
    };

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
                            <h3 className='m-0'>{admin.first_name + " " + admin.last_name}</h3>
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
                                                                                {/* <p style={{fontSize: "7px"}}>{img_path}</p> */}
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="col-md-4 mb-3">
                                                                            <label htmlFor="" className="form-label">{t('Change Profile Picture')}</label>
                                                                            <input type="file" name='img_path' accept='image/jpeg, image/png, image/gif' className="form-control btn btn-secondary" {...register('img_path')} defaultValue={img_path || ""} />
                                                                        </div> */}
                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="mobile" className="form-label">{t('Phone number')} </label>
                                                                            <input disabled={true} type="text" name="mobile" className="form-control" maxLength={10}
                                                                                onInput={(event) => {
                                                                                    event.target.value = event.target.value.replace(/\D/g, '');
                                                                                }}
                                                                                // {...register("mobile", { required: true, minLength: 10, pattern: /^[0-9\b]+$/ })}
                                                                                defaultValue={primary_contact || ""}
                                                                            />
                                                                            <span className='error-text'>
                                                                                {errors.mobile?.type === "required" && t("Phone number is required")}
                                                                                {(errors.mobile?.type === "minLength" || errors.mobile?.type === "pattern") && t("Phone number is incorrect")}
                                                                            </span>
                                                                        </div>

                                                                    </div>

                                                                    <div className='row'>
                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="role_id" className="form-label">{t('Role')} </label>
                                                                            <select
                                                                            disabled
                                                                                name="role_id"
                                                                                className="form-select"
                                                                                onChange={(e) => setRoleId(e.target.value)}
                                                                                {...register("role_id", { required: true })}
                                                                            >
                                                                                <option value="1" selected={role_id == 1 ? true : false}>Admin</option>
                                                                                <option value="2" selected={role_id == 2 ? true : false}>Hostel</option>
                                                                            </select>

                                                                            <span className='error-text'>
                                                                                {errors.role?.type === "required" && t("Role is required")}
                                                                            </span>
                                                                        </div>
                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="first_name" className="form-label">{t('First Name')} </label>
                                                                            <input type="text" name="first_name" className="form-control" required
                                                                                // {...register("first_name", { required: true })}
                                                                                defaultValue={first_name || ""}
                                                                                onChange={onFirstNameChange}
                                                                            />
                                                                            <span className="error-text">
                                                                                {/* {errors.first_name?.type === 'required' && t('First name is required')} */}
                                                                                {firstNameError && <>{firstNameError}</>}
                                                                            </span>
                                                                        </div>

                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="last_name" className="form-label">{t('Last Name')} </label>
                                                                            <input type="text" name="last_name" className="form-control" required
                                                                                //  {...register("last_name", { required: true })}
                                                                                defaultValue={last_name || ""}
                                                                                onChange={onLastNameChange}
                                                                            />
                                                                            <span className='error-text'>
                                                                                {/* {errors.last_name?.type === "required" && t("Last name is required")} */}
                                                                                {lastNameError && <>{lastNameError}</>}
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row align-items-center">

                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="secondary_contact" className="form-label">{t('Secondary Contact No. (Optional)')} </label>
                                                                            <input type="text" name="secondary_contact" className="form-control" maxLength={10} {...register("secondary_contact", { minLength: 10 })} defaultValue={secondary_contact || ""} />
                                                                            <span className='error-text'>
                                                                                {errors.secondary_contact?.type === "minLength" && t("Phone number is incorrect")}
                                                                            </span>
                                                                        </div>

                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="date_of_birth" className="form-label">{t('Date of Birth')}</label>
                                                                            <input
                                                                                type="date"
                                                                                name="dob"
                                                                                className="form-control"
                                                                                max={maxDate}
                                                                                {...register("dob")}
                                                                                defaultValue={DOB}  // Use the formatted date directly
                                                                                onChange={(e) => setDOB(e.target.value)}
                                                                            />

                                                                        </div>

                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="pin_no" className="form-label">{t('Pin No.')}</label>
                                                                            <input type="text" name="pin_no" className="form-control" maxLength={6} {...register("pin_no", { minLength: 6 })} onChange={(e) => onPincodeChange(e.target.value)} defaultValue={pin_no || ""} />
                                                                            <span className='error-text'>
                                                                                {errors.pin_no?.type === "minLength" && t("Pin number is incorrect")}
                                                                                {error && <div className="error-message">{error}</div>}
                                                                            </span>
                                                                        </div>

                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="address1" className="form-label">{t('Address Line 1')}</label>
                                                                            <input type="text" name="address1" className="form-control" {...register("address1")} defaultValue={address1 || ""} />
                                                                        </div>

                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="address2" className="form-label">{t('Address Line 2')}</label>
                                                                            <input type="text" name="address2" className="form-control" {...register("address2")} defaultValue={address2 || ""} />
                                                                        </div>

                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="district" className="form-label">{t('District')}</label>
                                                                            <input
                                                                                type="text"
                                                                                name="district"
                                                                                className="form-control"
                                                                                {...register("district")} // Register the input with React Hook Form
                                                                                defaultValue={district || ""} // Set the value based on form data
                                                                                onChange={onDistrictChange} // Handle changes if necessary
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="city_name" className="form-label">{t('City Name')}</label>
                                                                            <select name="city" className="form-select" defaultValue={selectedCityName || ""} onChange={(e) => setCityName(e.target.value)} >
                                                                                <option value="" disabled={true}>Select city</option>
                                                                                {cityList.map((city) => (
                                                                                    <option key={city} value={city} selected={selectedCityName === city ? true : ''}> {city} </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>

                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="state" className="form-label">{t('State')}</label>
                                                                            <input
                                                                                type="text"
                                                                                name="state"
                                                                                className="form-control"
                                                                                {...register("state")} // Register the input with React Hook Form
                                                                                defaultValue={state || ""} // Set the value based on form data
                                                                                onChange={onStateNameChange} // Handle changes if necessary
                                                                            />
                                                                        </div>


                                                                        <div className="col-md-4 mb-3">
                                                                            <label htmlFor="submit" className="form-label invisible">Submit</label>
                                                                            <button type="submit" className="btn btn-primary form-control px-2" disabled={updateFlag === true ? false : true}>{t('Update')}</button>
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