import Template from "../models/Template.js"
//using another way to work with async function without using .then 

const handleAdmin=(req,res)=>{
  res.status(200).send("you will get add template form here ")
}

const handleAdminAddTemplate=(req,res)=>{

    console.log(req.file)


    const {name,price,rating}=req.body
    
  Template.create({
    name,price,rating,path:req.file.path,size:req.file.size
  }).then((template)=>{
    console.log("template created")
    res.status(200).send("template created")

  }).catch((err)=>{
    console.log(err)
    res.status(400).send("cannot create template")
  })
}

export {handleAdminAddTemplate}