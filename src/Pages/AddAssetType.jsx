import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import 'sweetalert2/dist/sweetalert2.min.css';
import '../components/Table/Table.css';
import TopLoader from '../components/Loader/TopLoader';
import 'react-responsive-modal/styles.css';
import { Modal, Button } from "@mui/material";
import { AddAssetsSubType, AddAssetsType, getAssetsName } from '../api/Users';
import { toast } from 'react-toastify';

const AddAssetType = () => {

    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [CategoryHandle, setCategoryHandle] = useState('');
    const [CategorySubHandle, setCategorySubHandle] = useState('');
    const [Assettype, setAssettype] = useState('');
    const [AssetSubtype, setAssetSubtype] = useState('');
    const [NewAssetSubtype, setNewAssetSubtype] = useState('');
    const [AssetsTypes, setAssetsTypes] = useState([]);


    const [type, setType] = useState('view');
    useEffect(() => {
        debugger
        getAssetsName().then(res => {
            if (res.status === "success") {
                console.log("Assets data:", res.data); 
                setAssetsTypes(res.data);
            }
        }).catch(err => {
            console.error("Error fetching assets:", err);
        });
    }, []);
    console.log("AssetsTypes.////",AssetsTypes)
    const switchButton = (type) => {
        if (type === 'assign') {
            setType('assign');
        }
        else {
            setType('view');
           
        }
    }
  
  
    const form1 = useForm();
    const form2 = useForm();

    const { register: registerForm1,  formState: { errors: errorsForm1 } } = form1;
    const { register: registerForm2, formState: { errors: errorsForm2 } } = form2;
    const categoryHandle = (event) => {
        setCategoryHandle(event.target.value);
    };
    const categorySubHandle = (event) => {
        setCategorySubHandle(event.target.value);
    };
    const Assettypehandle = (event) => {
        setAssettype(event.target.value);
    };
    const AssetSubtypehandle = (event) => {
        setAssetSubtype(event.target.value);
    };
    const newAssettypehandle = (event) => {
        setNewAssetSubtype(event.target.value);
    };
    const handleSubmitForm = async (event) => {
        event.preventDefault(); 
    console.log("Assettype",Assettype)
    console.log("CategoryHandle",CategoryHandle)
    const Postdata=
        {
            category : CategoryHandle,
            asset_type : Assettype
        }
        AddAssetsType(Postdata)
        .then(response => {
            toast.success(response.message );
            window.location.reload();
          })
          .catch(error => {
            console.error("Error rejecting requirement:", error);
            toast.error(error.response?.data?.message || "Failed to reject requirement");
          });
    };  
    const handleSubmitForm1 = async (event) => {
        debugger
        event.preventDefault(); 
    console.log("AssetSubtype",AssetSubtype)
    console.log("CategorySubHandle",CategorySubHandle)
    console.log("NewAssetSubtype",NewAssetSubtype)
    const Postdata=
        {
            category : CategorySubHandle,
            asset_id : NewAssetSubtype,
            asset_sub_type_name:AssetSubtype
        }
        AddAssetsSubType(Postdata)
        .then(response => {
            toast.success(response.message );
            window.location.reload();
          })
          .catch(error => {
            console.error("Error rejecting requirement:", error);
            toast.error(error.response?.data?.message || "Failed to reject requirement");
          });
    };  
    const clearAssetsFields = () => {
        window.location.reload();
    }
    const clearAssetsSubFields = () => {
        window.location.reload();
    }
   
    return (
        <>
            <TopLoader loading={isLoading ? '50' : '100'} />
            <div className="px-2 px-md-4">

                <h3 className='my-4'>{t('Add Asset Type')}</h3>
                <button className={type === 'assign' ? 'btn btn-outline-success' : 'btn btn-success'} style={{fontSize:"14px"}} onClick={(e) => switchButton('view')}>{t('Create Asset Type')} </button>
                <span className='mx-2 d-inline-block'></span>
                <button className={type === 'view' ? 'btn btn-outline-success' : 'btn btn-success'} style={{fontSize:"14px"}} onClick={(e) => switchButton('assign')}>{t('Create Asset Sub Type')} </button>


                {
                    type === 'view' ?

                    <form  onSubmit={(e) => handleSubmitForm(e)} id='myform1' style={{ marginTop: "12px" }}>
                    <div className='row'>
                        <div className="col-md-4">
                            <label className="form-label">Category</label>
                            <select name="createassets" id="" onChange={categoryHandle} className="common-input form-select">
                            <option value="">Select Category</option>
                            <option value="consumable" >Consumable</option>
                                <option value="non-consumable">Non Consumable</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Asset Type</label>
                            <input
                                type="text"
                                name="asset_type"
                                defaultValue=""
                                className="form-control"
                                onChange={Assettypehandle}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary me-2">Submit</button>
                            <button type="button" className="btn btn-secondary" onClick={clearAssetsFields}>Cancel</button>
                        </div>
                    </div>
                </form>
                

                        :

                        <form onSubmit={(e) => handleSubmitForm1(e)} id='myform2' style={{ marginTop: "12px" }}>
                    <div className='row'>
                        <div className="col-md-3">
                            <label className="form-label">Category</label>
                            <select name="category" onChange={categorySubHandle} id="" className="common-input form-select" required>
                                <option value="" >Select Category</option>
                                <option value="consumable" >Consumable</option>
                                <option value="non-consumable" >Non Consumable</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                        <label className="form-label">Asset Type</label>
                            <select name="asset_id"  onChange={newAssettypehandle} id="" className="common-input form-select">
                                <option value="" selected={true}>Asset Type</option>
                                {AssetsTypes.assets_name.map((row) => (
                                            <>
                                                <option value={row.asset_id}>{row.asset_name}</option>
                                            </>
                                        ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                                <label className="form-label">Asset Sub Type</label>
                                    <div  className="input-group mb-3">
                                    <input
                                type="text"
                                name="asset_sub_type_name"
                                defaultValue=""
                                className="form-control"
                                onChange={AssetSubtypehandle}
                                required
                            />
                                        
                                       
                                    </div>
                            </div>
                         
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary me-2">Submit</button>
                            <button type="button" className="btn btn-secondary" onClick={clearAssetsSubFields}>Clear</button>
                        </div>
                    </div>
                </form>
                }

            </div>
        </>
    );
}

export default AddAssetType