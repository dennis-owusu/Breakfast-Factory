import mongoose from 'mongoose';


const clientUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    profilePicture: { 
        type: String,
        required: true
     }
})

const ClientUser = mongoose.model('ClientUser', clientUserSchema)

export default ClientUser