import mongoose, {type Model} from "mongoose";

import { Course } from "./Course.ts";

import type{ 
    Course as CourseType, 
} from "../types.ts"


const mongoUri = "mongodb://localhost:27017/academic";


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
    Course, 
} satisfies {
    Course: Model<CourseType>,
}