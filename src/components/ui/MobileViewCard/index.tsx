import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import TaskCard from "../TaskCard";
import { EMPTY_STATE_CONTENT } from "../ToDoApp/constants";

export const MobileViewCard = ({ statusCardSection, onEdit }: any) => {
  return (
    <>
      <Accordion type="multiple" className="space-y-4">
        {statusCardSection.map((col) => {
          return (
            <AccordionItem
              key={col.key}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg border-0 overflow-hidden"
              value={col.key}
            >
              <AccordionTrigger className={`px-6 py-4 border-t-4 ${col.color}`}>
                <div className="flex items-center justify-between w-full mr-1">
                  <div className="flex items-center space-x-3">
                    <col.icon className="w-5 h-5 text-gray-700 dark:text-white/50" />
                    <h2 className="font-bold text-gray-800 dark:text-white text-xl">
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
                <div className="p-4 space-y-4 h-[350px] md:h-[600px] flex flex-col">
                  {col.tasks.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <div className="text-6xl mb-4">
                        {EMPTY_STATE_CONTENT[col.key].icon}
                      </div>
                      <p className="text-lg font-medium">
                        {EMPTY_STATE_CONTENT[col.key].title}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        {EMPTY_STATE_CONTENT[col.key].message}
                      </p>
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
