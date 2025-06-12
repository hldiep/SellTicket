import * as React from 'react';
import {
  Box, Drawer, AppBar, CssBaseline, Toolbar, List,
  Typography, Divider, ListItem, ListItemButton,
  ListItemIcon, ListItemText, IconButton, Menu, MenuItem,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';


import MovieIcon from '@mui/icons-material/Movie';
import TheatersIcon from '@mui/icons-material/Theaters';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';


import TheaterComedyIcon from '@mui/icons-material/Theaters';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../util/AuthContext';

const drawerWidth = 240;
const collapsedWidth = 60;

export default function ClippedDrawer({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
const { logout } = useAuth();
  const mainItems = [
    { text: 'Tổng quan', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Quản lý phim', icon: <MovieIcon />, path: '/quan-ly-phim' },
    { text: 'Quản lý rạp', icon: <TheatersIcon />, path: '/quan-ly-rap' },
    { text: 'Quản lý lịch chiếu', icon: <EventSeatIcon />, path: '/quan-ly-lich-chieu' },
    { text: 'Quản lý suất chiếu', icon: <EventSeatIcon />, path: '/quan-ly-suat-chieu' },
    { text: 'Quản lý vé', icon: <BarChartIcon />, path: '/quan-ly-ve' },
    { text: 'Quản lý nhân viên', icon: <GroupIcon />, path: '/quan-ly-nv' },
    { text: 'Quản lý khách hàng', icon: <PeopleAltIcon />, path: '/quan-ly-kh' },
  ];

  const revenueItem = [
    { text: 'Doanh thu theo phim', icon: <MovieIcon />, path: '/doanh-thu-theo-phim' },
    { text: 'Doanh thu theo rạp', icon: <TheaterComedyIcon />, path: '/doanh-thu-theo-rap' }
  ];

  const [open, setOpen] = React.useState(() => {
    const saved = localStorage.getItem('sidebar-open');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleDrawer = () => {
    setOpen((prev) => {
      localStorage.setItem('sidebar-open', JSON.stringify(!prev));
      return !prev;
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleAccountClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}

      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>

          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>

          <IconButton color="inherit" onClick={handleAccountClick}>
            <AccountCircleIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => navigate('/manager-account')}>Trang cá nhân</MenuItem>
            <MenuItem onClick={async () => {
                            await logout(); 
                            navigate("/");
                        }}>Đăng xuất</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedWidth,
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
          },
        }}
        open={open}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {mainItems.map((item) => {
              const isSelected = location.pathname.startsWith(item.path);
              return (
                <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                  <Tooltip title={!open ? item.text : ''} placement="right" arrow>
                    <ListItemButton
                      onClick={() => navigate(item.path)}
                      selected={isSelected}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                          color: isSelected ? 'primary.main' : 'inherit',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>

          <Divider sx={{ my: 1 }} />

          <List>
            {revenueItem.map((item) => {
              const isSelected = location.pathname.startsWith(item.path);
              return (
                <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                  <Tooltip title={!open ? item.text : ''} placement="right" arrow>
                    <ListItemButton
                      onClick={() => navigate(item.path)}
                      selected={isSelected}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                          color: isSelected ? 'primary.main' : 'inherit',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
