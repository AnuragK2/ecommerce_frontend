import { Box, Grid } from '@mui/material'
import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { deepPurple } from '@mui/material/colors';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const OrderDetails = () => {
  return (
      <div className='px-5 lg:px-20'>
          <div>
              <h1 className='font-bold text-xl py-7'>Delivery Address</h1>
              <AddressCard />
          </div>
          <div className='py-20'>
              <OrderTracker  activeStep={3}/>
          </div>
          <Grid className='space-y-5' container>
              {[1,1,1,1,1].map((item)=> <Grid item container className='shadow-xl rounded-md p-5 border' sx={{alignItems:'center',justifyContent:'space-between'}}>
                  <Grid item xs={6}>
                      <div className='flex items-center space-x-4'>
                          <img className='w-[5rem] h-[8rem] object-cover object-top ' src="https://assets.bonkerscorner.com/uploads/2022/12/25170320/Coder-Oversized-T-shirt-02-1200x1800.jpg" alt="productImage" />
                          <div className='space-y-2 ml-5'>
                              <p className='font-semibold '>Bonkers Coder oversized Tshirt</p>
                              <p className='space-x-5 opacity-50 text-xs font-semibold'> <span>Color: Black </span> <span> Size: S</span> </p>
                              <p>Seller: Bonkers Corner</p>
                              <p>₹399</p>
                          </div>
                      </div>
                  </Grid>
                  <Grid item>
                      <Box sx={{color:deepPurple[500]}}>
                          <StarBorderIcon sx={{fontSize:'2rem'}} className='px-2 text-2xl' />
                              <span>Rate & Review Product</span>
                          
                      </Box>
                  </Grid>
              </Grid>)}
             
          </Grid>
    </div>
  )
}

export default OrderDetails