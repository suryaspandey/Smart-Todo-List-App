import { Toaster } from "@/components/ui/sonner";
import ToDoApp from "@/components/ui/ToDoApp";

export const Home = () => {
  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 ">
        <ToDoApp />
      </div>
    </>
  );
};

export default Home;
