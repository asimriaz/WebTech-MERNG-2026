import { db } from '../models/index.ts'


export const resolvers = {

    // resolver parameters: parent, args, context, info

    Query: {
        students: async () => await db.Student.find(),
        marks: async () => await db.Mark.find().sort({ regno: 1, hid: 1 }),
        heads: async () => await db.Head.find(),
        grades: async () => await db.Grade.find(),
    },
    Mark: {
        student: async (parent, args, context, info) => await db.Student.findOne({ regno: parent.regno }),
        head: async (parent, args, context, info) => await db.Head.findOne({ hid: parent.hid }),
    },
    Student: {
        marks: async (parent, args, context, info) => await db.Mark.find({ regno: parent.regno }),
    },
    Mutation: {
        updateMarks: async (parent, args, context, info) => {
            const { regno, hid, marks } = args;
            const mark = await db.Mark.findOneAndUpdate(
                { regno, hid },
                { $set: { marks } },
                { returnDocument: 'after' }
            );
            return mark;
        }
    }
};