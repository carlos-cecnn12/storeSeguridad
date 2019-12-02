const store = require("../models/store")

exports.newUser= (req,res) =>{
    store.create({ users:{
        mail: req.body.mail,
        username:req.body.username,
        password:req.body.password,
        securityQuestion:{
            question:req.body.question,
            answer: req.body.answer
        },
    trials:3,
blocked:false}
    }, function(err){
        if(err)res.send("error")
        else res.render("index.html")})
    /*store.updateOne({},{$push:{users:tmpUser}},
        function(err){
        if(err)res.send("error")
        else res.send("user created")
    })*/
}

exports.loginUser =(req,res)=>{
    store.find({ }).then(data=>{
        
        console.log(data[0].users)
        data[0].users.forEach(user=>{
            if (user.mail===req.body.mail){
                if(user.blocked){
                    res.send("user blocked, contact admin")
                }else{
                    var ind = searchIndexMail(req.body.mail, data[0].users)
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                      res.send("welcome");
                    } else {
                        
                        if(user.trials>1){

                            store.update({"users.mail":req.body.mail},
                            { $set: {"users.$.trials":user.trials-1} },function(err){
                                if (err) res.send("error")
                                res.send("wrong password")
                            })
                            
                        }else{
                            store.update({"users.mail":req.body.mail},
                            { $set: {"users.$.trials":3,
                        "users.$.blocked":true} },function(err){
                                if (err) res.send("error")
                                res.send("too many trials, account blocked, contact admin")
                            })
                        } 
                    } 
                  });
                }
            }else if(user.username ===req.body.mail){
                if(user.blocked){
                    res.send("user blocked, contact admin")
                }else{
                    
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                      res.send("welcome");
                    } else {
                        
                        if(user.trials>1){

                            store.update({"users.username":req.body.mail},
                            { $set: {"users.$.trials":user.trials-1} },function(err){
                                if (err) res.send("error")
                                res.send("wrong password")
                            })
                            
                        }else{
                            store.update({"users.username":req.body.mail},
                            { $set: {"users.$.trials":3,
                        "users.$.blocked":true} },function(err){
                                if (err) res.send("error")
                                res.send("too many trials, account blocked, contact admin")
                            })
                        } 
                    } 
                  });
            }}else res.send("user doesn't exist")
        })  
    })
}

exports.getIndex = (req,res) =>{
    res.render("index.html")
}

exports.loginPage = (req,res) =>{
    res.render("login.html")
}

exports.registerPage = (req,res) =>{
    res.render("register.html")
}

function searchIndexMail(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].mail === nameKey) {
        return i;
      }
    }
    return false;
  }
  function searchIndexUser(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].username === nameKey) {
        return i;
      }
    }
    return false;
  }