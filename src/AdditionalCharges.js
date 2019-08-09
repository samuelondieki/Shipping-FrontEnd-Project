import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { spacing } from "@material-ui/system";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
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
  }
});

class AdditionalCharges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charge: "0",
      charge2: "0",
      charge3: "0",
      charge4: "0",
      charge5: "0",
      charge6: "0",
      charge7: "0",
      charge8: "0",
      charge9: "0",
      charge10: "0",
      process_ID:props.ProcessID,
      token: props.userToken,
      apiToken: "5962048"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //post request to additional charges stage
  addCharges = () => {
    var chargeContext = this;

    var charge = {
      process_ID: chargeContext.state.process_ID,
      Charge: parseInt(chargeContext.state.charge),
      Charge2: parseInt(chargeContext.state.charge2),
      Charge3: parseInt(chargeContext.state.charge3),
      Charge4: parseInt(chargeContext.state.charge4),
      Charge5: parseInt(chargeContext.state.charge5),
      Charge6: parseInt(chargeContext.state.charge6),
      Charge7: parseInt(chargeContext.state.charge7),
      Charge8: parseInt(chargeContext.state.charge8),
      Charge9: parseInt(chargeContext.state.charge9),
      Charge10: parseInt(chargeContext.state.charge10),

    };
    const url = `https://api.wynum.com/postStage/2fb39ddfdd4b3206cb3e1b387cf8c3bc?token=${this.state.token}`;
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(charge), config).then(res => {
     // console.log(res.data);
    });
    //console.log(boxContext.state.process_ID);
    this.props.changeScreen("Display");
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs" xs={24}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Additional Charges
          </Typography>

          <TextField
            id="outlined-name"
            type="number"
            label="Charge one"
            value={this.state.charge}
            onChange={this.handleChange}
            inputProps={{
              name: "charge"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            type="number"
            label="Charge two"
            value={this.state.charge2}
            onChange={this.handleChange}
            inputProps={{
              name: "charge2"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            type="number"
            label="Charge three"
            value={this.state.charge3}
            onChange={this.handleChange}
            inputProps={{
              name: "charge3"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            type="number"
            label="Charge four"
            value={this.state.charge4}
            onChange={this.handleChange}
            inputProps={{
              name: "charge4"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            type="number"
            label="Charge five"
            value={this.state.charge5}
            onChange={this.handleChange}
            inputProps={{
              name: "charge5"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            type="number"
            label="Charge six"
            value={this.state.charge6}
            onChange={this.handleChange}
            inputProps={{
              name: "charge6"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            type="number"
            label="Charge seven"
            value={this.state.charge7}
            onChange={this.handleChange}
            inputProps={{
              name: "charge7"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            type="number"
            label="Charge eight"
            value={this.state.charge8}
            onChange={this.handleChange}
            inputProps={{
              name: "charge8"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            type="number"
            label="Charge nine"
            value={this.state.charge9}
            onChange={this.handleChange}
            inputProps={{
              name: "charge9"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            type="number"
            label="Charge ten"
            value={this.state.charge10}
            onChange={this.handleChange}
            inputProps={{
              name: "charge10"
            }}
            margin="normal"
            variant="outlined"
          />
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.addCharges}
            >
              Add Charges
            </Button>
            {/* <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                this.props.changeScreen("Display");
              }}
            >
              view calculation
            </Button> */}
          </Grid>
        </div>
      </Container>
    );
  }
}
AdditionalCharges.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdditionalCharges);
