import React, { useEffect, useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import { best_performance_and_sales_admin, get_products } from '../../api/Products';
import { toast } from 'react-toastify';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Spinner from '../Loader/Spinner';
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import Charts from '../Charts/Charts'
import {
    RangeDatePicker,
} from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";

// import { alldealers } from '../../api/Users';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'
import { format } from 'date-fns';
import { IoSearch } from "react-icons/io5";
import { createRoot } from "react-dom/client";
import { AgChartsReact } from 'ag-charts-react';

const AdminCharts = ({ data1, title }) => {
    const { t } = useTranslation();
    const handleClick = (e) => {
        i18next.changeLanguage(e.target.value)
    }


    const [isLoading, setIsLoading] = useState(true);
    const [itemOptions, setItemOptions] = useState([])
    const [dealerOptions, setDealerOptions] = useState([])
    const [stateOptions, setStateOptions] = useState([])
    const [monthlySalesOptions, setMonthlySalesOptions] = useState([])
    const [stateEmpty, setStateEmpty] = useState(true)
    const [salesEmpty, setSalesEmpty] = useState(true)
    const [dealerEmpty, setDealerEmpty] = useState(true)
    const [itemEmpty, setItemEmpty] = useState(true)
    const [dealers, setDealers] = useState([])
    const [selectedDealers, setSelectedDealers] = useState([]);
    const [check, setCheck] = useState(false)
    const [selectedStates, setSelectedStates] = useState([]);
    const [allproducts, setAllProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: ""
    })
    const animatedComponents = makeAnimated();

    const currentDate = new Date();

    const currentStartDate = new Date(currentDate.getFullYear(), 3, 1);
    const sDate = format(currentStartDate, 'yyyy-MM-dd');

    const nextYear = currentDate.getFullYear() + 1;
    const currentEndDate = new Date(nextYear, 2, 31);
    const eDate = format(currentEndDate, 'yyyy-MM-dd');

    let data = {
        toggle: check,
        start_date: dateRange.startDate === "" ? sDate : dateRange.startDate,
        end_date: dateRange.endDate === "" ? eDate : dateRange.endDate
    }

    // useEffect(() => {
    //     // check === false ? setCheck(true) : setCheck(false)
    //     console.log(check)
    //     getDashboardData()
    //     alldealers()
    //         .then(res => {
    //             setDealers(res.data)
    //         })
    //     let productData = {
    //         categoryID: 0,
    //         searchKey: ""
    //     }
    //     get_products(productData)
    //         .then(res => {
    //             setAllProducts(res.data)
    //         })
    // }, []);

    const handleCheck = (e) => {
        check === false ? setCheck(true) : setCheck(false)
        console.log(check)
        // getDashboardData(check)
    }

    const getDashboardData = () => {
        setIsLoading(true);

        if (selectedStates !== "") {
            data.state = []
            for (let i = 0; i < selectedStates.length; i++) {
                data.state.push(selectedStates[i].value)
                console.log(data.state)
            }
        }
        if (selectedDealers !== "") {
            data.dealer = []
            for (let i = 0; i < selectedDealers.length; i++) {
                data.dealer.push(selectedDealers[i].value)
                console.log(data.dealer)
            }
        }
        if (selectedProducts !== "") {
            data.products = []
            for (let i = 0; i < selectedProducts.length; i++) {
                data.products.push(selectedProducts[i].value)
                console.log(data.products)
            }
        }
        best_performance_and_sales_admin(data).then(res => {
            if (res.status === 'success') {

                let item = res.data.best_performing_items;
                let dealer = res.data.best_performing_dealers;
                let sales = res.data.monthly_sales
                let states = res.data.best_performing_states



                if (item.length > 0) {
                    const categories1 = [];
                    for (let i = 0; i < item.length; i++) {
                        categories1.push(item[i].item_description);
                    }
                    const data1 = [];
                    for (let i = 0; i < item.length; i++) {
                        data1.push(check === false ? item[i].ordered_quantity : item[i].total_price);
                    }
                    var options = {
                        chart: {
                            type: 'column',
                        },
                        title: {
                            text: t('Best Performing Pumps'),
                        },
                        xAxis: {
                            categories: categories1,
                        },
                        yAxis: {
                            title: {
                                text: check === false ? t('Quantities') : t('Total Price'),
                            },
                        },
                        series: [
                            {
                                name: t('Total Sales'),
                                data: data1,
                            },
                        ],
                    };
                    setItemOptions(options);
                    setItemEmpty(false);
                }
                else {
                    setItemEmpty(true);
                }

                if (dealer.length > 0) {
                    const categories2 = [];
                    for (let i = 0; i < dealer.length; i++) {
                        categories2.push(dealer[i].dealer_shop_name);
                    }
                    const data2 = [];
                    for (let i = 0; i < dealer.length; i++) {
                        data2.push(check === false ? dealer[i].ordered_quantity : dealer[i].total_price);
                    }
                    var options = {
                        chart: {
                            type: 'column',
                        },
                        title: {
                            text: t('Best Performing Dealers'),
                        },
                        xAxis: {
                            categories: categories2,
                        },
                        yAxis: {
                            title: {
                                text: check === false ? t('Quantities') : t('Total Price'),
                            },
                        },
                        series: [
                            {
                                name: t('Total Sales'),
                                data: data2,
                            },
                        ],
                    };
                    setDealerOptions(options);
                    setDealerEmpty(false);
                }
                else {
                    setDealerEmpty(true);
                }

                if (states.length > 0) {
                    const categories2 = [];
                    for (let i = 0; i < states.length; i++) {
                        categories2.push(states[i].state);
                    }
                    const data2 = [];
                    for (let i = 0; i < states.length; i++) {
                        data2.push(check === false ? states[i].ordered_quantity : states[i].total_price);
                    }
                    var options = {
                        chart: {
                            type: 'column',
                        },
                        title: {
                            text: t('Best Performing States'),
                        },
                        xAxis: {
                            categories: categories2,
                        },
                        yAxis: {
                            title: {
                                text: t('Total Sales'),
                            },
                        },
                        series: [
                            {
                                name: t('Total Sales'),
                                data: data2,
                            },
                        ],
                    };
                    setStateOptions(options);
                    setStateEmpty(false);
                }
                else {
                    setStateEmpty(true);
                }

                if (sales.length > 0) {
                    const start = new Date(dateRange.startDate === "" ? sDate : dateRange.startDate);
                    const end = new Date(dateRange.endDate === "" ? eDate : dateRange.endDate);
                    const startYear = start.getFullYear();
                    const endYear = end.getFullYear();
                    const monthsArray = [];

                    for (let year = startYear; year <= endYear; year++) {
                        const startMonth = (year === startYear) ? start.getMonth() : 0;
                        const endMonth = (year === endYear) ? end.getMonth() : 11;

                        for (let month = startMonth; month <= endMonth; month++) {
                            const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'long' });
                            const formattedMonth = `${monthName} ${year}`;

                            const matchingSale = sales.find(item => {
                                const [saleMonth, saleYear] = item.po_date.split(' ');
                                const saleFormattedMonth = `${saleMonth} ${saleYear}`;
                                return saleFormattedMonth === formattedMonth;
                            });

                            monthsArray.push({
                                month: formattedMonth,
                                value: matchingSale ? (check === false ? matchingSale.ordered_quantity : matchingSale.total_price) : 0,
                            });
                        }
                    }

                    console.log(monthsArray);

                    const options = {
                        chart: {
                            type: 'area',
                        },
                        title: {
                            text: t('Month wise Sales'),
                        },
                        xAxis: {
                            categories: monthsArray.map(item => item.month),
                        },
                        yAxis: {
                            title: {
                                text: check === false ? t('Quantities') : t('Total Price'),
                            },
                        },
                        series: [
                            {
                                name: t('Total Sales'),
                                data: monthsArray.map(item => item.value),
                            },
                        ],
                    };

                    setMonthlySalesOptions(options);
                    setSalesEmpty(false);
                } else {
                    setSalesEmpty(true);
                }


            }
            else {
                setItemEmpty(true);
                setDealerEmpty(true);
                setSalesEmpty(true);
                setSalesEmpty(true)
                console.log("error");
            }
            setIsLoading(false);
        });
    }

    const states = [
        { value: 'AP', label: 'Andhra Pradesh' },
        { value: 'AR', label: 'Arunachal Pradesh' },
        { value: 'AS', label: 'Assam' },
        { value: 'BR', label: 'Bihar' },
        { value: 'CT', label: 'Chhattisgarh' },
        { value: 'GA', label: 'Goa' },
        { value: 'GJ', label: 'Gujarat' },
        { value: 'HR', label: 'Haryana' },
        { value: 'HP', label: 'Himachal Pradesh' },
        { value: 'JH', label: 'Jharkhand' },
        { value: 'KA', label: 'Karnataka' },
        { value: 'KL', label: 'Kerala' },
        { value: 'MP', label: 'Madhya Pradesh' },
        { value: 'MH', label: 'Maharashtra' },
        { value: 'MN', label: 'Manipur' },
        { value: 'ML', label: 'Meghalaya' },
        { value: 'MZ', label: 'Mizoram' },
        { value: 'NL', label: 'Nagaland' },
        { value: 'OD', label: 'Odisha' },
        { value: 'PB', label: 'Punjab' },
        { value: 'RJ', label: 'Rajasthan' },
        { value: 'SK', label: 'Sikkim' },
        { value: 'TN', label: 'Tamil Nadu' },
        { value: 'TG', label: 'Telangana' },
        { value: 'TR', label: 'Tripura' },
        { value: 'UP', label: 'Uttar Pradesh' },
        { value: 'UK', label: 'Uttarakhand' },
        { value: 'WB', label: 'West Bengal' },
        { value: 'AN', label: 'Andaman and Nicobar Islands' },
        { value: 'CH', label: 'Chandigarh' },
        { value: 'DH', label: 'Dadra and Nagar Haveli and Daman and Diu' },
        { value: 'LD', label: 'Lakshadweep' },
        { value: 'DL', label: 'Delhi' },
        { value: 'PY', label: 'Puducherry' },
    ];

    const handleStateChange = (selectedOptions) => {
        setSelectedStates(selectedOptions);
        console.log(selectedOptions)
    };

    const dealerDrop = dealers.map(dealer => ({
        value: dealer.party_code,
        label: dealer.dealer_shop_name,
    }));

    const handleDealerChange = selectedOptions => {
        setSelectedDealers(selectedOptions);
        console.log(selectedOptions)
    };

    const productsDrop = allproducts.map(product => ({
        value: product.item_code,
        label: product.item_description,
    }));

    const handleProductChange = selectedOptions => {
        setSelectedProducts(selectedOptions);
        console.log(selectedOptions)
    };

    const onDateChange = (startDate, endDate) => {
        // Format startDate and endDate to "YYYY-MM-DD" format using date-fns
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        console.log("start: ", formattedStartDate);
        console.log("end: ", formattedEndDate);

        setDateRange((old) => ({
            ...old,
            startDate: formattedStartDate,
            endDate: formattedEndDate
        }));
    };


    const handleFilters = (e) => {
        getDashboardData(data)
    }

    const renderChart = (options, isEmpty) => {
        if (isLoading) {
            return <Spinner />;
        } else if (isEmpty) {
            return (
                <div className="col-sm-12 col-md-12 mb-4">
                    <div className="card">
                        <div className="card-body p-5">
                            <h5 className="card-title text-center">No data found</h5>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="col-sm-12 col-md-12 mb-4">
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
            );
        }
    };




    return (
        <div className="row">
            {/* <div className='col-12 d-flex row justify-content-center m-0'>
                <div className='col-12 col-md-8 d-flex row justify-content-center'>
                    <RangeDatePicker
                        startDate={dateRange.startDate}
                        endDate={dateRange.endDate}
                        onChange={(startDate, endDate) => onDateChange(startDate, endDate)}
                        minDate={new Date(1900, 0, 1)}
                        maxDate={new Date()}
                        dateFormat="DD/MM/YYYY"
                        monthFormat="MMM/YYYY"
                        startDatePlaceholder="Start Date"
                        endDatePlaceholder="End Date"
                        disabled={false}
                        className="my-own-class-name"
                        startWeekDay="monday"
                    />
                    <div className='col-12 m-2 d-flex row p-0'>
                        <div className='col-12 col-md-4'>
                            <Select
                                // className='col-12 col-md-4'
                                id="indianStates"
                                name="indianStates"
                                isMulti
                                options={states}
                                value={selectedStates}
                                onChange={handleStateChange}
                                placeholder="Select states"
                                isSearchable
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                            />
                        </div>
                        <div className='col-12 col-md-4 mt-1 mt-md-0'>
                            <Select
                                // className='col-12 col-md-4'
                                id="dealers"
                                name="dealers"
                                isMulti
                                placeholder="Select Dealers"
                                options={dealerDrop}
                                value={selectedDealers}
                                onChange={handleDealerChange}
                                isSearchable
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                            />
                        </div>
                        <div className='col-12 col-md-4 mt-1 mt-md-0'>
                            <Select
                                // className='col-12 col-md-4'
                                id="products"
                                name="products"
                                isMulti
                                placeholder="Select Products"
                                options={productsDrop}
                                value={selectedProducts}
                                onChange={handleProductChange}
                                isSearchable
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-12 row col-md-4 d-flex justify-content-center align-items-center p-4 p-md-0'>
                    <div className='col-7 col-md-12 d-flex justify-content-center align-items-center'>
                        <p className='fw-bold text-secondary'>Quantity</p>
                        <div className='mx-2'>
                            <input class="tgl tgl-ios" id="cb2" type="checkbox" defaultChecked={check} onChange={handleCheck} />
                            <label class="tgl-btn" for="cb2"></label>
                        </div>
                        <p className='fw-bold text-secondary'>(₹)Price</p>
                    </div>
                    <div className='col-5 col-md-12 d-flex justify-content-center align-items-center'>
                        <button className='btn btn-primary' onClick={handleFilters}>
                            <IoSearch />
                            Search
                        </button>
                    </div>
                </div>
            </div> */}

            <div className="col-sm-12 col-md-12 mb-4">
                {renderChart(monthlySalesOptions, salesEmpty)}
            </div>

            <div className="col-sm-12 col-md-6 mb-4">
                {renderChart(dealerOptions, dealerEmpty)}
            </div>
            <div className="col-sm-12 col-md-6 mb-4">
                {renderChart(itemOptions, itemEmpty)}
            </div>
            <div className="col-sm-12 col-md-6 mb-4">
                {renderChart(stateOptions, stateEmpty)}
            </div>
            <div className="card col-sm-12 col-md-6 mb-4 d-flex justify-content-center align-items-center">
                <Charts />
            </div>




        </div>
    )
}

export default AdminCharts