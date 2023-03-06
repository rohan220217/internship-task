import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import {
  Box,
  CardActions,
  Chip,
  IconButton,
  LinearProgress,
  handleOpen,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../store/Actions/userAction";
import { Link } from "react-router-dom";

function AdminCard(props) {
  const { user } = props;
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);

  return (
    <Grid item xs={6} md={3}>
      <Card>
        <LinearProgress variant="determinate" value={user.userRevenuePercent} />

        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            <small>User Id: </small> {user.userId}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            <small>Company:</small> {user.userCompany}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            <small>Revenue:</small> {user.userRevenuePercent}%
          </Typography>
          <Typography variant="subtitle1" paragraph>
            <small>Email: </small> {user.userEmail}
          </Typography>
          <Typography
            variant="subtitle1"
            color="primary"
            component={Link}
            to={`/user/${user.userId}`}
          >
            {user.userName}
          </Typography>
        </CardContent>

        <CardActions>
          <Chip label={user.userStatus} variant="outlined" />

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              aria-label="delete"
              onClick={() => dispatch(deleteUser({ userId: user._id }))}
            >
              {userState.isDeleteUserLoading.includes(user._id) ? (
                <CircularProgress />
              ) : (
                <DeleteIcon />
              )}
            </IconButton>
            <IconButton
              aria-label="Edit"
              onClick={() => props.handleOpen(user)}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default AdminCard;
