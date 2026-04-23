import {Course} from './models/Course.ts'
import { InferSchemaType } from 'mongoose'

export type Course = InferSchemaType<typeof Course>
