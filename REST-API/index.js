import express from 'express';
const app = express();
import indexRouter from './routes/index.js';

app.use(express.json());
app.use('/api', indexRouter);


const PORT = 4500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

