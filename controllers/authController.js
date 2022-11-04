import User from "../models/User.js";
import bcrypt from "bcrypt";

const createUser = async (req,res) => {
     try {
          const user = await User.create(req.body);
          res.status(201).redirect("/login");
     } catch (error) {
          res.status(400).json({
               status : "fail",
               error
          });
     };
};

const loginUser = async (req,res) => {
     try {
          const { email, password } = req.body;
          await User.findOne({email}, (err, user) => {
               if(user) {
                    bcrypt.compare(password,user.password,(err,same) => {
                         if(same) {
                              // USER SESSION
                              req.session.userId = user._id;
                              res.status(200).redirect('/');
                         };
                    });                  
               }
          });
     } catch (error) {
          
     };
};

const logoutUser = (req,res) => {
     req.session.destroy(() => {
          res.redirect('/');
     });
};

export {
     createUser,
     loginUser,
     logoutUser
};