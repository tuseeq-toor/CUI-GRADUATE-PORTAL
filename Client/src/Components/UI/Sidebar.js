import * as React from "react";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import PieChartIcon from "@mui/icons-material/PieChart";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import PageviewIcon from "@mui/icons-material/Pageview";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import MapIcon from "@mui/icons-material/Map";
import EditNotificationsIcon from "@mui/icons-material/EditNotifications";
import CampaignIcon from "@mui/icons-material/Campaign";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PreviewIcon from "@mui/icons-material/Preview";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PollIcon from "@mui/icons-material/Poll";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import "./ActiveTab.css";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  MsStudentListitems,
  PhdStudentListitems,
} from "../SidebarListItems/studentList";
import { adminListitems } from "../SidebarListItems/adminList";
import { gacListitems } from "../SidebarListItems/gacList";
import { goListitems } from "../SidebarListItems/goList";
import { msListitems } from "../SidebarListItems/msList";
import { phdListitems } from "../SidebarListItems/phdList";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [list, setList] = React.useState([]);
  const { currentRole } = useSelector((state) => state.userRoles);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const userRole = user.user.userRole;
  console.log(userRole);

  let userProgram;

  console.log(isLoggedIn);
  const [open, setOpen] = React.useState(false);

  const handleClick = (item) => {
    setOpen(!item);
    // console.log(open);
  };

  let roles = [];
  userRole.forEach((item) => {
    if (item.enable) {
      roles.push(item.role);
    }
  });
  const checkUser = (item) => {
    return (
      <>
        {!item.subMenu ? (
          <>
            <div
              className={location.pathname === item.path ? "tab" : "tabhover"}
            >
              <ListItem
                key={item.text}
                button
                onClick={() => {
                  navigate(item.path);
                }}
              >
                <ListItemIcon
                  className={location.pathname === item.path && "icon"}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText sx={{ fontSize: "6px" }} primary={item.text} />
              </ListItem>
            </div>
          </>
        ) : (
          <>
            <ListItem
              key={item.text}
              button
              onClick={() => {
                item.active = !item.active;
                setOpen(!open);
                // console.log(item.active);
              }}
            >
              <ListItemIcon>
                {item.active ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
            <Collapse in={item.active} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.subMenu.map((subItem) => {
                  return (
                    <div
                      className={
                        location.pathname === subItem.path ? "tab" : "tabhover"
                      }
                    >
                      <ListItem
                        key={subItem.text}
                        button
                        onClick={() => {
                          navigate(subItem.path);
                        }}
                      >
                        <ListItemIcon
                          className={
                            location.pathname === subItem.path && "icon"
                          }
                        >
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItem>
                    </div>
                  );
                })}
              </List>
            </Collapse>
          </>
        )}
      </>
    );
  };

  if (roles[0] === "STUDENT") {
    userProgram = user.user.student.program_id.programShortName;
  }
  React.useEffect(() => {
    checkrole(currentRole);
  }, [currentRole]);

  React.useEffect(() => {
    checkrole(roles[0]);
  }, []);

  const checkrole = (role) => {
    console.log("function casll");

    console.log("rolesss==" + roles[0]);
    switch (role) {
      case "ADMIN":
        console.log("hello");
        setList(adminListitems);
        break;

      case "GAC":
        setList(gacListitems);
        break;

      case "GO":
        setList(goListitems);
        break;

      case "MS_COR":
        setList(msListitems);
        break;
      case "PHD_COR":
        setList(phdListitems);
        break;
      case "STUDENT":
        if (userProgram === "MS") {
          setList(MsStudentListitems);
        } else if (userProgram === "PhD") {
          setList(PhdStudentListitems);
        }
        break;
      default:
    }
  };
  return (
    <>
      {
        isLoggedIn && list.map(checkUser)
        /* isLoggedIn && checkrole() */
        // roles[0].includes("ADMIN") && adminListitems.map(checkUser)
      }
      {/* {isLoggedIn && Roles[0] === "GAC" && gacListitems.map(checkUser)}
      {isLoggedIn && Roles[0] === "GO" && goListitems.map(checkUser)}
      {isLoggedIn && Roles[0] === "MS" && msListitems.map(checkUser)}
      {isLoggedIn && Roles[0] === "PhD" && phdListitems.map(checkUser)}
      {isLoggedIn &&
        roles.includes("STUDENT") &&
        userProgram === "MS" &&
        MsStudentListitems.map(checkUser)}
      {isLoggedIn &&
        roles.includes("STUDENT") &&
        userProgram === "PhD" &&
        PhdStudentListitems.map(checkUser)} */}
    </>
  );
};
