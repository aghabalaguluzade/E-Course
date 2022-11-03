import mongoose from "mongoose";
import bcrypt from "bcrypt";
const {Schema} = mongoose;

const  userSchema = new Schema({
     name : {
          type : String,
          required : true,
          trim : true
     },
     email : {
          type : String, 
          required : true,
          unique : true,
          trim : true
     },
     password : {
          type : String,
          required : true,
          trim : true
     }
});

userSchema.pre("save", function(next) {
     const user = this;
     bcrypt.hash(user.password,10,(err,hash) => {
          user.password = hash;
          next();
     });
});

const User = mongoose.model('User', userSchema);

export default User;