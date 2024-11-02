import ProductLog from "../models/productlog.model.js";
import Transaction from "../models/transactions.model.js";  // Make sure the model is correctly imported
import {v4 as uuidv4} from 'uuid'

export const transaction = async (req, res, next) => {
  try {
    const { 
      referenceId, 
      name, 
      phoneNumber,
      email,
      status, 
      method, 
      amount, 
      cashAmount = 0, 
      EcashAmount = 0, 
      paystackCharge, 
      myCharge,
      products = [] 
    } = req.body;

    // Create a new transaction
    const newTransaction = new Transaction({
      referenceId: typeof referenceId === 'object' && referenceId.reference ? referenceId.reference : String(referenceId),
      name,
      phoneNumber,
      email,
      status,
      method,
      amount,
      transactionId: referenceId.transaction || null,
      paystackCharge,
      myCharge,
      cashAmount: method === "CASH" ? amount : 0,  // Set cashAmount based on method
      EcashAmount: method === "MOMO" ? amount : 0,  // Set EcashAmount based on method
    });

    await newTransaction.save();

    res.status(201).json({ message: "Transaction saved successfully", transaction: newTransaction });
  } catch (error) {
    next(error);
  }

}




export const getTransaction = async(req, res, next)=>{

  const { email } = req.query;
  try {
    const allTransactions = await Transaction.find({email})
res.status(200).json({allTransactions})
} catch (error) {
    next(error)
}  
}


export const adminTransactionData = async(req, res, next) =>{
  try {
    const adminTransactions = await Transaction.find()
    res.status(200).json({adminTransactions})
  } catch (error) {
    next(error)
  }
}