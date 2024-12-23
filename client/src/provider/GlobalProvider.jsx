
/* eslint-disable no-unused-vars */

import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../util/Axios";
import SummaryApi from "../common/SummaryAPI";
import { useDispatch, useSelector } from "react-redux";
import {handleAddItemCart} from '../store/cartProduct'
import AxiosToastError from '../util/AxiosToastError'
import toast from "react-hot-toast";
import PriceWithDiscount, { priceWithDiscount } from '../util/PriceWithDiscount'


export const GlobalContext = createContext(null)

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children}) => {

    const dispatch = useDispatch()

    const [totalPrice, setTotalPrice] = useState(0)
    const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)

    const cartItem = useSelector(state => state.cartItem.cart)

    const fetchCartItem = async () => {
        try{
          
          const response = await Axios({
            ...SummaryApi.getCartItem
          })
    
          const {data : responseData} = response 
    
          if(responseData.success){
            dispatch(handleAddItemCart(responseData.data))
            console.log(responseData)
          }
    
        }catch(error){
          console.log(error)
        }
      }

    const updateCartItem = async (id, qty) => {
      try{

        const response = await Axios({
          ...SummaryApi.updateCartItemQty, 
          data: {
            _id : id, 
            qty : qty
          }
        })

        const {data: responseData} = response 

        if(responseData.success){
          // toast.success(responseData.message)

          fetchCartItem()

          return responseData
        }

      }catch(error){
        AxiosToastError(error)
        return error
      }
    }

    const deleteCartItem = async (cartId) => {
      try{

        const response = await Axios({
          ...SummaryApi.deleteCartItem, 
          data : {
            _id : cartId
          }
        })

        const {data : responseData} = response 

        if(responseData.success){
          toast.success(responseData.message)

          fetchCartItem()
        }

      }catch(error){
        AxiosToastError(error)
      }
    }

    useEffect(()=> {
      fetchCartItem()
    }, [])


    useEffect(()=> {
    
      const qty = cartItem.reduce((prev, curr)=> {
        return prev + curr.quantity
      }, 0)
  
      setTotalQty(qty)
  
      const tPrice = cartItem.reduce((prev, curr)=> {

        const priceAfterDiscount = priceWithDiscount(curr?.productId?.price, curr?.productId?.discount)

        return prev + (priceAfterDiscount * curr.quantity)
      }, 0)
  
      setTotalPrice(tPrice)

      const notDiscountPrice = cartItem.reduce((prev, curr)=> {
        return prev + (curr?.productId?.price * curr.quantity)
      }, 0)
  
      setNotDiscountTotalPrice(notDiscountTotalPrice)

    }, [cartItem])

    return (
        <GlobalContext.Provider value={{
          fetchCartItem, 
          updateCartItem, 
          deleteCartItem, 
          totalPrice, 
          totalQty,
          notDiscountTotalPrice
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider

// 8.50