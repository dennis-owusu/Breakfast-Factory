import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    workingDay: {
      type: Date,
      default: Date.now,
    },
    referenceId: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String, 
      default: null,
    },
  
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default:true
    },
    amount: {
      type: Number,
      required: true, 
    },
    method: {
      type: String,
      required: true
    },
    cashAmount: {
      type:Number,
      default:0
    },
    EcashAmount: {
      type:Number,
      default:0
    },
    paystackCharge: {
      type: Number,
      required:true
    },
    myCharge: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
