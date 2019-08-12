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
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrival: "",
      departure: "",
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
  //handle random process ID generation
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

//get proper shipment pricing
findValue = () => {
  if (this.state.departure === "China" & this.state.arrival === "Seattle") this.setState({ price: this.state.values["China_Seattle"] });
  if (this.state.departure === "China" & this.state.arrival === "Inland/Railway") this.setState({ price: this.state.values["China_Inland"] });
  if (this.state.departure === "Seattle" & this.state.arrival === "China") this.setState({ price: this.state.values["Seattle_China"] });
  if (this.state.departure === "Seattle" & this.state.arrival === "Inland/Railway") this.setState({ price: this.state.values["Seattle_Inland"] });
  if (this.state.departure === "Inland/Railway" & this.state.arrival === "China") this.setState({ price: this.state.values["Inland_Seattle"] });
  if (this.state.departure === "Inland/Railway" & this.state.arrival === "Seattle") this.setState({ price: this.state.values["Inland_Seattle"] });
    
};


//to get the shippment pricing
getValues = () => {
  let url = `https://api.wynum.com/getallStage/7056f8348c592492f69acfd8bc3dbe7a?token=${this.state.token}`;
  axios.get(url).then(res => {
    console.log(res.data);
    this.setState({ values: res.data });
    console.log(this.state.values)
  });
};

//add the new values to wynum
addValues= () => {
  var locationcontext = this;
  let newValues = {
    get_Price: this.state.price,
    process_ID: this.state.process_ID
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

  addDefaultCharge = () => {
    var chargeContext = this;

    var charge = {
      process_ID: chargeContext.state.process_ID,
      Charge: parseInt(chargeContext.state.charge),
      Charge2: parseInt(chargeContext.state.charge),
      Charge3: parseInt(chargeContext.state.charge),
      Charge4: parseInt(chargeContext.state.charge),
      Charge5: parseInt(chargeContext.state.charge),
      Charge6: parseInt(chargeContext.state.charge),
      Charge7: parseInt(chargeContext.state.charge),
      Charge8: parseInt(chargeContext.state.charge),
      Charge9: parseInt(chargeContext.state.charge),
      Charge10: parseInt(chargeContext.state.charge),

    };
    const url = `https://api.wynum.com/postStage/2fb39ddfdd4b3206cb3e1b387cf8c3bc?token=${this.state.token}`;
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(charge), config).then(res => {
     // console.log(res.data);
    });
  };
  
  //post request to location
  //addcharges call()
  addnocharge = () => {
    var locationcontext = this;
    let location = {
      shipment_Location_Departing: locationcontext.state.departure,
      shipment_Location_Destination: locationcontext.state.arrival,
      process_ID: locationcontext.state.process_ID
    };
    this.state.boxes.splice(0, 0, location);
    console.log("token:", this.state.token);
    const url = `https://api.wynum.com/postStage/0762ddf88093e93d1d9b06f48997a02e?token=${this.state.token}`;
    console.log("box", location);
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(location), config).then(res => {
      console.log("box after ", location);
      console.log(res.data);
      this.findValue();
      this.addDefaultCharge();
      this.addValues();
      this.props.changeScreen("dashboard");
    });
  };

  addcharge = () => {
    var locationcontext2 = this;
    let location2 = {
        shipment_Location_Departing: locationcontext2.state.departure,
        shipment_Location_Destination: locationcontext2.state.arrival,
        process_ID: locationcontext2.state.process_ID
    };
    this.state.boxes.splice(0, 0, location2);
    console.log("token:", this.state.token);
    const url = `https://api.wynum.com/postStage/0762ddf88093e93d1d9b06f48997a02e?token=${this.state.token}`;
    console.log("box", location2);
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(location2), config).then(res => {
      console.log("box after ", location2);
      console.log(res.data);
      this.findValue();
      this.addValues();
      this.props.changeScreen("addcharge");
    });
  };

  componentDidMount() {
    this.getValues();
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs" xs={24}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Shipping Location
          </Typography>
          <TextField
            id="outlined-name"
            type="text"
            label="Arrival"
            value={this.state.arrival}
            onChange={this.handleChange}
            inputProps={{
              name: "arrival"
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
              onClick={this.addcharge}
            >
              Add With Additional Charges
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.addnocharge}
            >
              Add Without Additional Charges
            </Button>
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
