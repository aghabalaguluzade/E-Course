import nodemailer from "nodemailer";
import Course from "../models/Course.js";
import User from "../models/User.js";

const getIndexPage = async (req,res) => {
     const courses = await Course.find().sort("-createdAt").limit(2);
     const totalCourses = await Course.find().countDocuments();
     const totalStudents = await User.countDocuments({ role : "student" });
     const totalTeachers = await User.countDocuments({ role : "teacher" });
     res.status(200).render("index", {
          courses,
          totalCourses,
          totalStudents,
          totalTeachers,
          page_name : "index"
     });
};

const getAboutPage = async (req,res) => {
     const courses = await Course.find().sort("-createdAt").limit(2);
     res.status(200).render("about", {
          courses,
          page_name : "about"
     });
};

const getRegisterPage = (req,res) => {
     res.status(200).render("register", {
          page_name : "register"
     });
};

const  getLoginPage = (req,res) => {
     res.status(200).render("login",{
          page_name : "login"
     });
};

const getContactPage = (req,res) => {
     res.status(200).render("contact", {
          page_name : "contact"
     });
};

const sendEmail = async (req,res) => {

     try {
          const outputMessage = `
          <h1>Mail Details</h1>
          <ul>
               <li>Name : ${req.body.name}</li>
               <li>Email : ${req.body.email}</li>
          </ul>
          <h1>Message</h1>
          <p>${req.body.message}</p>
     `;

          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
               host: "smtp.gmail.com",
               port: 465,
               secure: true, // true for 465, false for other ports
               auth: {
               user: process.env.USER_GMAIL, // generated gmail user
               pass: process.env.PASSWORD_GMAIL, // generated gmail password
               },
          });


          // send mail with defined transport object
          let info = await transporter.sendMail({
               from: `"E-Course Contact Form" aghabalaguluzade@gmail.com`, // sender address
               to: `${process.env.USER_GMAIL}`, // list of receivers
               subject: "E-Course Form New Message", // Subject line
               html: outputMessage, // html body
          });

          req.flash("success", "We received your message successfully");
          res.status(200).redirect("/contact");
     } catch (error) {
          req.flash("success", `Something happend ${error}!`);
          res.status(400).redirect("/contact");
     };

};

export {
     getIndexPage,
     getAboutPage,
     getRegisterPage,
     getLoginPage,
     getContactPage,
     sendEmail
};