import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserCard from "../components/UserCard";
import { Box, Button, CircularProgress, Toolbar } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnalyticsUser } from "../store/Actions/analyticsAction";
import UserAppbar from "../components/UserAppbar";
// import Footer from "./Footer";

export default function UserHomePage() {
  const dispatch = useDispatch();
  const analyticsState = useSelector((state) => state.analyticsReducer);
  let { userId } = useParams();

  React.useEffect(() => {
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
              {analyticsState.allAnalyticsUser.map((analytics) => (
                <UserCard key={analytics._id} analytics={analytics} />
              ))}
            </Grid>
          )}
        </main>
      </Container>
      {/* <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        /> */}
    </ThemeProvider>
  );
}

const theme = createTheme();
