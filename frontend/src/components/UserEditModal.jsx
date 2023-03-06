import { useCallback, useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { Button, InputAdornment } from "@mui/material";
import { debounce } from "../utils/debunce";
import {
  userEditAllValidation,
  userEditSingleFieldValidation,
} from "../utils/validation";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/Actions/userAction";

function UserEditModal({ setOpen, setCurrentUserData, open, currentUserData }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    userName: "",
    userCompany: "",
    userStatus: false,
    userRevenuePercent: 0,
  });

  const [errors, setErrors] = useState({
    userStatus: "",
    userName: "",
    userCompany: "",
    userRevenuePercent: "",
  });

  const debounceSingleFieldValidation = useCallback(
    debounce(({ name, value }) => {
      const { isValid, errors } = userEditSingleFieldValidation({
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

  const handleClose = () => {
    setOpen(false);
    setCurrentUserData(null);
  };
  const handleSave = () => {
    const { isValid, error } = userEditAllValidation(value);
    if (!isValid) {
      console.log(error);
    } else {
      // handleClose();
      console.log(currentUserData);
      dispatch(
        updateUser({
          userId: currentUserData._id,
          data: value,
          nextfunc: handleClose,
        })
      );
    }
    setErrors(error);
  };

  useEffect(() => {
    if (currentUserData)
      setValue((prev) => {
        return {
          userName: currentUserData?.userName,
          userCompany: currentUserData?.userCompany,
          userStatus: currentUserData?.userStatus,
          userRevenuePercent: currentUserData?.userRevenuePercent,
        };
      });
  }, [JSON.stringify(currentUserData)]);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        User Edit
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="User Name"
          name="userName"
          autoComplete="name"
          value={value.userName}
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
          helperText={errors && errors["userName"] ? errors["userName"][0] : ""}
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
          value={value.userCompany}
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
          <Select
            value={value.userStatus}
            onChange={(e) => {
              setValue((prev) => {
                return {
                  ...prev,
                  userStatus: e.target.value,
                };
              });
              debounceSingleFieldValidation({
                name: "userStatus",
                value: e.target.value,
              });
            }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"Active"}>Active</MenuItem>
            <MenuItem value={"InActive"}>InActive</MenuItem>
          </Select>
          <FormHelperText>
            {errors && errors["userStatus"] ? errors["userStatus"][0] : ""}
          </FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSave}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default UserEditModal;
