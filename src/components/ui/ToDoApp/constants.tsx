import { AlertTriangleIcon, CheckCircleIcon, ClockIcon } from "lucide-react";

export const REQUIRED_FIELD = "This field is required.";
export const getColumns = (categorizedTasks: any) => [
  {
    key: "ongoing",
    title: "To Do",
    icon: ClockIcon,
    color: "border-blue-500",
    headerBg: "bg-blue-500",
    count: categorizedTasks.ongoing.length,
    tasks: categorizedTasks.ongoing,
  },
  {
    key: "success",
    title: "Completed",
    icon: CheckCircleIcon,
    color: "border-green-500",
    headerBg: "bg-green-500",
    count: categorizedTasks.success.length,
    tasks: categorizedTasks.success,
  },
  {
    key: "failure",
    title: "Failure",
    icon: AlertTriangleIcon,
    color: "border-red-500",
    headerBg: "bg-red-500",
    count: categorizedTasks.failure.length,
    tasks: categorizedTasks.failure,
  },
];

export const EMPTY_STATE_CONTENT = {
  ongoing: {
    icon: "📋",
    title: "No active tasks",
    message: "Create a new task to get started",
  },
  success: {
    icon: "🎉",
    title: "No completed tasks",
    message: "Complete some tasks to see them here",
  },
  failure: {
    icon: "⏰",
    title: "No overdue tasks",
    message: "Great job staying on track!",
  },
};
