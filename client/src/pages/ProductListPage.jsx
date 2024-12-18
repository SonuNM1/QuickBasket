
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../util/AxiosToastError'
import SummaryApi from '../common/SummaryAPI'
import Loading from '../components/Loading'
import Axios from '../util/Axios'
import CardProduct from '../components/CardProduct'
import {useSelector} from 'react-redux'


const ProductListPage = () => {

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] =  useState(1)

  const params = useParams()

  const AllSubCategory = useSelector(state => state.product.allSubCategory)

  const [DisplaySubCategory, setDisplaySubCategory] = useState([])

  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]


  const fetchProductData = async () => {

    try{
      setLoading(true)

      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory, 
        data: {
          categoryId: categoryId, 
          subCategoryId: subCategoryId, 
          page: page, 
          limit: 10 
        }
      })

      const {data : responseData} = response 

      if(responseData.success){

        if(responseData.page == 1){
          setData(responseData.data)
        }
        else{
          setData([
            ...data , 
            ...responseData.data
          ])
        }
        setTotalPage(responseData.totalCount)
      }

    }catch(error){
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProductData()
  }, [params])

  useEffect(()=> {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })
      return filterData ? filterData : null 
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (

    <section className='sticky top-24 lg:top-20'>
        <div className='container sticky top-24 mx-auto grid grid-cols-[90px, 1fr] md:grid-cols-[200px, 1fr] lg:grid-cols-[280px, 1fr]'>

          {/* sidebar - sub category */}

            <div className='min-h-[79vh] max-h-[79vh] overflow-y-scroll  grid gap-1 shadow-md scrollbarCustom'>
                 {
                  DisplaySubCategory.map((s, index) => {
                    return (
                      <div className='w-full p-2 bg-white'>
                        <div className='w-fit mx-auto'>
                        <img
                            src={s.image}
                            alt='subCategory'
                            className='w-14 h-full object-scale-down'
                          />
                        </div>
                        <p
                        className='-mt-6 text-xs text-center'
                        >{s.name}</p>
                      </div>
                    )
                  })
                 }
            </div>
        
          {/* Product  */}

            <div className=''>

                <div className='bg-white shadow-md p-4'>
                  <h3 className='font-semibold'>{subCategoryName}</h3>
                </div> 

                <div>

                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
                      {
                        data.map((p, index)=>{
                          return (
                            <CardProduct
                              data={p}
                              key={p._id+'productSubCategory'+index}
                            />
                          )
                        })
                      }
                    </div>


                    {
                      loading && (
                        <Loading/>
                      )
                    }
                </div>
            </div>
        </div>
    </section>
  )


}

export default ProductListPage

