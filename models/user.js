import mongoose from "mongoose";


const purchaseSchema=new mongoose.Schema({
    Template:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template"
        },
    price:{
        type:"string",
        
        },
    purchasedAt: {
        type: Date,
        default: Date.now
        }
})

const userSchema=new mongoose.Schema({
    name:{
        type:"string",
        required:true,
    },
    email:{
        type:"string",
        required:true,
        unique:true,
    },
    password:{
        type:"string",
        required:true,
        select:false
    },
    role:{
        type:"string",
        default:"user"
    }
    ,
    verified:{
        type:Boolean,
        default:false
    },
    verificationCode:{
        type:"string",
        default:null
    }
    ,
    purchasedTemplates: [purchaseSchema]
})

const User=mongoose.model("User",userSchema,)
export default User