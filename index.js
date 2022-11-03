import express from "express";
import dotenv from "dotenv";
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

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/', pageRoute);
app.use('/courses', couseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
     console.log(`App start on ${PORT}`);
});