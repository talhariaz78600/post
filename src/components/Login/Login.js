import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import 'react-toastify/scss/main.scss'
import style from "./login.module.css"
import { useDispatch } from 'react-redux';
import { login } from '../../Store/authSlice';
import CryptoJS from 'crypto-js';

const serverURL = process.env.REACT_APP_SERVER_URL;
// const serverURL = process.env.SERVER_URL;
// console.log(serverURL);
const secretEnKey = process.env.REACT_APP_SECRET_ENC_KEY



export function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [inputVisible, setinputVisible] = useState(false);
  const [loginData, setloginData] = useState({
    email: '',
    password: '',

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setloginData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const encryptUserData = (data, secretKey) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey);
    return encryptedData.toString();
  }

  async function loginUser(e) {

    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(`${serverURL}/api/Admin/login`, loginData);



      if (response && response.status === 200) {
        setLoading(false)
        toast.success('Successfully Sign In')
        const admin = encryptUserData(response.data.admin, secretEnKey);
        localStorage.setItem('OMB_ADMIN_DATA', JSON.stringify({ admin, expiration: response.data.admin.sessionExpiration }));


        console.log(response.data.admin);
        dispatch(login(response.data.admin));
        navigate(`/Admin`)
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      if (error.response) {

        if (error.response.status === 400) {
          toast.error(error.response.data.message)
        } else if (error.response.status === 401) {
          toast.error(error.response.data.message)
        } else if (error.response.status === 500) {
          toast.error(error.response.data.message)
        }
      }
      else {
        toast.error("Failed to Login")
      }
    }
  }


  return (<>

    <section className="bg-white">
      <div className="container  py-2 h-100">
        <div className="row  d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8  col-lg-7 col-xl-6">
            <img
              width={"100%"}
              height={"100%"}
              src="/login2.png"
              className="img-fluid"
              alt="Phoneimage"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-lg-1">
            <form onSubmit={loginUser}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
                <input
                  required
                  type="email"
                  name='email'
                  onChange={handleInputChange}
                  value={loginData.email}
                  id="form1Example13"
                  className="form-control form-control-lg"
                />
              </div>
              {/* <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
                <input
                  required
                  value={loginData.password}
                  onChange={handleInputChange}
                  name='password'
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                />
              </div> */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
                <div className="row g-0">
                  <div className="col-10 pe-1">
                    <input
                      required
                      value={loginData.password}
                      onChange={handleInputChange}
                      name="password"
                      type={inputVisible ? 'text' : 'password'}
                      id="form1Example23"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div onClick={() => { setinputVisible(!inputVisible) }} className="  col-2 ps-1 d-flex align-items-center justify-center">
                    {inputVisible ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className=" bi bi-eye-slash cursor-pointer" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                      </svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-eye cursor-pointer" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    }
                  </div>
                </div>
              </div>




              <button type="submit" className={style.buttonLogin}>
                Sign in
              </button>


            </form>
          </div>
        </div>
      </div>
    </section>

    {loading &&
      <div className={style.backdrop}>
        <div className={style.spinner}>
        </div>

      </div>}

  </>);
}
