import express from 'express'
import errorMiddleware from './middleware/Error.js'
import product from '../backend/routes/ProductRoute.js'
import user from './routes/UserRoutes.js'
import order from './routes/OrderRoute.js'
import cookieParser from 'cookie-parser'
// import banner from './routes/BannerRoutes.js'
import payment from './routes/PaymentRoute.js'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
// import cors from 'cors'

// import nodemailer from 'nodemailer'

const app = express()
// app.use(cors())
// if(process.env.NODE_ENV !== 'production'){
    dotenv.config({ path: ".env" })
// }
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())


app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)
// app.use('/api/v1', banner)
app.use('/api/v1', payment)

//middleware for error
app.use(errorMiddleware)




export { app }