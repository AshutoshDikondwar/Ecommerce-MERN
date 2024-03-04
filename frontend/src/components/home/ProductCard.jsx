import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material'



const ProductCard = ({ product }) => {

    const options = {
        precision: 0.5,
        size: "medium",
        value: product.ratings,
        readOnly: true,
    }
    return (
        <Link className='ProductCard' to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <Rating {...options} /><span className='productcard-span'>({product.numOfReviews} Reviews)</span>
            </div>
            <span>{`₹${product.price}`}</span>

        </Link>
    )
}

export default ProductCard