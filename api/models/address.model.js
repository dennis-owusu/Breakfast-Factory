import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    hostelName: {
        type: String,
        required: true
    },
    blockName: {
        type: String,
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contact: { 
        type: Number,
        required: true
    }
})

const Address = mongoose.model('Address', addressSchema)

export default Address