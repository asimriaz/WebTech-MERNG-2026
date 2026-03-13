import mongoose, { Schema, model } from 'mongoose'
import type { InferSchemaType } from 'mongoose'

export const studentSchema = new Schema({
	regno: String,
	name: String
})


export const Student = mongoose.models.Student || model<InferSchemaType<typeof studentSchema>>('Student', studentSchema)
