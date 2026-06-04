import express from "express";
import { db } from "../models/index.ts";
const router = express.Router();

router.get("/courses", async (req, res) => {
    const courses = await db.Course.find();
    res.status(200).json(courses);
});

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
    const course = await db.Course.findOneAndUpdate({ courseid: courseId },
        { $set: { ...req.body } },
        { returnDocument: 'after' }
    );
    if (course) {
        res.status(200).json(course);
    } else {
        res.status(500).json({ message: "Failed to update course" });
    }
});


export default router;