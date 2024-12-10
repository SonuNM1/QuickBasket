import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Toaster} from 'react-hot-toast' ; 
import { useEffect } from "react";
import fetchUserDetails from "./util/FetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import { setAllCategory } from "./store/productSlice";
import SummaryApi from "./common/SummaryAPI";
import Axios from "./util/Axios";


function App() {

  const dispatch = useDispatch()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()

    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
    try{
       
        const response = await Axios({
          ...SummaryApi.getCategory
        })

        const {data: responseData} = response 

        if(responseData.success){
          dispatch(setAllCategory(responseData.data))
          // setCategoryData(responseData.data)
        }

    }catch(error){
      AxiosToastError(error)
    }finally{
        setLoading(false)
    }
  }

  useEffect(()=>{
    fetchUser()
    fetchCategory()
  },[])

  return (
    <>
      <Header />
      <main className='min-h-[78vh]' >
        <Outlet />
      </main>
      <Footer/>
      <Toaster/>
    </>
  );
}

export default App;
