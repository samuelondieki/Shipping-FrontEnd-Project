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

class CurrentPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.userToken,
      price: [],
      process_ID: "",
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getPrice = () => {
    let url = `https://api.wynum.com/getallStage/7056f8348c592492f69acfd8bc3dbe7a?process_ID=${this.state.process_ID}&token=${this.state.token}`;
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({ price: res.data });
    });
  };

  //handle edit button
//   handleEdit = box => {
//     this.props.changeToEdit(box);
//   };

  componentDidMount() {
    this.getPrice();
  }

  render() {
    const { classes, order, orderBy } = this.props;
    const types = this.state.price;

    //row headers
    const headRows = [
      { id: "China/Seattle", label: "China to Seattle" },
      { id: "China/Inland", label: "China to Inland/Railway" },
      { id: "Seattle/China", label: "Seattle to China" },
      { id: "Seattle/Inland", label: "Seattle to Inland/Railway" },
      { id: "Inland/China", label: "Inland/Railway to China" },
      { id: "Inland/Seattle", label: "Inland/Railway to Seattle" },
    ];
    return (
      <Grid container className={classes.root} spacing={24}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Current Shipping Prices in USD
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
                {types.map(price => (
                  <TableRow key={price.process_id} hover>
                    <TableCell component="th" scope="row">
                      {price.China_Seattle}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {price.China_Inland}
                    </TableCell>{" "}
                    <TableCell component="th" scope="row">
                      {price.Seattle_China}
                    </TableCell>{" "}
                    <TableCell component="th" scope="row">
                      {price.Seattle_Inland}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {price.Inland_China}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {price.Inland_Seattle}
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
                this.props.changeScreen("price"); 
              }}
            >
              Change Shipping Prices
            </Button>
          </div>
        </div>
      </Grid>
    );
  }
}
CurrentPrice.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CurrentPrice);
