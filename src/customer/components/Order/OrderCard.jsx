import { Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = () => {
    const navigate = useNavigate();
  return (
      <div onClick={()=>navigate(`/account/order/${5}`)} className='mt-5 p-5 shadow-md hover:shadow-2xl border'>
          <Grid container spacing={2} sx={{ justifyContent:'space-between'}}>
              <Grid item xs={6} >
                  <div className='flex cursor-pointer'>
                      <img className='w-[5rem] h-[8rem] object-cover object-top' src="https://assets.bonkerscorner.com/uploads/2022/12/25170320/Coder-Oversized-T-shirt-02-1200x1800.jpg" alt="productImage" />
                      <div className='ml-5 space-y-2'> 
                          <p className=''>Bonkers Coder Oversized Black Tshirt</p>
                          <p className='opacity-50 text-xs font-semibold'>Size: S</p>
                          <p className='opacity-50 text-xs font-semibold'>Color: Black</p>
                      </div>
                  </div>
              </Grid>
              <Grid item xs={2}>
                  <p>₹399</p>
              </Grid>
              <Grid item xs={4}>
                  {true &&
                      <div>
                      <p>
                      <AdjustIcon sx={{width:'15px', height:'15px'}} className='text-green-700 mr-2 text-sm'/>
                      <span>
                          Delivered on December 03
                      </span>
                      
                          </p>
                          <p className='text-xs'>
                              Your Item has been Delivered
                          </p>
                      </div>
                      }
                  {false && <p>
                      <span>
                          Expected Delivery on December 03
                      </span>
                  </p>}
              </Grid>
          </Grid>
    </div>
  )
}

export default OrderCard