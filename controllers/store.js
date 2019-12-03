const store = require("../models/store")

exports.newUser= (req,res) =>{
    var tmpUser ={
        mail: req.body.mail,
        username:req.body.username,
        password:req.body.password,
        securityQuestion:{
            question:req.body.question,
            answer: req.body.answer
        },
    trials:3,
    blocked:false}

    store.findOne({_id:"5de4a4cb3c0557a27621ab3c"}).then(function(data,err) {
        //modify and save the object received via callback
        data.users.push(tmpUser);
        data.save();
     if(err)res.send("error")
     else res.render("index.html")
    /*store.updateOne({},{$push:{users:tmpUser}},
        function(err){
        if(err)res.send("error")
        else res.send("user created")
    })*/
})}

exports.loginUser =(req,res)=>{
    store.find({ }).then(data=>{
        
        console.log(data[0].users)
        data[0].users.forEach(user=>{
            if (user.mail===req.body.mail){
                if(user.blocked){
                    res.send("user blocked, contact admin")
                }else{
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                      res.redirect(`${user.username}/store`);
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
                      res.redirect(`${user.username}/store`);
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

exports.addCart=(req,res)=>{
    console.log(req.body)
    var tmpCart={name:req.body.name,
    price: req.body.price,
    description: req.body.description}
    store.update({"users.username":req.params.username},
                            { $push: {"users.$.cart": tmpCart}},function(err){
                                if (err) res.send("error")
                                res.redirect(`/${req.params.username}/store`);
                            })
}

exports.transactionPost=(req,res)=>{
    var tmp =
    store.update({"users.username":req.params.username},
                            { $push: {"users.$.cart": tmpCart}},function(err){
                                if (err) res.send("error")
                                res.redirect(`/${req.params.username}/store`);
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

exports.passwordRecovery = (req,res) =>{
    res.render("password1.html")
}


exports.socketPage = (req,res) =>{
    store.find({}).then(data=>{
        console.log(req.body)
        data[0].users.forEach(user=>{
            if(user.username===req.params.username){
               
                    var total = 0;
                    
                    user.cart.forEach(item=>{
                        total+=item.price
                        
                       
                    })
                    
                    var tmpTransaction={
                        user:user.username,
                        amount:total,
                        status:"PROCESSING"
                    }
                    store.findOneAndUpdate({},{$push:{transactions:tmpTransaction}},{ returnOriginal: false },
                        function (err) {
                            store.find({}).then(data=>{
                                
                                var tmp = data[0].transactions
                        
                           if(err)res.send("error")
                           else res.render("socket.html",{data:tmp[tmp.length-1]})
                            })
                            
                          
                        })
                    
                    
                    
               
            }
        })
    })
  
}

exports.storePage = (req,res)=>{
   store.find({}).then(data=>{
       
    res.render("store.html",{products:data[0].products})
   })
}



exports.cartPage = (req,res)=>{
    store.find({}).then(data=>{
        data[0].users.forEach(user=>{
            if(user.username===req.params.username){
                res.render("cart.html",{data:{products:user.cart,
                question:user.securityQuestion.question}})
            }
        })
     
    })
 }
 

