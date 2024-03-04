import mongoose from 'mongoose'

const connectDB = (DATABASE_URL) => {
    const DB_OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        dbName: "Ecommerce5",
    }
    mongoose.set("strictQuery", false);
    mongoose.connect(DATABASE_URL, DB_OPTIONS).then(() => {
        console.log("connected successfully");
    })

}
export default connectDB