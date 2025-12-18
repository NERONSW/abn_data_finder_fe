import { Toaster } from "react-hot-toast";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-gray-100">
        <MainLayout />
      </div>
    </>
  );
}

export default App;
