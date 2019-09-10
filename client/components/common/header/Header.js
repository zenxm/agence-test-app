import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MaterialIcon from 'react-material-iconic-font';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NavConstant from '../../../constants/Navigations';
import IsMobile from '../../../utils/isMobile';

import * as authService from '../../../services/authService';

const drawerWidth = 250;

const styles = (theme) => ({
  appBar: {
    position: 'absolute',
    // backgroundColor: 'white',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    // marginLeft: 45,
  },
  menuButtonShift: {
    // marginLeft: -15,
  },
  flex: {
    flex: 1,
  },
});

const Header = (props) => {
  const [selected, setSelected] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(IsMobile());
  const runOnce = true;

  const onResize = () => {
    setIsMobile(IsMobile());
  };

  React.useEffect(
    () => {
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    },
    [runOnce],
  );

  const handleClick = (event, nav) => {
    setSelected({ anchorEl: event.currentTarget, nav });
  };

  const handleClose = () => {
    setSelected(null);
  };

  const { classes, navDrawerOpen, handleToggleDrawer } = props;
  return (
    <AppBar className={classNames(classes.appBar, navDrawerOpen && classes.appBarShift)}>
      <Toolbar>
        {isMobile ? (
          <IconButton
            aria-label="Menu"
            onClick={handleToggleDrawer}
            className={classNames(
              !navDrawerOpen && classes.menuButton,
              navDrawerOpen && classes.menuButtonShift,
            )}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <div>
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
            <Typography type="title" color="inherit" className={classes.flex} />
            {/* <img src="img/logo.gif" alt="Agence Logo" /> */}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, authService), dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(Header));
