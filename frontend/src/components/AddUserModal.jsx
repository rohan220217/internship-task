import { forwardRef, useCallback, useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { debounce } from "../utils/debunce";
import {
  addAnalyAllValidation,
  addAnalySingleFieldValidation,
  signupAllValidation,
  signupSingleFieldValidation,
} from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest } from "../store/Actions/loginAction";
import { addAnalytics } from "../store/Actions/analyticsAction";

function AddUserModal({ setOpen, open }) {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginReducer);
  const [isAnalytics, setIsAnalytics] = useState(false);

  const [value, setValue] = useState({
    userName: "",
    userEmail: "",
    userCompany: "",
    isAdmin: "",
    userRevenuePercent: 0,
    userPassword: "",
  });
  const [errors, setErrors] = useState({
    userEmail: "",
    userName: "",
    userCompany: "",
    userPassword: "",
    userRevenuePercent: "",
    isAdmin: "",
  });
  const [analyValue, setAnalyValue] = useState({
    website: "",
    adRevenueDollars: 0,
    adImpressions: 0,
    avgSiteViewingTime: 0,
    totalClicks: 0,
  });
  const [analyErrors, setAnalyErrors] = useState({
    adRevenueDollars: "",
    website: "",
    adImpressions: "",
    totalClicks: "",
    avgSiteViewingTime: "",
  });

  const debounceSingleFieldValidation = useCallback(
    debounce(({ name, value }) => {
      if (isAnalytics) {
        const { isValid, errors } = addAnalySingleFieldValidation({
          key: name,
          value,
        });
        let tmperror = { ...errors };
        if (isValid) tmperror = { ...tmperror, [name]: null };
        else tmperror = { ...tmperror, [name]: errors[name] };
        setAnalyErrors(tmperror);
      } else {
        const { isValid, errors } = signupSingleFieldValidation({
          key: name,
          value,
        });
        let tmperror = { ...errors };
        if (isValid) tmperror = { ...tmperror, [name]: null };
        else tmperror = { ...tmperror, [name]: errors[name] };
        setErrors(tmperror);
      }
    }, 1000),
    [errors]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isAnalytics) {
      const { isValid, error } = signupAllValidation(value);
      if (!isValid) {
        console.log(error);
      } else {
        dispatch(
          signupRequest({ value, nextfunc: () => setIsAnalytics(true) })
        );
      }
      setErrors(error);
    } else {
      const { isValid, error } = addAnalyAllValidation(analyValue);
      if (!isValid) {
        console.log(error);
      } else {
        console.log(analyValue);
        dispatch(
          addAnalytics({
            value: { ...analyValue, userId: loginState.currentNewUserId },
            nextfunc: handleClose,
          })
        );
      }
      setAnalyErrors(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {isAnalytics ? "Create Analytics " : " Create User"}
          </Typography>
          {loginState.isSingupLoading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" color="inherit" onClick={handleSubmit}>
              {isAnalytics ? "Save" : "Next"}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {!isAnalytics ? (
        <Box sx={{ mt: 1, px: 4 }}>
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="userRevenue"
            type="number"
            value={value.userRevenuePercent}
            label="User revenue percent"
            name="userRevenuePercent"
            autoFocus
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            onChange={(e) => {
              setValue((prev) => {
                return {
                  ...prev,
                  [e.target.name]: Number(e.target.value),
                };
              });
              debounceSingleFieldValidation({
                name: e.target.name,
                value: Number(e.target.value),
              });
            }}
            error={errors && Array.isArray(errors["userRevenuePercent"])}
            helperText={
              errors && errors["userRevenuePercent"]
                ? errors["userRevenuePercent"][0]
                : ""
            }
          />
          <FormControl sx={{ mt: 1, minWidth: 120 }} fullWidth={true}>
            <InputLabel id="demo-simple-select-helper-label">
              Is Admin
            </InputLabel>
            <Select
              value={value.isAdmin}
              onChange={(e) => {
                setValue((prev) => {
                  return {
                    ...prev,
                    isAdmin: e.target.value,
                  };
                });
                debounceSingleFieldValidation({
                  name: "isAdmin",
                  value: e.target.value,
                });
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
            <FormHelperText>
              {errors && errors["isAdmin"] ? errors["isAdmin"][0] : ""}
            </FormHelperText>
          </FormControl>
        </Box>
      ) : (
        <Box sx={{ mt: 1, px: 4 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="website"
            label="Website"
            name="website"
            autoComplete="name"
            autoFocus
            onChange={(e) => {
              setAnalyValue((prev) => {
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
            error={analyErrors && Array.isArray(analyErrors["website"])}
            helperText={
              analyErrors && analyErrors["website"]
                ? analyErrors["website"][0]
                : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="adRevenue"
            type="number"
            value={analyValue.adRevenueDollars}
            label="Ad Revenue"
            name="adRevenueDollars"
            autoFocus
            InputProps={{
              endAdornment: <InputAdornment position="end">$</InputAdornment>,
            }}
            onChange={(e) => {
              setAnalyValue((prev) => {
                return {
                  ...prev,
                  [e.target.name]: Number(e.target.value),
                };
              });
              debounceSingleFieldValidation({
                name: e.target.name,
                value: Number(e.target.value),
              });
            }}
            error={
              analyErrors && Array.isArray(analyErrors["adRevenueDollars"])
            }
            helperText={
              analyErrors && analyErrors["adRevenueDollars"]
                ? analyErrors["adRevenueDollars"][0]
                : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="adImpressions"
            type="number"
            value={analyValue.adImpressions}
            label="Ad Impressions"
            name="adImpressions"
            autoFocus
            onChange={(e) => {
              setAnalyValue((prev) => {
                return {
                  ...prev,
                  [e.target.name]: Number(e.target.value),
                };
              });
              debounceSingleFieldValidation({
                name: e.target.name,
                value: Number(e.target.value),
              });
            }}
            error={analyErrors && Array.isArray(analyErrors["adImpressions"])}
            helperText={
              analyErrors && analyErrors["adImpressions"]
                ? analyErrors["adImpressions"][0]
                : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="avgSiteViewingTime"
            type="number"
            value={analyValue.avgSiteViewingTime}
            label="Avg Site Viewing time"
            name="avgSiteViewingTime"
            autoFocus
            onChange={(e) => {
              setAnalyValue((prev) => {
                return {
                  ...prev,
                  [e.target.name]: Number(e.target.value),
                };
              });
              debounceSingleFieldValidation({
                name: e.target.name,
                value: Number(e.target.value),
              });
            }}
            error={
              analyErrors && Array.isArray(analyErrors["avgSiteViewingTime"])
            }
            helperText={
              analyErrors && analyErrors["avgSiteViewingTime"]
                ? analyErrors["avgSiteViewingTime"][0]
                : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="totalClicks"
            type="number"
            value={analyValue.totalClicks}
            label="Total Clicks"
            name="totalClicks"
            autoFocus
            onChange={(e) => {
              setAnalyValue((prev) => {
                return {
                  ...prev,
                  [e.target.name]: Number(e.target.value),
                };
              });
              debounceSingleFieldValidation({
                name: e.target.name,
                value: Number(e.target.value),
              });
            }}
            error={analyErrors && Array.isArray(analyErrors["totalClicks"])}
            helperText={
              analyErrors && analyErrors["totalClicks"]
                ? analyErrors["totalClicks"][0]
                : ""
            }
          />
        </Box>
      )}
    </Dialog>
  );
}
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default AddUserModal;
