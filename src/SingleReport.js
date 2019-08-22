import React from "react";
import Grid from "@material-ui/core/Grid";
import { spacing } from "@material-ui/system";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import CssBaseline from "@material-ui/core/CssBaseline";
// import CloudUploadOutlined from "@material-ui/icons/CloudUpload";
// import Fab from "@material-ui/core/Fab";
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

class SingleReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process_ID: props.ProcessID,
      token: props.userToken,
      apiToken: 7819284,
      report: [],
    };
    console.log("token:", this.state.token);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getReport = () => {
    let url = `https://api.wynum.com/getStage/1379db65dcd826c5c0b85e485a5dd66e?process_ID=${this.state.process_ID}&token=${this.state.token}`;
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ report: res.data });
    });
  };

 
  componentDidMount() {
    this.getReport();
  }

  render() {
    const { classes, order, orderBy } = this.props;
    const types = this.state.report;

    //row headers
    const headRows = [
      { id: "quote number", label: "Quote Number" },
      { id: "time_created", label: "Time Created" },
      { id: "total_weight", label: "Total Pallete Weight" },
      { id: "total_boxes", label: "Total Boxes" },
      { id: "to", label: "To" },
      { id: "from", label: "From" },
      { id: "price", label: "Final Price" },
      
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
              Shipping Calculations
              {/* <Fab
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
              </Fab> */}
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
                      // sortDirection={orderBy === row.id ? order : false}
                    >
                      <TableSortLabel>{row.label}</TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {types.map(report => (
                  <TableRow key={report.process_id} hover>
                    <TableCell component="th" scope="row">
                      {report.process_ID}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {report.created_at}
                    </TableCell>{" "}
                    <TableCell component="th" scope="row">
                      {report.Total_Boxes}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {report.Total_Palette_Weight}
                    </TableCell>{" "}
                    <TableCell component="th" scope="row">
                      {report.To}
                    </TableCell>{" "}
                    <TableCell component="th" scope="row">
                      {report.From}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {report.Final_Price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  this.props.changeScreen("box");
                }}
              >
                New Quote
            </Button>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  this.props.changeScreen("dashboard");
                }}
              >
                home
            </Button>
        </div>
      </Grid>
    );
  }
}
SingleReport.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleReport);