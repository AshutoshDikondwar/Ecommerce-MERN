import Order from "../models/Ordermodel.js";
import Product from '../models/ProductModel.js'

const neworder = async (req, res) => {
    try {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
        });
        res.status(201).json({ success: true, order })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//get single orde info
const getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email")
        //we are getting here userId in user field but when we do populate it will use user field which stores userId and goes in Users collection and find with same id then it sends that users name and email as we menssioned in populate
        if (!order) {
            return res.status(404).json({
                success: false,
                message: `Order not found with ${req.params.id} id`
            })
        }
        res.status(200).json({ success: true, order })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//get logged in user orders
const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
        res.status(200).json({ success: true, orders })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//get all orders- Admin
const getAllorders = async (req, res) => {
    try {
        const orders = await Order.find()
        let totalAmount = 0;
        orders.forEach((order) => totalAmount += order.totalPrice)
        res.status(200).json({ success: true, totalAmount, orders })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//update order status- Admin
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: `Order not found with ${req.params.id} id`
            })
        }
        if (order.orderStatus === "Delivered") {
            return res.status(400).json({ message: "You have already Delevired this order" })
        }

        if (req.body.status === "Shipped") {
            order.orderItems.forEach(async (o) => {
                await updateStock(o.product, o.quantity)
            })

        }
        order.orderStatus = req.body.status
        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now()
        }

        await order.save({ validateBeforeSave: false })
        res.status(200).json({ success: true })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.stock = product.stock - quantity
    await product.save({ validateBeforeSave: false })
}

//delete order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({
                success: false,
                message: `Order not found with ${req.params.id} id`
            })
        }

        await order.remove()
        res.status(200).json({ success: true, order })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export { neworder, getSingleOrder, myOrders, getAllorders, updateOrderStatus, deleteOrder }