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
class AddOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: "",
      yes: "Yes",
      boxes:[],
      token: props.userToken,
      apiToken: 9640783,
      process_ID: props.ProcessID,
      charge: "0",
      values:[],
      price:"",
    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

//add the new values to wynum
addOrder= () => {
  let newValues = {
    order: this.state.yes,
    process_ID: this.state.orderNumber,
  };
  this.state.boxes.splice(0, 0, newValues);
  console.log("token:", this.state.token);
  const url = `https://api.wynum.com/postStage/61c8059f6f09dfac2a05cf1df2e01991?token=${this.state.token}`;
  console.log("box", newValues);
  var config = { headers: { "Content-Type": "application/json" } };
  axios.post(url, JSON.stringify(newValues), config).then(res => {
    console.log("box after ", newValues);
  });
};

  //post request to additional charges with 0 default value
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs" xs={24}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Change a Quote to Order
          </Typography>
          <TextField
            id="outlined-name"
            type="text"
            label="Order Number"
            value={this.state.orderNumber}
            onChange={this.handleChange}
            inputProps={{
              name: "orderNumber"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Departure"
            type="Text"
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
              onClick={this.addOrder}
            >
              Add To Order
            </Button>
            {/* <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.addnocharge}
            >
              Add Without Additional Charges
            </Button> */}
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
