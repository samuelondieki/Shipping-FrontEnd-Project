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
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  root: {
    width: "100%"
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

class BoxDimension extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: "",
      width: "",
      height: "",
      weight: "",
      boxes: [],
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
  addBox = () => {
    var boxContext = this;
    let box = {
      Length: parseInt(this.state.length),
      Width: parseInt(this.state.width),
      Height: parseInt(this.state.height),
      Weight: parseInt(this.state.weight),
      process_ID: this.makeid(6)
    };

    this.state.boxes.splice(0, 0, box);
    console.log("token:", this.state.token);
    this.props.onProcessIdChange(this.state.process_ID);
    const url = `https://api.wynum.com/postStage/c02a19c943023456484c903018ee9708?token=${
      this.state.token
    }`;
    console.log("box", box);
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(box), config).then(res => {
      console.log("box after ", box);
      console.log(res.data);
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={24}>
        <Container component="main" maxWidth="xs" xs={24}>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Add Box
            </Typography>

            <TextField
              id="outlined-name"
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  this.props.changeScreen("report");
                }}
              >
                Cancel
              </Button>

              {/* Direct the user to location or next process  */}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                
              >
                Next
              </Button>
            </Grid>
          </div>
        </Container>
      </Grid>
    );
  }
}
BoxDimension.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BoxDimension);
