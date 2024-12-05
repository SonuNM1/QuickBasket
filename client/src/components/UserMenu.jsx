/* eslint-disable no-unused-vars */

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../util/Axios'
import SummaryApi from '../common/SummaryAPI'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../util/AxiosToastError'


const UserMenu = ({close}) => {

    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch()

    const handleLogout = async () => {
      try{
        const response = await Axios({
          ...SummaryApi.logout
        })
        
        if(response.data.success){
          close()
          dispatch(logout())
          localStorage.clear()

          toast.success(response.data.message)
        }

      }catch(error){
        AxiosToastError(error)
      }
    }

  return (
    <div>
      <div className='font-semibold'>My Account</div>
      <div className='text-sm'>{user.name || user.mobile}</div>

      <Divider/>
      <div className='text-sm grid gap-1'>
        <Link to={''} className='px-2 hover:bg-orange-200 py-1'>My Orders</Link>
        <Link to={''} className='px-2 hover:bg-orange-200 py-1'>Save Address</Link>
        <button onClick={handleLogout} className='text-left px-2 hover:bg-orange-200 py-1'>Log Out</button>
      </div>
    </div>
  )
}

export default UserMenu

// 6.03 