import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { Button } from '@mui/material';
import CartItem from '../Cart/CartItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createOrder, getOrderById } from '../../../State/Order/Action';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    ) || 0;
  const computedTotalDiscounted =
    order.order?.orderItems?.reduce(
      (sum, item) => sum + (item.discountedPrice ?? item.price ?? 0) * (item.quantity || 0),
      0
    ) || 0;
  const computedDiscount = computedTotalPrice - computedTotalDiscounted;
  const totalItem = order.order?.orderItems?.length || 0;


  useEffect(() => {
    if (!orderId) return; // avoid hitting /null
    dispatch(getOrderById(orderId));
  }, [orderId, dispatch]);

  return (
      <div>
          <div className='p-5 shadow-lg rounded-md border'>
              <AddressCard address={order.order?.shippingAddress} />
          </div>
           <div>
          <div className='lg:grid grid-cols-3  relative'>
              <div className='col-span-2'>
                  {order.order?.orderItems?.map((item) => (
                    <CartItem key={item._id || item.id} item={item} />
                  ))}
              </div>
              <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
              <div>
                      <p className='uppercase font-bold opacity-60 pb-4 mt-5'>Price Details</p>
                      <hr />
                      <div className='space-y-3 font-semibold mb-5'>
                          <div className='flex justify-between pt-3 text-black'>
                              <span>Price</span>
                              <span>{`₹${(order.order?.totalPrice ?? computedTotalPrice).toFixed(2)}`}</span>
                          </div>
                          <div className='flex justify-between pt-3'>
                              <span>Discount</span>
                              <span className=' text-green-700'>{`-₹${(order.order?.discount ?? computedDiscount).toFixed(2)}`}</span>
                          </div>
                          <div className='flex justify-between pt-3 '>
                              <span>Delivery Charges</span>
                              <span className='text-green-700'>Free</span>
                          </div>
                          <div className='flex justify-between pt-3  font-bold'>
                              <span>Total Amount</span>
                              <span className='text-green-700'>{`₹${(order.order?.totalDiscountedPrice ?? computedTotalDiscounted).toFixed(2)}`}</span>
                          </div>
                          
                      </div>
                       <Button  variant="contained" className='w-full mt-5' sx={{px:"2.5rem", py:"0.7rem",bgcolor:"#9155fd", mt:"1rem"}}>
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
