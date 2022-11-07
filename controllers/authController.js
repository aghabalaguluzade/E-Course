import User from "../models/User.js";
import Category from "../models/Category.js";
import Course from "../models/Course.js";
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
                              res.status(200).redirect('/users/dashboard');
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

const getDashboardPage = async (req,res) => {
     const user = await User.findOne({_id : req.session.userId}).populate("courses");
     const categories = await Category.find();
     const courses = await Course.find({ user : req.session.userId });
     res.status(200).render("dashboard", {
          page_name : "dashboard",
          user,
          categories,
          courses
     });
};

export {
     createUser,
     loginUser,
     logoutUser,
     getDashboardPage
};