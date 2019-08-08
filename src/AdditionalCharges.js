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
      charge: "",
      process_ID:props.ProcessID,
      new_process_ID:"",
      orderNumber: "",
      token: "",
      apiToken: "9640783"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //post request to add box
  addCharges = () => {
    var chargeContext = this;

    var charge = {
      process_ID: chargeContext.state.new_process_ID,
      Order_Number: chargeContext.state.process_ID,
      Charge: chargeContext.state.charge,
    };
    const url = `https://api.wynum.com/postStage/c02a19c943023456484c903018ee9708?process_IDtoken=${
      this.token
    }`;
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(charge), config).then(res => {
     // console.log(res.data);
    });
    console.log(boxContext.state.process_ID);
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs" xs={24}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add any additional charges
          </Typography>

          <TextField
            id="outlined-name"
            type="text"
            label="Charge"
            value={this.state.charge}
            onChange={this.handleChange}
            inputProps={{
              name: "charge"
            }}
            margin="normal"
            variant="outlined"
          />
          
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.addBox}
            >
              ADD
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                this.props.changeScreen("box");
              }}
            >
              Cancel
            </Button>
          </Grid>
        </div>
      </Container>
    );
  }
}
BoxDimension.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdditionalCharges);
