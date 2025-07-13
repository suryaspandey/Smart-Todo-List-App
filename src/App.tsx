import "./App.css";
import ThemeToggle from "./components/ThemeToggle";
import Home from "./pages/Home";

function App() {
  return (
    <div className="relative">
      <ThemeToggle  />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Home />
      </div>
    </div>
  );
}

export default App;
