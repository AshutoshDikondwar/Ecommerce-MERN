// import * as Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
import dotenv from 'dotenv'
dotenv.config({ path: ".env" })

import Stripe from "stripe";
const secret = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(secret);

const processPayment = async (req, res) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "Ecommerce",
        }
    })
    const myClient = myPayment.client_secret
    try {

        res.status(200).json({ success: true, client_secret: myClient })

    } catch (err) {
        res.status(500).json(err.message)
    }
}
const sendStripeSpiKey = async (req, res) => {
    try {
        res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY })


    } catch (err) {
        res.status(500).json(err.message)
    }
}

export { processPayment, sendStripeSpiKey }
