const store = require("../models/store")

exports.newUser= (req,res) =>{
    var tmpUser = {
        name:req.body.name,
        password:req.body.password,
        securityQuestion:{
            question:req.body.question,
            answer: req.body.answer
        }
    }
    store.updateOne({},{$push:{users:tmpUser}},
        function(err){
        if(err)res.send("error")
        else res.send("user created")
    })
}