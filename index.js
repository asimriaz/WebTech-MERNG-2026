import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.js';
import { db } from './models/index.ts';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const courses = await db.Course.find();
    //console.log(courses);
    res.render("index", { courses });
});

app.use('/api', indexRouter);


app.set('view engine', 'vash');
app.set('views', path.join(__dirname, 'views'));





const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
