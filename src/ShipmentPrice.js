import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import PropTypes, { number } from "prop-types";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
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

class ShipmentPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ChinaSeattle: "",
      ChinaInland: "",
      SeattleChina: "",
      SeattleInland: "",
      InlandChina: "",
      InlandSeattle: "",
      token: props.userToken,
      process_ID: "1",
      apiToken: 9640783
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

//   //handle random process ID generation
//   makeid = length => {
//     var result = "";
//     var characters =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//   };

  //post request to add new prices
  addPrice = () => {
    var boxContext = this;
    let price = {
      China_Seattle: parseInt(this.state.ChinaSeattle),
      China_Inland: parseInt(this.state.ChinaInland),
      Seattle_China: parseInt(this.state.SeattleChina),
      Seattle_Inland: parseInt(this.state.SeattleInland),
      Inland_China: parseInt(this.state.InlandChina),
      Inland_Seattle: parseInt(this.state.InlandSeattle),
      process_ID: this.state.process_ID,
    };

    this.state.boxes.splice(0, 0, price);
    // console.log("token:", this.state.token);
    // this.props.onProcessIdChange(this.state.process_ID);
    const url = `https://api.wynum.com/updateStage/9ddf6b0b9b719bf12bf61d78aeae245b?token=${this.state.token}`;
    // console.log("box", price);
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(price), config).then(res => {
    //   console.log("box after ", price);
    //   console.log(res.data);
    });
    // console.log(boxContext.state.process_ID);
    this.props.changeScreen("dashboard") //will have to change to pallet screen
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={24}>
        <Container component="main" maxWidth="xs" xs={24}>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Change Shipping Prices
            </Typography>

            <TextField
              id="outlined-name"
              type="number"
              label="China To Seattle"
              value={this.state.ChinaSeattle}
              onChange={this.handleChange}
              inputProps={{
                name: "ChinaSeattle"
              }}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-name"
              label="China To Inland/Railway"
              type="number"
              value={this.state.ChinaInland}
              onChange={this.handleChange}
              inputProps={{
                name: "ChinaInland"
              }}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-name"
              label="Seattle To China"
              type="number"
              value={this.state.SeattleChina}
              onChange={this.handleChange}
              inputProps={{
                name: "SeattleChina"
              }}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-name"
              label="Seattle To Inland/Railway"
              type="number"
              value={this.state.SeattleInland}
              onChange={this.handleChange}
              inputProps={{
                name: "SeattleInland"
              }}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-name"
              label="Inland/Railway To China"
              type="number"
              value={this.state.InlandChina}
              onChange={this.handleChange}
              inputProps={{
                name: "InlandChina"
              }}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-name"
              label="Inland/Railway To Seattle"
              type="number"
              value={this.state.InlandSeattle}
              onChange={this.handleChange}
              inputProps={{
                name: "InlandSeattle"
              }}
              margin="normal"
              variant="outlined"
            />

            
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.addPrice}
              >
                ADD
              </Button>

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  this.props.changeScreen("Currentprice");
                }}
              >
                Cancel
              </Button>
            </Grid>
          </div>
        </Container>
      </Grid>

    );
  }
}
ShipmentPrice.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShipmentPrice);
