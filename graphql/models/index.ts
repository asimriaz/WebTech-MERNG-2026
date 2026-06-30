import mongoose, {type Model} from "mongoose";

import { Student } from "./Student.ts";
import { Mark } from "./Mark.ts";
import { Grade } from "./Grade.ts";
import { Head } from "./Head.ts";

import type{ 
    Student as StudentType, 
    Mark as MarkType, 
    Grade as GradeType, 
    Head as HeadType 
} from "../types.ts"


const mongoUri = "mongodb://localhost:27017/recapsheet";


/* ------------------------ Singleton Connection --------------- */

let connectionPromise: Promise<typeof mongoose> | null = null;

async function ensureConnection() {
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(mongoUri);
    }
    return connectionPromise;
}

/* connect immediately (hidden from user) */
await ensureConnection();
/* ------------------------------------------------------------- */

export const db = {
    Student, 
    Mark,
    Grade,
    Head, 
} satisfies {
    Student: Model<StudentType>,
    Mark: Model<MarkType>,
    Grade: Model<GradeType>,
    Head: Model<HeadType>
}