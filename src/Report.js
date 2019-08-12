import React from "react";
import Grid from "@material-ui/core/Grid";
import { spacing } from "@material-ui/system";
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
import CloudUploadOutlined from "@material-ui/icons/CloudUpload";
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

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process_ID: "16",
      token: props.userToken,
      apiToken: 7819284,
      boxes: []
    };
    console.log("token:", this.state.token);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getBoxes = () => {
    let url = `https://api.wynum.com/getallStage/0b4f81c827700d711263e4d75a395609?token=${
      this.state.token
    }`;
    //let url = `https://api.wynum.com/getallStage/71f71ac6b3200cdd83ef34725b9aa501?user_email=${this.state.email}&token=${this.state.token}`;
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ boxes: res.data });
    });
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
      { id: "total_weight", label: "Total Pallete Weight" },
      { id: "total_boxes", label: "Total Boxes" },
      { id: "to", label: "To" },
      { id: "from", label: "From" },
      { id: "price", label: "Final Price" }
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
                {types.map(boxes => (
                  <TableRow key={boxes.process_id} hover>
                    <TableCell component="th" scope="row">
                      {boxes.process_ID}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {boxes.Total_Boxes}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {boxes.Total_Palette_Weight}
                    </TableCell>{" "}
                    <TableCell component="th" scope="row">
                      {boxes.To}
                    </TableCell>{" "}
                    <TableCell component="th" scope="row">
                      {boxes.From}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {boxes.Final_Price}
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
Report.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Report);
