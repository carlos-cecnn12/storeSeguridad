const mng = require("mongoose")
const Schema = mng.Schema
const bc =require("bcrypt")

var prodSchema = new Schema({
    name: String,
    price:Number,
    description:String
})

var userSchema = new Schema({
    username:String,
    mail:String,
    password:String,
    securityQuestion:{
        question: String,
        answer: String
    },
    trials:Number,
    blocked:Boolean,
    cart:[prodSchema]
})

var StoreSchema = new Schema({
    users : [userSchema],
    products : [prodSchema]
})

userSchema.pre("save", function(next) {
    var comp = this;
  
    // only hash the password if it has been modified (or is new)
    if (!comp.isModified("password")) return next();
  
    // generate a salt
    bc.genSalt(10, function(err, salt) {
      if (err) return next(err);
  
      // hash the password using our new salt
      bc.hash(comp.password, salt, function(err, hash) {
        if (err) return next(err);
  
        // override the cleartext password with the hashed one
        comp.password = hash;
        next();
      });
    });
  });
  
  userSchema.methods.comparePassword = function(candiStringPassword, cb) {
    bc.compare(candiStringPassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

module.exports = mng.model("Store", StoreSchema)
