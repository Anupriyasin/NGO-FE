import axios from "./constant";

axios.defaults.withCredentials = true;

export const getAllInvoice = async (data) =>
  await axios
    .post("/sales_invoice_details", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const invoiceDetailsById = async (data) =>
  await axios
    .post(`/sales_invoice_details_by_id`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const orderReports = async (data) =>
  await axios
    .post("/sales_order_details")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const product_series_types = async (data) =>
  await axios
    .get("/product_series_types")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const get_products = async (data) =>
  await axios
    .get("/get_products", {
      params: { 
        categoryID: data.categoryID,
        searchKey: data.searchKey,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const get_product_details = async (id) =>
  await axios
    .get(`/product_details_by_id/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const get_cart_items = async (id) =>
  await axios
    .get(`/get_cart_items`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const add_product_to_cart = async (data) =>
  await axios
    .post("/add_product_to_cart", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const update_product_quantity = async (data) => {
  return axios
    .post("/update_product_quantity", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
};

export const update_product_quantity_by_admin = async (data) => {
  return axios
    .post("/update_product_quantity_by_admin", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
};

export const remove_product_from_cart = async (data) =>
  await axios
    .post("/remove_product_from_cart", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const view_product_image = async (data) =>
  await axios
    .get("/view_product_image", {
      params: {
        item_code: data.product_id,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const upload_product_image = async (data) =>
  await axios
    .post("/upload_product_image", data, {
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

export const get_orders_placed_by_dealers = async (switchValue, sortBy) =>
  await axios
    .get("/get_orders_placed_by_dealers", {
      params: {
        status: switchValue === 'all' ? "" : switchValue,
        sortBy: sortBy,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const accept_order = async (data) =>
  await axios
    .post("/accept_order", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const reject_order = async (data) =>
  await axios
    .post("/reject_order", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const place_order = async (data) =>
  await axios
    .post("/place_order_from_dealer_cart", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const get_today_orders = async (data) =>
  await axios
    .get("/get_today_orders", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const best_performance_and_sales_admin = async (data) =>
  await axios
    .post("/best_performance_and_sales_admin", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const best_performance_and_sales_dealer = async (data) =>
  await axios
    .post("/best_performance_and_sales_dealer", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const get_purchase_orders = async (data) =>
  await axios
    .get("/get_purchase_orders", { data })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const get_purchase_order_details = async (data) =>
  await axios
    .post(`/get_purchase_order_details`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const dealer_data_count = async (id) =>
  await axios
    .get(`/dealer_data_count`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const admin_data_count = async (id) =>
  await axios
    .get(`/admin_data_count`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const upload_unprocessed_file = async (data) =>
  await axios
    .post("/upload_unprocessed_file", data, {
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