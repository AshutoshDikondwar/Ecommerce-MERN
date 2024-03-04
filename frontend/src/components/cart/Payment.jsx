import React, { Fragment, useEffect, useRef } from 'react'
import './payment.css'
import CheckOutStep from './CheckOutStep'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MetaData from '../layout/MetaData'
import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { clearError, createorder } from '../../actions/OrderAction'

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const payBtn = useRef(null)
    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const alert = useAlert();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const { data } = await axios.post('/api/v1/payment/process', paymentData, headers)
            console.log(data);
            const client_secret = data.client_secret
            if (!stripe || !elements) return
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country
                        }
                    }
                }
            })
            if (result.error) {
                payBtn.current.disabled = false
                alert.error(result.error.message)
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createorder(order))
                    navigate("/success")
                    alert.success("Payment Successfull")
                } else {
                    alert.error("Something went wrong")
                }
            }

            // console.log(client_secret);
            // navigate("/success")
        } catch (err) {
            payBtn.current.disabled = false
            alert.error(err.response.data.message)
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
    }, [dispatch, error, alert])


    return (
        <Fragment>
            <MetaData title="Payment" />
            <CheckOutStep activeStep={2} />

            <div className="paymentContainer">
                <form onSubmit={(e) => submitHandler(e)} className="paymentForm">
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className='paymentInput' />
                    </div>
                    <input value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`} type="submit" className='paymentFormBtn' ref={payBtn} />
                </form>
            </div>
        </Fragment>
    )
}

export default Payment