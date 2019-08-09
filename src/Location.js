import React from "react";
import { makeStyles, recomposeColor } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { spacing } from "@material-ui/system";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import PropTypes, { number } from "prop-types";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
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
    alignItems: "center"
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
  },
  button: {
    display: "inline",
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  }
});
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrival: "",
      departure: "",
      boxes:[],
      token: props.userToken,
      apiToken: 9640783
    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  //handle random process ID generation
  makeid = length => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  //post request to add box
  //will need to add post request for additional charges set to 0
  addnocharge = () => {
    var locationcontext = this;
    let location = {
      Length: locationcontext.state.length,
      Width: locationcontext.state.width,
      Height: locationcontext.state.height,
      Weight: locationcontext.state.weight,
      process_ID: locationcontext.makeid(6)
    };
    this.state.boxes.splice(0, 0, location);
    console.log("token:", this.state.token);
    const url = `https://api.wynum.com/postStage/c02a19c943023456484c903018ee9708?token=${
      this.state.token
    }`;
    console.log("box", location);
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(location), config).then(res => {
      console.log("box after ", location);
      console.log(res.data);
      this.props.changeScreen("Display");
    });
  };

  addcharge = () => {
    var locationcontext2 = this;
    let location2 = {
      Length: locationcontext2.state.length,
      Width: locationcontext2.state.width,
      Height:locationcontext2.state.height,
      Weight: locationcontext2.state.weight,
      process_ID: locationcontext2.makeid(6)
    };
    this.state.boxes.splice(0, 0, location2);
    console.log("token:", this.state.token);
    const url = `https://api.wynum.com/postStage/c02a19c943023456484c903018ee9708?token=${
      this.state.token
    }`;
    console.log("box", location2);
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(location2), config).then(res => {
      console.log("box after ", location2);
      console.log(res.data);
      this.props.changeScreen("AdditionalCharges");
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs" xs={24}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Shipping Location
          </Typography>
          <TextField
            id="outlined-name"
            type="number"
            label="Arrival"
            value={this.state.arrival}
            onChange={this.handleChange}
            inputProps={{
              name: "arrival"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Width"
            type="Departure"
            value={this.state.departure}
            onChange={this.handleChange}
            inputProps={{
              name: "departure"
            }}
            margin="normal"
            variant="outlined"
          />
         
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.addnocharge}
            >
              Add Location With No Additional Charges
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.addcharge}
            >
              Add Location With Additional Charges
            </Button>
            {/* <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                this.props.changeScreen("AdditionalCharges");
              }}
            >
              Add Additional Charges
            </Button> */}
          </Grid>
        </div>
      </Container>
    );
  }
}
Location.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Location);
