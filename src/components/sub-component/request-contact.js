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

export default RequestContact = () => {
  return (
    <div className="container">
      <section className="account">
        <form classsName="form">
          <TextField
            label="Username"
            className="form__group"
            id="username"
            name="username"
            value={this.state.username}
            type="text"
            placeholder="Username"
            onChange={handleInput}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />

          <Grid
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <TextField
              label="Mobile No."
              placeholder="+234"
              onChange={handleInput}
              id="phone"
              name="phone"
              value={this.state.phone}
              type="number"
              className="form__group"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Kg</InputAdornment>
                )
              }}
            />

            <FormControl variant="outlined" className="form__group">
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                disabled
                id="email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <TextField
              id="country"
              select
              label="Country"
              value={this.state.country}
              name="country"
              onChange={handleInput}
              helperText="Please select your Country"
              variant="outlined"
              className="form__group"
            >
              {this.props.countries.length
                ? this.props.countries.map(item => {
                    return (
                      <MenuItem key={item.country} value={item.country}>
                        {item.country}
                      </MenuItem>
                    );
                  })
                : null}
            </TextField>

            <TextField
              id="state"
              select
              label="State"
              name="state"
              value={this.state.state}
              onChange={handleInput}
              helperText="Please select your State"
              variant="outlined"
              className="form__group"
            >
              {this.props.states.length
                ? this.props.states.map(item => {
                    return (
                      <MenuItem key={item.state} value={item.state}>
                        {item.state}
                      </MenuItem>
                    );
                  })
                : null}
            </TextField>

            <TextField
              id="localgov"
              select
              label="Local Government"
              value={this.state.localgov}
              onChange={handleInput}
              name="localgov"
              helperText="Please select your currency"
              variant="outlined"
              className="form__group"
            >
              <MenuItem key={this.state.localgov} value={this.state.localgov}>
                {this.state.localgov}
              </MenuItem>
              {this.props.lgas.length
                ? this.props.lgas.map(item => {
                    return (
                      <MenuItem key={item.LGA} value={item.LGA}>
                        {item.LGA}
                      </MenuItem>
                    );
                  })
                : null}
            </TextField>
          </Grid>

          <TextField
            id="addr"
            label="Home Address"
            className="form__group"
            onChange={handleInput}
            name="addr"
            value={this.state.addr}
            type="text"
            placeholder="1234 Main St"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
        </form>
      </section>
    </div>
  );
};
