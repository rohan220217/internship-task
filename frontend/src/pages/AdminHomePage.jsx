import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import AdminCard from "../components/AdminCard";
import { Box, Button, CircularProgress, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  filterActiveUsers,
  filterInactiveUsers,
  getAllUsers,
} from "../store/Actions/userAction";
import UserEditModal from "../components/UserEditModal";
import AddUserModal from "../components/AddUserModal";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export default function AdminHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userReducer);
  const loginState = useSelector((state) => state.loginReducer);
  const [open, setOpen] = React.useState(false);
  const [isAddUserModal, setIsAddUserModal] = React.useState(false);
  const [currentUserData, setCurrentUserData] = React.useState(null);

  const handleOpen = (user) => {
    setOpen(true);
    setCurrentUserData(user);
  };

  const filterActiveUser = () => {
    dispatch(filterActiveUsers());
  };
  const filterInActiveUser = () => {
    dispatch(filterInactiveUsers());
  };
  const fetchAllUsers = () => {
    dispatch(getAllUsers());
  };

  React.useEffect(() => {
    if (!isAddUserModal) fetchAllUsers();
  }, [isAddUserModal]);

  // Redirect if normal user try to access this page
  React.useEffect(() => {
    if (loginState.isAdmin === "false") {
      navigate("/login");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="FTE- Alchemy Group - Admin" sections={sections} />
        <Toolbar
          component="nav"
          variant="dense"
          sx={{ justifyContent: "space-between", mb: 1 }}
        >
          <Button
            size="small"
            variant="contained"
            onClick={() => setIsAddUserModal(true)}
          >
            Add User
          </Button>
          <Box sx={{ gap: "1rem", display: "flex" }}>
            <LightTooltip title="All  users">
              <Button onClick={fetchAllUsers}>All</Button>
            </LightTooltip>
            <LightTooltip title="All inactive users">
              <Button onClick={filterInActiveUser}>Inactive</Button>
            </LightTooltip>
            <LightTooltip title="All active users">
              <Button onClick={filterActiveUser}>Active</Button>
            </LightTooltip>
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
                <AdminCard key={user._id} user={user} handleOpen={handleOpen} />
              ))}
            </Grid>
          )}
        </main>
      </Container>
      {/* <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      /> */}

      {/* Edit modal */}
      <UserEditModal
        currentUserData={currentUserData}
        setCurrentUserData={setCurrentUserData}
        setOpen={setOpen}
        open={open}
      />
      {/* Add user */}
      <AddUserModal setOpen={setIsAddUserModal} open={isAddUserModal} />
    </ThemeProvider>
  );
}

const sections = [
  { title: "Home Tab", url: "/admin" },
  { title: "Analytics Tab", url: "/admin/analytics" },
];

const theme = createTheme();

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
