import { Button, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { updateCartItem, removeCartItem } from '../../../State/Cart/Action';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const { product, size, quantity, price, discountedPrice } = item;
    const discountPercent = Math.round(((price - discountedPrice) / price) * 100);

    const availableQuantity = product?.sizes?.find(s => s.name === size)?.quantity || 0;

    const handleUpdateQuantity = (newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveItem();
            return;
        }
        if (newQuantity > availableQuantity) {
            return; // Prevent increasing beyond available stock
        }
        dispatch(updateCartItem({ cartItemId: item._id, data: { quantity: newQuantity } }));
    };

    const handleRemoveItem = () => {
        dispatch(removeCartItem({ cartItemId: item._id }));
    };

    return (
        <div className='p-5 shadow-lg border rounded-md'>
            <div className='flex items-center '>
                <div className='w-[5rem] h-[8rem] lg:w-[9rem] lg:h-[14rem]'>
                    <img className='w-full h-full object-cover object-top' src={product?.imageUrl} alt={product?.title} />
                </div>
                <div className='ml-5 space-y-1'>
                    <p className='font-semibold'>{product?.title}</p>
                    <p className='opacity-70'>Size: {size}, {product?.color}</p>
                    <p className='opacity-70 mt-2'>Seller: {product?.brand}</p>
                    <div className="flex space-x-5 items-center text-gray-900 pt-3">
                        <p className="font-semibold">₹{discountedPrice}</p>
                        <p className="opacity-50 line-through">₹{price}</p>
                        <p className="text-green-700 font-semibold">{discountPercent}% off</p>
                    </div>
                </div>

            </div>
            <div className='lg:flex items-center lg:space-x-10 pt-4'>
                <div className='flex items-center space-x-2 '>
                    <IconButton onClick={() => handleUpdateQuantity(quantity - 1)} disabled={quantity <= 1} sx={{ color: 'RGB(145 85 253)' }}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <span className='py-1 px-7 border rounded-sm'>{quantity}</span>
                    <IconButton onClick={() => handleUpdateQuantity(quantity + 1)} disabled={quantity >= availableQuantity} sx={{ color: 'RGB(145 85 253)' }}>
                        <AddCircleOutlineIcon />
                    </IconButton>

                </div>

                <div>
                    <Button onClick={handleRemoveItem} sx={{ color: 'RGB(145 85 253)' }}>
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartItem