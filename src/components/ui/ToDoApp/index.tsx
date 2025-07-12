import { useTask } from "@/store/useTaskStore";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  Filter,
  Plus,
  Search,
  XCircle,
} from "lucide-react";
import { SelectValue } from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../select";
import { Button } from "../button";
import { Input } from "../input";
import TaskCard from "../TaskCard";
import TaskForm from "./TaskForm";
import { toast } from "sonner";

export const ToDoApp = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const { loading, tasks } = useTask();

  const { fetchTasks } = useTask();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshFlag((prev) => !prev);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    //
  }, [refreshFlag]);

  //   useEffect(() => {
  //     const newlyOverdueTask = tasks.filter(
  //       (task) => !task.isCompleted && new Date(task.deadline) <= new Date()
  //     );

  //     if (newlyOverdueTask.length > 0) {
  //       toast.error(`You have ${newlyOverdueTask.length} task(s) overdue`);
  //     }
  //   }, [tasks]);

  const editTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const categorizedTasks = useMemo(() => {
    return {
      ongoing: tasks.filter(
        (task) => !task.isCompleted && new Date(task.deadline) > new Date()
      ),
      success: tasks.filter((task) => task.isCompleted),
      failure: tasks.filter(
        (task) => !task.isCompleted && new Date(task.deadline) <= new Date()
      ),
    };
  }, [tasks, refreshFlag]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const status = task.isCompleted
      ? "success"
      : new Date(task.deadline) <= new Date()
      ? "failure"
      : "ongoing";

    return matchesSearch && (filterStatus === "all" || filterStatus === status);
  });

  const columns = [
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-indigo-200 border-t-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Smart Task Manager
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Organize your tasks efficiently and stay productive
              </p>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              {showForm ? "Cancel" : "Add New Task"}
            </Button>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white mb-6">
            <h3 className="text-xl font-semibold mb-4">Task Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{tasks.length}</div>
                <div className="text-indigo-100 text-sm">Total Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">
                  {categorizedTasks.ongoing.length}
                </div>
                <div className="text-indigo-100 text-sm">Active</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">
                  {categorizedTasks.success.length}
                </div>
                <div className="text-indigo-100 text-sm">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-200">
                  {categorizedTasks.failure.length}
                </div>
                <div className="text-indigo-100 text-sm">Overdue</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search tasks by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-indigo-500 relative"
              />
            </div>
            <Select
              value={filterStatus}
              onValueChange={(value: "all") => setFilterStatus(value)}
            >
              <SelectTrigger className="w-full sm:w-48 h-12 text-lg border-2 border-gray-200">
                <Filter className="w-5 h-5 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="ongoing">To Do</SelectItem>
                <SelectItem value="success">Completed</SelectItem>
                <SelectItem value="failure">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <XCircle
              className="w-5 h-5 mr-2 text-gray-600 cursor-pointer absolute right-80 top-77"
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {showForm && (
          <TaskForm
            open={showForm}
            onClose={() => setShowForm(false)}
            taskData={editingTask}
          />
        )}

        {filterStatus === "all" && searchQuery.trim() === "" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {columns.map((column) => (
              <div
                key={column.key}
                className={`bg-white rounded-xl shadow-lg border-t-4 ${column.color} min-h-[600px]`}
              >
                <div className="p-6 border-b bg-gray-50/50 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <column.icon className="w-6 h-6 text-gray-700" />
                      <h2 className="font-bold text-gray-800 text-xl">
                        {column.title}
                      </h2>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-bold ${column.headerBg}`}
                    >
                      {column.count}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-4 h-[600px] flex flex-col">
                  {column.tasks.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-6xl mb-4">
                        {column.key === "ongoing" && "📋"}
                        {column.key === "success" && "🎉"}
                        {column.key === "failure" && "😰"}
                      </div>
                      <p className="text-lg font-medium">
                        {column.key === "ongoing" && "No active tasks"}
                        {column.key === "success" && "No completed tasks"}
                        {column.key === "failure" && "No overdue tasks"}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        {column.key === "ongoing" &&
                          "Create a new task to get started"}
                        {column.key === "success" &&
                          "Complete some tasks to see them here"}
                        {column.key === "failure" &&
                          "Great job staying on track!"}
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-y-auto space-y-4">
                      {column.tasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          status={column.key}
                          onEdit={(task) => editTask(task)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 h-[600px] flex flex-col">
            <div className="flex items-center space-x-3 mb-6">
              <Filter className="w-6 h-6 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-800">
                Filtered Results ({filteredTasks.length} tasks)
              </h2>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl font-medium">No tasks found</p>
                <p className="text-gray-400 mt-2">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto">
                {filteredTasks.map((task) => {
                  const status = task.isCompleted
                    ? "success"
                    : new Date(task.deadline) <= new Date()
                    ? "failure"
                    : "ongoing";
                  return (
                    <TaskCard
                      key={task.id}
                      task={task}
                      status={status}
                      onEdit={(task) => editTask(task)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDoApp;
