var express = require('express');
var router = express.Router();
const pool=require('./pool');
const upload=require('./multer');

/* GET movielisting page. */
router.get('/listyourshow', function(req, res, next) {
  res.render('movielisting',{message:''});
});

router.post('/datasubmited',upload.single('poster'),function(req,res){
  try{
    console.log("DATA:",req.body);
    console.log("file Data:",req.file);
    pool.query("insert into movies (stateid, cityid, cinemaid, screenid, moviename, description, status, poster) values(?,?,?,?,?,?,?,?)",
    [req.body.stateid, req.body.cityid, req.body.cinemaid, req.body.screenid, req.body.moviename, req.body.description, req.body.status, req.file.filename],function(error,result){
      if(error)
      {
        console.log("D Error",error);
        res.render("movielisting",{message:'workbanch Database Error'})
      }
      else
      {
        res.render("movielisting",{message:'Product Submitted Successfully',val:2})  
      }
    })
  }
  catch(e)
  {
    console.log("Error:",e);
    res.render("movielisting",{message:'Server Error'}) 
  }
})

router.get('/fetch_state',function(req,res){
  try{
    pool.query('select * from state',function(error,result){
      if(error)
      {
        console.log('Database error',error);
        res.status(200).json([]);
      }else{
        res.status(200).json({result:result});
      }
    })
  }
  catch(e)
  {
    console.log("Server Error",e);
    res.render("movielisting",{message:'server error'})
  }
})

router.get('/fetch_city',function(req,res){
  try{
    pool.query('select * from city where stateid=?',[req.query.stateid],function(error,result){
      if(error)
      {
        console.log('Database error',error);
        res.status(200).json([]);
      }else{
        res.status(200).json({result:result});
      }
    })
  }
  catch(e)
  {
    console.log("Server Error",e);
    res.render("movielisting",{message:'server error'})
  }
})

router.get('/fetch_cinema',function(req,res){
  try{
    pool.query('select * from cinema',function(error,result){
      if(error)
      {
        console.log('Database error',error);
        res.status(200).json([]);
      }else{
        res.status(200).json({result:result});
      }
    })
  }
  catch(e)
  {
    console.log("Server Error",e);
    res.render("movielisting",{message:'server error'})
  }
})

router.get('/fetch_screen',function(req,res){
  try{
    pool.query('select * from screen where cinemaid=?',[req.query.cinemaid],function(error,result){
      if(error)
      {
        console.log('Database error',error);
        res.status(200).json([]);
      }else{
        res.status(200).json({result:result});
      }
    })
  }
  catch(e)
  {
    console.log("Server Error",e);
    res.render("movielisting",{message:'server error'})
  }
})

router.get("/fetch_all_show",function(req,res){
  try{
    pool.query('select * from movies',function(error,result){
      if(error){
        console.log("Dabase Error",error);
        res.render('displayallshow',{data:[],message:'database error'})
      }else{
        res.render('displayallshow',{data:result})
      }

    })
  }
  catch(e)
  {
    console.log("Error",e);
    req.render("displayallshow",{data:[],message:'server error'})
  }
})

module.exports = router;
