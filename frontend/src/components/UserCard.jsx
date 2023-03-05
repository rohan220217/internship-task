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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function UserCard(props) {
  const { user } = props;

  return (
    <Grid item xs={6} md={3}>
      <CardActionArea component="a" href="#">
        <Card>
          <LinearProgress
            variant="determinate"
            value={user.userRevenuePercent}
          />

          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {user.userId}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user.userCompany}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {user.userEmail}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              {user.userName}
            </Typography>
          </CardContent>
          <CardActions>
            <Chip label={user.userStatus} variant="outlined" />

            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="Edit">
                <EditIcon />
              </IconButton>
            </Box>
          </CardActions>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
