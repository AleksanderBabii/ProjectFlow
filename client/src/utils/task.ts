import { TaskPriority } from "../types/task";

export const getPriorityVariant = (
  priority: TaskPriority
): "low" | "medium" | "high" => {
  switch (priority) {
    case "LOW":
      return "low";
    case "MEDIUM":
      return "medium";
    case "HIGH":
      return "high";
  }
};