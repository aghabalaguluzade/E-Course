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
     },
     role : {
          type : String,
          enum : ["student", "teacher", "admin"],
          default : "student"
     },
     courses : [{
          type : mongoose.Schema.Types.ObjectId,
          ref : "Course"
     }]
});

userSchema.pre("save", function(next) {
     const user = this;
     bcrypt.hash(user.password,10,(err,hash) => {
          user.password = hash;
          next();
     });
     if(!user.isModified('password')) return next();
});

const User = mongoose.model('User', userSchema);

export default User;