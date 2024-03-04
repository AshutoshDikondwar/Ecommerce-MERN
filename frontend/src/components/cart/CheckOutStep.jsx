import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import './checkOutStep.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const CheckOutStep = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Detaile</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        },
    ]
    const stepStyle = {
        boxSizing: "border-box"
    }

    return (
        <Fragment>
            <div className='shippingCheck'>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
                {steps.map((item, index) => (
                    <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
                        <StepLabel style={{ color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)" }} icon={item.icon}>{item.label}</StepLabel>
                    </Step>
                ))}

            </Stepper> 
            </div>
        </Fragment>
    )
}

export default CheckOutStep