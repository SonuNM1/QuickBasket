/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../util/Axios";
import SummaryApi from "../common/SummaryAPI";
import AxiosToastError from "../util/AxiosToastError";
import fetchUserDetails from "../util/FetchUserDetails";
import { setUserDetails } from "../store/userSlice";


const Profile = () => {

    const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);

  const [userData, setUserData] = useState({
    name: user.name , 
    email: user.email, 
    mobile: user.mobile
  })

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setUserData({
        name: user.name , 
        email: user.email, 
        mobile: user.mobile
    })
  },[])

  const handleOnChange = async (e) => {
    const {name, value} = e.target 

    setUserData((prev)=>{
        return{
            ...prev, 
            [name] : value
        }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    try{
        setLoading(true)

        const response = await Axios({
            ...SummaryApi.updateUserDetails, 
            data: userData
        })

        const {data: responseData} = response 

        if(responseData.success){
            toast.success(responseData.message)

            const userData = await fetchUserDetails()

            dispatch(setUserDetails(userData.data))
        }

    }catch(error){
        AxiosToastError(error)
    } finally{
        setLoading(false)
    }
  }

  return (
    <div>
      {/* Profile upload and display image  */}

      <div className="w-20 h-20 bg-red-500 flex items-center justify-center overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} className="w-full h-full" />
        ) : (
          <FaRegUserCircle size={60} />
        )}
      </div>

      <button
        onClick={() => setProfileAvatarEdit(true)}
        className="text-xs min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 border-rounded-full mt-3"
      >
        Edit
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
      )}

      {/* Name, mobile, email, change password */}

      <form className="my-4 grid gap-4" onSubmit={handleSubmit} >

        <div className="grid">
          <label>Name</label>
          <iinput type="text" placeholder="Enter your name" 
          className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
          value={userData.name}
          name='name'
          onChange={handleOnChange}
          required
          />
        </div>

        <div className="grid">
          <label htmlFor="email">Email</label>
          <input 
          type="email"
          id="email" 
          placeholder="Enter your email" 
          className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
          value={userData.email}
          name='email'
          onChange={handleOnChange}
          required
          />
        </div>

        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input 
          type="text"
          id="mobile" 
          placeholder="Enter your mobile number" 
          className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
          value={userData.mobile}
          name='mobile'
          onChange={handleOnChange}
          required
          />
        </div>

        <button
        className="border px-4 py-2 font-semibold rounded-sm hover:bg-primary-100 border-primary-100 text-primary-200 hover:text-neutral-800 "
        >
        {
            loading ? 'Loading...' : 'Submit'
        }
        </button>

      </form>
    </div>
  );
};

export default Profile;