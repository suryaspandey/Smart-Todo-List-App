import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { getSummaryData } from "./constants";
import { motion } from "framer-motion";

interface Task {
  id: string;
  title: string;
  description?: string;
  deadline: string;
  isCompleted: boolean;
}
interface TaskSummaryProps {
  totalTask: number;
  categorizedTasks: {
    ongoing: Task[];
    success: Task[];
    failure: Task[];
  };
  isLoading: boolean;
}

export const SummaryCards = ({
  categorizedTasks,
  totalTask,
  isLoading,
}: TaskSummaryProps) => {
  const summaryData = getSummaryData(categorizedTasks, totalTask);

  return (
    <>
      {isLoading ? (
        Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`summary-skeleton-${i}`}
            className="rounded-2xl shadow-md p-4 bg-white dark:bg-zinc-900"
          >
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-6 w-12 mb-4" />
            <Skeleton className="h-6 w-6 ml-auto" />
          </div>
        ))
      ) : (
        <>
          {summaryData.map((data) => {
            const Icon = data.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="hover:scale-[1.02] duration-300 rounded-2xl shadow-md"
              >
                <Card
                  className={`bg-gradient-to-br ${data.gradientBg} text-white border-0`}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-lg font-medium">
                          {data.status.toUpperCase()}
                        </p>
                        <p className="text-2xl sm:text-3xl font-bold drop-shadow-sm">
                          {data.statusLength}
                        </p>
                      </div>
                      <div className="bg-white/10 p-3 rounded-full">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </>
      )}
    </>
  );
};

export default SummaryCards;
