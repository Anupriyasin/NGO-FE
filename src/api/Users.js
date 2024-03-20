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

export const updateUserDetails = async (data) =>
  await axios
    .put("/update_crm_user", data, {
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

// export const alldealers = async (data) =>
//   await axios
//     .get("/get_all_dealers", data)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return "Error - " + error;
//     });

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

export const getRejectedRequirements = async () =>
  await axios
    .get('/rejected_req')
    .then(response => {
      return response.data
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
