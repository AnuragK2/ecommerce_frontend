import { Button, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../State/Cart/Action';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems, cart, updateCartItem, deleteCartItem } = useSelector((state) => state.cart);

    const totalPrice = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
    const totalDiscountedPrice = cartItems?.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0) || 0;
    const discount = totalPrice - totalDiscountedPrice;
    const totalItem = cartItems?.length || 0;

    const handleCheckOut = () => {
        navigate("/checkout?step=2")
    }

    useEffect(() => {
        dispatch(getCart())
      }, [updateCartItem, deleteCartItem]);

  return (
      <div>
          <div className='lg:grid grid-cols-3 lg:px-16 relative'>
              <div className='col-span-2'>
                  {cartItems?.map((item, idx)=>(<CartItem key={item._id} item={item} />))}
              </div>
              <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
              <div>
                      <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
                      <hr />
                      <div className='space-y-3 font-semibold mb-5'>
                          <div className='flex justify-between pt-3 text-black'>
                              <span>Price</span>
                              <span>₹{totalPrice}</span>
                          </div>
                          <div className='flex justify-between pt-3'>
                              <span>Discount</span>
                              <span className=' text-green-700'>-₹{discount}</span>
                          </div>
                          <div className='flex justify-between pt-3 '>
                              <span>Delivery Charges</span>
                              <span className='text-green-700'>Free</span>
                          </div>
                          <div className='flex justify-between pt-3  font-bold'>
                              <span>Total Amount</span>
                              <span className='text-green-700'>₹{totalDiscountedPrice}</span>
                          </div>
                          
                      </div>
                       <Button onClick={handleCheckOut}  variant="contained" className='w-full mt-5' sx={{px:"2.5rem", py:"0.7rem",bgcolor:"#9155fd", mt:"1rem"}}>
                                  Check Out
                </Button>
              </div>
          </div>
          </div>
          
          
    </div>
  )
}

export default Cart
