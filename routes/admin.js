var express = require('express');
var router = express.Router();
var pool=require('./pool');
var LocalStorage=require('node-localstorage').LocalStorage;
localStorage=new LocalStorage('./scratch')

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('loginpage', { message: '' });
});
// router.get('/dashboard', function(req, res, next) {
//   res.render('dashboard', { message: '' });
// });

router.post('/check_admin_login',function(req,res){
  try{
    pool.query("select * from admintb where (emailid=? or mobileno=?) and password=?",[req.body.email,req.body.email,req.body.password],function(error,result){
      if(error)
      {
        res.render('loginpage',{message:'Database Error'});
        // console.log("result dblll:",error);
      }
      else
      {
        if(result.length==1)
        {
          localStorage.setItem('ADMIN',JSON.stringify(result[0]))
          res.render("dashboard",{data:result[0]});
          // console.log("result dblll:",result);
        }
        else
        {
          res.render("loginpage",{message:"Invalid email/mobileno/password"})
        }  
      }
    })
  }
  catch(e)
  {
    res.render('loginpage',{message:'Server Error'})
  }
})

router.get('/logout',function(req,res){
  localStorage.clear()
  res.render('loginpage',{message:''})
})
module.exports = router;