const store = require("../models/")

exports.newUser= (req,res) =>{
    var tmpUser = {
        name:req.body.name,
        password:req.body.password,
        securityQuestion:{
            question:req.body.question,
            answer: req.body.answer
        }
    }
    
}