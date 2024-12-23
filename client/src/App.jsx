import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./util/FetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import {
  setAllCategory,
  setallSubCategory,
  setLoadingCategory,
} from "./store/productSlice";
import SummaryApi from "./common/SummaryAPI";
import Axios from "./util/Axios";
import AxiosToastError from "./util/AxiosToastError";
import GlobalProvider from "./provider/GlobalProvider";
import CartMobileLink from "./components/CartMobile";

function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();

    dispatch(setUserDetails(userData.data));
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));

      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
        // setCategoryData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setallSubCategory(responseData.data));
        // setCategoryData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    // fetchCartItem()
  }, []);

  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      <CartMobileLink />
    </GlobalProvider>
  );
}

export default App;
