import React, { Fragment, useEffect } from 'react'
import './home.css'
import { CgMouse } from "react-icons/cg";
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import { clearError, getProducts } from '../../actions/ProductAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';




const Home = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, products } = useSelector((state) => state.products)
    // const { banner } = useSelector((state) => state.banner)



    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        // dispatch(getBanner())
        dispatch(getProducts())
    }, [dispatch, error, alert])
    return (

        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={"Ecommerce"} />
                    <div className="banner">

                        <p>Welcome to ShopEasy</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    

                    <h2 className="homeHeading">Featured Products</h2>
                    <div className="container" id='container'>
                        {products && products.map((product) => (
                            <ProductCard product={product} key={product._id} />
                        ))}
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default Home