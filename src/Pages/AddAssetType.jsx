import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import 'sweetalert2/dist/sweetalert2.min.css';
import '../components/Table/Table.css';
import TopLoader from '../components/Loader/TopLoader';
import 'react-responsive-modal/styles.css';
import { Modal, Button } from "@mui/material";

const AddAssetType = () => {

    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [type, setType] = useState('view');

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

    const { register: registerForm1, handleSubmit: handleSubmitForm1, formState: { errors: errorsForm1 } } = form1;
    const { register: registerForm2, formState: { errors: errorsForm2 } } = form2;

   

   
    return (
        <>
            <TopLoader loading={isLoading ? '50' : '100'} />
            <div className="px-2 px-md-4">

                <h3 className='my-4'>{t('Add Asset Type')}</h3>
                <button className={type === 'assign' ? 'btn btn-outline-secondary' : 'btn btn-secondary'} style={{fontSize:"15px"}} onClick={(e) => switchButton('view')}>{t('Create Asset Type')} </button>
                <span className='mx-2 d-inline-block'></span>
                <button className={type === 'view' ? 'btn btn-outline-success' : 'btn btn-success'} style={{fontSize:"15px"}} onClick={(e) => switchButton('assign')}>{t('Create Asset Sub Type')} </button>


                {
                    type === 'view' ?

                    <form id='myform1' style={{ marginTop: "12px" }}>
                    <div className='row'>
                        <div className="col-md-4">
                            <label className="form-label">Category</label>
                            <select name="saleperson" id="" className="common-input form-select">
                                <option value="" selected={true}>Category</option>
                                {/* Your options go here */}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Asset Type</label>
                            <input
                                type="text"
                                name="hostel-name"
                                defaultValue=""
                                className="form-control"
                                readOnly
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
                            <select name="saleperson" id="" className="common-input form-select">
                                <option value="" selected={true}>Category</option>
                                {/* Your options go here */}
                            </select>
                        </div>
                        <div className="col-md-3">
                        <label className="form-label">Asset Type</label>
                            <select name="saleperson" id="" className="common-input form-select">
                                <option value="" selected={true}>Asset Type</option>
                                {/* Your options go here */}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Asset Sub Type</label>
                            <input
                                type="text"
                                name="asset-sub-type"
                                defaultValue=""
                                className="form-control"
                                readOnly
                                required
                            />
                        </div>
                        <div className="col-md-2">
                        <Button
           variant="contained"
           color="primary"
           style={{ marginTop: 32 }}
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