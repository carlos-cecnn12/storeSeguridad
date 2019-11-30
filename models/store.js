const mng = require("mongoose")
const Schema = mng.Schema

var prodSchema = new Schema({
    name: String,
    price:Number,
    description:String
})

var userSchema = new Schema({
    mail:String,
    password:String,
    securityQuestion:{
        question: string,
        answer: string
    },
    cart:[prodSchema]
})

var StoreSchema = new Schema({
    users = [userSchema],
    products = [prodSchema]
})

StoreSchema.pre("save", function(next) {
    var comp = this;
  
    // only hash the password if it has been modified (or is new)
    if (!comp.users.isModified("password")) return next();
  
    // generate a salt
    bc.genSalt(10, function(err, salt) {
      if (err) return next(err);
  
      // hash the password using our new salt
      bc.hash(comp.users.password, salt, function(err, hash) {
        if (err) return next(err);
  
        // override the cleartext password with the hashed one
        comp.users.password = hash;
        next();
      });
    });
  });
  
  StoreSchema.methods.comparePassword = function(candiStringPassword, cb) {
    bc.compare(candiStringPassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

module.exports = mng.model("Store", StoreSchema)
