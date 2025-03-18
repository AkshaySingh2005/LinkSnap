import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/main/homepage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  );
};

export default App;
