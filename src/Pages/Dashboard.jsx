import React, { useEffect, useState } from 'react'
// import RightSide from '../components/RigtSide/RightSide';
import AdminCards from '../components/Cards/AdminCards';
import DealerCards from '../components/Cards/DealerCards';
import TodaysOrderTable from '../components/Table/TodaysOrderTable'
import './Dashboard.css';
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import AdminCharts from '../components/Charts/AdminCharts';
import DealerCharts from '../components/Charts/DealerCharts';

const Dashboard = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="px-2 px-md-3">
        <h4 className="my-4">{t('Dashboard')}</h4>

        {props.role && (props.role === 5 || props.role === 2 || props.role === 3 || props.role === 4) &&
          <>
            {/* <AdminCards /> */}
            {/* <AdminCharts /> */}
            {/* <TodaysOrderTable /> */}
          </>
        }

        {props.role && props.role === 1 &&
          <>
            {/* <DealerCards />
            <DealerCharts /> */}
          </>
        }

      </div>
    </>
  )
}

export default Dashboard