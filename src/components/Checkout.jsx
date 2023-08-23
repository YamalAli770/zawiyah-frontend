import React, { useEffect, useState } from 'react'
import { useStore } from '../store'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { API_URL, TOAST_CONFIG } from '../../config';
import { toast } from 'react-toastify';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const cart = useStore((state) => state.cart);
  const deleteCart = useStore((state) => state.deleteCart);
  const auth = useStore((state) => state.auth);

  // ! Check if user has redirected from cart
  useEffect(() => {
    if(!location.state || location.state.from !== 'cart') {
      navigate('/');
    }
  }, [])

  const [orderData, setOrderData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
    deliveryMethod: "standard",
    paymentMethod: "cod",
  })

  const handleDeliveryMethodChange = (deliveryMethod) => {
    setOrderData((prev) => ({
      ...prev,
      deliveryMethod: deliveryMethod,
    }));
  };

  const handlePaymentMethodChange = (event) => {
    setOrderData((prev) => ({
      ...prev,
      paymentMethod: event.target.value,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const standardDelivery = 5.00;
  const expressDelivery = 16.00;

  const shippingValue = orderData.deliveryMethod === "standard" ? standardDelivery : expressDelivery;

  const taxValue = cart && cart.cartItems.length > 0 ? Math.round((cart.cartTotal + shippingValue) * 0.18) : 0;

  const totalOrderValue = cart && cart.cartItems.length > 0 ? cart.cartTotal + shippingValue + taxValue : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const order = {
      orderDetails: orderData,
      orderTotal: totalOrderValue,
      orderProducts: cart.cartItems.map((item) => {
        return item._id
      })
    }
  
    try {
      const response = await axiosPrivate.post(`${API_URL}/api/order/create`, order, {
        headers: {
          'Authorization': 'Bearer ' + auth
        }
      })
  
      if(response.data) {
        setOrderData({
          firstName: '',
          lastName: '',
          address: '',
          apartment: '',
          city: '',
          country: '',
          state: '',
          postalCode: '',
          phoneNumber: '',
          deliveryMethod: "standard",
          paymentMethod: "cod",
        });
        deleteCart();
        const cart = JSON.parse(localStorage.getItem('cart'));
        localStorage.setItem('cart', JSON.stringify({
          ...cart,
          cartItems: [],
          cartTotal: 0,
        }));
        console.log(response.data);
        navigate('/checkout/success', { state: { from: 'checkout', id: response.data._id }});
      }
    } catch (error) {
      navigate('/checkout/error', { state: { from: 'checkout' }});
    }
  };


  return (
    <div className='container px-5 py-24 pb-6 mx-auto min-h-screen'>
      <div className="grid grid-cols-2 gap-32">
        {/* Left */}
        <form className='flex flex-col gap-4' id='order-form' onSubmit={handleSubmit}>
          <h1 className='text-xl font-bold'>Shipping information</h1>
          <div className="name-info flex gap-4">
            <div className="firstName flex flex-col gap-1 w-1/2">
              <label htmlFor="firstName" className='text-sm text-customText'>First name</label>
              <input type="text" name="firstName" id="firstName" className='p-2 rounded text-black' value={orderData.firstName} onChange={handleInputChange} required/>
            </div>
            <div className="lastName flex flex-col gap-1 w-1/2">
              <label htmlFor="lastName" className='text-sm'>Last name</label>
              <input type="text" name="lastName" id="lastName" className='p-2 rounded text-black' value={orderData.lastName} onChange={handleInputChange} required/>
            </div>
          </div>
          <div className="address-info flex flex-col gap-4">
            <div className="address flex flex-col gap-1">
              <label htmlFor="address" className='text-sm'>Address</label>
              <input type="text" name="address" id="address" className='p-2 rounded text-black' value={orderData.address} onChange={handleInputChange} required/>
            </div>
            <div className="apartment flex flex-col gap-1">
              <label htmlFor="apartment" className='text-sm'>Apartment, suite, etc.</label>
              <input type="text" name="apartment" id="apartment" className='p-2 rounded text-black' value={orderData.apartment} onChange={handleInputChange} />
            </div>
            <div className="city-country flex gap-4">
              <div className="city flex flex-col gap-1 w-1/2">
                <label htmlFor="city" className='text-sm'>City</label>
                <input type="text" name="city" id="city" className='p-2 rounded text-black' value={orderData.city} onChange={handleInputChange} required />
              </div>
              <div className="country flex flex-col gap-1 w-1/2">
                <label htmlFor="country" className='text-sm'>Country</label>
                <select name="country" id="country" className='p-2 rounded text-black' value={orderData.country} onChange={handleInputChange} required>
                  <option value="" disabled>Select Your Option</option>
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>
            </div>
            <div className="state-postal flex gap-4">
              <div className="state flex flex-col gap-1 w-1/2">
                <label htmlFor="state" className='text-sm'>State / Province</label>
                <input type="text" name="state" id="state" className='p-2 rounded text-black' value={orderData.state} onChange={handleInputChange} required/>
              </div>
              <div className="postalCode flex flex-col gap-1 w-1/2">
                <label htmlFor="postalCode" className='text-sm'>Postal code</label>
                <input type="string" name="postalCode" id="postalCode" className='p-2 rounded text-black' value={orderData.postalCode} onChange={handleInputChange} required/>
              </div>
            </div>
            <div className="phone flex flex-col gap-1">
              <label htmlFor="phoneNumber" className='text-sm'>Phone Number</label>
              <input type="string" name="phoneNumber" id="phoneNumber" className='p-2 rounded text-black' value={orderData.phoneNumber} onChange={handleInputChange} required/>
            </div>
            <span className='w-full border border-t mt-10 mb-10' />
            <div className="delivery-method flex flex-col gap-4">
              <h1 className='text-xl font-bold'>Delivery method</h1>
              <div className="delivery-method-cards flex gap-4">
                <div className={`standard-delivery flex flex-col bg-white rounded-lg p-4 w-1/2 cursor-pointer ${orderData.deliveryMethod === "standard" && 'outline outline-4 outline-blue-700'}`} onClick={() => handleDeliveryMethodChange("standard")}>
                  <h2 className='text-black'>Standard delivery</h2>
                  <p className='mb-5'>4-10 business days</p>
                  <p className='text-black'>$5.00</p>
                </div>
                <div className={`express-delivery flex flex-col bg-white rounded-lg p-4 w-1/2 cursor-pointer ${orderData.deliveryMethod === "express" && 'outline outline-4 outline-blue-700'}`} onClick={() => handleDeliveryMethodChange("express")}>
                  <h2 className='text-black'>Express delivery</h2>
                  <p className='mb-5'>2-5 business days</p>
                  <p className='text-black'>$16.00</p>
                </div>
              </div>
            </div>
          </div>
          <span className='w-full border border-t mt-10 mb-10' />
          <div className='payment-method flex flex-col gap-4'>
            <h1 className='text-xl font-bold'>Payment</h1>
            <div className="payment-methods-checkbox flex gap-4">
              <div className="cod flex gap-2 items-center">
                <input type="radio" name="paymentMethod" id="cod" className='relative peer shrink-0 appearance-none w-4 h-4 bg-white rounded-full checked:bg-indigo-500' value="cod" onChange={handlePaymentMethodChange} required/>
                <label htmlFor="cod" className='text-sm'>Cash on delivery</label>
                <svg className="ml-0.5 absolute w-3 h-3 mt-1 hidden peer-checked:block text-white pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="card flex items-center gap-2">
                <input type="radio" name="paymentMethod" id="card" className='relative peer shrink-0 appearance-none w-4 h-4 bg-white rounded-full checked:bg-indigo-500' value="card" onChange={handlePaymentMethodChange} />
                <label htmlFor="card" className='text-sm'>Credit / Debit card</label>
                <svg className="ml-0.5 absolute w-3 h-3 mt-1 hidden peer-checked:block text-white pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <div className="card-details flex flex-col gap-4">
              <div className="card-number flex flex-col gap-1">
                <label htmlFor="card-number" className='text-sm'>Card number</label>
                <input type="number" name="card-number" id="card-number" className='p-2 rounded text-black' />
              </div>
              <div className="name-on-card flex flex-col gap-1">
                <label htmlFor="name-on-card" className='text-sm'>Name on card</label>
                <input type="text" name="name-on-card" id="name-on-card" className='p-2 rounded text-black' />
              </div>
              <div className="expiry-cvc flex gap-4">
                <div className="expiry flex flex-col gap-1 w-1/2">
                  <label htmlFor="expiry" className='text-sm'>Expiration date (MM/YY)</label>
                  <input type="text" name="expiry" id="expiry" className='p-2 rounded text-black' />
                </div>
                <div className="cvc flex flex-col gap-1 w-1/2">
                  <label htmlFor="cvc" className='text-sm'>CVC</label>
                  <input type="number" name="cvc" id="cvc" className='p-2 rounded text-black' />
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* Right */}
        <div className='flex flex-col gap-4'>
          <h1 className='text-xl font-bold'>Order summary</h1>
          { cart && cart.cartItems.map((item) => {
            return <div key={item._id} className="product-summary-card flex justify-between border-b pb-8">
            <div className="product-image-details flex gap-4">
              <div className="product-image w-20 h-20">
                <img src={item.image} alt="" className='rounded w-full h-full object-cover' />
              </div>
              <div className="product-details flex flex-col">
                <Link to={`/shop/${item._id}`} className="product-name text-white">
                  {item.name}
                </Link>
                <p className="product-brand">
                  {item.brand}
                </p>
                <p className="product-color">
                  {item.color}
                </p>
              </div>
            </div>
            <div className="product-price text-white">
              <p>${item.price}.00</p>
            </div>
          </div>
          })}
          <div className="price-breakdown flex flex-col">
            <div className="sub-total flex justify-between">
              <p>Subtotal</p>
              <p className='text-white'>${cart ? cart.cartTotal+'.00' : 0}</p>
            </div>
            <div className="shipping flex justify-between py-4">
              <p>Shipping</p>
              <p className='text-white'>${shippingValue}.00</p>
            </div>
            <div className="taxes flex justify-between">
              <p>Taxes</p>
              <p className='text-white'>${taxValue}</p>
            </div>
          </div>
          <div className="total-amount flex justify-between border-y items-center py-6">
            <p className=' text-lg font-bold text-white'>Total</p>
            <p className='text-white'>${cart ? totalOrderValue : 0}</p>
          </div>
          <div className="checkout py-2">
            <button type='submit' form='order-form' className="checkout w-full bg-customButtonBg text-customButtonText text-xl p-4 rounded hover:brightness-50 transition-all">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout