import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
//import LockIcon from '@material-ui/icons/Lock'
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { red } from "@material-ui/core/colors";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestLaundry,
  setLoader,
  verifyStack
} from "../actions/LaundryAction";
import {
  receiveLGA,
  receiveState,
  receiveCountry,
  receiveKleanaryItem
} from "../actions/AuthAction";

import "../App.css";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import { NavLink, withRouter } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
//import { TableContainer } from '@material-ui/core';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

//import the library
import PaystackButton from "react-paystack";
import { Link } from "@material-ui/core";
export default ConfirmRequest = () => {
  return (
    <div className="container">
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />

        <CardContent>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Laundry Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.klist.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.kname}
                  </TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.kprice}</TableCell>
                  <TableCell align="right">{row.subtotal}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Link
                      onClick={() => {
                        delLaundry(row.kname);
                      }}
                    >
                      <DeleteIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <hr />
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <div className="request-favorite__box">
              <h5 className="request-favorite__box-title">Perfume</h5>
              <p className="request-favorite__name">
                {" "}
                {this.state.perfume.perfname}{" "}
              </p>
              <p className="request-favorite__price">
                {this.state.perfume.perfprice}
                &#8358;
              </p>
            </div>

            <div className="request-favorite__box">
              <h5 className="request-favorite__box-title">Starch</h5>
              <p className="request-favorite__name">
                {" "}
                {this.state.starch.starchname}{" "}
              </p>
              <p className="request-favorite__price">
                {" "}
                {this.state.starch.starchprice}
                &#8358;
              </p>
            </div>
          </Grid>

          <div className="request__todo-button">
            <ButtonGroup
              color="primary"
              size="large"
              variant="outlined"
              aria-label="large outlined primary button group"
            >
              <Button
                onClick={() => {
                  todoHandler("iron");
                }}
              >
                Iron
              </Button>
              <Button
                onClick={() => {
                  todoHandler("hang");
                }}
              >
                Hang
              </Button>
              <Button
                onClick={() => {
                  todoHandler("perfume");
                }}
              >
                Perfume
              </Button>
            </ButtonGroup>
          </div>

          <fieldset className="request-time">
            <legend className="request-time__legend">
              {" "}
              Pickup and Delivery Date
            </legend>

            <Grid container justify="space-around">
              <div className="request-favorite__box">
                <h5 className="request-time__box-title">Pickup Date</h5>
                <Chip
                  variant="contained"
                  color="primary"
                  size="large"
                  label={
                    this.state.pickupDate.getDate() +
                    "/" +
                    this.state.pickupDate.getMonth() +
                    "/" +
                    this.state.pickupDate.getFullYear()
                  }
                />
              </div>

              <div className="request-favorite__box">
                <h5 className="request-time__box-title">Delivery Date</h5>
                <Chip
                  variant="contained"
                  color="primary"
                  size="large"
                  label={
                    this.state.deliveryDate.getDate() +
                    "/" +
                    this.state.deliveryDate.getMonth() +
                    "/" +
                    this.state.deliveryDate.getFullYear()
                  }
                />
              </div>
            </Grid>
          </fieldset>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </div>
  );
};
