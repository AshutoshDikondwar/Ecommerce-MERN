import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearError, getProducts } from '../../actions/ProductAction'
import Loader from '../layout/loader/Loader'
import ProductCard from '../home/ProductCard'
import './products.css'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { Slider } from '@mui/material'
import { Typography } from '@mui/material'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
// import {Pagination} from '@mui/material'

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

const Products = () => {
    const [cuurrentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])
    const [category, setCategory] = useState("")
    // const [ratings, setRatings] = useState(0) //rating
    const [ratings, setRatings] = useState(0);

    const { products, loading, error, productCount, resultPerPage } = useSelector((state) => state.products)
    const params = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        dispatch(getProducts(params.keyword, cuurrentPage, price, category, ratings))
    }, [dispatch, params.keyword, cuurrentPage, price, category, ratings, alert, error])

    return (

        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title="PRODUCTS -- ECOMMERCE" />
                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        {products && products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider value={price}
                            // onChange={priceHandler}
                            onChangeCommitted={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby='range-slider'
                            min={0}
                            max={25000}
                            size="small"
                        />

                        <Typography>Categories</Typography>
                        <ul className="categotyBox">
                            {categories.map((category) => (
                                <li className='category-link cat' key={category} onClick={() => setCategory(category)}>{category}</li>
                            ))}
                        </ul>


                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>


                        <button className='reset' onClick={() => window.location.reload()} >Reset</button>
                    </div>
                    {resultPerPage < productCount && <div className="paginationBox">
                        <Pagination shape="rounded" activePage={cuurrentPage} itemsCountPerPage={resultPerPage} totalItemsCount={productCount} onChange={setCurrentPageNo} nextPageText="Next" prevPageText="Prev" firstPageText="1st" lastPageText="last" itemClass='page-item' linkClass='page-link' activeClass='pageItemActive' activeLinkClass='pageLinkActive' />
                    </div>}
                </Fragment>
            }
        </Fragment>
    )
}

export default Products