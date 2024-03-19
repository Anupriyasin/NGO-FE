import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import 'sweetalert2/dist/sweetalert2.min.css';
import '../components/Table/Table.css';
import TopLoader from '../components/Loader/TopLoader';
import 'react-responsive-modal/styles.css';
import { Modal, Button } from "@mui/material";
import { AddAssetsType } from '../api/Users';
import { toast } from 'react-toastify';

const AddAssetType = () => {

    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [CategoryHandle, setCategoryHandle] = useState('');
    const [Assettype, setAssettype] = useState('');
    const [showClose, setShowClose] = useState([false]); 


    const [type, setType] = useState('view');

    const switchButton = (type) => {
        if (type === 'assign') {
            setType('assign');
        }
        else {
            setType('view');
        }
    }
    const addAssetSubTypeField = () => {
        setAssetSubTypes([...assetSubTypes, '']);
        setShowClose([...showClose, true]); // Add true for showing close button
    };
    const [assetSubTypes, setAssetSubTypes] = useState(['']); 

    const handleAssetSubTypeChange = (index, value) => {
        const updatedAssetSubTypes = [...assetSubTypes];
        updatedAssetSubTypes[index] = value;
        setAssetSubTypes(updatedAssetSubTypes);
    };
    const removeAssetSubTypeField = (index) => {
        const updatedAssetSubTypes = [...assetSubTypes];
        const updatedShowClose = [...showClose];
        updatedAssetSubTypes.splice(index, 1);
        updatedShowClose.splice(index, 1); 
        setAssetSubTypes(updatedAssetSubTypes);
        setShowClose(updatedShowClose);
    };
    const form1 = useForm();
    const form2 = useForm();

    const { register: registerForm1, handleSubmit: handleSubmitForm1, formState: { errors: errorsForm1 } } = form1;
    const { register: registerForm2, formState: { errors: errorsForm2 } } = form2;
    const categoryHandle = (event) => {
        setCategoryHandle(event.target.value);
    };
    const Assettypehandle = (event) => {
        setAssettype(event.target.value);
    };
    const handleSubmitForm2 = async (event) => {
        debugger
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
          })
          .catch(error => {
            console.error("Error rejecting requirement:", error);
            toast.error(error.response?.data?.message || "Failed to reject requirement");
          });
    };  

   
    return (
        <>
            <TopLoader loading={isLoading ? '50' : '100'} />
            <div className="px-2 px-md-4">

                <h3 className='my-4'>{t('Add Asset Type')}</h3>
                <button className={type === 'assign' ? 'btn btn-outline-secondary' : 'btn btn-secondary'} style={{fontSize:"14px"}} onClick={(e) => switchButton('view')}>{t('Create Asset Type')} </button>
                <span className='mx-2 d-inline-block'></span>
                <button className={type === 'view' ? 'btn btn-outline-success' : 'btn btn-success'} style={{fontSize:"14px"}} onClick={(e) => switchButton('assign')}>{t('Create Asset Sub Type')} </button>


                {
                    type === 'view' ?

                    <form  onSubmit={(e) => handleSubmitForm2(e)} id='myform1' style={{ marginTop: "12px" }}>
                    <div className='row'>
                        <div className="col-md-4">
                            <label className="form-label">Category</label>
                            <select name="createassets" id="" onChange={categoryHandle} className="common-input form-select">
                            <option value="">Select Category</option>
                            <option value="consumable" >Consumable</option>
                                <option value="non-consumable" >Non Consumable</option>
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
                            <button type="button" className="btn btn-secondary" >Clear</button>
                        </div>
                    </div>
                </form>
                

                        :

                        <form id='myform2' style={{ marginTop: "12px" }}>
                    <div className='row'>
                        <div className="col-md-3">
                            <label className="form-label">Category</label>
                            <select name="newassets" id="" className="common-input form-select" required>
                                <option value="" >Select Category</option>
                                <option value="consumable" >Consumable</option>
                                <option value="non-consumable" >Non Consumable</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                        <label className="form-label">Asset Type</label>
                            <select name="saleperson" id="" className="common-input form-select">
                                <option value="" selected={true}>Asset Type</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                                <label className="form-label">Asset Sub Type</label>
                                {assetSubTypes.map((subType, index) => (
                                    <div key={index} className="input-group mb-3">
                                        <input
                                            type="text"
                                            value={subType}
                                            onChange={(e) => handleAssetSubTypeChange(index, e.target.value)}
                                            className="form-control"
                                            required
                                        />
                                        {showClose[index] && ( 
                                            <button className="btn btn-outline-danger" type="button" onClick={() => removeAssetSubTypeField(index)}>X</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-2">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: 32 }}
                                    onClick={addAssetSubTypeField}
                                >
                                    Add
                                </Button>
                            </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary me-2">Submit</button>
                            <button type="button" className="btn btn-secondary" >Clear</button>
                        </div>
                    </div>
                </form>
                }

            </div>
        </>
    );
}

export default AddAssetType