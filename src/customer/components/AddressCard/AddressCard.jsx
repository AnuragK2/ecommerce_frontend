import React from 'react'

const AddressCard = ({address, user}) => {
  return (
      <div>
          <div className='space-y-3'>
              <p className='font-semibold'>
                  {address?.firstName + " " + address?.lastName || address?.name}
              </p>
              <p >
                  {address?.streetAddress + ", " + address?.city + ", " + address?.state + ", " + address?.zipCode}
              </p>
              <div className='space-y-1'>
                  <p className='font-semibold'>Phone Number: {address?.mobile }</p>
              </div>
          </div>
    </div>
  )
}

export default AddressCard