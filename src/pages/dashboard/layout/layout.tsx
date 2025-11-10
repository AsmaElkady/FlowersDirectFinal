import * as React from "react";
import {
  styled,
  useTheme,
  type Theme,
  type CSSObject,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { Helmet } from "react-helmet";
import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { fetchCategory } from "../../../redux/slices/category";
import HomeIcon from "@mui/icons-material/Home";
import { Product } from "../../../classes/productClass";
import { Admin } from "../../../classes/users";
import { fetchOrders } from "../../../redux/slices/order.slice";
import { logoutUser } from "../../../redux/slices/authSlice";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  React.useEffect(() => {
    const checkStatus = Admin.checkAdmin(user?.email ?? "");
    if (!checkStatus.status) {
      navigate("/Login", { replace: true });
    }
    dispatch(fetchCategory());
    dispatch(fetchOrders());
    dispatch(Product.getProducts());
    dispatch(Admin.viewUsers());
  }, [dispatch, navigate, user?.email]);

  const handleClick = (name: string) => {
    console.log(`${name} clicked`);
    const nav = name.toLowerCase();
    navigate(nav === "overview" ? "" : nav);
  };
  const handleHome = () => {
    navigate("/");
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/Login", { replace: true });
  };
  const menuItems = [
    { text: "Overview", icon: <DashboardIcon /> },
    { text: "Products", icon: <ShoppingBagIcon /> },
    { text: "Categories", icon: <CategoryIcon /> },
    { text: "Users", icon: <PeopleIcon /> },
    { text: "Orders", icon: <ListAltIcon /> },
    // { text: "Logout", icon: <LogoutIcon /> },
  ];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
        <link rel="canonical" href="http://mysite.com/Dashboard" />
      </Helmet>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            height: "70px",
            bgcolor: "#4e0629",
            display: "flex",
            justifyContent: "center",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {/* <img
                src="/public/img/nav/6.png"
                width="200"
                alt="Logo"
                className="d-inline-block align-top"
              /> */}
            </Typography>

            <div className="position-relative">
              <Typography sx={{ fontSize: 50 }}>FLOWERS</Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  letterSpacing: 20,
                  lineHeight: 0,
                  bottom: 10,
                  left: 70,
                  position: "absolute",
                }}
              >
                DIRECT
              </Typography>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          open={open}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#4e0629",
              color: "white",
            },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />

          <List>
            <ListItem key={"home"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleHome()}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    color: "white",
                    "&:hover": { backgroundColor: "#6a0737" },
                  },
                  open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                      color: "white",
                    },
                    open ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Home"
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </ListItem>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  onClick={() => handleClick(item.text)}
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                      color: "white",
                      "&:hover": { backgroundColor: "#6a0737" },
                    },
                    open
                      ? { justifyContent: "initial" }
                      : { justifyContent: "center" },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                        color: "white",
                      },
                      open ? { mr: 3 } : { mr: "auto" },
                    ]}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem key={"logout"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleLogout()}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    color: "white",
                    "&:hover": { backgroundColor: "#6a0737" },
                  },
                  open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                      color: "white",
                    },
                    open ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: "hidden",
          }}
        >
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
