import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    } as mongoose.ConnectOptions)

    console.log('✅ MongoDB Connected')
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`)
    process.exit(1)
  }
}
export default connectDB