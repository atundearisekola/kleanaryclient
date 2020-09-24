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
export default NewRequest = props => {
  return (
    <section className="request">
      <form className="form">
        <p className="helper-text">
          Upload image for clothes to be ironed or to be hang, or add perfume !
        </p>
        <input
          className="form__file-input"
          onChange={imageChangeHandler}
          type="file"
          multiple
        />

        <div className={classes.req}>
          <TextField
            select
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            label="Select Laundry"
            value={this.state.name}
            onChange={handleInput}
            name="name"
          >
            {this.props.klist.length
              ? this.props.klist.map(option => (
                  <MenuItem
                    key={option.kname}
                    value={option.kname + "|" + option.kprice}
                  >
                    {option.kprice + " - " + option.kname}
                  </MenuItem>
                ))
              : null}
          </TextField>

          <TextField
            id="filled-number"
            label="Quantity"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            name="qty"
            margin="normal"
            value={this.state.qty}
            onChange={handleInput}
          />

          <Button
            onClick={handleLaundry}
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.margin}
          >
            <AddIcon />
          </Button>
        </div>

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

        <p className="helper-text">
          Click <NavLink to="/favorite">here</NavLink> to change the Favorite!{" "}
        </p>
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

        <p className="helper-text">
          In Iron, select clothes that only required to be iron !
        </p>
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

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Pickup Date"
              format="MM/dd/yyyy"
              value={this.state.pickupDate}
              onChange={handlePDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />

            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="pickup Time"
              value={this.state.pickupDate}
              onChange={handlePDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Delivery Date"
              format="MM/dd/yyyy"
              value={this.state.deliveryDate}
              onChange={handleDDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Delivery Time"
              value={this.state.deliveryDate}
              onChange={handleDDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>

        <TextField
          id="outlined-multiline-static"
          label="Short Message"
          placeholder="Short Message"
          name="shortNote"
          as="textarea"
          multiline
          rows={4}
          fullWidth
          value={this.state.shortNote}
          onChange={handleInput}
          variant="outlined"
        />
      </form>
    </section>
  );
};
