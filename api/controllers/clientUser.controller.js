import ClientUser from "../models/clientUser.model.js";
import jwt from 'jsonwebtoken';


export const google = async (req, res, next) => {
    const { email, name, phoneNumber } = req.body;
    try {
      const user = await ClientUser.findOne({ email });
      if (user) {
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET
        );
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(user);
      } else {
      
        const newUser = new ClientUser({
          name,
          email,
          phoneNumber
        });
        await newUser.save();
        const token = jwt.sign( 
          { id: newUser._id},
          process.env.JWT_SECRET
        );
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(newUser);
      }
    } catch (error) {
      next(error);  
    }
  };

export const allClients = async (req, res, next) => {

    try {
        const allClientUsers = await ClientUser.find()
    res.status(200).json({allClientUsers})
    } catch (error) {
        next(error)
    }  

}

export const updateClient = async (req, res, next) => {
      
    try {
      const updatedClientUser = await ClientUser.findByIdAndUpdate(
        req.params.id,
        {
          $set: { 
            name: req.body.name,
            email: req.body.email,
           phoneNumber: req.body.phoneNumber
          },
        },
        { new: true }
      );
      res.status(200).json(updatedClientUser);
    } catch (error) {
      next(error);
    }
  };