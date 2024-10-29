import mongoose from 'mongoose';

const workingDaySchema = mongoose.Schema({
 
    status: {
        type: Boolean,
        default: false
    },
    initUsername: {
        type: String,
        required: true
    },
    closingTime: {
        type: String,
        required: true
    },
    
}, {timestamp:true})

const WorkingDay = mongoose.model('WorkingDay', workingDaySchema)

export default WorkingDay