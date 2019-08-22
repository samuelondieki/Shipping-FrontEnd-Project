import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AttachMoney from "@material-ui/icons/AttachMoney";
import AddCircle from "@material-ui/icons/AddCircle";

import MenuIcon from "@material-ui/icons/Menu";
import PeopleIcon from "@material-ui/icons/People";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import BoxDimension from "./BoxDimension";
import Report from "./Report";
import BoxReport from "./BoxReport";
import UpdateBox from "./UpdateBox";
import AdditionalCharge from "./AdditionalCharges";
import Location from "./Location";
import PalletSize from "./PalletSize";
import CurrentPallet from "./CurrentPallet";
import ShipmentPrice from "./ShipmentPrice";
import CurrentPrice from "./CurrentPrice";
import SingleReport from "./SingleReport";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  }
});

class Styling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      screen: "report"
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  changeScreen = (newScreen = "") => {
    if (newScreen != "") this.setState({ screen: newScreen });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Shipping Calculator
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                this.setState({ screen: "report" });
              }}
            >
              <ListItemIcon>
                <AttachMoney />
              </ListItemIcon>
              <ListItemText primary="Quotes" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({ screen: "box_report" });
              }}
            >
              <ListItemIcon>
                <QuestionAnswer />
              </ListItemIcon>
              <ListItemText primary=" Box Information" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({ screen: "box" });
              }}
            >
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
              <ListItemText primary="Add box" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                this.setState({ screen: "" });
              }}
            >
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
              <ListItemText primary="Add Container" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({ screen: "Pallet" });
              }}
            >
              <ListItemIcon>
                <QuestionAnswer />
              </ListItemIcon>
              <ListItemText primary="Pallet Size" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({ screen: "currentprice" });
              }}
            >
              <ListItemIcon>
                <QuestionAnswer />
              </ListItemIcon>
              <ListItemText primary="Shipping Price" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {this.state.screen === "report" && (
            <Report
              changeScreen={this.props.changeScreen}
              userToken={this.props.userToken}
              onProcessIdChange={this.props.onProcessIdChange}
              ProcessID={this.state.ProcessID}
              
            />
          )}
          {this.state.screen === "box" && (
            <BoxDimension
              changeScreen={this.props.changeScreen}
              userToken={this.props.userToken}
              onProcessIdChange={this.props.onProcessIdChange}
              ProcessID={this.state.ProcessID}
            />
          )}

          {this.state.screen === "box_report" && (
            <BoxReport
              changeScreen={this.props.changeScreen}
              userToken={this.props.userToken}
              onProcessIdChange={this.props.onProcessIdChange}
              ProcessID={this.state.ProcessID}
              
            />
          )}
          {this.state.screen === "Location" && (
            <Location
              changeScreen={this.props.changeScreen}
              userToken={this.props.userToken}
              onProcessIdChange={this.props.onProcessIdChange}
              ProcessID={this.state.ProcessID}
              
            />
          )}
          {this.state.screen === "addcharge" && (
            <AdditionalCharge
              changeScreen={this.props.changeScreen}
              userToken={this.props.userToken}
              onProcessIdChange={this.props.onProcessIdChange}
              ProcessID={this.state.ProcessID}
              
            />
          )}
           {this.state.screen === "Pallet" && (
            <CurrentPallet
              changeScreen={this.props.changeScreen}
              userToken={this.props.userToken}
              onProcessIdChange={this.props.onProcessIdChange}
              ProcessID={this.state.ProcessID}
              
            />
          )}
           {this.state.screen === "palletsize" && (
            <PalletSize
              changeScreen={this.props.changeScreen}
              userToken={this.props.userToken}
              onProcessIdChange={this.props.onProcessIdChange}
              ProcessID={this.state.ProcessID}
             
            />
          )}
          {this.state.screen === "price" && (
            <ShipmentPrice
              changeScreen={this.props.changeScreen}
              userToken={this.props.userToken}
              onProcessIdChange={this.props.onProcessIdChange}
              ProcessID={this.state.ProcessID}
             
            />
          )}
          {this.state.screen === "currentprice" && (
            <CurrentPrice
              changeScreen={this.props.changeScreen}
              userToken={this.props.userToken}
              onProcessIdChange={this.props.onProcessIdChange}
              ProcessID={this.state.ProcessID}
              
            />
          )}
          {this.state.screen === "singlereport" && (
          <SingleReport changeScreen={this.props.changeScreen}  
          userToken={this.props.userToken}
          onTokenChange={this.props.onTokenChange}
          onProcessIdChange={this.props.onProcessIdChange}
          ProcessID={this.state.ProcessID}/>

        )}
          {/* {this.state.screen === "box_update" && (
            <UpdateBox
              changeScreen={this.props.changeScreen}
              userToken={this.props.userToken}
            />
          )} */}
        </main>
      </div>
    );
  }
}

Styling.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Styling);
