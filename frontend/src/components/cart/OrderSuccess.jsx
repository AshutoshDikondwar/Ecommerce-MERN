import React from 'react'
import './orderSuccess.css'
import { MdCheckCircle } from 'react-icons/md'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
    return (
        <div className='orderSuccess'>
            <MdCheckCircle />
            <Typography>Your Order has been Placed successfully</Typography>
            <Link to="/orders">View Orders</Link>

        </div>
    )
}

export default OrderSuccess