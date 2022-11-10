import User from "../models/User.js";
import Category from "../models/Category.js";
import Course from "../models/Course.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const createUser = async (req,res) => {
     try {
          const user = await User.create(req.body);
          res.status(201).redirect("/login");
     } catch (error) {
          const errors = validationResult(req);
          
          for(let i = 0; i < errors.array().length; i++) {
          req.flash("error", `${errors.array()[i].msg} - `);
          };
          res.status(400).redirect("/register"); 
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
                         }else {
                              req.flash("error", "Your passoword is not correct");
                              res.status(400).redirect("/login");
                         };
                    });                  
               }else {
                    req.flash("error", "User is not exisist");
                    res.status(400).redirect("/login");
               };
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
     const users = await User.find();
     const categories = await Category.find();
     const courses = await Course.find({ user : req.session.userId }).sort("-createdAt");
     res.status(200).render("dashboard", {
          page_name : "dashboard",
          user,
          users,
          categories,
          courses
     });
};

const deleteUser = async (req,res) => {
     try {
       await User.findByIdAndDelete(req.params.id);
       await Course.deleteMany({ user : req.params.id });
       res.status(200).redirect("/users/dashboard");
     } catch (error) {
          res.status(400).json({
               status : "fail",
               error
          });
     };
};

export {
     createUser,
     loginUser,
     logoutUser,
     getDashboardPage,
     deleteUser
};