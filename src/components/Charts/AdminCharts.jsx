import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  best_performance_and_sales_admin,
  get_products,
} from "../../api/Products";
import { toast } from "react-toastify";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Spinner from "../Loader/Spinner";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Charts from "../Charts/Charts";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";

// import { alldealers } from '../../api/Users';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import AdminCards from "../Cards/AdminCards";

import {
  getAllHostels,
  getAllStaff,
  getAllStudents,
  getDashboardAllRequirements,
  getDashboardCompletedRequirements,
  getDashboardNewRequirements,
  getDashboardPendingRequirements,
  getUserAllStaff,
  getUserAllStudents,
  getUserDashboardAllRequirements,
  getUserDashboardCompletedRequirements,
  getUserDashboardNewRequirements,
  getUserDashboardPendingRequirements,
} from "../../api/Users";
import Map from "../Map/Map";

const AdminCharts = ({ data1, title, role }) => {
  const { t } = useTranslation();
  const handleClick = (e) => {
    i18next.changeLanguage(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [check, setCheck] = useState(false);
  const [selectedHostels, setSelectedHostels] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const [newReq, setNewReq] = useState(0);
  const [pendingReq, setPendingReq] = useState(0);
  const [completedReq, setCompletedReq] = useState(0);
  const [allReq, setAllReq] = useState(0);
  const [students, setStudents] = useState(0);
  const [staff, setStaff] = useState(0);
  const [hostels, setHostels] = useState(0);
  const [allHostels, setAllHostels] = useState([]);

  const animatedComponents = makeAnimated();

  const currentDate = new Date();

  const currentStartDate = new Date(currentDate.getFullYear(), 3, 1);
  const sDate = format(currentStartDate, "yyyy-MM-dd");

  const nextYear = currentDate.getFullYear() + 1;
  const currentEndDate = new Date(nextYear, 2, 31);
  const eDate = format(currentEndDate, "yyyy-MM-dd");

  let data = {
    toggle: check,
    start_date: dateRange.startDate === "" ? sDate : dateRange.startDate,
    end_date: dateRange.endDate === "" ? eDate : dateRange.endDate,
  };

  useEffect(() => {
    getDashboardData();
    // check === false ? setCheck(true) : setCheck(false)
  }, []);

  // const handleCheck = (e) => {
  //     check === false ? setCheck(true) : setCheck(false)
  //     console.log(check)
  //     // getDashboardData(check)
  // }

  const getAdminCardsData = () => {
    getDashboardNewRequirements()
      .then((res) => {
        setNewReq(res.data[0].total);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(t("Something went wrong"));
        setIsLoading(false);
      });

    getDashboardPendingRequirements()
      .then((res) => {
        setPendingReq(res.data[0].total);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(t("Something went wrong"));
        setIsLoading(false);
      });

    getDashboardCompletedRequirements()
      .then((res) => {
        setCompletedReq(res.data[0].total);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(t("Something went wrong"));
        setIsLoading(false);
      });

    getDashboardAllRequirements()
      .then((res) => {
        setAllReq(res.data[0].total);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(t("Something went wrong"));
        setIsLoading(false);
      });

    getAllStudents()
      .then((res) => {
        setStudents(res.data[0].students);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(t("Something went wrong"));
        setIsLoading(false);
      });

    getAllStaff()
      .then((res) => {
        setStaff(res.data[0].staff);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(t("Something went wrong"));
        setIsLoading(false);
      });

    getAllHostels()
      .then((res) => {
        console.log(res);
        setHostels(res.data[0].hostel);
        let hostelData = [];
        for (let i = 0; i < res.data.length; i++) {
          hostelData.push({
            value: res.data[i].hostel_id,
            label: res.data[i].hostel_name,
          });
        }
        setAllHostels(hostelData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(t("Something went wrong"));
        setIsLoading(false);
      });
  };

  const getUserCardsData = () => {
    getUserDashboardNewRequirements()
      .then((res) => {
        setNewReq(res.data.new_asset_query[0].total);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(t("Something went wrong"));
        setIsLoading(false);
      });

    // getUserDashboardPendingRequirements()
    //   .then((res) => {
    //     setPendingReq(res.data.new_asset_query[0].total);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     toast.error(t("Something went wrong"));
    //     setIsLoading(false);
    //   });

    getUserDashboardCompletedRequirements()
      .then((res) => {
        setCompletedReq(res.data.new_asset_query[0].total);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(t("Something went wrong"));
        setIsLoading(false);
      });

    getUserDashboardAllRequirements()
      .then((res) => {
        setAllReq(res.data.new_asset_query[0].total);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(t("Something went wrong"));
        setIsLoading(false);
      });

    getUserAllStudents()
      .then((res) => {
        setStudents(res.data[0].students);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(t("Something went wrong"));
        setIsLoading(false);
      });

    getUserAllStaff()
      .then((res) => {
        setStaff(res.data[0].staff);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(t("Something went wrong"));
        setIsLoading(false);
      });
  };

  const getDashboardData = () => {
    setIsLoading(true);

    role === 1 ? getAdminCardsData() : getUserCardsData();

    if (selectedHostels !== "") {
      data.hostels = [];
      for (let i = 0; i < selectedHostels.length; i++) {
        data.hostels.push(selectedHostels[i].value);
        console.log(data.hostels);
      }
    }

    // best_performance_and_sales_admin(data).then((res) => {
    //   if (res.status === "success") {
    //     let item = res.data.best_performing_items;
    //     let dealer = res.data.best_performing_dealers;
    //     let sales = res.data.monthly_sales;
    //     let states = res.data.best_performing_states;

    //     if (item.length > 0) {
    //       const categories1 = [];
    //       for (let i = 0; i < item.length; i++) {
    //         categories1.push(item[i].item_description);
    //       }
    //       const data1 = [];
    //       for (let i = 0; i < item.length; i++) {
    //         data1.push(
    //           check === false ? item[i].ordered_quantity : item[i].total_price
    //         );
    //       }
    //       var options = {
    //         chart: {
    //           type: "column",
    //         },
    //         title: {
    //           text: t("Best Performing Pumps"),
    //         },
    //         xAxis: {
    //           categories: categories1,
    //         },
    //         yAxis: {
    //           title: {
    //             text: check === false ? t("Quantities") : t("Total Price"),
    //           },
    //         },
    //         series: [
    //           {
    //             name: t("Total Sales"),
    //             data: data1,
    //           },
    //         ],
    //       };
    //       setItemOptions(options);
    //       setItemEmpty(false);
    //     } else {
    //       setItemEmpty(true);
    //     }

    //     if (dealer.length > 0) {
    //       const categories2 = [];
    //       for (let i = 0; i < dealer.length; i++) {
    //         categories2.push(dealer[i].dealer_shop_name);
    //       }
    //       const data2 = [];
    //       for (let i = 0; i < dealer.length; i++) {
    //         data2.push(
    //           check === false
    //             ? dealer[i].ordered_quantity
    //             : dealer[i].total_price
    //         );
    //       }
    //       var options = {
    //         chart: {
    //           type: "column",
    //         },
    //         title: {
    //           text: t("Best Performing Dealers"),
    //         },
    //         xAxis: {
    //           categories: categories2,
    //         },
    //         yAxis: {
    //           title: {
    //             text: check === false ? t("Quantities") : t("Total Price"),
    //           },
    //         },
    //         series: [
    //           {
    //             name: t("Total Sales"),
    //             data: data2,
    //           },
    //         ],
    //       };
    //       setDealerOptions(options);
    //       setDealerEmpty(false);
    //     } else {
    //       setDealerEmpty(true);
    //     }

    //     if (states.length > 0) {
    //       const categories2 = [];
    //       for (let i = 0; i < states.length; i++) {
    //         categories2.push(states[i].state);
    //       }
    //       const data2 = [];
    //       for (let i = 0; i < states.length; i++) {
    //         data2.push(
    //           check === false
    //             ? states[i].ordered_quantity
    //             : states[i].total_price
    //         );
    //       }
    //       var options = {
    //         chart: {
    //           type: "column",
    //         },
    //         title: {
    //           text: t("Best Performing States"),
    //         },
    //         xAxis: {
    //           categories: categories2,
    //         },
    //         yAxis: {
    //           title: {
    //             text: t("Total Sales"),
    //           },
    //         },
    //         series: [
    //           {
    //             name: t("Total Sales"),
    //             data: data2,
    //           },
    //         ],
    //       };
    //       setStateOptions(options);
    //       setStateEmpty(false);
    //     } else {
    //       setStateEmpty(true);
    //     }

    //     if (sales.length > 0) {
    //       const start = new Date(
    //         dateRange.startDate === "" ? sDate : dateRange.startDate
    //       );
    //       const end = new Date(
    //         dateRange.endDate === "" ? eDate : dateRange.endDate
    //       );
    //       const startYear = start.getFullYear();
    //       const endYear = end.getFullYear();
    //       const monthsArray = [];

    //       for (let year = startYear; year <= endYear; year++) {
    //         const startMonth = year === startYear ? start.getMonth() : 0;
    //         const endMonth = year === endYear ? end.getMonth() : 11;

    //         for (let month = startMonth; month <= endMonth; month++) {
    //           const monthName = new Date(year, month, 1).toLocaleString(
    //             "default",
    //             { month: "long" }
    //           );
    //           const formattedMonth = `${monthName} ${year}`;

    //           const matchingSale = sales.find((item) => {
    //             const [saleMonth, saleYear] = item.po_date.split(" ");
    //             const saleFormattedMonth = `${saleMonth} ${saleYear}`;
    //             return saleFormattedMonth === formattedMonth;
    //           });

    //           monthsArray.push({
    //             month: formattedMonth,
    //             value: matchingSale
    //               ? check === false
    //                 ? matchingSale.ordered_quantity
    //                 : matchingSale.total_price
    //               : 0,
    //           });
    //         }
    //       }

    //       console.log(monthsArray);

    //       const options = {
    //         chart: {
    //           type: "area",
    //         },
    //         title: {
    //           text: t("Month wise Sales"),
    //         },
    //         xAxis: {
    //           categories: monthsArray.map((item) => item.month),
    //         },
    //         yAxis: {
    //           title: {
    //             text: check === false ? t("Quantities") : t("Total Price"),
    //           },
    //         },
    //         series: [
    //           {
    //             name: t("Total Sales"),
    //             data: monthsArray.map((item) => item.value),
    //           },
    //         ],
    //       };

    //       setMonthlySalesOptions(options);
    //       setSalesEmpty(false);
    //     } else {
    //       setSalesEmpty(true);
    //     }
    //   } else {
    //     setItemEmpty(true);
    //     setDealerEmpty(true);
    //     setSalesEmpty(true);
    //     setSalesEmpty(true);
    //     console.log("error");
    //   }
    //   setIsLoading(false);
    // });
  };

  const handleHostelChange = (selectedOptions) => {
    setSelectedHostels(selectedOptions);
    console.log(selectedOptions);
  };

  // const dealerDrop = dealers.map(dealer => ({
  //     value: dealer.party_code,
  //     label: dealer.dealer_shop_name,
  // }));

  // const handleDealerChange = selectedOptions => {
  //     setSelectedDealers(selectedOptions);
  //     console.log(selectedOptions)
  // };

  // const productsDrop = allproducts.map(product => ({
  //     value: product.item_code,
  //     label: product.item_description,
  // }));

  // const handleProductChange = selectedOptions => {
  //     setSelectedProducts(selectedOptions);
  //     console.log(selectedOptions)
  // };

  // const onDateChange = (startDate, endDate) => {
  //     // Format startDate and endDate to "YYYY-MM-DD" format using date-fns
  //     const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  //     const formattedEndDate = format(endDate, 'yyyy-MM-dd');

  //     console.log("start: ", formattedStartDate);
  //     console.log("end: ", formattedEndDate);

  //     setDateRange((old) => ({
  //         ...old,
  //         startDate: formattedStartDate,
  //         endDate: formattedEndDate
  //     }));
  // };

  const handleFilters = (e) => {
    getDashboardData(data);
  };

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
      <div className="col-12 d-flex row justify-content-start m-0">
        {/* <RangeDatePicker
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
                    /> */}
        <div className="my-4 col-12 d-flex justify-content-between align-items-center">
          <h3 className="my-4">{t("Dashboard")}</h3>

          <div className="">
            <Select
              // className='col-12 col-md-4'
              id="hostels"
              name="hostels"
              isMulti
              options={allHostels}
              value={selectedHostels}
              onChange={handleHostelChange}
              placeholder="Select Hostels"
              isSearchable
              closeMenuOnSelect={false}
              components={animatedComponents}
            />
          </div>
        </div>
        {/* <div className='col-12 row col-md-4 d-flex justify-content-center align-items-center p-4 p-md-0'>
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
                </div> */}
      </div>

      <AdminCards
        role={role}
        newReq={newReq}
        completedReq={completedReq}
        pendingReq={pendingReq}
        allReq={allReq}
        students={students}
        staff={staff}
        hostels={hostels}
      />
      {role === 1 ? <Map /> : ""}

      {/* <div className="bg-white rounded col-sm-12 col-md-5 m-3">
        <Charts />
      </div> */}

      {/* <div className="col-sm-12 col-md-12 mb-4">
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
            </div> */}
    </div>
  );
};

export default AdminCharts;
