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
    position: 'fixed',
    height: '100%',
    padding: '30px 0',
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
  image: {
    margin: '0 auto 30px',
  },
});

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

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
      <img src="img/logo.gif" alt="Agence Logo" className={classes.image} />
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
      <StyledMenu
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
            <StyledMenuItem key={item.title} onClick={handleClose}>
              {item.title}
            </StyledMenuItem>
          ))}
      </StyledMenu>
    </Drawer>
  );
};

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  navDrawerOpen: PropTypes.bool,
};

export default withStyles(styles)(MiniDrawer);
