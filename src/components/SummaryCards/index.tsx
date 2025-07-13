import { Card, CardContent } from "../ui/card";
import { getSummaryData } from "./constants";

export const SummaryCards = ({ categorizedTasks, totalTask }) => {
  const summaryData = getSummaryData(categorizedTasks, totalTask);
  return (
    <>
      {summaryData.map((data) => {
        const Icon = data.icon;
        return (
          <Card className={`${data.headerBg} text-white border-0 shadow-lg`}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">
                    {data.status}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold">
                    {data.statusLength}
                  </p>
                </div>
                <div>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default SummaryCards;
