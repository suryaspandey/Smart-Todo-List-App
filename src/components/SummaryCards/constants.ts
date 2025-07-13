import {
  AlertTriangle,
  CheckCircle,
  Clock,
  ListChecks,
} from "lucide-react";

export const getSummaryData = (categorizedTasks: any, totalTask: any) => [
  {
    status: "Overview",
    statusLength: totalTask,
    icon: ListChecks,
    gradientBg: "from-purple-400 to-purple-600",
    totalTask: totalTask,
  },
  {
    status: "To Do",
    statusLength: categorizedTasks?.ongoing?.length,
    icon: Clock,
    color: "border-t-blue-500 bg-blue-50/30",
    gradientBg: "from-blue-400 to-blue-600",
    totalTask: totalTask,
  },
  {
    status: "Completed",
    statusLength: categorizedTasks?.success?.length,
    icon: CheckCircle,
    gradientBg: "from-green-400 to-green-600",
    totalTask: totalTask,
  },
  {
    status: "Failure",
    statusLength: categorizedTasks?.failure?.length,
    icon: AlertTriangle,
    gradientBg: "from-red-400 to-red-600",
    totalTask: totalTask,
  },
];
