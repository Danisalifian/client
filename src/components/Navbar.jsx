import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withRouter, NavLink } from 'react-router-dom'
import { MenuList, MenuItem, Grid } from '@material-ui/core';
import { compose } from 'recompose';
import { colors } from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DashboardIcon from '@material-ui/icons/Dashboard'
import AssessmentIcon from '@material-ui/icons/Assessment';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import TwitterIcon from '@material-ui/icons/Twitter';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import auth from '../auth'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   // marginLeft: drawerWidth,
    // },
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    color: '#546E7A',
  },
  textMenu: {
    fontWeight: 750,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: '14px',
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  sizeFont: {
    fontSize: '14px',
    fontWeight: theme.typography.fontWeightMedium,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function Navbar(props) {
  const { container, children, location: { pathname } } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const handleClick = () => {
    setOpen(!open);
  }

  const drawer = (
    <div>
      <Hidden smDown>
        <div className={classes.toolbar} />
      </Hidden>
      <MenuList>
        <MenuItem component={NavLink} to="/dashboard"
          activeClassName={classes.active}
          inactiveClassName={classes.inActive}
        >
          <DashboardIcon style={{marginRight: "10px"}} />
          <font className={classes.sizeFont}>Dashboard</font>
        </MenuItem>

        <MenuItem button onClick={handleClick} >
          <Grid justify="space-between" container spacing={3}>
            <Grid item>
              <div>
              <AssessmentIcon style={{marginRight: "10px", marginBottom: "-6px"}} />
              <font className={classes.sizeFont}>Sektor Sentimen</font>
              </div>
            </Grid>
            <Grid item >
              {open ? <ExpandLess style={{marginBottom: "-8px"}}/> : <ExpandMore style={{marginBottom: "-8px"}}/>}
            </Grid>
          </Grid>        
        </MenuItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <MenuList component="div" disablePadding>
            <MenuItem className={classes.nested} component={NavLink} to="/sektor-sentimen-negatif"
              activeClassName={classes.active}
            >
              <div>
              <SentimentDissatisfiedIcon style={{marginRight: "10px", marginLeft:"-8px", marginBottom: "-6px"}} />
              <font className={classes.sizeFont}>Sektor Sentimen Negatif</font>
              </div>
            </MenuItem>
            <MenuItem className={classes.nested} component={NavLink} to="/sektor-sentimen-positif"
              activeClassName={classes.active}
            >
              <div>
              <SentimentSatisfiedIcon style={{marginRight: "10px", marginLeft:"-8px", marginBottom:"-6px"}} />
              <font className={classes.sizeFont}>Sektor Sentimen Positif</font>
              </div>
            </MenuItem>          
          </MenuList>
        </Collapse>
        <MenuItem component={NavLink} to="/data-collection" activeClassName={classes.active}>
          <CollectionsBookmarkIcon style={{marginRight: "10px"}} />
          <font className={classes.sizeFont}>Data Collection</font>
        </MenuItem>
        <MenuItem component={NavLink} to="/get-data" activeClassName={classes.active}>
          <TwitterIcon style={{marginRight: "10px"}} />
          <font className={classes.sizeFont}>Get Twitter Data</font>
        </MenuItem>
      </MenuList>
      
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid justify="space-between" container spacing={24}>
            <Grid item>
            <Typography variant="h6" noWrap style={{padding: "12px"}}>
              SentiViz
            </Typography>
            </Grid>
            <Grid item>
              <div>
                {/* <IconButton color="inherit" component={Link} to="/">
                  <ExitToAppIcon />
                </IconButton> */}
                <IconButton color="inherit"
                  onClick = { () => {
                    auth.logout(() => {
                      props.history.push("/")
                    })
                  }}
                >
                  <ExitToAppIcon/>
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
  children: PropTypes.node,
};

export default compose(withRouter)(Navbar);
