

const isAdmin=(req,res,next)=>{
    if(req.user&&req.user.role==="admin"){
        console.log('access granted as admin')
        next();
    }
    else{
        res.status(403).send("access denied ! admin only")
    }
}
export default isAdmin;