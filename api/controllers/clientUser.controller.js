import ClientUser from "../models/clientUser.model.js";
import jwt from 'jsonwebtoken';

export const createClient = async (req, res, next) => {

    const {name, phoneNumber, email} = req.body; 
    if(name === '' || phoneNumber === '' || email === '') {
       return next(errorHandler(401, 'All fields are required'))
    }
    const newClientUser = new ClientUser({
        name,
        phoneNumber,
        email
    })
    try {
        await newClientUser.save() 
         res.status(201).json(newClientUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    
}
export const loginClient = async (req, res, next) => {

    const {name, phoneNumber, email} = req.body
    if(name === '' || phoneNumber === '' || email === '' || !name || !phoneNumber || !email){
        return next(errorHandler(501, 'All fields are required')) 
    }
    
    const validUser = await ClientUser.findOne({email: email})
    if(!validUser){
        return next(errorHandler(403, 'Incorrect credentials'))
    }
   const validPhoneNumber = await ClientUser.findOne({phoneNumber: phoneNumber})
    if(!validPhoneNumber){
        return next(errorHandler(403, 'Incorrect credentials'))
    }

    const token = jwt.sign(
        { id: validUser._id, },
        process.env.JWT_SECRET
      );
  
      const { phoneNumber: phone, ...rest } = validPhoneNumber._doc;
  
      res   
        .status(200)  
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);

}
export const allClients = async (req, res, next) => {

    try {
        const allClientUsers = await ClientUser.find()
    res.status(200).json({allClientUsers})
    } catch (error) {
        next(error)
    }  

}