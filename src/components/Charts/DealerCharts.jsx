import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Spinner from '../Loader/Spinner';
import { best_performance_and_sales_dealer, get_products } from '../../api/Products';
import { useTranslation } from 'react-i18next';
import {
    RangeDatePicker,
} from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { IoSearch } from "react-icons/io5";

const DealerCharts = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [itemOptions, setItemOptions] = useState([])
    const [monthlySalesOptions, setMonthlySalesOptions] = useState([]);
    const [salesEmpty, setSalesEmpty] = useState(true)
    const [itemEmpty, setItemEmpty] = useState(true)
    const [check, setCheck] = useState(false)
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


    useEffect(() => {
        // check === false ? setCheck(true) : setCheck(false)
        console.log(check)
        getDashboardData(data)
        let productData = {
            categoryID: 0,
            searchKey: ""
        }
        get_products(productData)
            .then(res => {
                setAllProducts(res.data)
            })
    }, []);

    const handleCheck = () => {
        check === false ? setCheck(true) : setCheck(false)
        // console.log(check)
        // getDashboardData(data)
    }

    const getDashboardData = (data) => {
        setIsLoading(true);
        if (selectedProducts != "") {
            data.products = []
            for (let i = 0; i < selectedProducts.length; i++) {
                data.products.push(selectedProducts[i].value)
                console.log(data.products)
            }
        }
        best_performance_and_sales_dealer(data).then(res => {
            if (res.status === 'success') {

                let item = res.data.best_performing_items;
                let sales = res.data.monthly_sales

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

                if (sales.length > 0) {
                    const categories3 = [];
                    for (let i = 0; i < sales.length; i++) {
                        categories3.push(sales[i].po_date);
                    }
                    const data3 = [];
                    for (let i = 0; i < sales.length; i++) {
                        data3.push(check === false ? sales[i].ordered_quantity : sales[i].total_price);
                    }

                    var options = {
                        chart: {
                            type: 'area',
                        },
                        title: {
                            text: t('Month wise Orders'),
                        },
                        xAxis: {
                            categories: categories3,
                        },
                        yAxis: {
                            title: {
                                text: check === false ? t('Quantities') : t('Total Price'),
                            },
                        },
                        series: [
                            {
                                name: check === false ? t('Total Sales') : t('Total Price'),
                                data: data3,
                            },
                        ],
                    };
                    setMonthlySalesOptions(options);
                    setSalesEmpty(false);
                }
                else {
                    setSalesEmpty(true);
                }

            }
            else {
                setItemEmpty(true);
                setSalesEmpty(true);
                console.log("error");
            }
            setIsLoading(false);
        });
    }


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

    const handleFilters = () => {
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
            <div className='col-12 d-flex row justify-content-center m-0'>
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
                    <div className='col-12 m-2 d-flex row'>
                        <Select
                            className='col-12 col-md-4'
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
                        <div className='col-12 col-md-6 d-flex justify-content-center mt-2 align-items-center'>
                            <p className='fw-bold text-secondary'>Quantity</p>
                            <div className='mx-2'>
                                <input class="tgl tgl-ios" id="cb2" type="checkbox" defaultChecked={check} onChange={handleCheck} />
                                <label class="tgl-btn" for="cb2"></label>
                            </div>
                            <p className='fw-bold text-secondary'>(₹)Price</p>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-4 d-flex justify-content-end align-items-center'>
                    <button className='btn btn-primary p-2' onClick={handleFilters}>
                        <IoSearch />
                        Search
                    </button>
                </div>
                <div className='col-12 p-2'>
                </div>
            </div>
            {/* {isLoading &&
                <Spinner />
            }
            {!isLoading && monthlySalesOptions && !salesEmpty &&
                <div className="col-md-12 mb-4">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={monthlySalesOptions}
                    />
                </div>
            }
            {!isLoading && itemOptions && !itemEmpty &&
                <div className="col-md-12 mb-4">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={itemOptions}
                    />
                </div>
            } */}

            <div className="col-sm-12 mb-4">
                {renderChart(monthlySalesOptions, salesEmpty)}
            </div>
            <div className="col-sm-12 mb-4">
                {renderChart(itemOptions, itemEmpty)}
            </div>
        </div>
    )
}

export default DealerCharts