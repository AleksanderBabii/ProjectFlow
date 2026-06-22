import {prisma} from "../prisma/prisma.ts";

export const getTasksByBoard = async (boardId: string) => {
    return prisma.task.findMany({
        where: {
            boardId: boardId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export const createTask = async (boardId: string, data: {
    title: string,
    description: string;
    priority?: "LOW" | "MEDIUM" | "HIGH";
}) => {
    return prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            priority: data.priority ?? "MEDIUM",
            status: "TODO",
            boardId: boardId,
        },
    });
}

export const updateTask = async (taskId: string, data: {
    title?: string;
    description?: string;
    priority?: "LOW" | "MEDIUM" | "HIGH";
    status?: "TODO" | "IN_PROGRESS" | "DONE";
}) => {
    const updateData: {
        title?: string;
        description?: string;
        priority?: "LOW" | "MEDIUM" | "HIGH";
        status?: "TODO" | "IN_PROGRESS" | "DONE";
    } = {};

    if (data.title !== undefined) {
        updateData.title = data.title;
    }
    if (data.description !== undefined) {
        updateData.description = data.description;
    }
    if (data.priority !== undefined) {
        updateData.priority = data.priority;
    }
    if (data.status !== undefined) {
        updateData.status = data.status;
    }

    return prisma.task.update({
        where: {
            id: taskId,
        },
        data: updateData,
    });
}

export const deleteTask = async (taskId: string) => {
    return prisma.task.delete({
        where: {
            id: taskId,
        },
    });
}

