import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import axios from "axios";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AccountCircle from "@material-ui/icons/AccountCircle";

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
    margin: theme.spacing.unit * 1,
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit * 1,
    minWidth: 120
  }
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "login",
      email: "samuel.b@evermethod.com",
      password: "",
      token: "",
      apiToken: 9640783,
      isLoggedIn: false,
      showCodeCard: false,
      todos: [],
      description: "",
      code: ""
    };
  }

  //handle change
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login = () => {
    let url = `https://api.wynum.com/loginapi?username=${
      this.state.email
    }&password=${this.state.password}`;

    axios.post(url).then(res => {
      console.log(res.data);
      let data = res.data;
      console.log("Token passed in to data:", data["Token"]);
      console.log("Log in status:", this.state.isLoggedIn);
      if (data["Token"]) {
        this.setState({ token: data["Token"] });
        //passing in token to other components
        this.props.onTokenChange(this.state.token);
        this.addProject();
        this.getAllBoxes();
        this.setState({ isLoggedIn: true });
      }

      console.log("Log in status:", this.state.isLoggedIn);
      if (this.state.isLoggedIn === true) {
        this.props.changeScreen("box");
        console.log(this.state.isLoggedIn);
      } else if (
        this.state.isLoggedIn === false &&
        this.state.showCodeCard === false
      ) {
        this.props.changeScreen("sign");
      } else if (
        this.state.isLoggedIn === false &&
        this.state.showCodeCard === false
      ) {
      } else if (
        this.state.isLoggedIn === false &&
        this.state.showCodeCard === true
      ) {
        this.props.changeScreen("confirm");
      }

      if (data["value"] === 0) {
        this.setState({ showCodeCard: true });
      }

      if (data["error"] === "Email not confirmed") {
        this.setState({ showCodeCard: true });
      }
    });
  };

  //confirmation code
  confirmCode() {
    let url = `https://api.wynum.com/confirmapicode?code=${this.state.code}`;
    axios.post(url).then(res => {
      console.log(res.data);
      let data = res.data;
      console.log(data["Token"]);
      if (data["Token"]) {
        this.setState({ token: data["Token"] });

        this.addProject();
        this.setState({ isLoggedIn: true });
      }
    });
  }

  //adding project
  addProject() {
    let url = `https://api.wynum.com/authapitoken?apitoken=${
      this.state.apiToken
    }&token=${this.state.token}`;
    axios.post(url).then(res => {
      console.log(res.data);
      this.getAllBoxes();
    });
  }

  // //get todos
  // getBoxes() {
  //   let url = `https://api.wynum.com/getStage/7b30f33b37b5c437ddc447a60a83b0bc?token=${
  //     this.state.token
  //   }`;

  //   axios.get(url).then(res => {
  //     console.log(res.data);
  //     // this.state.todos = res.data;
  //     this.setState({ todos: res.data });
  //   });
  // }

  //get all boxes
  getAllBoxes() {
    let url = `https://api.wynum.com/getallStage/63ab151382791f6eeffc70ae383daf71?token=${
      this.state.token
    }`;

    axios.get(url).then(res => {
      console.log(res.data);
      // this.state.todos = res.data;
      this.setState({ todos: res.data });
    });
  }

  // componentDidMount() {
  //   this.login();
  // }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircle variant="secondary" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="current-password"
            />
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                // type="submit"
                onClick={() => {
                  this.login();
                }}
                className={classes.submit}
              >
                Sign In / Sign Up
              </Button>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
