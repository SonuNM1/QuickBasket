
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryAPI'
import AxiosToastError from '../util/AxiosToastError'
import Axios from '../util/Axios'

const Product = () => {

    const [productData, setProductData] = useState([])
    const [page, setPage] = useState(1)

    const fetchProductData = async () =>{
        try{
            const response = await Axios({
                ...SummaryApi.getProduct , 
                data: {
                    page: page
                }
            }) 

            const {data : responseData} = response 

            if(responseData.success){
                setProductData(responseData.data) 
            }

        }catch(error){
            AxiosToastError(error)
        }
    }

    useEffect(()=>{
        fetchProductData()
    }, [])

  return (
    <div>
      
    </div>
  )
}

export default Product
