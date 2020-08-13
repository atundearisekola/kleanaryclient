import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  updateUser,
  setAuthLoader,
  receiveLGA,
  receiveState,
  receiveCountry
} from "../actions/AuthAction";
import CircularProgress from "@material-ui/core/CircularProgress";

import "../App.css";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
//import Drawer from './components/Drawer.js';

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    margin: theme.spacing(1),

    width: 200
  }
});

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,

      fname: this.props.user.fname,
      lname: this.props.user.lname,
      name: this.props.user.name,
      email: this.props.user.email,
      country: this.props.user.country,
      state: this.props.user.state,
      localgov: this.props.user.localgov,
      lgas: this.props.lgas,
      addr: this.props.user.addr,
      phone: this.props.user.phone
    };
  }

  componentDidMount() {
    this.props.receiveCountry();
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.states);

    const handleSubmit = e => {
      e.preventDefault();
      this.props.setAuthLoader(true);
      const data = {
        fname: this.state.fname,
        lname: this.state.lname,
        name: this.state.name,
        country: this.state.country,
        state: this.state.state,
        localgov: this.state.localgov,
        addr: this.state.addr,
        phone: this.state.phone,
        token: this.props.token
      };
      this.props.updateUser(data);
      console.log(this.props);
    };
    const handleInput = e => {
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      this.setState({ [name]: value });
      console.log(this.state);
      if (name == "state") {
        this.props.receiveLGA({ state: value, country: this.state.country });
      }
      if (name == "country") {
        this.props.receiveState({ country: value });
      }
    };

    return (
      <div className="container">
        <section className="account">
          <form classsName="form">
            <Grid
              item
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <FormControl variant="outlined" className="form__group">
                <InputLabel htmlFor="first_name">First Name</InputLabel>
                <OutlinedInput
                  onChange={handleInput}
                  name="fname"
                  value={this.state.fname}
                  id="first_name"
                  type="text"
                />
              </FormControl>

              <FormControl variant="outlined" className="form__group">
                <InputLabel htmlFor="last_name">Last Name</InputLabel>
                <OutlinedInput
                  onChange={handleInput}
                  id="last_name"
                  name="lname"
                  value={this.state.lname}
                  placeholder="Last Name"
                />
              </FormControl>
            </Grid>

            <TextField
              label="Username"
              className="form__group"
              id="name"
              name="name"
              value={this.state.name}
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

            {this.props.loader ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={handleSubmit}
                variant="primary"
                className="btn--green btn--center"
                style={{ margin: "auto" }}
                type="submit"
              >
                Update
              </Button>
            )}
          </form>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        updateUser,
        setAuthLoader,
        receiveLGA,
        receiveState,
        receiveCountry
      },
      dispatch
    )
  };
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    user: state.AuthReducer.user,
    token: state.AuthReducer.access_token,
    loader: state.AuthReducer.loader,
    lgas: state.AuthReducer.lgas,
    states: state.AuthReducer.states,
    countries: state.AuthReducer.countries
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Account));
