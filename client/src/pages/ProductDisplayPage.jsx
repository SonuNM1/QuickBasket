/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryAPI";
import Axios from "../util/Axios";
import AxiosToastError from "../util/AxiosToastError";
import {FaAngleRight, FaAngleLeft} from 'react-icons/fa6'
import DisplayPriceInRupees from '../util/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import { priceWithDiscount } from "../util/PriceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";



const ProductDisplayPage = () => {
  const params = useParams();

  let productId = params?.product?.split("-")?.slice(-1)[0];

  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);

  const imageContainer = useRef()

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2">

    {/* Left part  */}

      <div className="">
    
        <div className="bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
          <img
            src={data.image[image]}
            className="w-full h-full object-scale-down"
          />
        </div>

        <div className="flex items-center justify-center gap-3 my-2">
          {
            data.image.map((img, index) => {
            return (
              <div
                key={img+index+'point'}
                className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${
                  index === image && "bg-slate-300"
                }`}
              ></div>
            );
          })}
        </div>

        <div className="grid relative">

          <div 
          ref={imageContainer}
          className="flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none">
            {
              data.image.map((img, index) => {
              return (
               <div className="w-20 h-20 min-h-20 min-w-20  cursor-pointer shadow-md"
               key={img+index}
               >
                <img
                  src={img}
                  alt='min-product'
                  onClick={()=> setImage(index)}
                  className="w-full h-full object-scale-down"
                />
               </div> 
              )
            })
            }
          </div>

          <div className="w-full -ml-3 h-full flex justify-between absolute items-center">

            <button 
            onClick={handleScrollLeft}
            className="z-10 bg-white p-1 rounded-full relative shadow-lg">
              <FaAngleLeft/>
            </button>
          
            <button 
            onClick={handleScrollRight}
            className="z-10 bg-white p-1 rounded-full relative shadow-lg">
              <FaAngleRight/>
            </button>

          </div>
        </div>

        <div>
          
        </div>

              {/* Product details */}

        <div className="my-4 hidden lg:grid gap-3">
        
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data.description}</p>
          </div>
        
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data.unit}</p>
          </div>

          {
            data?.more_details && Object.keys(data?.more_details).map((element, index)=> {
              return (
                <div key={index}>
                  <p className="font-semibold">{element}</p>
                  <p className="text-base">{data?.more_details[element]}</p>
          </div>
              )
            })
          }

        </div>

      </div>

            {/* Right part */}

      <div className="p-4 lg:pl-7 text-base lg:text-lg">

        <p className="bg-green-100 w-fit px-2 rounded-full">10 Min</p>

        <h2 className="text-lg font-semibold lg:text-3xl">{data.name}</h2>
      
        <p className="">{data.unit}</p>

        <Divider/>

        <div>
          <p className="">Price</p>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="border border-green-600 px-4 py-2  rounded bg-green-50 w-fit">
              <p className="font-semibold text-lg lg:text-sl">{DisplayPriceInRupees(priceWithDiscount(data.price, data.discount))}
              </p>
            </div>
            {
              data.discount && (
                <p className="line-through">{DisplayPriceInRupees(data.price)}</p>
              )
            }
            {
              data.discount && (
                <p className="font-bold text-green-600 lg:text-2xl" >{data.discount}% <span className="text-base text-neutral-500">Discount</span></p>
              )
            }
          </div>
        </div>

        {
          data.stock === 0 ? (
            <p className="text-lg text-red-500 my-2">Out of Stock</p>
          ) : (
            <button className="my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded">
            Add to Cart

            <div className="my-4">
            <AddToCartButton
              data={data}
            />
            </div>

        </button>
          )
        }

        <h2 className="font-semibold">Why shop form QuickBasket?</h2>

        <div>

          <div className="flex items-center gap-4 my-4">
            <img
              src={image1}
              alt='superfast delivery'
              className="w-20 h-20"
            />

            <div className="text-sm">

              <div className="font-semibold">Superfast Delivery</div>

              <p>Experience quick and convenient home delivery.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 my-4">
            <img
              src={image2}
              alt='Best prices offers'
              className="w-20 h-20"
            />

            <div className="text-sm">
              <div className="font-semibold">Best Value & Exciting Offers</div>

              <p>Quality products, great prices, and exclusive deals in one place.</p>
            </div>
          </div> 

          <div className="flex items-center gap-4 my-4">
            <img
              src={image3}
              alt='Wide Assortment'
              className="w-20 h-20"
            />

            <div className="text-sm">
              <div className="font-semibold">All-in-One Shopping</div>

              <p>Discover thousands of products tailored to meet your everyday essentials</p>
            </div>
          </div> 

        </div>

        {/* Only for mobile */}

        <div className="my-4 grid gap-3">
        
        <div>
          <p className="font-semibold">Description</p>
          <p className="text-base">{data.description}</p>
        </div>
      
        <div>
          <p className="font-semibold">Unit</p>
          <p className="text-base">{data.unit}</p>
        </div>

        {
          data?.more_details && Object.keys(data?.more_details).map((element, index)=> {
            return (
              <div key={index}>
                <p className="font-semibold">{element}</p>
                <p className="text-base">{data?.more_details[element]}</p>
        </div>
            )
          })
        }

      </div>

      </div>
    </section>
  );
};

export default ProductDisplayPage;