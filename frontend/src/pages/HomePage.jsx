import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import { Box, CircularProgress, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/Actions/userAction";
// import Footer from "./Footer";

const sections = [
  { title: "Home Tab", url: "/" },
  { title: "Analytics Tab", url: "/analytics" },
];

const theme = createTheme();

export default function HomePage() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);

  React.useState(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="FTE- Alchemy Group" sections={sections} />
        <Toolbar
          component="nav"
          variant="dense"
          sx={{ justifyContent: "flex-end" }}
        >
          <Box sx={{ gap: "1rem", display: "flex" }}>
            <Link
              color="inherit"
              noWrap
              variant="body2"
              href={"#"}
              sx={{ p: 1, flexShrink: 0 }}
            >
              Sort
            </Link>
            <Link
              color="inherit"
              noWrap
              variant="body2"
              href={"#"}
              sx={{ p: 1, flexShrink: 0 }}
            >
              Filter
            </Link>
          </Box>
        </Toolbar>
        <main>
          {userState.isAllUsersLoading ? (
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
            <Grid container spacing={4}>
              {userState.allUsers.map((user) => (
                <UserCard key={user._id} user={user} />
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
