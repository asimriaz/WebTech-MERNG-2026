import { db } from "./models/index.ts";

db.Student.find().then(students => {
    console.log(students);
}).then(() => process.exit())
