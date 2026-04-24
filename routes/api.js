import express from 'express';
const router = express.Router();
import { db } from '../models/index.ts';

const pageContent = {
    title: 'Vash Example',
    heading: 'Hello from Vash',
    message: 'This page is rendered by Express using the Vash view engine.'
};


router.get('/content', (req, res) => {
    res.render('content', pageContent);
});

router.get('/list', async (req, res) => {
    const students = await db.Student.find();
    res.render('list', { students });
});

export default router;