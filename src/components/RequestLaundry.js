import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton'
//import LockIcon from '@material-ui/icons/Lock'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import 'date-fns'; 
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import {

  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {requestLaundry,setLoader,verifyStack} from '../actions/LaundryAction'
import {receiveLGA,receiveState,receiveCountry, receiveKleanaryItem} from '../actions/AuthAction'

import '../App.css';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';

import OutlinedInput from "@material-ui/core/OutlinedInput";
import  { NavLink, withRouter } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import { TableContainer } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


//import the library
    import PaystackButton from 'react-paystack';
import { Link } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: "100%",

    "& > *": {
      margin: theme.spacing(1)
    }
  },
  req: {
    display: "flex",
    margin: "auto",
    marginBottom: "1rem"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },

  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    flexBasis: 200
  },
  appBar: {
    position: "relative"
    
  },

  title: {
    marginRight: "auto"
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getSteps() {
  return ['Reuest laundry', 'Laundry Details', 'Pickup & delivery details '];
}

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix=""
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

Date.prototype.addDays = function(offset,days) {
  var date = new Date(offset);
  date.setDate(date.getDate() + days);
  return date;
  
}

class RequestLaundry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      numberformat: "0",
      pickupDate: new Date(),
      //  deliveryDate: new Date(),
      deliveryDate: new Date().addDays(new Date(), 3),
      name: "",
      qty: 1,
      klist: [],
      newList: [],
      selectedFile: null,
      selectedFiles: null,
      imageSrcArray: [],
      todoIron: [],
      todoHang: [],
      todoperfume: [],
      todo: "",
      ironprice: 150 + parseInt(this.props.user.favstarch.starchprice),
      totalprice: 0,

      shortNote: "",
      email: this.props.user.email,
      username: this.props.user.name,
      phone: this.props.user.phone,
      country: this.props.user.country,
      state: this.props.user.state,
      localgov: this.props.user.localgov,
      addr: this.props.user.addr,
      starch: this.props.user.favstarch,
      perfume: this.props.user.favperf,
      open: false,
      loading: false,
      coupon: "",

      total: 0
    };
  }

  
  componentDidMount(){
    this.props.receiveKleanaryItem();
    this.props.receiveCountry();

    
  }

  render(){
   
console.log(this.props.klist)

    const { classes } = this.props;
     const handleChange = prop => event => {
      this.setState({ ...this.state, [prop]: event.target.value });
    };

    const handlePDateChange = date => {
      const ddate = new Date().addDays(new Date(date), 3)
    
     this.setState({ ...this.state, pickupDate: date, deliveryDate: ddate });
  };
   const handleDDateChange = date => {
    const pd = new Date(this.state.pickupDate);
     const dd = new Date(date);
    

      var diff =  dd-pd;

      var _second = 1000;
      var _minute = _second * 60;
      var _hour = _minute * 60;
      var _day = _hour * 24;
      var days = Math.floor(diff / _day);
    
     if (days < 3) {
       alert("Delivery date should be minmum of  72 hours")
     }else{
        this.setState({ ...this.state, deliveryDate: date });
     }

    
  };

    
  
  
  const steps = getSteps();

  const validateStep = ()=> {
    switch (this.state.activeStep) {
      case 0:
        if (this.state.klist.length != 0 || this.state.todoIron.length != 0) {
          return true;
        }

        break;

      case 1:
        return true;
        break;
      case 2:
        if (
          this.state.email != "" &&
          this.state.addr != "" &&
          this.state.phone != "" &&
           this.state.localgov != "" &&
            this.state.country != "" &&
             this.state.username != "" 
        ) {
          return true;
        }
        break;

      default:
        return false;
        break;
    }

  }

  const handleNext = () => {
  const  validatestep = validateStep();
    if (validatestep) {
       const newstep = this.state.activeStep + 1;
       this.setState({ ...this.state, activeStep: newstep });
    }
   
  };

  const handleBack = () => {
    const newstep = this.state.activeStep - 1;
    this.setState({...this.state, activeStep: newstep});
  };

  const handleReset = () => {
     console.log(this.props.loader)
    this.props.setLoader(true);
    console.log(this.props.loader)
    
      const data ={
        pickupDate: this.state.pickupDate,
      deliveryDate: this.state.deliveryDate,
      name: this.state.name,
      qty: this.state.qty,
      klist: this.state.klist,
      
      selectedFile: this.state.selectedFile,
      laundryimg: this.state.selectedFiles,
      imgSrc: this.state.imageSrcArray,
      todoIron: this.state.todoIron,
      todoHang: this.state.todoHang,
      todoPerfume: this.state.todoperfume,
      

      email: this.state.email,
      username: this.state.username,
      phone: this.state.phone,
      country: this.state.country,
      state: this.state.state,
      localgov: this.state.localgov,
      addr: this.state.addr,
      shortNote:this.state.shortNote,
      favstarch: this.state.starch,
      favperfume: this.state.perfume,
      token: this.props.token,
      coupon: this.state.coupon,
      }

      this.props.requestLaundry(data);

  };

  const handleClickOpen = () => {
    
     this.setState({
      ...this.state, 
      open:true });
  };

  const handleClose = () => {
    
     this.setState({
      ...this.state, 
      open:false });
  };

const getStepContent=(stepIndex)=> {
  switch (stepIndex) {
    case 0:
      return (
        <section className="request">
          <form className="form">
            <p className="helper-text">
              Upload image for clothes to be ironed or to be hang, or add
              perfume !
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
                        value={
                          option.kname +
                          "|" +
                        (  parseInt(option.kprice) + parseInt(this.state.starch.starchprice))
                        }
                      >
                        {parseInt(option.kprice) +
                          parseInt(this.state.starch.starchprice) +
                          " - " +
                          option.kname}
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
              Click <NavLink to="/favorite">here</NavLink> to change the
              Favorite!{" "}
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


    case 1:
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


    case 2:
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
    default:
      return 'Unknown stepIndex';
  }
}
const payWithCash = ()=>{
  this.props.setLoader(true);
  const data = {
    txtype: "Cash",
    txref: this.props.request.data.txref
  };
  this.props.verifyStack(data);
}
const handleLaundry = (e) => {
    e.preventDefault();
   
      var name = this.state.name;
       const qty = this.state.qty;
       if (name =="" || qty <= 0) {
      return;
    } else {

      var names = name.split("|");
      var kl = names[0];
      var kp = names[1];
      var newkp = kl;
      var newList = "";

      const subt = qty * kp;
      const data = { kname: kl, kprice: kp, qty: qty, subtotal: subt };

      if (this.state.klist.length > 0) {
        this.state.klist.forEach(element => {
          if (element.kname == newkp) {
            delLaundry(newkp);
          } else {
            let klist = [...this.state.klist, data];
            this.setState({ klist });
          }
        });
      } else {
        let klist = [...this.state.klist, data];
        this.setState({ klist });
      }
      
    }
      
      
      
  };

  const handleInput =(e)=>{
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      this.setState({ [name]:value});
     if (name == 'state') {
       this.props.receiveLGA({state: value, country: this.state.country})
     }
     if (name == 'country') {
       
       this.props.receiveState({country: value})
     }
    }

     const delLaundry =(kname)=>{
      
       const list = this.state.klist.filter(lis=>{
       return lis.kname !==kname
      })
      this.setState({...this.state, klist:list});
     
      console.log(this.state);
      
    }

    const imageChangeHandler=(e)=>{
     const files = e.target.files;
     this.setState({...this.state, selectedFiles:files});
      console.log(this.state.selectedFiles);

    }

    const todoHandler = (todo) =>{

      if (this.state.selectedFiles !=null) {
 
      const files = Array.from( this.state.selectedFiles);
       var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;            
            if (files.length > 0) {
        /* Map each file to a promise that resolves to an array of image URI's */ 
        handleClickOpen();
        Promise.all(files.map(file => {
          if (regex.test(file.name.toLowerCase())) {
            if(file.size < 2000000000000000){
            return (new Promise((resolve,reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', (ev) => {
                  var filename = ev.target.fileName;
                  var size = ev.target.imgsize;
                  var url= ev.target.result
                  var data = {filename:filename, url:url, size:size,}
                    resolve(data);
                });
                reader.addEventListener('error', reject);
                 reader.fileName = file.name;
                 reader.imgsize = file.size;
                reader.readAsDataURL(file);
            }));
          }else {
            alert(file.name + " is more than 2Mb."+file.size);
            handleClose();
            return false;
        }
          }else {
              alert(file.name + " is not a valid image file.");
              handleClose();
              return false;
          }
        }))
        .then(images => {

            /* Once all promises are resolved, update state with image URI array */
            
            this.setState({ imageSrcArray : images })
            this.setState({...this.state, todo:todo })

        }, error => {        
            console.error(error);
        });
 
            }else{alert("Upload image first. ");}

      }
      
    }

    const todoIronPrice =
      this.state.todo == "iron" ? (
        <Typography variant="h6" className={classes.title}>
          &#8358; {this.state.todoIron.length * this.state.ironprice}
        </Typography>
      ) : null;

       const todoPerfumePrice =
         this.state.todo == "perfume" ? (
           <Typography variant="h6" className={classes.title}>
             &#8358;{" "}
             {this.state.todoperfume.length * parseInt(this.state.perfume.perfprice)}
           </Typography>
         ) : null;
    

    const todoImage = this.state.imageSrcArray.length > 0 ? (
      this.state.imageSrcArray.map(imgSrc =>{
        var style = "greyy";
        
        switch (this.state.todo) {
          case "iron":
              
            for (let i = 0; i < this.state.todoIron.length; i++) {
          const element = this.state.todoIron[i];
          if (imgSrc.filename==element.filename) {
            style="greenn";
            break;
          }
        }
        return( 
         <Grid item xs={6} md={3} lg={2}  key={imgSrc.filename}>
        <div  >
          <a  onClick={()=>{addToToDo('iron',imgSrc.filename,imgSrc.url)}}>
          <img className={style}  id={imgSrc.filename} width="180" height="180" src={imgSrc.url}   />
          </a>
        
      </div>
        </Grid>
        );
            break;

              case "hang":
              
            for (let i = 0; i < this.state.todoHang.length; i++) {
          const element = this.state.todoHang[i];
          if (imgSrc.filename==element.filename) {
            style="greenn";
            break;
          }
        }
        return( 
         <Grid item xs={6} md={3} lg={2}  key={imgSrc.filename}>
        <div  >
          <a  onClick={()=>{addToToDo('hang',imgSrc.filename,imgSrc.url)}}>
          <img className={style}  id={imgSrc.filename} width="180" height="180" src={imgSrc.url}   />
          </a>
        
      </div>
        </Grid>
        );
            break;

              case "perfume":
              
            for (let i = 0; i < this.state.todoperfume.length; i++) {
          const element = this.state.todoperfume[i];
          if (imgSrc.filename==element.filename) {
            style="greenn";
            break;
          }
        }
        return( 
         <Grid item xs={6} md={3} lg={2}  key={imgSrc.filename}>
        <div  >
          <a  onClick={()=>{addToToDo('perfume',imgSrc.filename,imgSrc.url)}}>
          <img className={style}  id={imgSrc.filename} width="180" height="180" src={imgSrc.url}   />
          </a>
        
      </div>
        </Grid>
        );
            break;
        
          default:
            break;
        }
      })
    ) :("");

    const addToToDo = (todo,filename,url)=>{

      switch (todo) {
        case "iron":
          if(this.state.todoIron.length > 0){
            var isIn=false;
            for (let i = 0; i < this.state.todoIron.length; i++) {
              const element = this.state.todoIron[i];
              if (element.filename == filename) {
                isIn=true;
                break;
              }  
            }
            if (isIn) {
               const list = this.state.todoIron.filter(lis=>{
       return lis.filename !==filename;
      
      })
      this.setState({...this.state, todoIron:list});
      console.log(this.state.todoIron);
       document.getElementById(filename).style.borderColor="grey";
            }else{
             const data={todo:todo,filename:filename,url:url};
               let todoIron = [...this.state.todoIron, data];
        
        this.setState({todoIron})
         document.getElementById(filename).style.borderColor="green";
            }

          }else{
             const data={todo:todo,filename:filename,url:url};
               let todoIron = [...this.state.todoIron, data];
        
        this.setState({todoIron})
         document.getElementById(filename).style.borderColor="green";
          }
          
          break;

           case "hang":
          if(this.state.todoHang.length > 0){
            var isIn=false;
            for (let i = 0; i < this.state.todoHang.length; i++) {
              const element = this.state.todoHang[i];
              if (element.filename == filename) {
                isIn=true;
                break;
              }  
            }
            if (isIn) {
               const list = this.state.todoHang.filter(lis=>{
       return lis.filename !==filename;
      
      })
      this.setState({...this.state, todoHang:list});
       document.getElementById(filename).style.borderColor="grey";
            }else{
             const data={todo:todo,filename:filename,url:url};
               let todoHang = [...this.state.todoHang, data];
        
        this.setState({todoHang})
         document.getElementById(filename).style.borderColor="green";
            }

          }else{
             const data={todo:todo,filename:filename,url:url};
               let todoHang = [...this.state.todoHang, data];
        
        this.setState({todoHang})
         document.getElementById(filename).style.borderColor="green";
          }
          
          break;

           case "perfume":
          if(this.state.todoperfume.length > 0){
            var isIn=false;
            for (let i = 0; i < this.state.todoperfume.length; i++) {
              const element = this.state.todoperfume[i];
              if (element.filename == filename) {
                isIn=true;
                break;
              }  
            }
            if (isIn) {
               const list = this.state.todoperfume.filter(lis=>{
       return lis.filename !==filename;
      
      })
      this.setState({...this.state, todoperfume:list});
       document.getElementById(filename).style.borderColor="grey";
            }else{
             const data={todo:todo,filename:filename,url:url};
               let todoperfume = [...this.state.todoperfume, data];
        
        this.setState({todoperfume})
         document.getElementById(filename).style.borderColor="green";
            }

          }else{
             const data={todo:todo,filename:filename,url:url};
               let todoperfume = [...this.state.todoperfume, data];
        
        this.setState({todoperfume})
         document.getElementById(filename).style.borderColor="green";
          }
          
          break;
      
        default:
          break;
      }
    }

    const callback = (response) => {
      if (response.status == "success") {
        this.props.setLoader(true);
        const data = {
          txref: response.reference,
         // amount: response.amount,
          status: response.status,
          txtype: 'paystack',
        }
        this.props.verifyStack(data);
        console.log(response); // card charged successfully, get reference here
      }
     
    	}

    const	close = () => {
      this.props.setLoader(false);
    		console.log("Payment closed");
        }

  return (
    <div className={classes.root + " body"}>
      <Stepper activeStep={this.state.activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {this.state.activeStep === steps.length ? (
          <div className="container">
            <section className="favorite">
              <div classsName="form">
                {this.props.loader ? (
                  <div>
                    <CircularProgress />
                  </div>
                ) : (
                  <div>
                    {this.props.request.status == 200 ? (
                      this.props.payment_response ? (
                        this.props.payment_response.status == 200 ? (
                          <div>
                            <h1 class="heading-tertiary u-margin-bottom-small u-center-text">
                              Transaction Successful
                            </h1>
                            <p class="paragraph u-margin-bottom-small">
                              Hi {this.props.user.username}
                            </p>
                            <h3 class="heading-secondry u-margin-bottom-small u-center-text">
                              Thanks you for your patronage
                            </h3>
                            <p class="paragraph u-margin-bottom-small">
                              The laundry transaction you made was successful,
                            </p>
                            <p class="paragraph u-margin-bottom-small">
                              transaction total amount is &#8358;
                              {this.props.payment_response.laundry.totalprice}
                            </p>
                            <p class="paragraph u-margin-bottom-small">
                              payment status{" "}
                              {
                                this.props.payment_response.laundry
                                  .paymentstatus
                              }
                            </p>
                            <Button
                              className="btn--green btn btn-primary btn--center"
                              onClick={() =>
                                this.props.history.push("/dashboard")
                              }
                            >
                              Continue >
                            </Button>
                          </div>
                        ) : (
                          ""
                        )
                      ) : (
                        <div>
                          {}
                          <PaystackButton
                            text="Make Payment"
                            className="payButton btn btn-primary btn--center"
                            callback={callback}
                            close={close}
                            disabled={false}
                            embed={false}
                            reference={this.props.request.data.txref}
                            email={this.props.request.data.email}
                            amount={this.props.request.data.totalprice}
                            paystackkey={this.props.request.data.pkey}
                            tag="button"
                          />

                          <Button
                            className="btn--green btn--center"
                            onClick={payWithCash}
                          >
                            Pay with Cash
                          </Button>
                        </div>
                      )
                    ) : (
                      <div>
                        <Typography className={classes.instructions}>
                          All steps completed
                        </Typography>
                        <TextField
                          label="Coupon"
                          className="form__group"
                          id="coupon"
                          name="coupon"
                          value={this.state.coupon}
                          type="text"
                          placeholder="Coupon"
                          onChange={handleInput}
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true
                          }}
                          variant="outlined"
                        />

                        <Button
                          disabled={this.state.activeStep === 0}
                          onClick={handleBack}
                          className={classes.backButton}
                          className="btn--green btn--center"
                        >
                          Back
                        </Button>

                        <Button
                          className="btn--green btn--center"
                          onClick={handleReset}
                        >
                          Checkout
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : (
          <div>
            <div className="container">
              <Typography className={classes.instructions}>
                {getStepContent(this.state.activeStep)}
              </Typography>
            </div>
            <div>
              <Button
                disabled={this.state.activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
                className="btn--green btn--center"
              >
                Back
              </Button>
              <Button
                className="btn--green btn--center"
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {this.activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog
        fullScreen
        open={this.state.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Select laundry images
            </Typography>

            {todoIronPrice}
            {todoPerfumePrice}
            <Button autoFocus color="inherit" onClick={handleClose}>
              Ok
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3}>
          {todoImage}
        </Grid>
      </Dialog>
    </div>
  );};
}

const mapDispatchToProps = dispatch =>{

   return{
        ...bindActionCreators({
          requestLaundry,
          setLoader,
          verifyStack,
          receiveLGA,receiveState,receiveCountry, receiveKleanaryItem,
        },dispatch)
    }
   
}

const mapStateToProps = (state,ownProps) =>{
    return {
      klist: state.AuthReducer.klist,
      id: ownProps.match.params.laundry_id,
      user: state.AuthReducer.user,
      token: state.AuthReducer.access_token,
      request: state.LaundryReducer.requestdetail,
      history: ownProps.history,
      loader: state.LaundryReducer.loader,
      payment_response: state.LaundryReducer.payment_response,
      perfumes: state.AuthReducer.perfumelist,
      starchs: state.AuthReducer.starchlist,
      lgas: state.AuthReducer.lgas,
      states: state.AuthReducer.states,
      countries: state.AuthReducer.countries
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RequestLaundry));