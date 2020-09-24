import React, { Component } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setFav,
  receivePerfumeItem,
  receiveStarchItem,
  setAuthLoader
} from "../actions/AuthAction";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import "../App.css";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    flexBasis: 200
  }
});

class Favorite extends Component {
  state = {};
  constructor(props) {
    super(props);

    this.state = {
      perfume: this.props.favperfume,
      starch: this.props.favstarch
    };
  }

  componentDidMount() {
    this.props.receivePerfumeItem();
    this.props.receiveStarchItem();
  }

  render() {
    console.log(this.props.starchs);

    const handleSubmit1 = e => {
      e.preventDefault();
      this.props.setAuthLoader(true);

      var perfname = this.state.perfume.perfname;
      var perfprice = this.state.perfume.perfprice;
      const newp = { perfname: perfname, perfprice: perfprice };

      var starchname = this.state.starch.starchname;
      var starchprice = this.state.starch.starchprice;
      const news = { starchname: starchname, starchprice: starchprice };
      const data = { favperf: newp, favstarch: news };
      this.props.setFav(data);
    };
    const handleSubmit = e => {
      e.preventDefault();
      this.props.setAuthLoader(true);
      var ps = this.state.perfume.split("|");
      var perfname = ps[0];
      var perfprice = ps[1];
      const newp = { perfname: perfname, perfprice: perfprice };
      var ss = this.state.starch.split("|");
      var starchname = ss[0];
      var starchprice = ss[1];
      const news = { starchname: starchname, starchprice: starchprice };
      const data = { favperf: newp, favstarch: news };
      this.props.setFav(data);
    };

    const handleInput = e => {
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      this.setState({ [name]: value });
      console.log(this.state);
    };

    const { classes } = this.props;

    return (
      <div className="container">
        <section className="favorite">
          <form classsName="form">
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <div className="favorite-box">
                <h5 className="favorite-box__title">Perfume</h5>
                {this.props.favstarch ? (
                  <>
                    <p className="favorite__name">
                      {" "}
                      {this.props.favperfume.perfname}{" "}
                    </p>
                    <p className="favorite__price">
                      {this.props.favperfume.perfprice}
                      &#8358;
                    </p>
                  </>
                ) : null}

                <TextField
                  id="perfume"
                  select
                  label="Select Perfume"
                  name="perfume"
                  value={this.state.perfume}
                  onChange={handleInput}
                  helperText="Please select Favority Perfume"
                  variant="outlined"
                  className="favorite__inputs"
                >
                  {this.props.favperfume ? (
                    <MenuItem
                      key={this.props.favperfume.perfname}
                      value={
                        this.props.favperfume.perfname +
                        "|" +
                        this.props.favperfume.perfprice
                      }
                    >
                      {this.props.favperfume.perfname} &#8358;
                      {this.props.favperfume.perfprice}
                    </MenuItem>
                  ) : null}
                  {this.props.perfumes.map(option => (
                    <MenuItem
                      key={option.perfname}
                      value={option.perfname + "|" + option.perfprice}
                    >
                      {option.perfname} &#8358;{option.perfprice}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="favorite-box">
                <h5 className="favorite-box__title">Starch</h5>

                {this.props.favstarch ? (
                  <>
                    <p className="favorite__name">
                      {" "}
                      {this.props.favstarch.starchname}{" "}
                    </p>
                    <p className="favorite__price">
                      {" "}
                      {this.props.favstarch.starchprice}
                      &#8358;
                    </p>
                  </>
                ) : null}

                <TextField
                  id="starch"
                  select
                  label="Select Starch"
                  variant="outlined"
                  value={this.state.starch}
                  onChange={handleInput}
                  name="starch"
                  helperText="Please select favorite  Starch"
                  variant="outlined"
                  className="favorite__inputs"
                >
                  {this.props.favstarch ? (
                    <MenuItem
                      select
                      key={this.props.favstarch.starchname}
                      value={
                        this.props.favstarch.starchname +
                        "|" +
                        this.props.favstarch.starchprice
                      }
                    >
                      {this.props.favstarch.starchname} &#8358;
                      {this.props.favstarch.starchprice}
                    </MenuItem>
                  ) : null}
                  {this.props.starchs.map(option => (
                    <MenuItem
                      key={option.starchname}
                      value={option.starchname + "|" + option.starchprice}
                    >
                      {option.starchname} &#8358;{option.starchprice}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>
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
        setFav,
        receivePerfumeItem,
        receiveStarchItem,
        setAuthLoader
      },
      dispatch
    )
  };
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    user: state.AuthReducer.user,
    perfumes: state.AuthReducer.perfumelist,
    starchs: state.AuthReducer.starchlist,
    favstarch: state.AuthReducer.user.favstarch,
    favperfume: state.AuthReducer.user.favperf,
    loader: state.AuthReducer.loader
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Favorite));
