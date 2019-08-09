import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import axios from "axios";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

class confirmationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      showCodeCard: false,
      code: ""
    };
  }

  //get todos
  getTodos() {
    let url = `https://api.wynum.com/getallStage/71f71ac6b3200cdd83ef34725b9aa501?user_email=${
      this.state.email
    }&token=${this.state.token}`;
    axios.get(url).then(res => {
      console.log(res.data);
      // this.state.todos = res.data;
      this.setState({ todos: res.data });
    });
  }
  //adding project
  addProject() {
    let url = `https://api.wynum.com/authapitoken?apitoken=${
      this.state.apiToken
    }&token=${this.state.token}`;
    axios.post(url).then(res => {
      console.log(res.data);
      this.getTodos();
    });
  }
  //confirmation code
  confirmCode() {
    let url = `https://api.wynum.com/confirmapicode?code=${this.state.code}`;
    axios.post(url).then(res => {
      console.log(res.data);
      let data = res.data;
      console.log(data["Token"]);
      if (data["Token"]) {
        this.setState({ token: data["Token"] });
        //passing in token to other components
        this.props.onTokenChange(this.state.token);
        this.addProject();
        this.setState({ isLoggedIn: true });
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Confirmation code
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="code"
              label="Enter code"
              name="code"
              autoComplete="off"
              autoFocus
            />

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.confirmCode()}
                className={classes.submit}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
confirmationPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(confirmationPage);
