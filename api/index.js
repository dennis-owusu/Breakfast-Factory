import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import productRoute from './routes/product.route.js'
import categoryRoute from './routes/categories.route.js'
import transactionRoute from './routes/transaction.route.js'
import userRoute from './routes/user.route.js'
import cashRoute from './routes/cash.route.js'
import productLogRoute from './routes/productlog.route.js'
import clientUserRoute from './routes/clientUser.route.js'
import path from 'path';
/* import paystackRoute from './routes/paystack.route.js' */ 
import outletRoute from './routes/outlet.route.js'
dotenv.config()
  
const PORT = 3000  

const app = express() 

const __dirname = path.resolve();
//middlewares
app.use(cors({
  methods: ['GET', 'DELETE', 'PUT', 'POST'],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())


mongoose.connect(process.env.BREAKFAST_MONGO_URI).then(()=>{
  console.log('MongoDB connected')
})

app.use('/api/route', productRoute) 
app.use('/api/route', categoryRoute)
app.use('/api/route', transactionRoute)
app.use('/api/auth', userRoute)
app.use('/api/auth', outletRoute)
app.use('/api/route', cashRoute)
app.use('/api/route', productLogRoute)
app.use('/api/route', clientUserRoute)
/* app.use('/api/route', paystackRoute) */   

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error' 
  res.json({
    success: false,
    statusCode,
    message
  })
})
app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})