import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Create from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadOutlined from "@material-ui/icons/CloudUpload";
import { ExportReactCSV } from "./ExportReactCSV";
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
  },
  headline: {
    left: "10px",
    marginLeft: "10px",
    margin: "0.2em auto"
  },
  exportButton: {
    left: "30px",
    margin: "0.2em auto",
    marginRight: "10px"
  },

  cloudUploadIcon: {
    marginRight: "20px"
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
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h5"
              className={classes.exportButton}
            >
              Boxes Report
              <Fab
                color="primary"
                variant="extended"
                size="large"
                aria-label="export"
                style={styles.button}
                className={classes.exportButton}
                value="export"
                onClick={() => {}}
              >
                <CloudUploadOutlined
                  className={classes.extendedIcon}
                  className="cloudUploadIcon"
                />
                Export
              </Fab>
              <div className="col-md-4 center">
                <ExportReactCSV
                  csvData={this.state.box}
                  fileName={this.state.fileName}
                />
              </div>
            </Typography>
          </Grid>

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
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
