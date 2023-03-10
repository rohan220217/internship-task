import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useCallback, useState } from "react";
import { debounce } from "../utils/debunce";
import {
  loginAllValidation,
  loginSingleFieldValidation,
} from "../utils/validation";
import { loginRequest } from "../store/Actions/loginAction";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { Link as RRLink, useNavigate } from "react-router-dom";

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

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginReducer);

  const [value, setValue] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [errors, setErrors] = useState({
    userEmail: "",
    userPassword: "",
  });

  const debounceSingleFieldValidation = useCallback(
    debounce(({ name, value }) => {
      const { isValid, errors } = loginSingleFieldValidation({
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
    const { isValid, error } = loginAllValidation(value);
    if (!isValid) {
      console.log(error);
    } else {
      dispatch(loginRequest({ value, navigateFn: navigate }));
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <FormControlLabel
            control={
              <Checkbox value="remember" color="primary" disabled checked />
            }
            label="Remember me"
          />
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            {loginState.isLoginLoading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" fullWidth variant="contained">
                Sign In
              </Button>
            )}
          </Box>
          <Grid container>
            <Grid item xs>
              <Link component={RRLink} to="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RRLink} to={`/signup`} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
