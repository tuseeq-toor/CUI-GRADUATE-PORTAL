import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { USERROLES } from "../../Store/roles";
import { Divider } from "@mui/material";

const AvatarMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const { Roles } = useSelector((state) => state.userRoles);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();

  const userRole = user.user.userRole;
  // let roles = ["ADMIN", "GAC", "GO"];
  // let roles = Roles;
  /* userRole.forEach((item) => {
    if (item.enable) {
      roles.push(item.role);
    }
  }); */
  console.log(Roles + "in Avatar");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key="profile" onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem key="settings" onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Settings</Typography>
          </MenuItem>
          {Roles.length >= 1 && (
            <>
              <MenuItem key="dashboards" disabled sx={{ color: "inherit" }}>
                <Typography textAlign="center">Dashboards</Typography>
              </MenuItem>
              <Divider />
              {Roles.map((role, index, roles) => (
                <MenuItem
                  key={role}
                  onClick={() => {
                    setAnchorElUser(null);
                  }}
                >
                  <Typography textAlign="center">{`${role}`}</Typography>
                </MenuItem>
              ))}
              <Divider />
            </>
          )}
          <MenuItem key="logout" onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default AvatarMenu;
