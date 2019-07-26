import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { spacing } from "@material-ui/system";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import axios from "axios";

const styles = theme =>  ({
  root: {
    display: "flex"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: 12,
    marginRight: 36
  },
  dense: {
    marginTop: 20
  },
  menu: {
    width: 200
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
    const url = `https://api.wynum.com/postStage/c02a19c943023456484c903018ee9708?token=${
      this.token
    }`;
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(box), config).then(res => {
      console.log(res.data);
    });
  };

  render() {
    // const { classes } = Styles();
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            id="outlined-name"
            label="Process ID"
            //className={classes.textField}
            // value={this.state.process_ID}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-name"
            label="Length"
            //className={classes.textField}
            //value={this.state.length}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-name"
            label="Width"
            //className={classes.textField}
            // value={this.state.width}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-name"
            label="Height"
            //className={classes.textField}
            //value={this.state.height}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-name"
            label="Weight"
            //className={classes.textField}
            //value={this.state.weight}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Fab variant="extended" aria-label="delete" onClick={this.addBox()}>
            Submit
          </Fab>
        </Grid>
      </Grid>
    );
  }
}
BoxDimension.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BoxDimension);
