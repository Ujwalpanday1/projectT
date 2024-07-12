
const handleUser=(req,res)=>{
    console.log("here")
    res.status(200).send(req.user)
}
const handleUserProfile=(req,res)=>{

}

const handlePurchase=(req,res)=>{

}


export  {handleUser,handleUserProfile,handlePurchase} 