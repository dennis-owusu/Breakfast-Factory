import Feedback from "../models/feedback.model.js"
import { errorHandler } from "../utils/error.js"


export const submitFeedback = async (req, res, next) =>{

    const {name, email, message} = req.body

    try {
        
        if(!name || !email){
            next(errorHandler(401, 'Login to send feedback'))
        }
        const newFeedback = await Feedback({
            name,
            email,
            message
        })
        await newFeedback.save()
        res.status(200).json(newFeedback)
    } catch (error) {
        next(error)
    }
    
}