import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminHomePage from "../pages/AdminHomePage";
import UserHomePage from "../pages/UserHomePage";

function CustomRoutes() {
  const loginState = useSelector((state) => state.loginReducer);
  const checkAuthentication = () => {
    if (loginState.token) return true;
    return false;
  };

  return checkAuthentication() ? (
    <Routes>
      <Route path="/admin" element={<AdminHomePage />} />
      <Route path="/user/:userId" element={<UserHomePage />} />
      {/* <Routes path="*" element={<PageNotFound />} /> */}
    </Routes>
  ) : (
    <Navigate to="/login" />
  );
}

export default CustomRoutes;
