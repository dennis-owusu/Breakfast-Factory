import {errorHandler} from '../utils/error.js'
import Address from '../models/address.model.js'


export const addAddress = async(req, res, next) => {

    const {hostelName, blockName, roomNumber, description, contact} = req.body
    
    if(!hostelName || !blockName || !roomNumber || !description || !contact){
        return next(errorHandler(401, 'All fields are required'))
    }
    try{

        const newAddress = await Address({
            hostelName, blockName, roomNumber, description, contact

        })

        await newAddress.save()
        res.status(200).json({message: 'Address added'})

    }catch(error){
        next(error)
    }
    
} 