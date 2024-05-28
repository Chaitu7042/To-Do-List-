const mongoose=require('mongoose');
const todoSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    }
});
const todoData=mongoose.model("todoData",todoSchema);
module.exports=todoData;
