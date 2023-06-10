var multer=require('multer');
const {v4:uuid4}=require('uuid');

var storage=multer.diskStorage({
  destination:(req,file,path)=>{path(null,'public/images')},
  filename:(req,file,path)=>
  {
    var ext=file.originalname.substring(file.originalname.lastIndexOf("."));
    path(null,uuid4()+ext)
  }
})

var upload=multer({storage:storage})

module.exports=upload;