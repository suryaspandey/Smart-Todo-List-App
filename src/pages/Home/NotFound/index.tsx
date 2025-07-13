export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-4 bg-white dark:bg-zinc-900">
      <div className="text-2xl font-semibold text-red-600">
      Page Not Found
      </div>
      <a
        href="/home"
        className="text-blue-500 hover:text-blue-700 underline text-lg"
      >
        Return to Home
      </a>
    </div>
  );
};

export default NotFound;
