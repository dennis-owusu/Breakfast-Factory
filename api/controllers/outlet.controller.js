import bcryptjs from "bcryptjs";
import Outlet from "../models/outlet.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'



export const outletSignup = async(req, res, next) =>{
    
    const {name, email, password, userType} = req.body; 
    if(name === '' || email === '' || password === ''){
       return next(errorHandler(401, 'All fields are required'))
    }
    const hashPassword = bcryptjs.hashSync(password, 10)
    const newOutlet = await new Outlet({
        name,
        email,
        password: hashPassword, 
        userType
    })
    try {
        await newOutlet.save() 
         res.status(201).json(newOutlet)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const outletSignin = async(req, res, next) =>{
    const {email, password} = req.body
    if(email === '' || password === '' || !email || !password){
        return next(errorHandler(501, 'All fields are required')) 
    }
    
    const validUser = await Outlet.findOne({email: email})
    if(!validUser){
        return next(errorHandler(403, 'Incorrect credentials'))
    }

    const hashedPassword = bcryptjs.compareSync(password, validUser.password)
    if(!hashedPassword){
        return next(errorHandler(403, 'Incorrect credentials'))
    }

    const token = jwt.sign(
        { id: validUser._id},
        process.env.JWT_SECRET
      );
  
      const { password: pass, ...rest } = validUser._doc;
  
      res   
        .status(200)  
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
}

export const google = async(req, res, next) =>{

    const { email, name, googlePhotoUrl, userType } = req.body;
    try {
      const user = await Outlet.findOne({ email });
      if (user) {
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      } /* else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new Outlet({
          name:
          name.split(' ').join(''),
          email,
          password: hashedPassword,
          userType,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const token = jwt.sign( 
          { id: newUser._id},
          process.env.JWT_SECRET
        );
        const { password, ...rest } = newUser._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      } */
    } catch (error) {
      next(error);
    }
  };


export const logout = (req, res, next) => {
    try {
      res
        .clearCookie('access_token')
        .status(200)
        .json('Outlet has been signed out');
    } catch (error) {
      next(error);
    }
  };

export const getUsers = async(req, res, next) =>{ 

    try {
        const allusers = await User.find()
    res.status(200).json({allusers})
    } catch (error) {
        next(error)
    }  
}

export const getAllOutlets = async (req, res, next) => {
    try {
        const allOutlets = await Outlet.find()
    res.status(200).json({allOutlets})
    } catch (error) {
        next(error)
    }  
}

export const deleteOutlet = async(req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this user'));
      }
      try {
        await Outlet.findByIdAndDelete(req.params.outletId);
        res.status(200).json('User has been deleted');
      } catch (error) {
        next(error);
      }
}