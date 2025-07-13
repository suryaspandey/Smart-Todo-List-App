import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";

export const getSummaryData = (categorizedTasks, totalTask) => [
  {
    status: "Overview",
    statusLength: totalTask,
    icon: Clock,
    headerBg: "bg-purple-500",
  },
  {
    status: "Active",
    statusLength: categorizedTasks?.ongoing?.length,
    icon: TrendingUp,
    color: "border-t-blue-500 bg-blue-50/30",
    headerBg: "bg-blue-500",
  },
  {
    status: "Completed",
    statusLength: categorizedTasks?.success?.length,
    icon: CheckCircle,
    color: "border-t-green-500 bg-green-50/30",
    headerBg: "bg-green-500",
  },
  {
    status: "Failure",
    statusLength: categorizedTasks?.failure?.length,
    icon: AlertTriangle,
    color: "border-t-red-500 bg-red-50/30",
    headerBg: "bg-red-500",
  },
];
