import { app } from "./app.js";
import dotenv from 'dotenv'
import ConnectDb from "./db/database.js";
import cloudinary from 'cloudinary'

dotenv.config({ path: ".env" })
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const DATABASE_URL = process.env.DATABASE_URI
ConnectDb(DATABASE_URL)

//handling UnCaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`)
    console.log("Shutting Down Server Due To UnCaught Exception ")
    process.exit(1)
})
// console.log(youtube) this is UnCaught Exception



const server = app.listen(process.env.PORT, () => { console.log(`server is running on http://localhost:${process.env.PORT}`); })


//unhandled promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error:${err.message}`);
    console.log("Shutting Down Server Due To Unhandled Promise Rejection")
    server.close(() => {
        process.exit(1)
    })
})
