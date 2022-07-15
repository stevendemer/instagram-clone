import { useEffect } from "react";
const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found - Instagram";
  }, []);

  return (
    <div className="bg-gray-background">
      <div className="flex justify-center  mx-auto py-10 max-w-screen-lg">
        <p className="text-center text-4xl">Error 404: Not Found !</p>
      </div>
    </div>
  );
};

export default NotFound;
