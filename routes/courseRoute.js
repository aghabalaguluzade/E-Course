import express from "express";
import * as courseController from "../controllers/courseController.js";

const router = express.Router();

router.route('/')
     .post(courseController.createCourse)
     .get(courseController.getAllCourse);

router.route('/:slug')
     .get(courseController.getCourse)

export default router;