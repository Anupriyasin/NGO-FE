import AppRoutes from './Routes/Approutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import { useState, useEffect } from 'react';
import './offline.css';

function App() {

  const { t } = useTranslation();
  document.title = t('Mangla Pumps');

  useEffect(() => {
    i18next.changeLanguage(localStorage.getItem('selectedLanguage'));
  }, [])

  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    function handleOnlineStatus() {
      setIsOnline(window.navigator.onLine);
    }

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  return (
    <div>
      {
        isOnline ?
          <div>
            < ToastContainer position="top-center" autoClose={3000} theme="dark" />
            <AppRoutes />
          </div >
          :
          <div className="main-wrapper offline">
            <div class="wrapper">
              <h1>OFFLINE</h1>
              <h4>Please check your internet connection</h4>
              <a href="." class="button">RETRY</a>
            </div>
          </div>
      }
    </div>
  );
}

export default App;
