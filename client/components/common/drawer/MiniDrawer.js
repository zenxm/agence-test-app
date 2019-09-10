import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MaterialIcon from 'react-material-iconic-font';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NavConstant from '../../../constants/Navigations';

const drawerWidth = 250;

const styles = (theme) => ({
  drawerPaper: {
    position: 'absolute',
    height: 'auto',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

const MiniDrawer = (props) => {
  const [selected, setSelected] = React.useState(null);

  const handleClick = (event, nav) => {
    setSelected({ anchorEl: event.currentTarget, nav });
  };

  const handleClose = () => {
    setSelected(null);
  };

  const { navDrawerOpen } = props;
  const { classes } = props;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(classes.drawerPaper, !navDrawerOpen && classes.drawerPaperClose),
      }}
      open={navDrawerOpen}
    >
      {NavConstant.map((nav) => (
        <Button
          key={nav.title}
          aria-controls={nav.title}
          aria-haspopup="true"
          onClick={(e) => handleClick(e, nav)}
        >
          <span style={{ marginRight: '5px' }}>
            <MaterialIcon type={nav.icon} />
          </span>
          {nav.title}
        </Button>
      ))}
      <Menu
        id={selected && selected.nav.title}
        anchorEl={selected && selected.anchorEl}
        keepMounted
        open={Boolean(selected)}
        onClose={handleClose}
      >
        {selected &&
          selected.nav.items &&
          selected.nav.items.length &&
          selected.nav.items.map((item) => (
            <MenuItem key={item.title} onClick={handleClose}>
              {item.title}
            </MenuItem>
          ))}
      </Menu>
    </Drawer>
  );
};

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  navDrawerOpen: PropTypes.bool,
};

export default withStyles(styles)(MiniDrawer);
