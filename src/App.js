import { useEffect } from 'react';
import {  Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { login , selectAdmin } from './Store/authSlice';
import { AdminDashboard } from './components/Routes/Admin Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import { RoutingCallR } from './components/Routing/routingcall';
import CryptoJS from 'crypto-js';
const secretEnKey = process.env.REACT_APP_SECRET_ENC_KEY

const App = () => {

  const storeAdmin = useSelector(selectAdmin);
  const dispatch = useDispatch();




  const decryptUserData = (data) => {
    const decryptedBytes = CryptoJS.AES.decrypt(data, secretEnKey);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;

  }

  useEffect(() => {

    if (!storeAdmin) {

      const storedData = localStorage.getItem('OMB_ADMIN_DATA');
      if (storedData) {
        const { admin, expiration } = JSON.parse(storedData);
        if (expiration > Date.now()) {
          const adminData = decryptUserData(admin);
          // console.log(userData);
          dispatch(login(adminData))
          // if (window.location.pathname !== "/Admin") {
          //   window.location.href = "/Admin";
          // }
        } else {
          localStorage.removeItem('OMB_ADMIN_DATA');
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }
      }
    }
  }, [storeAdmin, dispatch])


  return (<>

    {/* <Router> */}
    <Routes>
      {storeAdmin && <Route exact path='/Admin/*' element={<AdminDashboard />} />}
      <Route exact path='/*' element={<RoutingCallR />} />


    </Routes>
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    {/* <Loader loading={loading} /> */}

    {/* </Router> */}

  </>);
}

export default App;
