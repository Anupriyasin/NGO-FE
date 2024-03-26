import DealerCards from "../components/Cards/DealerCards";
import TodaysOrderTable from "../components/Table/TodaysOrderTable";
import "./Dashboard.css";
import { useTranslation } from "react-i18next";
import AdminCharts from "../components/Charts/AdminCharts";
import DealerCharts from "../components/Charts/DealerCharts";

const Dashboard = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="px-2 px-md-3">
        {/* <h3 className="my-4">{t("Dashboard")}</h3> */}

        {/* {props.role && props.role === 1 && ( */}
          <>
            <AdminCharts role={props.role} />
            {/* <TodaysOrderTable /> */}
          </>
        {/* )}

        {props.role && props.role === 2 && ( */}
          {/* <>
            <DealerCards />
            <DealerCharts />
          </> */}
        {/* )} */}
      </div>
    </>
  );
};

export default Dashboard;
