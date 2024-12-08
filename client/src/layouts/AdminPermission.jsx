
/* eslint-disable no-unused-vars */

import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../util/isAdmin'

const AdminPermission = ({children}) => {

    const user = useSelector(state => state.user)

  return (
    <>
        {
            isAdmin(user.role) ? children : <p className='text-red-600 bg-red-100 p-4'>Unauthorized: Admin privileges are required to access this page</p>
        } 
    </>
  )
}

export default AdminPermission
