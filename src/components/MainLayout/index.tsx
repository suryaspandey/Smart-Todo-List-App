import ThemeToggle from "../ThemeToggle";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <ThemeToggle />
      {children}
    </div>
  );
};

export default MainLayout;
