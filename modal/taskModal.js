const mongoose = require('mongoose');

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['Not Started','In Progress','Completed'],
        default:'Not Started'
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});

const Task=mongoose.model('Task',taskSchema);

module.exports=Task;