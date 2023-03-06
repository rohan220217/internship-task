import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useNavigate, Link as RRLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useCallback, useState } from "react";
import { debounce } from "../utils/debunce";
import {
  signupAllValidation,
  signupSingleFieldValidation,
} from "../utils/validation";
import { signupRequest } from "../store/Actions/loginAction";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Demo project for internship"}
      {/* <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '} 
      {new Date().getFullYear()}*/}
      {"."}
    </Typography>
  );
}

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.loginReducer);

  const [value, setValue] = useState({
    userName: "",
    userEmail: "",
    userCompany: "",
    isAdmin: false,
    userRevenuePercent: 0,
    userPassword: "",
  });
  const [errors, setErrors] = useState({
    userEmail: "",
    userName: "",
    userCompany: "",
    userPassword: "",
  });

  const debounceSingleFieldValidation = useCallback(
    debounce(({ name, value }) => {
      const { isValid, errors } = signupSingleFieldValidation({
        key: name,
        value,
      });
      let tmperror = { ...errors };
      if (isValid) tmperror = { ...tmperror, [name]: null };
      else tmperror = { ...tmperror, [name]: errors[name] };
      setErrors(tmperror);
    }, 1000),
    [errors]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, error } = signupAllValidation(value);
    if (!isValid) {
      console.log(error);
    } else {
      dispatch(signupRequest({ value, nextfunc: navigate }));
    }
    setErrors(error);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="User Name"
            name="userName"
            autoComplete="name"
            autoFocus
            onChange={(e) => {
              setValue((prev) => {
                return {
                  ...prev,
                  [e.target.name]: e.target.value,
                };
              });
              debounceSingleFieldValidation({
                name: e.target.name,
                value: e.target.value,
              });
            }}
            error={errors && Array.isArray(errors["userName"])}
            helperText={
              errors && errors["userName"] ? errors["userName"][0] : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="userEmail"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setValue((prev) => {
                return {
                  ...prev,
                  [e.target.name]: e.target.value,
                };
              });
              debounceSingleFieldValidation({
                name: e.target.name,
                value: e.target.value,
              });
            }}
            error={errors && Array.isArray(errors["userEmail"])}
            helperText={
              errors && errors["userEmail"] ? errors["userEmail"][0] : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="company"
            label="User company"
            name="userCompany"
            autoComplete="company"
            autoFocus
            onChange={(e) => {
              setValue((prev) => {
                return {
                  ...prev,
                  [e.target.name]: e.target.value,
                };
              });
              debounceSingleFieldValidation({
                name: e.target.name,
                value: e.target.value,
              });
            }}
            error={errors && Array.isArray(errors["userCompany"])}
            helperText={
              errors && errors["userCompany"] ? errors["userCompany"][0] : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="userPassword"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setValue((prev) => {
                return {
                  ...prev,
                  [e.target.name]: e.target.value,
                };
              });
              debounceSingleFieldValidation({
                name: e.target.name,
                value: e.target.value,
              });
            }}
            error={errors && Array.isArray(errors["userPassword"])}
            helperText={
              errors && errors["userPassword"] ? errors["userPassword"][0] : ""
            }
          />

          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            {loginState.isSingupLoading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" fullWidth variant="contained">
                Sign up
              </Button>
            )}
          </Box>
          <Grid container>
            <Grid item>
              <Link component={RRLink} to={`/login`} variant="body2">
                {"Have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
