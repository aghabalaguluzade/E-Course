import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import flash from "connect-flash";
import MongoStore from 'connect-mongo';
import conn from "./server.js";
import pageRoute from "./routes/pageRoute.js";
import couseRoute from "./routes/courseRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();

dotenv.config();
conn();

// Template Engine
app.set('view engine', 'ejs');

// Global Variable
global.userIN = null;

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
     secret : 'my_keyboard_cat',
     resave : false,
     saveUninitialized : true,
     store: MongoStore.create({ mongoUrl: process.env.DB_URL })
}));
app.use(flash());
app.use((req,res,next) => {
     res.locals.flashMessages = req.flash();
     next();
});

// Routes
app.use('*',(req,res,next) => {
     userIN = req.session.userId;
     next();
});
app.use('/', pageRoute);
app.use('/courses', couseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
     console.log(`App start on ${PORT}`);
});