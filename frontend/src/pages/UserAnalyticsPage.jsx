import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, CircularProgress, Grid } from "@mui/material";
import UserAppbar from "../components/UserAppbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnalyticsUser } from "../store/Actions/analyticsAction";
import { Box } from "@mui/system";
import AdRevenueChart from "../components/AdRevenueChart";
import TotalClickChart from "../components/TotalClickChart";
import AdImpressionChart from "../components/AdImpressionChart";

function UserAnalyticsPage() {
  const analyticsState = useSelector((state) => state.analyticsReducer);
  const dispatch = useDispatch();
  let { userId } = useParams();

  useEffect(() => {
    dispatch(getAllAnalyticsUser({ userId }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <UserAppbar userId={userId} />

        <main>
          {analyticsState.isAllAnalyticsLoading ? (
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
              <AdRevenueChart />
              <TotalClickChart />
              <AdImpressionChart />
            </Grid>
          )}
        </main>
      </Container>
    </ThemeProvider>
  );
}

const theme = createTheme();
export default UserAnalyticsPage;
