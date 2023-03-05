import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import CustomRoutes from "./routes/CustomRoutes";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          position: "sticky",
        }}
        toastOptions={{
          // Define default options
          className: "toaster-style",
          duration: 5000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Routes>
        <Route path="/login" exact element={<SignIn />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/forgotpassword" exact element={<ForgotPassword />} />
        {/*   <Route path="/google/oauth" element={<GoogleRedirect />} /> */}
        <Route path="/*" element={<CustomRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
