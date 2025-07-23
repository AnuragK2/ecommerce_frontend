import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { Button } from '@mui/material';
import CartItem from '../Cart/CartItem';

const OrderSummary = () => {
  return (
      <div>
          <div className='p-5 shadow-lg rounded-md border'>
              <AddressCard />
          </div>
           <div>
          <div className='lg:grid grid-cols-3  relative'>
              <div className='col-span-2'>
                  {[1,1,1,1].map((item)=><CartItem />)}
              </div>
              <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
              <div>
                      <p className='uppercase font-bold opacity-60 pb-4 mt-5'>Price Details</p>
                      <hr />
                      <div className='space-y-3 font-semibold mb-5'>
                          <div className='flex justify-between pt-3 text-black'>
                              <span>Price</span>
                              <span>₹299</span>
                          </div>
                          <div className='flex justify-between pt-3'>
                              <span>Discount</span>
                              <span className=' text-green-700'>-₹100</span>
                          </div>
                          <div className='flex justify-between pt-3 '>
                              <span>Delivery Charges</span>
                              <span className='text-green-700'>Free</span>
                          </div>
                          <div className='flex justify-between pt-3  font-bold'>
                              <span>Total Amount</span>
                              <span className='text-green-700'>₹339</span>
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