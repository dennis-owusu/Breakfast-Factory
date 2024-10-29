import Cash from "../models/cash.model.js"

export const cashPayment = async(req, res, next) => {
    const {workingDay, email, amount, method} = req.body

    try { 
        
        const newCashPayment = await Cash({
            workingDay,
            email,
            amount,
            method
        })

        await newCashPayment.save()
        res.status(200).json(newCashPayment)
    } catch (error) {
        next(error)
    }


}


export const getAllCashPayment = async (req, res, next) => {

     
  const { email } = req.query;
    try {
        const getPayment = await Cash.find({email})
        res.status(200).json({getPayment}) 
    } catch (error) {
        next(error)
    }
}
export const getAdminAllCashPayment = async (req, res, next) => {

    try {
        const getPayment = await Cash.find()
        res.status(200).json({getPayment})
    } catch (error) {
        next(error)
    }
}