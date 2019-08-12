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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import CssBaseline from "@material-ui/core/CssBaseline";
import signin from "./SignIn";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Create from "@material-ui/icons/Create";
import Computer from "@material-ui/icons/Computer";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
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

class BoxReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   process_ID: "16",
      token: props.userToken,
      process_ID:props.ProcessID,

      boxes: []
    };
    console.log("token:", this.state.token);
    console.log("process id", this.state.process_ID);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getBoxes = () => {
    let url = `https://api.wynum.com/getallStage/63ab151382791f6eeffc70ae383daf71?token=${
      this.state.token
    }`;
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ boxes: res.data });
    });
  };

  //handle edit button
  handleEdit = box => {
    this.props.changeToEdit(box);
  };

  componentDidMount() {
    this.getBoxes();
  }

  render() {
    const { classes, order, orderBy } = this.props;
    const types = this.state.boxes;

    //row headers
    const headRows = [
      { id: "process_id", label: "Process ID" },
      { id: "length", label: "Length" },
      { id: "height", label: "Height" },
      { id: "width", label: "Width" },
      { id: "weight", label: "Weight" },
      { id: "volume", label: "Volume" },
      { id: "edit", label: "Edit" },
      { id: "delete", label: "Delete" }
    ];
    return (
      <Grid container className={classes.root} spacing={24}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Boxing Report
          </Typography>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  {headRows.map(row => (
                    <TableCell
                      key={row.id}
                      align={row.numeric ? "right" : "left"}
                      padding={row.disablePadding ? "none" : "default"}
                      sortDirection={orderBy === row.id ? order : false}
                    >
                      <TableSortLabel>{row.label}</TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {types.map(boxes => (
                  <TableRow key={boxes.process_id} hover>
                    <TableCell component="th" scope="row">
                      {boxes.process_ID}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {boxes.Length}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {boxes.Height}
                    </TableCell>{" "}
                    <TableCell component="th" scope="row">
                      {boxes.Width}
                    </TableCell>{" "}
                    <TableCell component="th" scope="row">
                      {boxes.Weight}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {boxes.Volume}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        arial-label="Edit"
                        size="small"
                        color="primary"
                        onClick={() => {
                          //   this.props.changeScreen("box_update");
                         
                          this.handleEdit(boxes);
                        }}
                      >
                        <Create color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        arial-label="Delete"
                        size="small"
                        color="primary"
                        // onClick={() => {
                        // //   console.log("Users:", users.user_id);
                        // //   this.deleteUser(users.user_id);
                        // }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.getBoxes}
            >
              Next
            </Button> */}

            {/* <ul>
              {this.getBoxes}
              {types.boxes.map(box => (
                <li key={box.id}>
                  Total Boxes: {box.Total_Boxes} | Total Weight:{" "}
                  {box.Total_Palette_Weight}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </Grid>
    );
  }
}
BoxReport.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BoxReport);
