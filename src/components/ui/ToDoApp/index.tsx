import { useTask } from "@/store/useTaskStore";
import { useEffect, useMemo, useState } from "react";
import { Filter, Plus, Search, XCircle } from "lucide-react";
import { SelectValue } from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../select";
import { Button } from "../button";
import { Input } from "../input";
import TaskCard from "../TaskCard";
import useMobile from "@/hooks/useMobile";
import MobileViewCard from "../MobileViewCard";
import TaskForm from "@/components/TaskForm";
import SummaryCards from "@/components/SummaryCards";
import { EMPTY_STATE_CONTENT, getColumns } from "./constants";

export const ToDoApp = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const isMobile = useMobile();

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

  const editTask = (task: any) => {
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

  const filteredTasks = useMemo(() => {
    tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      const status = task.isCompleted
        ? "success"
        : new Date(task.deadline) <= new Date()
        ? "failure"
        : "ongoing";

      return (
        matchesSearch && (filterStatus === "all" || filterStatus === status)
      );
    });
  }, [searchQuery, filterStatus, tasks]);

  const statusCardSection = getColumns(categorizedTasks);

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
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 ">
        <div className="bg-white dark:bg-zinc-900 shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col justify-between md:grid grid-cols-2 items-center  mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-600 dark:text-indigo-400 ">
                  Smart Task Manager
                </h1>
                <p className="text-gray-600 mt-2 text-lg dark:text-gray-300">
                  Organize your tasks efficiently and stay productive
                </p>
              </div>
              {showForm ? (
                ""
              ) : (
                <div className="flex place-content-around">
                  <Button
                    aria-label="Add new task"
                    onClick={() => setShowForm(!showForm)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-700 dark:border-indigo-400 dark:hover:bg-indigo-500 px-6 py-3 text-lg rounded-md cursor-pointer"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Task
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
              <SummaryCards
                categorizedTasks={categorizedTasks}
                totalTask={tasks.length}
              />
            </div>

            <div className="flex flex-col justify-center md:items-center sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  aria-label="Search tasks"
                  placeholder={`${
                    isMobile
                      ? "Search tasks "
                      : "Search tasks by title or description..."
                  }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
                <XCircle
                  aria-label="Cancel all search"
                  className="w-5 h-5 mr-2 text-gray-600 dark:text-white/50 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterStatus("all");
                  }}
                />
              </div>
              <Select
                value={filterStatus}
                onValueChange={(value: "all") => setFilterStatus(value)}
              >
                <SelectTrigger className="w-full sm:w-48 h-12 text-lg border-2 border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
                  <Filter className="w-5 h-5 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className=" dark:bg-zinc-900 dark:text-white">
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="ongoing">To Do</SelectItem>
                  <SelectItem value="success">Completed</SelectItem>
                  <SelectItem value="failure">Failure</SelectItem>
                </SelectContent>
              </Select>
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
            isMobile ? (
              <>
                <MobileViewCard
                  statusCardSection={statusCardSection}
                  onEdit={editTask}
                />
              </>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {statusCardSection.map((column) => (
                  <div
                    key={column.key}
                    className={`bg-white dark:bg-zinc-900 rounded-xl shadow-lg border-t-4 ${column.color} min-h-[300px] md:min-h-[300px]`}
                  >
                    <div className="p-6 border-b bg-gray-50/50 rounded-t-xl dark:bg-zinc-900">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <column.icon className="w-6 h-6 text-gray-700 dark:text-white/50" />
                          <h2 className="font-bold text-gray-800 dark:text-white text-xl">
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

                    <div className="p-4 space-y-4 h-[300px] md:h-[600px] flex flex-col">
                      {column.tasks.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                          <div className="text-6xl mb-4">
                            {EMPTY_STATE_CONTENT[column.key].icon}
                          </div>
                          <p className="text-lg font-medium">
                            {EMPTY_STATE_CONTENT[column.key].title}
                          </p>
                          <p className="text-sm text-gray-400 mt-2">
                            {EMPTY_STATE_CONTENT[column.key].message}
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
            )
          ) : (
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 h-[300px] md:h-[600px] flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <Filter className="w-6 h-6 text-gray-700 dark:text-white/50" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
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
    </>
  );
};

export default ToDoApp;
