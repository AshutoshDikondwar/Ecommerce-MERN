import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Sidebar from './Sidebar'
import { Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Loader from '../layout/loader/Loader'
import { Button } from '@mui/material'
import { getOrderDetails, clearError, updateOrder } from '../../actions/OrderAction'
import { UPDATE_ORDER_RESET } from '../../constatnts/OrderConstant';
import './processOrder.css'

const ProcessOrder = () => {
    const navigate = useNavigate()
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order)
    const params = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()
    const [status, setStatus] = useState("")


    const updateOrderSubmitHandler = (e) => {
        e.preventDefault()
        const myform = new FormData()
        myform.set("status", status)
        dispatch(updateOrder(params.id, myform))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearError())
        }
        if (isUpdated) {
            alert.success("Order Updated Successfully")
            dispatch({ type: UPDATE_ORDER_RESET })
        }
        dispatch(getOrderDetails(params.id))
    }, [dispatch, alert, error, params.id, updateError, isUpdated])
    return (
        <Fragment>
            <MetaData title="Process Order" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? <Loader /> : <div className="confirmOrderPage"
                        style={{ display: order.orderStatus === "delivered" ? "block" : "grid" }}
                    >
                        <div>
                            <div className="confirmshippingArea">
                                <Typography>Shipping Info</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p>Name</p>
                                        <span>{order.user && order.user.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone</p>
                                        <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                    </div>
                                    <div>
                                        <p>Address</p>
                                        <span>{order && order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span>
                                    </div>
                                </div>

                                <Typography>Payment</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>{order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}</p>
                                    </div>
                                    <div>
                                        <p>Amount</p>
                                        <span>₹{order.totalPrice && order.totalPrice}</span>
                                    </div>
                                </div>
                                <Typography>Order Status</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p className={order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>{order.orderStatus && order.orderStatus}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="confirmCartItems">
                                <Typography>Your Cart Items:</Typography>
                                <div className="confirmCartItemsContainer">
                                    {order.orderItems &&
                                        order.orderItems.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="Product" />
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>{" "}
                                                <span>
                                                    {item.quantity} X ₹{item.price} ={" "}
                                                    <b>₹{item.price * item.quantity}</b>
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div
                            style={{ display: order.orderStatus === "Delivered" ? "none" : "block" }}
                        >
                            <form
                                className="updateOrderForm"
                                encType="multipart/form-data"
                                onSubmit={updateOrderSubmitHandler}
                            >
                                <h1>Process Order</h1>


                                <div>
                                    <AccountTreeIcon />
                                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Choose Category</option>
                                        {order.orderStatus === "Processing" && (<option value="Shipped">Shipped</option>)}
                                        {order.orderStatus === "Shipped" && (<option value="Delivered">Delivered</option>)}
                                    </select>
                                </div>

                                <Button
                                    id="createProductBtn"
                                    type="submit"
                                    disabled={loading ? true : false || status === "" ? true : false}
                                >
                                    Create
                                </Button>
                            </form>
                        </div>
                    </div>}
                </div>
            </div>
        </Fragment>


    )
}

export default ProcessOrder