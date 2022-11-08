import nodemailer from "nodemailer";

const getIndexPage = (req,res) => {
     res.status(200).render("index", {
          page_name : "index"
     });
};

const getAboutPage = (req,res) => {
     res.status(200).render("about", {
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

   res.status(200).redirect("/contact");

};

export {
     getIndexPage,
     getAboutPage,
     getRegisterPage,
     getLoginPage,
     getContactPage,
     sendEmail
};