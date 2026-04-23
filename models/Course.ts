import mongoose, { Schema, model } from 'mongoose'
import type { InferSchemaType } from 'mongoose'



export const courseSchema = new Schema({
  courseid: Number,
  code: String,
  title: String,
  crhr: Number,
  semester: Number
})


export const Course = mongoose.models.Course || model<InferSchemaType<typeof courseSchema>>('Course', courseSchema)
