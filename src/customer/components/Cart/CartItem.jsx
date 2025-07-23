import { Button, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CartItem = () => {
  return (
      <div className='p-5 shadow-lg border rounded-md'>
          <div className='flex items-center '>
              <div className='w-[5rem] h-[8rem] lg:w-[9rem] lg:h-[14rem]'>
                  <img className='w-full h-full object-cover object-top' src="https://assets.bonkerscorner.com/uploads/2022/12/25170320/Coder-Oversized-T-shirt-02-1200x1800.jpg" alt="product image" />
              </div>
              <div className='ml-5 space-y-1'>
                  <p className='font-semibold'>Bonkers Coder Oversized Black Tshirt</p>
                  <p className='opacity-70'>Size: L,Black</p>
                  <p className='opacity-70 mt-2'>Seller: Bonkers Corner</p>
                  <div className="flex space-x-5 items-center text-gray-900 pt-3">
                <p className="font-semibold">₹299</p>
                <p className="opacity-50 line-through ">₹399</p>
                <p className="text-green-700 font-semibold">5% off</p>
              </div>
              </div>
              
          </div>
          <div className='lg:flex items-center lg:space-x-10 pt-4'>
                  <div className='flex items-center space-x-2 '>
                      <IconButton sx={{color:'RGB(145 85 253)'}}>
                          <RemoveCircleOutlineIcon />
                      </IconButton>
                      <span className='py-1 px-7 border rounded-sm'>1</span>
                          <IconButton sx={{color:'RGB(145 85 253)'}}>
                          <AddCircleOutlineIcon />
                      </IconButton>
                      
                  </div>

                  <div>
                      <Button sx={{color:'RGB(145 85 253)'}}>
                          Remove
                      </Button>
                  </div>
              </div>
    </div>
  )
}

export default CartItem