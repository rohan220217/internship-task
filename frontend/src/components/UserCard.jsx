import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function UserCard({ analytics }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            <small>Website:</small> {analytics.website}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            <small>Revenue In Dollars:</small> {analytics.adRevenueDollars}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            <small>Avg Site Viewing Time:</small> {analytics.avgSiteViewingTime}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            <small>Ad Impressions: </small> {analytics.adImpressions}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            <small>Total Clicks: </small> {analytics.totalClicks}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default UserCard;
