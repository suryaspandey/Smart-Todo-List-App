import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../button";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "../badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

import { formatDistanceToNow, isPast, format } from "date-fns";
import { useTask } from "@/store/useTaskStore";

export const TaskCard = ({ task, status }: { task: any; status: string }) => {
  const { deleteTask, updateTask } = useTask();

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const deadline = new Date(task.deadline);

      if (isPast(deadline) && !task.isCompleted) {
        setTimeLeft(`Overdue by ${formatDistanceToNow(deadline)}`);
      } else if (!task.isCompleted) {
        setTimeLeft(`Due in ${formatDistanceToNow(deadline)}`);
      } else {
        setTimeLeft("Completed");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [task.deadline, task.isCompleted]);

  const handleToggleComplete = async () => {
    try {
      await updateTask(task.id, { isCompleted: !task.isCompleted });

      toast.success(
        task.isCompleted ? "Task marked as incomplete" : "Task completed!"
      );
    } catch (error: string) {
      toast.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);

      toast.success("Task has been removed successfully");
    } catch (error: any) {
      toast.error(error);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "failure":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  const getTimeBadgeColor = () => {
    if (task.isCompleted) return "bg-green-100 text-green-800";
    if (isPast(new Date(task.deadline))) return "bg-red-100 text-red-800";
    return "bg-blue-100 text-blue-800";
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2 flex-1">
          {getStatusIcon()}
          <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
            {task.title}
          </h3>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {status === "ongoing" ? (
              <DropdownMenuItem
              // onClick={() => onEdit(task)}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleToggleComplete}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {task.isCompleted ? "Mark Incomplete" : "Mark Complete"}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {task.description && (
        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{format(new Date(task.deadline), "MMM d")}</span>
        </div>

        <Badge
          variant="secondary"
          className={`${getTimeBadgeColor()} text-xs px-2 py-0.5`}
        >
          {timeLeft}
        </Badge>
      </div>

      {!task.isCompleted && (
        <Button
          onClick={handleToggleComplete}
          className="w-full mt-3 h-7 text-xs bg-green-600 hover:bg-green-700"
          size="sm"
        >
          Complete
        </Button>
      )}
    </div>
  );
};

export default TaskCard;
