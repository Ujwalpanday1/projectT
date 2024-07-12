import mongoose from "mongoose";


const templateSchema=new mongoose.Schema({
    name:{
        type:"string",
        required:true,
    },
    price:{
        type:"string",
        required:true,

    },
    rating:{
        type:"number",
        required:true,

    },
    path:{
        type:"string"
    },
    size:{
        type:"number"
    }

    
})

const Template=mongoose.model("Template",templateSchema)

export default Template