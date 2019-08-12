import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
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

class CurrentPallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.userToken,
      pallet: []
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getPallet = () => {
    let url = `https://api.wynum.com/getallStage/f8ef8cf7c4a357cad45f1dc6b43b98cf?token=${this.state.token}`;
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ pallet: res.data });
    });
  };

  //handle edit button
//   handleEdit = box => {
//     this.props.changeToEdit(box);
//   };

  componentDidMount() {
    this.getPallet();
  }

  render() {
    const { classes, order, orderBy } = this.props;
    const types = this.state.pallet;

    //row headers
    const headRows = [
      { id: "length", label: "Length" },
      { id: "height", label: "Height" },
      { id: "width", label: "Width" },
    ];
    return (
      <Grid container className={classes.root} spacing={24}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Current Pallet Size
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
                {types.map(pallet => (
                  <TableRow key={pallet.process_id} hover>
                    <TableCell component="th" scope="row">
                      {pallet.Length}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {pallet.Height}
                    </TableCell>{" "}
                    <TableCell component="th" scope="row">
                      {pallet.Width}
                    </TableCell>{" "}
                    <TableCell component="th" scope="row">
                      {pallet.Weight}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                this.props.changeScreen("PalletSize");
              }}
            >
              Change Pallet Size
            </Button>
          </div>
        </div>
      </Grid>
    );
  }
}
CurrentPallet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CurrentPallet);
