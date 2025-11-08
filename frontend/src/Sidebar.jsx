
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import {
  History as HistoryIcon,
  Settings as SettingsIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material';

const Sidebar = ({
  open,
  onClose,
  onClearChat,
  themeMode,
  onToggleTheme,
}) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 250,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="div">
            Chat Options
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={onClearChat}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Clear Chat" />
          </ListItem>
          <ListItem button onClick={onToggleTheme}>
            <ListItemIcon>
              {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            <ListItemText primary={themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'} />
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
