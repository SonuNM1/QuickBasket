
/* eslint-disable no-unused-vars */

import React, { isValidElement, useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../util/Axios'
import SummaryApi from '../common/SummaryAPI'
import toast from 'react-hot-toast'
import AxiosToastError from '../util/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import {FaMinus, FaPlus} from 'react-icons/fa6'

const AddToCartButton = ({data}) => {

    const {fetchCartItem, updateCatItem, deleteCartItem} = useGlobalContext()

    const [loading, setLoading] = useState(false)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemDetails] = useState()


    const cartItem = useSelector(state => state.cartItem.cart)

    const handleAddToCart = async (e) => {
    
          e.preventDefault()
          e.stopPropagation()
    
          try{
            
            setLoading(true)
    
            const response = await Axios({
              ...SummaryApi.addToCart, 
              data: {
                productId: data?._id
              }
            })
    
            const {data: responseData} = response 
    
            if(responseData.success){
              toast.success(responseData.message)
    
              if(fetchCartItem){
                fetchCartItem()
              }
            }
    
          }catch(error){
            AxiosToastError(error)
          }
          finally{
            setLoading(false)
          }
    }

    // checking item is in cart or not 

    useEffect(()=> {
        
        const checkingiItem = cartItem.some(item => item.productId._id === data._id)

        setIsAvailableCart(checkingiItem)

        const product = cartItem.find(item =>item.productId._id === data._id)

        setQty(product?.quantity)
        setCartItemDetails(product)

    }, [data, cartItem])


    const increaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const response = await updateCatItem(cartItemDetails?._id, qty+1)

        if(response.success){
          toast.success('Item added to cart')
        }
    }

    const decreaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if(qty === 1){
            deleteCartItem(cartItemDetails?._id)
        }else{
            const response = await updateCatItem(cartItemDetails?._id, qty-1)

            if(response.success){
              toast.success('Item removed from cart')
            }
        }

    }

  return (
    <div className='w-full max-w-[150px]'>
    {
        isAvailableCart ? (
            <div className='flex w-full h-full'>

                <button onClick={decreaseQty}
                className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'
                >
                    <FaMinus/>
                </button>
            
                <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>
            
                <button onClick={increaseQty}
                className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'
                >
                    <FaPlus/>
                </button>
            </div>
        ) : (
            <button 
            onClick={handleAddToCart}
            className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded '>
                {
                    loading ? <Loading/> : 'Add'
                } 
            </button>
        )
    }
    </div>
  )
}

export default AddToCartButton

