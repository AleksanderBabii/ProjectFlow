import {Router} from 'express';
import {TaskController} from '../controllers/task.controller.ts';

const router = Router();
const taskController = new TaskController();

router.get('/', (req, res) => {
    res.send('Get all tasks');
});

router.post('/', (req, res) => {
    res.send('Create a new task');
});

export default router;