import Product from '../models/ProductModel.js'
import ApiFeatures from '../utils/apiFeatures.js'
import cloudinary from 'cloudinary'


//create Product-Admin
const createProduct = async (req, res) => {
    try {
        let images = []
       
        if (Array.isArray(req.body.images)) {
            images = req.body.images;
        } else {
            images[0] = req.body.images;
        }
        console.log("Images", images);

        console.log(images.length);
        console.log(images[0] && images[0].url);

        const imagesLink = []
        console.log("object1");
        for (let i = 0; i < images.length; i++) {
            console.log("object2");
            {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products"
                })
                console.log(result);
                imagesLink.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            }
        }
        req.body.images = imagesLink
        req.body.user = req.user.id
        const product = await Product.create(req.body)
        res.status(201).json({
            success: true,
            product
        })
    } catch (err) {
        console.log(err);
        if (err.name === "CastError") {
            const message = `Resource not Found invalid: ${err.path}`
            res.status(500).json(message)
        }
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
            res.status(400).json(message)
        }
        if (err.code === "JsonWebTokenError") {
            const message = `Json web token is Invalid, try again`
            res.status(400).json(message)
        }
        if (err.code === "TokenExpiredError") {
            const message = `Json web token is Expire, try again`
            res.status(400).json(message)
        }
        res.status(500).json(err.message)
    }
}

//get single product//product details
const getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }
        res.status(200).json({
            success: true,
            product
        })

    } catch (err) {
        if (err.name === "CastError") {
            const message = `Resource not Found invalid: ${err.path}`
            res.status(500).json(message)
        }
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
            res.status(400).json(message)
        }
        if (err.code === "JsonWebTokenError") {
            const message = `Json web token is Invalid, try again`
            res.status(400).json(message)
        }
        if (err.code === "TokenExpiredError") {
            const message = `Json web token is Expire, try again`
            res.status(400).json(message)
        }
        res.status(500).json(err.message)
    }
}

//get all products
const getAllProducts = async (req, res) => {
    try {
        const resultPerPage = 8;
        const productCount = await Product.countDocuments()

        const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
console.log("api feature");
console.log(apiFeatures);
        const products = await apiFeatures.query;
        console.log("products");
        console.log(products);
        res.status(200).json({
            success: true,
            products,
            productCount,
            resultPerPage
        })
        console.log("success");
    } catch (err) {
        if (err.name === "CastError") {
            const message = `Resource not Found invalid: ${err.path}`
            res.status(500).json(message)
        }
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
            res.status(400).json(message)
        }
        if (err.code === "JsonWebTokenError") {
            const message = `Json web token is Invalid, try again`
            res.status(400).json(message)
        }
        if (err.code === "TokenExpiredError") {
            const message = `Json web token is Expire, try again`
            res.status(400).json(message)
        }
        res.status(500).json(err.message)
    }
}

//update product- Admin
const updateProduct = async (req, res) => {

    try {

        let product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product Not Found"
            })
        }

        let images = [];

        if (Array.isArray(req.body.images)) {
            images = req.body.images;
        } else if (req.body.images !== undefined) {
            images[0] = req.body.images;
        }

        if (images.length > 0) {
            for (let i = 0; i < product.images.length; i++) {
                const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }
        }

        const imagesLink = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products"
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }
        req.body.images = imagesLink

        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })

        res.status(200).json({
            success: true,
            product
        })
    } catch (err) {
        if (err.name === "CastError") {
            const message = `Resource not Found invalid: ${err.path}`
            res.status(500).json(message)
        }
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
            res.status(400).json(message)
        }
        if (err.code === "JsonWebTokenError") {
            const message = `Json web token is Invalid, try again`
            res.status(400).json(message)
        }
        if (err.code === "TokenExpiredError") {
            const message = `Json web token is Expire, try again`
            res.status(400).json(message)
        }
        res.status(500).json(err.message)
    }
}

//delete product- Admin
const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product Not Found"
            })
        }
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        await product.remove()

        res.status(200).json({
            success: true,
            message: "Product Has Been Deleted"

        })
    } catch (err) {
        if (err.name === "CastError") {
            const message = `Resource not Found invalid: ${err.path}`
            res.status(500).json(message)
        }
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
            res.status(400).json(message)
        }
        if (err.code === "JsonWebTokenError") {
            const message = `Json web token is Invalid, try again`
            res.status(400).json(message)
        }
        if (err.code === "TokenExpiredError") {
            const message = `Json web token is Expire, try again`
            res.status(400).json(message)
        }
        res.status(500).json(err.message)

    }

}

//create new review or update the review
const createProductReview = async (req, res) => {
    try {
        const { comment, rating } = req.body
        const review = {
            user: req.user._id,
            name: req.user.name,
            ratings: Number(rating),
            comment,
        }
        const product = await Product.findById(req.body.productId)

        const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())
        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.user.toString() === req.user._id.toString())
                    (rev.rating = rating), (rev.comment = comment);
            })

        } else {
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length
        }
        let avg = 0
        product.reviews.forEach((rev) => { avg += rev.rating })
        product.ratings = avg / product.reviews.length;
        await product.save({ validateBeforeSave: false })

        res.status(200).json({ success: true })
    } catch (err) {
        res.status(500).json(err.message)
    }

}

const getProductReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.query.id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }
        res.status(200).json({ success: true, reviews: product.reviews })

    } catch (err) {
        res.status(500).json(err.message)
    }
}
const deleteReview = async (req, res) => {
    try {
        const product = await Product.findById(req.query.productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }

        const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString())

        let avg = 0
        reviews.forEach((rev) => { avg += rev.rating })

        let ratings = 0;

        if (reviews.length === 0) {
            ratings = 0;
        } else {
            ratings = avg / reviews.length;
        }
        const numOfReviews = reviews.length
        await Product.findByIdAndUpdate(req.query.productId, { reviews, ratings, numOfReviews }, { new: true, runValidators: true, useFindAndModify: false })

        res.status(200).json({
            success: true,

        });

    } catch (err) {
        res.status(500).json(err.message)
    }
}


const getAdminProducts = async (req, res) => {
    try {

        const products = await Product.find()
        res.status(200).json({
            success: true,
            products
        })
    } catch (err) {
        if (err.name === "CastError") {
            const message = `Resource not Found invalid: ${err.path}`
            res.status(500).json(message)
        }
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
            res.status(400).json(message)
        }
        if (err.code === "JsonWebTokenError") {
            const message = `Json web token is Invalid, try again`
            res.status(400).json(message)
        }
        if (err.code === "TokenExpiredError") {
            const message = `Json web token is Expire, try again`
            res.status(400).json(message)
        }
        res.status(500).json(err.message)
    }
}

export { getAllProducts, createProduct, updateProduct, getAdminProducts, deleteProduct, getSingleProduct, createProductReview, getProductReviews, deleteReview }