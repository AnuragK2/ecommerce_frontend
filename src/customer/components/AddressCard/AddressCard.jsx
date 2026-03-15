import React from 'react'

const AddressCard = ({ address = {}, user = {} }) => {
  const fullName =
    [address.firstName, address.lastName].filter(Boolean).join(" ") ||
    address.name ||
    user.name ||
    user.fullName ||
    "Name not provided";

  const addressLine = [address.streetAddress, address.city, address.state, address.zipCode]
    .filter(Boolean)
    .join(", ");

  const phone = address.mobile || user.mobile || user.phone || "Not provided";

  return (
    <div>
      <div className='space-y-3'>
        <p className='font-semibold'>{fullName}</p>
        <p>
          {addressLine || "Address not provided"}
        </p>
        <div className='space-y-1'>
          <p className='font-semibold'>Phone Number: {phone}</p>
        </div>
      </div>
    </div>
  )
}

export default AddressCard
