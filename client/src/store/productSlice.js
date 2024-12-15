
/* eslint-disable no-unused-vars */

import {createSlice} from '@reduxjs/toolkit'

const initialValue = {
    allCategory: [] , 
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
        setallSubCategory :(state, action) =>{
            state.allSubCategory = [...action.payload]
        }
    }
})

export const {setAllCategory, setallSubCategory} = productSlice.actions 

export default productSlice.reducer 