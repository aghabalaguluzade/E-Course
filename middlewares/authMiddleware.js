import User from "../models/User.js";

export default (req,res,next) => {
     User.findById(req.session.userId, (err,user) => {
          if(err || !user) return res.redirect('/login');
          next();
     });
};