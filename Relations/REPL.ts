import { db } from "./models/index.ts";

// db.Student.find().then(students => {
//     students.forEach(async student => {
//         let result = await db.Mark.updateMany(
//             {regno: student.regno},
//             {$set : {student: student._id}}
//         );
//         console.log(result);
//     });
// })

// db.Mark.find()
//     .populate('student')
//     .then(marks => console.log(JSON.stringify(marks, null, 4)));

// db.Mark.find({ regno: "1712218" })
//   .select({ _id: 1 })
//   .then((marks) => console.log(JSON.stringify(marks, null, 4)));

// db.Student.find().then((students) => {
//   students.forEach(async (student) => {
//     let ids = await db.Mark.find({ regno: student.regno }).select({ _id: 1 });
//     let result = await db.Student.updateOne(
//       { regno: student.regno },
//       { $push: { marks: ids } },
//     );
//     console.log(result);
//   });
//   console.log(JSON.stringify(students, null, 4));
// });


// db.Student.find()
//   .populate('marks')
//   .then((students) => console.log(JSON.stringify(students, null, 4)));

db.Student.aggregate([
    {
        $lookup: {
            from: "marks", // collection name in MongoDB
            localField: "regno", // field in Student
            foreignField: "regno", // field in Mark
            as: "obtain" // output array field
        }
    }
])
.then((res) => console.log(JSON.stringify(res, null, 4)));