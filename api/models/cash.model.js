import mongoose from 'mongoose';

const cashSchema = new mongoose.Schema(
  {
    workingDay: {
      type: Date,
      default: Date.now,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true, 
    },
    method: {
      type: String,
      required: true,
      default: 'CASH'
    },
  },
  { timestamps: true }
);

const Cash = mongoose.model('Cash', cashSchema);

export default Cash;
