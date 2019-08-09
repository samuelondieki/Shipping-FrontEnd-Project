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

class BoxDimension extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process_ID: "",
      length: "",
      width: "",
      height: "",
      weight: "",
      token: "",
      apiToken: "9640783"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //post request to add box
  addBox = () => {
    var boxContext = this;

    var box = {
      process_ID: boxContext.state.process_ID,
      Length: boxContext.state.length,
      Width: boxContext.state.width,
      Height: boxContext.state.height,
      Weight: boxContext.state.weight
    };
    const url = `https://api.wynum.com/postStage/c02a19c943023456484c903018ee9708?process_IDtoken=${
      this.token
    }`;
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(box), config).then(res => {
     // console.log(res.data);
    });
    console.log(boxContext.state.process_ID);
    this.props.onProcessIdChange(boxContext.state.process_ID);
    this.props.changeScreen("location")
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs" xs={24}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Boxes
          </Typography>
          {/* <TextField
            id="outlined-name"
            type="text"
            label="Process ID"
            value={this.state.process_ID}
            onChange={this.handleChange}
            inputProps={{
              name: "process_ID"
            }}
            margin="normal"
            variant="outlined"
          /> */}
          <TextField
            id="outlined-name"
            type="text"
            label="Length"
            value={this.state.length}
            onChange={this.handleChange}
            inputProps={{
              name: "length"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Width"
            value={this.state.width}
            onChange={this.handleChange}
            inputProps={{
              name: "width"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Height"
            value={this.state.height}
            onChange={this.handleChange}
            inputProps={{
              name: "height"
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Weight"
            value={this.state.weight}
            onChange={this.handleChange}
            inputProps={{
              name: "weight"
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
            {/* <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                this.props.changeScreen("location");
              }}
            >
              Cancel
            </Button> */}
          </Grid>
        </div>
      </Container>
    );
  }
}
BoxDimension.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BoxDimension);
