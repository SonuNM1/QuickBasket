
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../util/Axios";
import SummaryApi from "../common/SummaryAPI";
import AxiosToastError from "../util/AxiosToastError";
import {Link, useNavigate} from 'react-router-dom'
import fetchUserDetails from '../util/FetchUserDetails'
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";


const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      })

      if(response.data.error){
        toast.error(response.data.message)
      }

      if(response.data.success){
        toast.success(response.data.message)

        localStorage.setItem('accessToken', response.data.data.accessToken)
        localStorage.setItem('refreshToken', response.data.data.refreshToken)
  
        const userDetails = await fetchUserDetails()

        dispatch(setUserDetails(userDetails.data))

        setData({
          email: '',
          password: ''
        })

        navigate('/')

      }

    }catch(error){
      AxiosToastError(error)
    }

  }

  return (
    <section className=" w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">

        <form className="grid gap-4 py-4"
        onSubmit={handleSubmit}
        >

          <div className="grid gap-1">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              autoFocus
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200 "
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password">Password : </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200 " >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoFocus
                className="w-full outline-none"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />

              <div onClick={() => setShowPassword(prev => !prev)} className="cursor:pointer" >
              {
                showPassword ? <FaRegEye /> : <FaRegEyeSlash />
              }
              </div>
            </div>

              <Link 
              to={'/forgot-password'} className="block ml-auto hover:text-primary-200" 
              >
              Forgot Password ?
              </Link>

          </div>

           <button 
           disabled={!validValue} className={`${validValue ? 'bg-green-800 hover:bg-green-700 ' : 'bg-gray-500'} text-white py-2 rounded font-semibold my-3 tracking-wide`} >
            Login
           </button>   

        </form>

        <p>
          Don't have account ? <Link to={'/register'}
          className="font-semibold  text-green-700 hover:text-green-800"
          >Register</Link>
        </p>

      </div>
    </section>
  );
};

export default Login;


// 4.32