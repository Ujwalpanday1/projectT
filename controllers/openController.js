import Template from "../models/Template.js"
const handleLandingPage=(req,res)=>{

    Template.find().then((templateArray)=>{
         res.status(200).send(templateArray)
         console.log('templateArray sent')
    }).catch((err)=>{
        console.log(err)
        res.status(400).send("error getting templates")
    })
   
}
const handleTemplatedetails=(req,res)=>{
    const {templateid}=req.params
    Template.findById(templateid).then((template)=>{
        if(template){
            res.status(200).send(template);
        console.log("template sent")
        }
        else{
            console.log("template doesnot found in db")
            res.status(400).send("template doesnot exit!")
        }
        
    }).catch((err)=>{
        console.log(err);
        res.status(400).send("error getting required template")
    })
}


export {handleLandingPage,handleTemplatedetails} 