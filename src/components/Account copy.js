import React, {Component} from 'react';
import { SideNav, Button,SideNavItem } from 'react-materialize';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUser,setAuthLoader,receiveLGA,receiveState,receiveCountry} from '../actions/AuthAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import '../App.css';
import TextField from '@material-ui/core/TextField';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
//import Drawer from './components/Drawer.js';


const styles=(theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
});

class Account extends Component{

  constructor(props) {
    super(props);

    this.state = {
      activeStep:0,

      fname: this.props.user.fname,
      lname: this.props.user.lname,
      name: this.props.user.name,
      email: this.props.user.email,
      country: this.props.user.country,
      state: this.props.user.state,
      localgov: this.props.user.localgov,
      lgas: this.props.lgas,
       addr: this.props.user.addr,
      phone: this.props.user.phone,
      
      
    };
  }

  componentDidMount(){
    this.props.receiveCountry();
  }

  render(){

    const { classes } = this.props;
    console.log(this.props.states)

    const handleSubmit =(e)=>{
      e.preventDefault();
      this.props.setAuthLoader(true)
     const data = {
      
        fname:  this.state.fname,
      lname:  this.state.lname,
      name:  this.state.name,
      country:  this.state.country,
      state:  this.state.state,
      localgov:  this.state.localgov,
       addr: this.state.addr,
      phone:  this.state.phone,
    token:  this.props.token,}
      this.props.updateUser(data);
      console.log(this.props);
    }
    const handleInput =(e)=>{
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      this.setState({ [name]:value});
      console.log(this.state);
     if (name == 'state') {
       this.props.receiveLGA({state: value, country: this.state.country})
     }
     if (name == 'country') {
       
       this.props.receiveState({country: value})
     }
    }

    
  return (
    <div className="body">
     <form classsName="form-box">
        <Grid item xs={6} md={6} lg={6}   >

           <FormControl variant="outlined">
        <InputLabel  htmlFor="component-outlined">
          Name
        </InputLabel>
        <OutlinedInput
          id="component-outlined"
          
         
        />
      </FormControl>

       <FormControl variant="outlined">
        <InputLabel  htmlFor="component-outlined">
          Name
        </InputLabel>
        <OutlinedInput
          id="component-outlined"
          
          
        />
      </FormControl>

        </Grid>

         <TextField
          id="outlined-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <Grid item xs={6} md={6} lg={6}   >

            <TextField
          label="With normal TextField"
          id="standard-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
          }}
        />

       <FormControl variant="outlined">
        <InputLabel  htmlFor="component-outlined">
          Name
        </InputLabel>
        <OutlinedInput
          id="component-outlined"
          
          
        />
      </FormControl>

        </Grid>

         <Grid item xs={4} md={4} lg={4}   >

           <TextField
          id="country"
          select
          label="Country"
          value={this.state.country}
          name="country"
          onChange={handleInput}
          helperText="Please select your Country"
          variant="outlined"
        >
         
          {this.props.countries.length?(
           this.props.countries.map(item => {
             return(
                <MenuItem key={item.country} value={item.country}>
              {item.country}
            </MenuItem>
                
             )
           })
           
         ):null}
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
        >
          {this.props.states.length?(
           this.props.states.map(item => {
             return(

               <MenuItem key={item.state} value={item.state}>
             {item.state}
            </MenuItem>
               
             )
           })
           
         ):null}
          
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
        >
           <MenuItem key={this.state.localgov} value={this.state.localgov}>
              {this.state.localgov}
            </MenuItem>
           {this.props.lgas.length?(
           this.props.lgas.map(item => {
             return(

               <MenuItem key={item.LGA}value={item.LGA}>
               {item.LGA}
            </MenuItem>
               
             )
           })
           
         ):null}
        </TextField>

        

        </Grid>

        <TextField
          id="standard-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
       
       </form>
     <div className="container">
        <Card className={classes.card}>
      
     
      <CardContent>

        <Form>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>First Name</Form.Label>
      <Form.Control onChange={handleInput}  name="fname" value={this.state.fname} id="first_name" type="text" class="validate" placeholder="First Name" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
     
      <TextField id="outlined-basic" onChange={handleInput} id="last_name" name="lname" value={this.state.lname} label="Last Name"  placeholder="Last Name" variant="outlined" />
    
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Username</Form.Label>
    <InputGroup>
     <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                </InputGroup.Prepend>
    <Form.Control onChange={handleInput}   id="name" name="name" value={this.state.name}  type="text" class="validate" placeholder="Username" />
    </InputGroup>
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control disabled id="email" type="email" name="email" value={this.state.email} class="validate" placeholder="Enter email" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Phone Number</Form.Label>
      <Form.Control  placeholder="+234" onChange={handleInput} id="icon_telephone" name="phone" value={this.state.phone} type="number" class="validate" />
    </Form.Group>
  </Form.Row>

   <Form.Row>
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Country</Form.Label>
      <Form.Control onChange={handleInput} as="select" name="country">
         <option value={this.state.country} selected>{this.state.country}</option>
        {this.props.countries.length?(
           this.props.countries.map(item => {
             return(
                <option value={item.country}>{item.country}</option>
             )
           })
           
         ):null}
        
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control onChange={handleInput} name="state" as="select">
         <option value={this.state.state} selected>{this.state.state}</option>
         
         {this.props.states.length?(
           this.props.states.map(item => {
             return(
                <option value={item.state}>{item.state}</option>
             )
           })
           
         ):null}

      </Form.Control>
    </Form.Group>

   <Form.Group as={Col} controlId="formGridState">
      <Form.Label>LGA</Form.Label>
      <Form.Control onChange={handleInput} name="localgov" as="select">
         <option value={this.state.localgov} selected>{this.state.localgov}</option>
         {this.props.lgas.length?(
           this.props.lgas.map(item =>{
             return(
                <option value={item.LGA}>{item.LGA}</option>
             )
           })
           
         ):null}
      </Form.Control>
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control onChange={handleInput}   name="addr" value={this.state.addr} type="text" class="validate" placeholder="1234 Main St" />
  </Form.Group>

  

  
   {
        this.props.loader?(
          <CircularProgress/>
        ):(
         <Button onClick={handleSubmit} variant="primary" type="submit">
    Update
  </Button>
        )
      }
</Form>
   

 </CardContent>
      <CardActions disableSpacing>
       
      </CardActions>
    
    </Card>
         
        </div>
        </div>
        

  )};
}

const mapDispatchToProps = dispatch =>{
     return{
        ...bindActionCreators({
          updateUser,
          setAuthLoader,
          receiveLGA,
           receiveState,
           receiveCountry,
        },dispatch)
    }
}
const mapStateToProps = (state) =>{
    return{
        isAuthenticated: state.AuthReducer.isAuthenticated,
         user: state.AuthReducer.user,
         token: state.AuthReducer.access_token,
         loader: state.AuthReducer.loader,
         lgas: state.AuthReducer.lgas,
         states: state.AuthReducer.states,
         countries: state.AuthReducer.countries,

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account));
