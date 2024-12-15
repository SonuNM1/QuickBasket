/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryAPI";
import AxiosToastError from "../util/AxiosToastError";
import Axios from "../util/Axios";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1)

  const fetchProductData = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleNext = () =>{
    if(page !== totalPageCount){
      setPage(prev => prev+1)
    }
  }

  const handlePrevious = () =>{
    if(page > 1){
      setPage(prev => prev-1)
    }
  }

  return (
    <section className="">
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Product</h2>
      </div>
      {loading && <Loading />}

      <div className="p-4 bg-blue-50 grid ">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {productData.map((p, index) => {
            return <ProductCardAdmin data={p} />;
          })}
        </div>

        <div className="flex justify-between my-4">

          <button 
          onClick={handlePrevious}
          className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Previous</button>
        
          <button className="w-full bg-slate-100">{page}/{totalPageCount}</button>

          <button 
          onClick={handleNext}
          className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Next</button>

        </div>  

      </div>
    </section>
  );
};

export default ProductAdmin;
