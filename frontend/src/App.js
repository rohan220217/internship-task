import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import CustomRoutes from "./routes/CustomRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact element={<SignIn />} />
        {/*   <Route path="/google/oauth" element={<GoogleRedirect />} /> */}
        <Route path="/*" element={<CustomRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
