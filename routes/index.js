import express from "express";
import {db} from "../models/index.ts";
const router = express.Router();

// router.get("/", async (req, res) => {
//     const courses = await db.Course.find();
//     res.render("index", { courses });
// });

router.get("/courses/:courseid", async (req, res) => {
    const courseId = req.params.courseid;
    const course = await db.Course.findOne({ courseid: courseId });
    if (course) {
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: "Course not found" });
    }
});

router.post("/courses/:courseid", async (req, res) => {
    const courseId = req.params.courseid;
    console.log(req.body)
    const response = await db.Course.updateOne({ courseid: courseId }, 
        { $set: { ...req.body }, upsert: true }
    );
    if (response.acknowledged) {
        res.status(200).json({ message: "Course updated successfully" });
    } else {
        res.status(500).json({ message: "Failed to update course" });
    }
});


export default router;