import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { spacing, typography } from "@material-ui/system";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from "@material-ui/core/Fab";


// import Fab from "@material-ui/core/Fab";
import axios from "axios";

const styles = theme => ({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "left"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    button: {
      display: "inline",
      margin: theme.spacing.unit,
      marginTop: theme.spacing.unit * 2
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120
    }
  });
  
  class Display extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        process_ID:props.ProcessID,
        boxes: [],
        weight: "",
        to:[],
        from:[],
        price:[],
        apiToken:7819284,
        token:props.userToken,

        
      };
      this.handleChange = this.handleChange.bind(this);
      console.log("Token status:",this.state.token)
    }
  
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
      

  getBoxes() {
    console.log(this.state.process_ID);
    let url = `https://api.wynum.com/getStage/b1d452cf49e4b88c6f7c87f4117475a0?process_ID=${this.state.process_ID}&token=${this.state.token}`;
    //let url = `https://api.wynum.com/getallStage/71f71ac6b3200cdd83ef34725b9aa501?user_email=${this.state.email}&token=${this.state.token}`;
    axios.get(url).then(res => {
       console.log(res.data);
       let data = res.data;
      this.setState({boxes: data["Total_Boxes"]});
    });
  }

  getWeight() {
    let url = `https://api.wynum.com/getStage/d85ca2f6518dbc45e79111d08c3167d0?process_ID=${this.state.process_ID}&token=${this.state.token}`;
    //let url = `https://api.wynum.com/getallStage/71f71ac6b3200cdd83ef34725b9aa501?user_email=${this.state.email}&token=${this.state.token}`;
    axios.get(url).then(res => {
       console.log(res.data);
       let data = res.data;
      this.setState({weight: data["Total_Palette_Weight"]});
    });
  }

  getTo() {
    let url = `https://api.wynum.com/getStage/5552fbcb0022e71e3e71fd959f26bbb0?process_ID=${this.state.process_ID}&token=${this.state.token}`;
    //let url = `https://api.wynum.com/getallStage/71f71ac6b3200cdd83ef34725b9aa501?user_email=${this.state.email}&token=${this.state.token}`;
    axios.get(url).then(res => {
       console.log(res.data);
       let data = res.data;
      this.setState({to: data["To"]});
    });
  }

  getFrom() {
    let url = `https://api.wynum.com/getStage/b7df96f9ce461cc978965827769b7cf6?process_ID=${this.state.process_ID}&token=${this.state.token}`;
    //let url = `https://api.wynum.com/getallStage/71f71ac6b3200cdd83ef34725b9aa501?user_email=${this.state.email}&token=${this.state.token}`;
    axios.get(url).then(res => {
       console.log(res.data);
       let data = res.data;
      this.setState({from: data["From"]});
    });
  }

  getPrice() {
    let url = `https://api.wynum.com/getStage/28983242e14d03ca73ef8d075326ee0e?process_ID=${this.state.process_ID}&token=${this.state.token}`;
    //let url = `https://api.wynum.com/getallStage/71f71ac6b3200cdd83ef34725b9aa501?user_email=${this.state.email}&token=${this.state.token}`;
    axios.get(url).then(res => {
       console.log(res.data);
       let data = res.data;
      this.setState({price: data["Final_Price"]});
    });
  } 
  
  async componentDidMount(){
    this.getBoxes();
    this.getWeight();
    this.getTo();
    this.getFrom();
    this.getPrice();
  }

    render() {
      const { classes } = this.props;
      
      return (
        
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
          <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
          Shipping Calculator Results 
          </Typography>
        </Toolbar>
      </AppBar>
           
             <List>
            <Typography component="h1" variant="h6">
              Total number of boxes on a pallet:   
            </Typography> 
              <Typography component = "h1" variant = "h6">
              {this.state.boxes} 
              </Typography> 
              </List>
              <Divider />
            <List>
            <Typography component="h1" variant="h6">
             Total weight of each pallet in Lbs:
            </Typography>
              <Typography component = "h1" variant = "h6">
              {this.state.weight} 
              </Typography>
              </List>
              <Divider />
           
            <List>
            <Typography component="h1" variant="h6">
            Departing from:
            </Typography>
              <Typography component = "h1" variant = "h6">
              {this.state.from} 
              </Typography>
              </List>
            
              <Divider />
            <List>
            <Typography component="h1" variant="h6">
              Arriving to:
            </Typography>
              <Typography component = "h1" variant = "h6">
              {this.state.to} 
              </Typography>
              </List>
              <Divider />
            <List>
            <Typography component="h1" variant="h6">
              Total price of shipment in USD:
            </Typography>
              <Typography component = "h1" variant = "h6">
              {this.state.price} 
              </Typography>
              </List>
            <Fab
            variant="extended"
            aria-label="delete"
            color="primary"
            onClick={(() =>
              this.props.changeScreen("box"))}
            className={classes.submit}
          >
            New Calculation
          </Fab>
              
          </div>
        </Container>
      );
    }
  }
  Display.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(Display);
  