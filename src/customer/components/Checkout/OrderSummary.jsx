import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { Button } from '@mui/material';
import CartItem from '../Cart/CartItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createOrder, getOrderById } from '../../../State/Order/Action';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createPayment } from '../../../State/Payment/Action';

const OrderSummary = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const location=useLocation();
  const {order}=useSelector(store=>store)
  const searchParams = new URLSearchParams(location.search);
const orderId = searchParams.get("order_id");

  // derive totals from items in case backend returns zeros
  const computedTotalPrice =
    order.order?.orderItems?.reduce(
      (sum, item) =>
        sum +
        ((item.product?.price ?? item.price ?? 0) * (item.quantity || 0)),
      0
    ) || 0;
  const computedTotalDiscounted =
    order.order?.orderItems?.reduce(
      (sum, item) =>
        sum +
        (
          item.discountedPrice ??
          item.product?.discountedPrice ??
          item.price ??
          item.product?.price ??
          0
        ) * (item.quantity || 0),
      0
    ) || 0;
  const computedDiscount = computedTotalPrice - computedTotalDiscounted;
  const totalItem = order.order?.orderItems?.length || 0;

  // choose server totals if they are positive, otherwise fallback to computed
  const displayTotalPrice =
    order.order?.totalPrice && order.order.totalPrice > 0
      ? order.order.totalPrice
      : computedTotalPrice;
  const displayTotalDiscounted =
    order.order?.totalDiscountedPrice && order.order.totalDiscountedPrice > 0
      ? order.order.totalDiscountedPrice
      : computedTotalDiscounted;
  const displayDiscount =
    order.order?.discount && order.order.discount > 0
      ? order.order.discount
      : computedDiscount;


  useEffect(() => {
    if (!orderId) return; // avoid hitting /null
    dispatch(getOrderById(orderId));
  }, [orderId, dispatch]);

 const handleCheckOut = () => {
  if (!orderId) return;
  const jwt = localStorage.getItem("jwt");
  dispatch(createPayment({ orderId, jwt }));
 }

  return (
      <div>
          <div className='p-5 shadow-lg rounded-md border'>
              <AddressCard address={order.order?.shippingAddress} />
          </div>
           <div>
          <div className='lg:grid grid-cols-3  relative'>
              <div className='col-span-2'>
                  {order.order?.orderItems?.map((item) => (
                    <CartItem key={item._id || item.id} item={item} readOnly />
                  ))}
              </div>
              <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
              <div>
                      <p className='uppercase font-bold opacity-60 pb-4 mt-5'>Price Details</p>
                      <hr />
                          <div className='space-y-3 font-semibold mb-5'>
                          <div className='flex justify-between pt-3 text-black'>
                              <span>Price</span>
                              <span>{`₹${displayTotalPrice.toFixed(2)}`}</span>
                          </div>
                          <div className='flex justify-between pt-3'>
                              <span>Discount</span>
                              <span className=' text-green-700'>{`-₹${displayDiscount.toFixed(2)}`}</span>
                          </div>
                          <div className='flex justify-between pt-3 '>
                              <span>Delivery Charges</span>
                              <span className='text-green-700'>Free</span>
                          </div>
                          <div className='flex justify-between pt-3  font-bold'>
                              <span>Total Amount</span>
                              <span className='text-green-700'>{`₹${displayTotalDiscounted.toFixed(2)}`}</span>
                          </div>
                          
                      </div>
                       <Button onClick={handleCheckOut} variant="contained" className='w-full mt-5' sx={{px:"2.5rem", py:"0.7rem",bgcolor:"#9155fd", mt:"1rem"}}>
                                  Check Out
                </Button>
              </div>
          </div>
          </div>
          
          
    </div>
    </div>
  )
}

export default OrderSummary
