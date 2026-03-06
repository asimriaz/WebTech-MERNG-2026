import express from 'express';
const router = express.Router();

router.get('/courses', (req, res) => {
  res.send('Welcome to the Course Home Page!');
});

export default router;