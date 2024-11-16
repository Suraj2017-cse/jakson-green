import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, ClickAwayListener, List, ListItemButton, ListItemText, Paper, Popper, useMediaQuery, ListItemIcon } from '@mui/material';

// project-imports
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';
import { ThemeMode } from 'config';

// assets
import { Location, Menu } from 'iconsax-react';

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const NavLocation = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'secondary.200' : 'secondary.200';
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'secondary.100';
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.5 }}>
      <IconButton
        color="secondary"
        variant="light"
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        size="large"
        sx={{ color: 'secondary.main', bgcolor: open ? iconBackColorOpen : iconBackColor, p: 1 }}
      >
        <Location variant="Bold" size={14} />
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={matchesXs ? 'top' : 'top-right'} sx={{ overflow: 'hidden' }} in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                borderRadius: 1.5,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285,
                },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
                  <ListItemButton selected={selectedIndex === 0} onClick={event => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                      <Menu variant="Bulk" size={18} />
                    </ListItemIcon>
                    <ListItemText primary="Bikaner - 300MW" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 1} onClick={event => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                      <Menu variant="Bulk" size={18} />
                    </ListItemIcon>
                    <ListItemText primary="Bikaner - 300MW" />
                  </ListItemButton>

                  <ListItemButton selected={selectedIndex === 3} onClick={event => handleListItemClick(event, 3)}>
                    <ListItemIcon>
                      <Menu variant="Bulk" size={18} />
                    </ListItemIcon>
                    <ListItemText primary="Bikaner - 300MW" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 4} onClick={event => handleListItemClick(event, 4)}>
                    <ListItemIcon>
                      <Menu variant="Bulk" size={18} />
                    </ListItemIcon>
                    <ListItemText primary="Bikaner - 300MW" />
                  </ListItemButton>
                </List>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default NavLocation;
