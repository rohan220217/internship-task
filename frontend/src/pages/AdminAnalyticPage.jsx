import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, CircularProgress, Grid } from "@mui/material";
import UserAppbar from "../components/UserAppbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAnalyticsWeb,
  getCompanyRevenue,
  getWebRevenue,
} from "../store/Actions/analyticsAction";
import { Box } from "@mui/system";
import WebsiteRevenueChart from "../components/WebsiteRevenueChart";
import UserRevenueChart from "../components/UserRevenueChart";
import CompanyRevenueChart from "../components/CompanyRevenueChart";
import Header from "../components/Header";

function AdminAnalyticPage() {
  const analyticsState = useSelector((state) => state.analyticsReducer);
  const dispatch = useDispatch();
  let { userId } = useParams();

  useEffect(() => {
    dispatch(getAllAnalyticsWeb());
    dispatch(getWebRevenue());
    dispatch(getCompanyRevenue());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="FTE- Alchemy Group - Admin" sections={sections} />

        <main>
          {analyticsState.isAllAnalyticsWebLoading ||
          analyticsState.isAllAnalyticsUserRevenue ||
          analyticsState.isAllAnalyticsCompRevenue ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
              }}
            >
              {" "}
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={4} sx={{ mt: 1 }}>
              <WebsiteRevenueChart />
              <UserRevenueChart />
              <CompanyRevenueChart />
            </Grid>
          )}
        </main>
      </Container>
    </ThemeProvider>
  );
}
const sections = [
  { title: "Home Tab", url: "/admin" },
  { title: "Analytics Tab", url: "/admin/analytics" },
];

const theme = createTheme();
export default AdminAnalyticPage;
