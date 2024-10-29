import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async(req, res, next) =>{
    
    const {username, email, password} = req.body; 
    if(username === '' || email === '' || password === ''){
       return next(errorHandler(401, 'All fields are required'))
    }
    const hashPassword = bcryptjs.hashSync(password, 10)
    const newUser = await new User({
        username,
        email,
        password: hashPassword
    })
    try {
        await newUser.save() 
         res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const signin = async(req, res, next) =>{
    const {email, password} = req.body
    if(email === '' || password === '' || !email || !password){
        return next(errorHandler(501, 'All fields are required')) 
    }
    
    const validUser = await User.findOne({email: email})
    if(!validUser){
        return next(errorHandler(403, 'Incorrect credentials'))
    }

    const hashedPassword = bcryptjs.compareSync(password, validUser.password)
    if(!hashedPassword){
        return next(errorHandler(403, 'Incorrect credentials'))
    }

    const token = jwt.sign(
        { id: validUser._id, isAdmin: validUser.isAdmin, isSuperUser: validUser.isSuperUser},
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

export const getUsers = async(req, res, next) =>{ 

    try {
        const allusers = await User.find()
    res.status(200).json({allusers})
    } catch (error) {
        next(error)
    }  
}


    export const google = async (req, res, next) => {
        const { email, name, googlePhotoUrl } = req.body;
        try {
          const user = await User.findOne({ email });
          if (user) {
            const token = jwt.sign(
              { id: user._id, isAdmin: user.isAdmin, isSuperUser: user.isSuperUser },
              process.env.JWT_SECRET
            );
            const { password, ...rest } = user._doc;
            res
              .status(200)
              .cookie('access_token', token, {
                httpOnly: true,
              })
              .json(rest);
          } else {
            const generatedPassword =
              Math.random().toString(36).slice(-8) +
              Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
              username:
              name.split(' ').join(''),
              email,
              password: hashedPassword,
              profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign( 
              { id: newUser._id, isAdmin: newUser.isAdmin, isSuperUser: newUser.isSuperUser},
              process.env.JWT_SECRET
            );
            const { password, ...rest } = newUser._doc;
            res
              .status(200)
              .cookie('access_token', token, {
                httpOnly: true,
              })
              .json(rest);
          }
        } catch (error) {
          next(error);
        }
      };

      export const deleteUser = async (req, res, next) => {
        if (!req.user.isAdmin && req.user.id !== req.params.userId) {
          return next(errorHandler(403, 'You are not allowed to delete this user'));
        }
        try {
          await User.findByIdAndDelete(req.params.userId);
          res.status(200).json('User has been deleted');
        } catch (error) {
          next(error);
        }
      };

      export const logout = (req, res, next) => {
        try {
          res
            .clearCookie('access_token')
            .status(200)
            .json('User has been signed out');
        } catch (error) {
          next(error);
        }
      };

      
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 5 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 7 and 20 characters')
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};