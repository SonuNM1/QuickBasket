
/* eslint-disable no-unused-vars */

import {createSlice} from '@reduxjs/toolkit'

const initialValue = {
    allCategory: [] ,
    loadingCategory: false, 
    allSubCategory: [] , 
    product : []
}

const productSlice = createSlice({
    name : 'product' , 
    initialState: initialValue , 
    reducers : {
        setAllCategory : (state, action) => {
            state.allCategory = [...action.payload]
        },
        setLoadingCategory: (state, action)=>{
            state.loadingCategory = action.payload
        }, 
        setallSubCategory :(state, action) =>{
            state.allSubCategory = [...action.payload]
        }
    }
})

export const {setAllCategory, setallSubCategory, setLoadingCategory} = productSlice.actions 

export default productSlice.reducer 