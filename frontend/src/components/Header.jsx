import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { userLogout } from "../store/Actions/loginAction";

function Header(props) {
  const { title, sections } = props;
  const dispatch = useDispatch();

  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Typography component="h2" variant="h5" color="inherit" sx={{ flex: 1 }}>
        {title}
      </Typography>
      <Box sx={{ gap: "1rem", display: "flex", mr: "1rem" }}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Box>
      <Button
        variant="outlined"
        size="small"
        color="error"
        onClick={() => dispatch(userLogout())}
      >
        Logout
      </Button>
    </Toolbar>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
