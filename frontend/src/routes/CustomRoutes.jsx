import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";

function CustomRoutes() {
  // const loginState = useSelector((state) => state.loginReducer);
  const checkAuthentication = () => {
    // if (loginState.token) return true;
    return false;
  };

  return checkAuthentication() ? (
    <>
      {/* <div className={styles.appBar}>
        <AppBar />
      </div> */}
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Routes path="*" element={<PageNotFound />} /> */}
        </Routes>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default CustomRoutes;
