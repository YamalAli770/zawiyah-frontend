import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { BsFillBoxSeamFill } from 'react-icons/bs'
import OrderProgressBar from './OrderProgressBar'
import { useParams } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { toast } from 'react-toastify'
import { API_URL, TOAST_CONFIG, TRIANGLE_LOADER_CONFIG } from '../../config'
import { Triangle } from 'react-loader-spinner'

const Order = () => {
  const axiosPrivate = useAxiosPrivate();

  const { id } = useParams();
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchOrder = async () => {
        try {
            const response = await axiosPrivate.get(`${API_URL}/api/order/${id}`);

            if(response.data) {
                setOrderData(response.data);
                console.log(response.data);
                setLoading(false);
            }
        } catch (error) {
            toast.error(error, TOAST_CONFIG)
            setLoading(false);
        }
    };

    fetchOrder();
  }, [])

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  return (
    <>
        { loading ? <div className="flex justify-center items-center text-center"><Triangle height={569} width={300} color="white" ariaLabel="triangle-loading" wrapperStyle={{}} visible={true} /></div> : orderData && orderData.orderProducts && orderData.orderDetails && <div className='container px-5 py-24 pb-6 mx-auto min-h-screen flex flex-col'>
            <div className="flex justify-between">
                <div className='flex gap-4 items-end'>
                    <span className='text-2xl'>Order#{id}</span>
                    <a href="" className='flex items-center gap-1 text-white hover:brightness-50'>View invoice <AiOutlineArrowRight /></a>
                </div>
                <span>Order placed <span className='text-white'>{formatDate(orderData.createdAt)}</span></span>
            </div>
            <div className="grid grid-cols-10 gap-16">
                {/* Left */}
                <div className="left col-span-7">
                    <div className="product-cards my-4">
                        { orderData.orderProducts.map((product) => {
                            return (
                                <div className="product flex justify-between border-b pb-8 pt-4" key={product._id}>
                                    <div className="product-image-details flex gap-4">
                                        <div className="product-image w-28 h-28">
                                            <img src={`${product.image}`} alt="" className='w-full h-full roundeds' />
                                        </div>
                                        <div className="product-details flex flex-col gap-1">
                                            <h2 className="product-name text-white">{product.name}</h2>
                                            <span className="product-brand">{product.brand}</span>
                                            <span className="product-color">{product.color}</span>
                                        </div>
                                    </div>
                                    <span className="product-price text-white">
                                        ${product.price}.00
                                    </span>
                                </div> )})}
                    </div>
                    <div className='details-status flex gap-6'>
                        <div className="amount-shipping-payment flex flex-col text-white bg-gray-700 p-4 w-1/2">
                            <h3 className='text-customText text-2xl mb-2'>Summary</h3>
                            <div className="sub-total flex justify-between border-b pb-2">
                                <span className=''>Subtotal</span>
                                <span>${orderData.orderTotal}</span>
                            </div>
                            <div className="shipping flex justify-between border-b py-2">
                                <span className=''>Shipping</span>
                                <span>{orderData.orderDetails.deliveryMethod.toUpperCase()}</span>
                            </div>
                            <div className="payment-method flex justify-between pt-2">
                                <span className=''>Payment Method</span>
                                <span>{orderData.orderDetails.paymentMethod.toUpperCase()}</span>
                            </div>
                        </div>
                        <div className="carrier w-1/2 bg-gray-700 flex flex-col gap-4 p-4">
                            <h3 className='text-customText text-2xl mb-2'>Carrier</h3>
                            <div className="carrier-details flex justify-between">
                                <div className="carrier-icon-name flex items-center gap-4 text-white">
                                    <BsFillBoxSeamFill size={25} color='red' />
                                    <div className="carrier-name">
                                        <h3>DPD Delivery</h3>
                                        <span>Delivery within 24 Hours</span>
                                    </div>
                                </div>
                                <span className="carrier-charges text-white">$8.00</span>
                            </div>
                            <button className='bg-customButtonBg text-customButtonText p-2 hover:brightness-50 transition-all'>View Carrier Details</button>
                        </div>
                    </div>
                </div>
                {/* Right */}
                <div className="right col-span-3">
                    <div className="customer-details-address my-4 flex flex-col gap-4 bg-gray-700 p-4">
                        <h2 className='text-2xl'>Customer</h2>
                        <div className="customer-details flex flex-col">
                            <div className="customer-image-name-email flex gap-2 items-center pb-6">
                                <div className="customer-image w-12 h-12">
                                    <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="" className='w-full h-full' />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="name text-white">{`${orderData.orderDetails.firstName} ${orderData.orderDetails.lastName}`}</h4>
                                    <span className="email">david89@gmail.com</span>
                                </div>
                            </div>
                        </div>
                        <div className="shipping-address flex flex-col gap-4">
                            <h2 className='text-2xl'>Shipping Address</h2>
                            <span className="address text-white">
                                {orderData.orderDetails.apartment} {orderData.orderDetails.address}<br />{orderData.orderDetails.city} {orderData.orderDetails.country}, {orderData.orderDetails.postalCode}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer - Order Status */}
            <div className="order-status">
                <h1 className='text-2xl py-8'>Order Status</h1>
                <OrderProgressBar status={`${orderData.orderStatus}`} />
            </div>
        </div>}
    </>
  )
}

export default Order