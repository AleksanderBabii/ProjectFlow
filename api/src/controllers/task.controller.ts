import type {Request, Response} from 'express';
import {TaskService} from '../services/task.services.ts';
export class TaskController {
    private taskService: TaskService;
    constructor() {
        this.taskService = new TaskService();
    }
}
