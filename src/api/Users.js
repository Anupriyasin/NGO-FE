import axios from "./constant";

axios.defaults.withCredentials = true;

export const getAssetsName = async (data) =>
  await axios
    .get("/assets_name")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const getUserDetails = async (data) =>
  await axios
    .get("/get_user_details")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const getEmployeeData = async (data) =>
  await axios
    .get(`/getEmployeeData/${data}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const trackreq = async (data) =>
  await axios
    .get("/track_requirement")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const assign_dealer = async (data) =>
  await axios
    .post("/assign_dealers", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const AddAssetsType = async (data) =>
  await axios
    .post("/new_asset", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const AddAssetsSubType = async (data) =>
  await axios
    .post("/new_asset_sub_type", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const CompletedRequirements = async (data) =>
  await axios
    .post("/completed_req_hostel", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const hostelrejectRequirements = async (data) =>
  await axios
    .post("/rejected_req_hostel", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const hostelconfirmRequirements = async (data) =>
  await axios
    .post("/track_req_hostel", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const AddAsset = async (data) =>
  await axios
    .post("/new_inventory", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const AddHostelRequirement = async (data) =>
  await axios
    .post("/add_requirements", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const createInputer = async (data) =>
  await axios
    .post("/create_hostel_login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const AddExistingAsset = async (data) =>
  await axios
    .post("/update_inventory_asset", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const subassets = async (data) =>
  await axios
    .post("/get_asset_sub_type", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const Assetnameinfo = async (data) =>
  await axios
    .post("/asset_name_nfo", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const CurrentQuantity = async (data) =>
  await axios
    .post("/get_asset_count", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const updateRequirement = async (data) =>
  await axios
    .post("/update_req", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const modifydetails = async (data) =>
  await axios
    .post("/update_modify", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const RejectRequirement = async (data) =>
  await axios
    .post("/update_reject_req", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const received = async (data) =>
  await axios
    .post("/confirm_delivery", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const visitcheckout = async (data) =>
  await axios
    .post("/visit_check_out", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const insertUserDetails = async (data) =>
  await axios
    .post("/insert_crm_user", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const updateAssignedDealer = async (dealerId, data) => {
  try {
    const response = await axios.post(
      `/update_assigned_dealers/${dealerId}`,
      data
    );
    return response.data;
  } catch (error) {
    return "Error - " + error;
  }
};

export const updateUserDetails = async (data) => {
  return await axios
    .post("/update_profile", data, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
};

export const updateBlockStatus = async (data) =>
  await axios
    .put("/update_block_status", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const changePassword = async (data) =>
  await axios
    .post("/change_password", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const updateMOMText = async (id, data) =>
  await axios
    .post(`/edit_mom/${id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const staffdetails = async (data) =>
  await axios
    .post("/get_staff_info", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const getAllEmpDetails = async (data) =>
  await axios
    .get("/getAllEmpDetails", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const getAllUserDetails = async (data) =>
  await axios
    .get("/getAllUserDetails", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const allInputer = async (data) =>
  await axios
    .get("/hostel_wise_data", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const assigneddealerreport = async (data) =>
  await axios
    .get("/assigned_dealers_history", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const newdealers = async (data) =>
  await axios
    .get("/visit_reports", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const meetingReport = async (data) =>
  await axios
    .get("/meeting_reports", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const checkIn = async (data) => {
  try {
    const response = await axios.post("/check_in", data);
    return response.data;
  } catch (error) {
    console.error("Error checking in:", error);
    return "Error - " + error;
  }
};

export const insertMom = async (formData) => {
  try {
    const response = await axios.post("/insert_mom", formData);
    return response.data;
  } catch (error) {
    console.error("Error inserting mom:", error);
    return "Error - " + error;
  }
};

export const checkOut = async (data) => {
  try {
    const response = await axios.post("/check_out", data);
    return response.data;
  } catch (error) {
    console.error("Error checking out:", error);
    return "Error - " + error;
  }
};

export const getalldealers = async (data) =>
  await axios
    .get("/get_available_dealers", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getbrandProduct = async (data) =>
  await axios
    .get("/get_brand_and_product", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const currentassigned = async (sales_person_id) =>
  await axios
    .get(`/view_current_assigned_dealers?sales_id=${sales_person_id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const viewassigneddealers = async (sales_person_id) =>
  await axios
    .get(`/view_assigned_dealers?sales_id=${sales_person_id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const dailycheckin = async () =>
  await axios
    .get(`/get_daily_check_in`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const allsalepersons = async (data) =>
  await axios
    .get("/get_all_sales_person", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const fetchIframe = async (dealer_user_id) => {
  try {
    const response = await axios.get(
      `/view_best_route_to_reach_dealer/${dealer_user_id}`
    );
    return response.data; // Assuming the response directly contains iframeURL
  } catch (error) {
    console.error("Error fetching dealer details:", error);
    return null; // Return null or handle error as needed
  }
};

export const dealerdetails = async (id) =>
  await axios
    .get(`/get_dealer_details_by_id/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const assignedhistory = async (ad_id) =>
  await axios
    .get(`/get_history_by_adId/${ad_id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getMomText = async (momId) =>
  await axios
    .get(`/get_mom_text/${momId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const allUsers = async (data) =>
  await axios
    .get("/get_all_users", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const admindetails = async (id) =>
  await axios
    .get(`/get_admin/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const logoutApi = async (id) =>
  await axios
    .get(`/logout`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const insertDealer = async (id, data) =>
  await axios
    .post(`/insert_dealers/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

//new apis

export const getRequirements = async () =>
  await axios
    .get("/requirements")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
export const getallDistricts = async () =>
  await axios
    .get("/get_all_districts")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
    export const getdistictName = async (data) =>
    await axios
      .get("/get_all_districts")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return "Error - " + error;
      });
export const getHostelWiseRequirements = async (requestData) => {
  try {
    const response = await axios.post("/hostel_wise_reqmnt_data", requestData);
    return response.data;
  } catch (error) {
    throw new Error("Error - " + error);
  }
};
// export const getAssetReport = async (requestData) => {
//   try {
//     const response = await axios.post("/get_asset_report", requestData);
//     return response.data;
//   } catch (error) {
//     throw new Error("Error - " + error);
//   }
// };
export const getAssetReport = async (requestData) => {
  try {
    const response = await axios.post("/get_asset_report", requestData);
    return response.data;
  } catch (error) {
    throw new Error("Error - " + error);
  }
};

export const getRejectedRequirements = async () =>
  await axios
    .get("/rejected_req")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getstudentinfo = async () =>
  await axios
    .post("/get_student_info")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getAllStudents = async () =>
  await axios
    .get("/all_students")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getAllStaff = async () =>
  await axios
    .get("/all_staff")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getAllHostels = async () =>
  await axios
    .get("/get_all_hostels")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getDashboardNewRequirements = async () =>
  await axios
    .get("/get_dashboard_new_requirement")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getDashboardPendingRequirements = async () =>
  await axios
    .get("/get_dashboard_pending_requirement")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getDashboardCompletedRequirements = async () =>
  await axios
    .get("/get_dashboard_completed_requirement")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getDashboardAllRequirements = async () =>
  await axios
    .get("/get_dashboard_all_requirement")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getUserAllStudents = async () =>
  await axios
    .get("/all_students")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getUserAllStaff = async () =>
  await axios
    .get("/all_staff")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getUserDashboardNewRequirements = async (data) =>
  await axios
    .post("/get_dashboard_new_requirement_hostel", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getUserDashboardPendingRequirements = async (data) =>
  await axios
    .post("/get_dashboard_pending_requirement_hostel", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getUserDashboardCompletedRequirements = async (data) =>
  await axios
    .post("/get_dashboard_completed_requirement_hostel", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getUserDashboardAllRequirements = async (data) =>
  await axios
    .post("/get_dashboard_all_requirement_hostel", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getPincode = async (data) => {
  try {
    const response = await axios.get(
      "https://api.postalpincode.in/pincode/" + data,
      {
        withCredentials: false,
      }
    );
    return response.data;
  } catch (error) {
    return "Error - " + error;
  }
};

export const addStudent = async (data) => {
  return await axios
    .post("/new_student_info", data, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
};
export const updateStudent = async (data) => {
  return await axios
    .post("/update_student_info", data, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
};

export const addStaff = async (data) => {
  return await axios
    .post("/new_staff_info", data, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
};
export const registerNewUser = async (data) => {
  return await axios
    .post("/registerUser/false", data, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
};
export const registerExistingUser = async (data) => {
  return await axios
    .post("/registerUser/true", data, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
};
export const RegisterEmp = async (data) => {
  try {
    const response = await axios.post("/registerEmployee", data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log('Response data:', error.response.data);
      console.log('Response status:', error.response.status);
      console.log('Response headers:', error.response.headers);
      return "Error - " + error.response.data; // Return specific error message from the server
    } else if (error.request) {
      // The request was made but no response was received
      console.log('Request:', error.request);
      return "Error - No response from the server";
    } else {
      // Something else happened while setting up the request
      console.log('Error:', error.message);
      return "Error - " + error.message;
    }
  }
};


export const getMapData = async () =>
  await axios
    .get("/get_map_data")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getHostelwiseStudents = async () =>
  await axios
    .get("/hostel_wise_students_count")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const getHostelwiseStaff = async () =>
  await axios
    .get("/hostel_wise_staff_count")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
