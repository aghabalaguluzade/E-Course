import mongoose from "mongoose";

const conn = () => {
     mongoose.connect(process.env.DB_URL, {
          dbName : "e-course",
          useNewUrlParser: true,
          useUnifiedTopology: true
     }).then(()=> {
          console.log("Connected to the DB succesfully");
     }).catch((err) => {
          console.log(`DB connection error: ${err}`);
     });
};

export default conn;