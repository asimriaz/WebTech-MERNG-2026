import express from "express";
import { db } from "../models/index.ts";
const router = express.Router();

router.get("/students", async (req, res) => {
    const students = await db.Student.find();
    res.status(200).json(students); 
});

router.get("/students/:regno", async (req, res) => {
    const student = await db.Student.findOne({ regno: req.params.regno });
    res.status(200).json(student); 
});

router.post("/students/add", async (req, res) => {
    const { regno, name } = req.body;
    console.log(regno, name);
    const student = await db.Student.insertOne({ regno, name });
    res.status(200).json(student); 
});

router.patch("/students/update", async (req, res) => {
    const { regno, name } = req.body;
    console.log(regno, name);
    const student = await db.Student.updateOne({ regno }, { $set: { name } }, { new: true });
    res.status(200).json(student); 
});


/*

{ regno }
*/

export default router;
