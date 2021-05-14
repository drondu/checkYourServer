const User = require("../models/user.js")

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//login handle
router.get('/login',(req,res)=>{
    res.render('users/login');
})
router.get('/register',(req,res)=>{
    res.render('users/register')
    })

router.post('/login',(req,res,next)=>{
  })
//Register handle
router.post('/register',(req,res)=>{

  const {name,email, password, password2} = req.body;
  let errors = [];

  console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);

  if(!name || !email || !password || !password2) {
      errors.push({msg : "Please fill in all fields"})
  }

  //check if match
  if(password !== password2) {
      errors.push({msg : "passwords dont match"});
  }
  
  //check if password is more than 6 characters
  if(password.length < 6 ) {
      errors.push({msg : 'password atleast 6 characters'})
  }

  if(errors.length > 0 ){
    res.render('users/register', {
        errors : errors,
        name : name,
        email : email,
        password : password,
        password2 : password2})
  }else{     
    User.findOne({email : email}).exec((err,user)=>{
      console.log(user);
      if(user) {
        errors.push({msg: 'email already registered'});
        render(res,errors,name,email,password,password2);
      }else{
        const newUser = new User({
          name : name,
          email : email,
          password : password
        });
        //hash password
        bcrypt.genSalt(10,(err,salt)=> 
          bcrypt.hash(newUser.password,salt,
              (err,hash)=> {
                  if(err) throw err;
                      //save pass to hash
                      newUser.password = hash;
                  //save user
                  newUser.save()
                  .then((value)=>{
                    console.log(value)

                    req.flash('success_msg','You have now registered!') 

                    res.redirect('/users/login');
                  })
                  .catch(value=> console.log(value)); 
              }
          )
        );
      }
    })
  }
})

//logout
router.get('/logout',(req,res)=>{
 })
module.exports  = router;