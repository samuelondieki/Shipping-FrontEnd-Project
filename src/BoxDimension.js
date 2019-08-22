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
      apiToken: 9640783,
      pallet:"",
      process_ID: this.makeid(6),
      china_Seattle: "",
      china_Inland: "",
      seattle_China: "",
      seattle_Inland: "",
      inland_China: "",
      inland_Seattle: "",
      pID: "",
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
  // to get the size of the pallet
  getPallet = () => {
    let url = `https://api.wynum.com/getStage/1a57f534cbe01527ffe492a10ddf16c8?process_ID=${this.state.pID}&token=${this.state.token}`;
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ pallet: res.data["Pallet_volume"] });
      console.log(res.data["Pallet_volume"])
      console.log(this.state.pallet)
    });
  };

  // getValues = () => {
  //   let url = `https://api.wynum.com/getallStage/7056f8348c592492f69acfd8bc3dbe7a?process_ID=${this.state.pID}&token=${this.state.token}`;
  //   axios.get(url).then(res => {
  //     console.log(res.data);
  //     console.log(res.data["China_Seattle"]);
  //     this.setState({ China_Seattle: res.data.China_Seattle });
  //     this.setState({ China_Inland: res.data["China_Inland"] });
  //     this.setState({ Seattle_China: res.data["Seattle_China"] });
  //     this.setState({ Seattle_Inland: res.data["Seattle_Inland"] });
  //     this.setState({ Inland_China: res.data["China_Seattle"] });
  //     this.setState({ Inland_Seattle: res.data["China_Seattle"] });
  //     console.log(this.state.China_Seattle)
  //   });
  // };

  getCS = () => {
    let url = `https://api.wynum.com/getStage/28fe734fa8b075c51268af9b10069863?process_ID=${this.state.pID}&token=${this.state.token}`;
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ china_Seattle: res.data["China_Seattle"]});
      
      console.log(this.state.china_Seattle)
    });
  };
  getCI = () => {
    let url = `https://api.wynum.com/getStage/63cf06c41364ed3d8a6b85df9ddc4645?process_ID=${this.state.pID}&token=${this.state.token}`;
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ china_Inland: res.data["China_Inland"]});
      
      console.log(this.state.china_Inland)
    });
  };
  getSC = () => {
    let url = `https://api.wynum.com/getStage/2a05b0b79a17d508e39b12e4103c47e4?process_ID=${this.state.pID}&token=${this.state.token}`;
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ seattle_China: res.data["Seattle_China"]});
      
      console.log(this.state.seattle_China)
    });
  };
  getSI = () => {
    let url = `https://api.wynum.com/getStage/e8f99f98d545efd644ed392fe1b47454?process_ID=${this.state.pID}&token=${this.state.token}`;
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ seattle_Inland: res.data["Seattle_Inland"]});
      
      console.log(this.state.seattle_Inland)
    });
  };
  getIC = () => {
    let url = `https://api.wynum.com/getStage/3b61c5509478eec7094cc1f1f88dae12?process_ID=${this.state.pID}&token=${this.state.token}`;
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ inland_China: res.data["Inland_China"]});
      
      console.log(this.state. inland_China)
    });
  };
  getIS = () => {
    let url = `https://api.wynum.com/getStage/2e7ea06e8eccfa4e9d1b8752f9ff1310?process_ID=${this.state.pID}&token=${this.state.token}`;
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ inland_Seattle: res.data["Inland_Seattle"]});
      
      console.log(this.state.inland_Seattle)
    });
  };
  

  // to post pallet volume to wynum
  addPallet = () => {
    var boxContext = this;
    let newPallet = {
      New_Pallet_Volume: parseInt(this.state.pallet),
      process_ID: this.state.process_ID,
    };

    // this.state.boxes.splice(0, 0, newPallet);
    console.log("token:", newPallet.New_Pallet_Volume);
    const url = `https://api.wynum.com/postStage/61c8059f6f09dfac2a05cf1df2e01991?token=${this.state.token}`;
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(newPallet), config).then(res => {
     
    });
  };

  addValues = () => {
    var boxContext = this;
    let newValues = {
      China_Seattle: parseInt(this.state.china_Seattle),
      China_Inland: parseInt(this.state.china_Inland),
      Seattle_China: parseInt(this.state.seattle_China),
      Seattle_Inland: parseInt(this.state.seattle_Inland),
      Inland_China: parseInt(this.state.inland_China),
      Inland_Seattle: parseInt(this.state.inland_Seattle),
      process_ID: this.state.process_ID,
    };

    // this.state.boxes.splice(0, 0, newPallet);
    console.log("token:", newValues);
    const url = `https://api.wynum.com/postStage/64ae65c2919382858545ee34a127974e?token=${this.state.token}`;
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(newValues), config).then(res => {
     
    });
  };



  //post request to add box
  addBox = () => {
    var boxContext = this;
    let box = {
      Length: parseInt(this.state.length),
      Width: parseInt(this.state.width),
      Height: parseInt(this.state.height),
      Weight: parseInt(this.state.weight),
      process_ID: this.state.process_ID,
    };

    this.state.boxes.splice(0, 0, box);
    console.log("token:", this.state.token);
    const url = `https://api.wynum.com/postStage/c02a19c943023456484c903018ee9708?token=${this.state.token}`;
    console.log("box", box);
    var config = { headers: { "Content-Type": "application/json" } };
    axios.post(url, JSON.stringify(box), config).then(res => {
      console.log("box after ", box);
      console.log(res.data);
    });
    this.addPallet();
    this.addValues();
    console.log(box.process_ID);
    this.props.onProcessIdChange(box.process_ID);
    this.props.changeScreen("location");
  };

  componentDidMount() {
    this.getPallet();
    this.getCS();
    this.getCI();
    this.getSC();
    this.getSI();
    this.getIC();
    this.getIS();
  }

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

              {/* <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  this.props.changeScreen("dashboard");
                }}
              >
                Cancel
              </Button> */}

              {/* Direct the user to location or next process  */}
              {/* <Button
                variant="contained"
                color="primary"
                className={classes.button}
                
              >
                Next
              </Button> */}
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
