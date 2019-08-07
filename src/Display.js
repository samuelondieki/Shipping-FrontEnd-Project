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
import signin from "./SignIn";

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

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process_ID: "16",
      boxes: [],
      users: []
    };
    this.handleChange = this.handleChange.bind(this);
    console.log("Boxes from sign in page: ", this.props.getBoxes());
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getBoxes() {
    let url = `https://api.wynum.com/getallStage/0b4f81c827700d711263e4d75a395609?token=${
      this.state.token
    }`;
    //let url = `https://api.wynum.com/getallStage/71f71ac6b3200cdd83ef34725b9aa501?user_email=${this.state.email}&token=${this.state.token}`;
    axios.get(url).then(res => {
      // console.log(res.data);
      this.state.boxes = res.data;
    });
  }

  componentDidMount() {
    this.getBoxes();
  }

  render() {
    const { classes } = this.props;
    const types = this.state;
    const number = [1, 2, 3, 4, 5];
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Shipping Calculator Transaction
          </Typography>
          <div>
            <ul>
              {types.boxes.map(box => (
                <li key={box.id}>
                  Total Boxes: {box.Total_Boxes} | Total Weight:{" "}
                  {box.Total_Palette_Weight}
                </li>
              ))}
            </ul>
          </div>
          <TextField
            id="outlined-name"
            label="Total number of boxes on Pallet"
            //className={classes.textField}
            // value={this.state.process_ID}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Total weight of each pallet"
            //className={classes.textField}
            //value={this.state.length}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Destination"
            //className={classes.textField}
            // value={this.state.width}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Departure"
            //className={classes.textField}
            //value={this.state.height}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Total price of shipping"
            //className={classes.textField}
            //value={this.state.weight}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />

          {/* <Fab
              variant="extended"
              aria-label="delete"
              color="primary"
              onClick={this.addBox()}
              className={classes.submit}
            >
              Submit
            </Fab> */}
        </div>
      </Container>
    );
  }
}
Display.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Display);
