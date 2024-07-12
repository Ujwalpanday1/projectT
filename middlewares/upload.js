import multer from "multer"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path"

//when using es6 module i have to define __dirname my self 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"../uploads/templates"))
    },
    filename:(req,file,cb)=>{
        const fileN=path.parse(file.originalname).name+file.fieldname+Date.now()+Math.floor(Math.random()*899999+100000)+path.extname(file.originalname);
        console.log(fileN,"filename");
        cb(null,fileN);
    }
    
})

const uploads=multer({storage:storage})

export default uploads;