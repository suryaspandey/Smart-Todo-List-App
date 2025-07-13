import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import TaskCard from "../TaskCard";

export const MobileViewCard = ({ columns, onEdit }) => {
  return (
    <>
      <Accordion type="multiple" className="space-y-4">
        {columns.map((col) => {
          return (
            <AccordionItem
              key={col.key}
              className="bg-white rounded-lg shadow-lg border-0 overflow-hidden"
              value={col.key}
            >
              <AccordionTrigger className={`px-6 py-4 border-t-4 ${col.color}`}>
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center space-x-3">
                    <col.icon className="w-5 h-5 text-gray-700" />
                    <h2 className="font-bold text-gray-800 text-xl">
                      {col.title}
                    </h2>
                  </div>
                  <span
                    className={` text-white px-3 py-1 rounded-full text-sm ${col.headerBg}`}
                  >
                    {col.count}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 space-y-4 h-[300px] md:h-[600px] flex flex-col">
                  {col.tasks.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-6xl mb-4">
                        {col.key === "ongoing" && "📋"}
                        {col.key === "success" && "🎉"}
                        {col.key === "failure" && "😰"}
                      </div>
                      <div>
                        {col.key === "ongoing" && "No active tasks"}
                        {col.key === "success" && "No completed tasks"}
                        {col.key === "failure" && "No overdue tasks"}
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        {col.key === "ongoing" &&
                          "Create a new task to get started"}
                        {col.key === "success" &&
                          "Complete some tasks to see them here"}
                        {col.key === "failure" && "Great job staying on track!"}
                      </div>
                    </div>
                  ) : (
                    col.tasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        status={col.key}
                        onEdit={onEdit}
                      />
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default MobileViewCard;
