import mongoose from "mongoose";

const productLogSchema = mongoose.Schema({
    referenceId: {
        type: String,
        required: true,
    },
    items: [
        {
            productId: {
                type: String,
                required: true,
            },
            productName: {
                type: String,
                required: true,
            },
            productImage: {
                type: String, 
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            productPrice: {
                type: Number,
                required: true,
            },
            numberOfProductsAvailable: {
                type: Number,
                required: true,
            }
        }
    ]
});

const ProductLog = mongoose.model('ProductLog', productLogSchema);
export default ProductLog;