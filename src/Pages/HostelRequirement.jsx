import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useForm } from "react-hook-form";
import "sweetalert2/dist/sweetalert2.min.css";
import "../components/Table/Table.css";
import TopLoader from "../components/Loader/TopLoader";
import "react-responsive-modal/styles.css";
import { Modal, Button, Checkbox } from "@mui/material";
import { toast } from "react-toastify";
import {
  subassets,
  getAssetsName,
  AddAsset,
  Assetnameinfo,
  AddHostelRequirement,
  getdistrictName,
  getallDistricts,
} from "../api/Users";

const HostelRequirement = (props) => {
  const { t } = useTranslation();
  const handleClick = (e) => {
    i18next.changeLanguage(e.target.value);
  };

  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [type, setType] = useState("view");

  const [ExistAssetsType, setExistAssetsType] = useState([]);
  const [AssetsType, setAssetsType] = useState([]);
  const [AssetsTypes, setAssetsTypes] = useState([]);
  const [DistrictData, setDistrictData] = useState([]);
  const [AssetsSubTypes, setAssetsSubTypes] = useState([]);
  const [CategoryHandle, setCategoryHandle] = useState([]);
  const [AssetSubtype, setAssetSubtype] = useState([]);
  const [IntakeHandle, setIntakeHandle] = useState([]);
  const [NameHandle, setNameHandle] = useState("");
  const [QuantityHandle, setQuantityHandle] = useState("");
  const [DisHandle, setDisHandle] = useState("");
  const [TentativeAmount, setTentativeAmount] = useState("");
  const [DateHandle, setDateHandle] = useState("");
  const [UnitsHandle, setUnitsHandle] = useState("");
  const [GstHandle, setGstHandle] = useState("");
  const [TotalAmountHandle, setTotalAmountHandle] = useState("");
  const [markRequired, setMarkRequired] = useState(true);
  const [ExistNameHandle, setExistNameHandle] = useState("");
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const label = { inputProps: { "aria-label": "Urgent" } };

  useEffect(() => {
    debugger;
    getAssetsName()
      .then((res) => {
        if (res.status === "success") {
          console.log("Assets data:", res.data);
          setAssetsTypes(res.data);
          setExistAssetsType(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching assets:", err);
      });
  }, []);
  useEffect(() => {
    debugger;
    getallDistricts()
      .then((res) => {
        if (res.status === "success") {
          console.log("Assets data:", res.data);
          setDistrictData(res.data);
          // setExistAssetsType(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching assets:", err);
      });
  }, []);
  console.log("AssetsTypes.////", AssetsTypes);
  console.log("ExistAssetsType.////", ExistAssetsType);

  useEffect(() => {
    fetchLocation();
  }, []);

  const AssetTypehandle = async (e) => {
    debugger;
    const newAssetType = e.target.value;
    setAssetsType((prevRow) => ({
      ...prevRow,
      asset_type: newAssetType,
    }));
    console.log("AssetsType", AssetsType);
    try {
      const response = await subassets({ asset_id: newAssetType });
      if (response) {
        setAssetsSubTypes(response.data);
      } else {
        console.error("Invalid response format for subassets:", response);
      }
    } catch (error) {
      console.error("Error fetching subassets:", error);
    }
  };

  const form1 = useForm();
  const form2 = useForm();

  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    formState: { errors: errorsForm1 },
  } = form1;
  const {
    register: registerForm2,
    formState: { errors: errorsForm2 },
  } = form2;

  const categoryHandle = (event) => {
    setCategoryHandle(event.target.value);
  };
  const quantityHandle = (event) => {
    setQuantityHandle(event.target.value);
  };

  const disHandle = (event) => {
    setDisHandle(event.target.value);
  };
  const TentativeAmountHandle = (event) => {
    setTentativeAmount(event.target.value);
  };

  const AssetSubtypehandle = async (e) => {
    debugger;
    // setExistAssetsSubTypes(e.target.value);
    const ExistAssetType = e.target.value;
    setAssetSubtype((prevRow) => ({
      ...prevRow,
      asset_sub_type: ExistAssetType,
    }));
    const Assetstype = AssetsType;

    try {
      const response = await Assetnameinfo({
        asset_id: Assetstype.asset_type,
        asset_sub_type_id: ExistAssetType,
      });
      if (response) {
        setExistNameHandle(response.data);
      } else {
        console.error("Invalid response format for subassets:", response);
      }
    } catch (error) {
      console.error("Error fetching subassets:", error);
    }
  };
  const ExistnameHandle = async (e) => {
    debugger;
    const ExistAssetname = e.target.value;
    setExistNameHandle((prevRow) => ({
      ...prevRow,
      asset_sub_type: ExistAssetname,
    }));
  };
  const districtHandle = (e) => {
    debugger;
    const selectedDistrictId = e.target.value;
    const selectedDistrict = DistrictData.find(district => district.id === selectedDistrictId);
    if (selectedDistrict) {
        setDistrictData(selectedDistrict);
    } else {
        // Handle the case where the selected district is not found
        console.error("Selected district not found");
    }
};


  const fetchLocation = () => {
    debugger;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmitForm = async (event) => {
    debugger;
    event.preventDefault();
    console.log("quntity:", QuantityHandle);

    const Postdata = {
      category: CategoryHandle,
      asset_type_id: AssetsType.asset_type,
      asset_sub_type_id: AssetSubtype.asset_sub_type,
      asset_name: ExistNameHandle.asset_sub_type,
      quantity: QuantityHandle,
      description: DisHandle,
      lat: latitude,
      longitude: longitude,
      tentative_amount: TentativeAmount,
    };

    AddHostelRequirement(Postdata)
      .then((response) => {
        toast.success(response.message);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error rejecting requirement:", error);
        toast.error(
          error.response?.data?.message || "Failed to reject requirement"
        );
      });
  };

  return (
    <>
      <TopLoader loading={isLoading ? "50" : "100"} />
      <div className="px-2 px-md-4">
        <h5 className="my-4">{t("Raise Requirement")}</h5>

        <form
          onSubmit={(e) => handleSubmitForm(e)}
          id="myform1"
          style={{ marginTop: "12px" }}
        >
          <div className="row">
            <div className="col-md-4">
              <label className="form-label">
                {t("Category")}{" "}
                {markRequired && <span style={{ color: "red" }}>*</span>}
              </label>
              <select
                name="category"
                onChange={categoryHandle}
                value={CategoryHandle}
                className="common-input form-select"
                required
              >
                <option value="">{t("Select Category")}</option>
                <option value="consumable">Consumable</option>
                <option value="non-consumable">Non Consumable</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">
                {t("Inventory Type")}{" "}
                {markRequired && <span style={{ color: "red" }}>*</span>}
              </label>
              <select
                name="asset_type_id"
                // value={AssetsType}
                className="common-input form-select"
                onChange={AssetTypehandle}
                required
              >
                <option value="">{t("Select Inventory Type")}</option>
                {/* Map assetOptions to generate option elements */}
                {AssetsTypes.assets_name &&
                  AssetsTypes.assets_name.map((row) => (
                    <option key={row.asset_id} value={row.asset_id}>
                      {row.asset_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">
                {t("Inventory Sub Type")}{" "}
                {markRequired && <span style={{ color: "red" }}>*</span>}
              </label>
              <select
                name="asset_sub_type_id"
                // value={AssetSubtype}
                onChange={AssetSubtypehandle}
                className="common-input form-select"
                required
              >
                <option value="">{t("Select Inventory Sub Type")}</option>

                {AssetsSubTypes.new_asset_query &&
                  AssetsSubTypes.new_asset_query.map((row) => (
                    <option key={row.id} value={row.id}>
                      {row.asset_sub_type_name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-4">
              <label className="form-label">
                {t("Inventory Name")}{" "}
                {markRequired && <span style={{ color: "red" }}>*</span>}
              </label>
              <select
                name="asset_name"
                // value={ExistNameHandle}
                onChange={ExistnameHandle}
                className="common-input form-select"
              >
                <option value="">{t("Select Inventory Name")}</option>
                {ExistNameHandle.asset_name &&
                  ExistNameHandle.asset_name.map((row) => (
                    <option key={row.asset_name} value={row.asset_name}>
                      {row.asset_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">
                {t("Inventory Quantity")}{" "}
                {markRequired && <span style={{ color: "red" }}>*</span>}
              </label>
              <input
                type="text"
                name="asset_quantity"
                value={QuantityHandle}
                className="form-control"
                onChange={quantityHandle}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">
                {t("Tentative Amount")}{" "}
                {markRequired && <span style={{ color: "red" }}>*</span>}
              </label>
              <input
                type="text"
                name="tentative_amount"
                value={TentativeAmount}
                className="form-control"
                onChange={TentativeAmountHandle}
                required
              />
            </div>

            {/* <div className="col-md-4 mt-sm-4">
              <button type="button" className="btn me-2 text-white fw-bold border border-1" style={{backgroundColor: "green"}} onClick={fetchLocation}>
                Save my Location
              </button>
            </div> */}
          </div>
          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-4">
              <label className="form-label">{t("Description")}</label>
              <textarea
                style={{ height: "100px", resize: "none" }}
                className="form-control"
                name="description"
                value={DisHandle}
                onChange={disHandle}
              ></textarea>
            </div>
            <div className="col-md-4">
              <label className="form-label">{t("District")}</label>
              <select
                name="district_name"
                // value={ExistNameHandle}
                onChange={districtHandle}
                className="common-input form-select"
              >
                <option value="">{t("Select District")}</option>
                {DistrictData &&
                  DistrictData.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.district_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">{t("Block")}</label>
              <select
                name="block"
                // value={ExistNameHandle}
                // onChange={ExistnameHandle}
                className="common-input form-select"
              >
                <option value="">{t("Select Block")}</option>
                {/* {ExistNameHandle.asset_name && ExistNameHandle.asset_name.map((row) => (
                    <option key={row.asset_name} value={row.asset_name}>{row.asset_name}</option>
                  ))} */}
              </select>
            </div>

            {/* <div className="col-md-4 mt-sm-4">
              <button type="button" className="btn me-2 text-white fw-bold border border-1" style={{backgroundColor: "green"}} onClick={fetchLocation}>
                Save my Location
              </button>
            </div> */}
          </div>
          <div className="row" style={{ marginTop: "12px" }}>
            {props.role === 1 && (
              <div className="col-md-4">
                <label className="form-label">
                  {t("Reason For Raising")}{" "}
                  {markRequired && <span style={{ color: "red" }}>*</span>}
                </label>
                <input
                  type="text"
                  name="reason"
                  // value={TentativeAmount}
                  className="form-control"
                  // onChange={TentativeAmountHandle}
                  required
                />
              </div>
            )}
          </div>
          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-4">
              <label className="form-label">
                Mark as an <span className="fw-bold">Urgent Requirement</span>
              </label>
              <Checkbox {...label} />
            </div>
          </div>
          <div className="row mt-sm-2 mt-md-5 mb-sm-4">
            <div className="col-md-8"></div>
            <div className="col-md-4 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary me-2">
                {t("Submit")}
              </button>
              <button type="button" className="btn btn-secondary">
                {t("Clear")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default HostelRequirement;
