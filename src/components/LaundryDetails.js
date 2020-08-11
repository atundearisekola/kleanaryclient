import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import clsx from 'clsx';

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
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import {connect} from 'react-redux';
import {requestDetail,setLoader,confirmStatus} from '../actions/LaundryAction'
import {bindActionCreators} from 'redux';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import { red } from '@material-ui/core/colors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import '../App.css';


const styles=(theme) => ({
  root: {
   
  },
  cardheader:{
   

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  cardTitle: {
    marginBottom: 16,
    fontSize: 14,
    color: "#fff"
  },
  pos: {
    marginBottom: 12
  },
   header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
   avatar: {
    backgroundColor: red[500],
  },
   paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  chi: {
    width: '100%',
    
     
     '& > *': {
      margin: theme.spacing(1),
    },
   
  },
   req: {
    display: 'flex',
    
   
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
 
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    flexBasis: 200,
  },
  loader:{
    
    margin: 'auto',

  },
   appBar: {
    position: 'relative',
  },


});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 

        /**
             * @description Converts a string response to an array of objects.
             * @param {string} string - The string you want to convert.
             * @returns {array} - an array of objects.
            */
            function stringToJson(input) {
              var result = [];

              //replace leading and trailing [], if present
              input = input.replace(/^\[/,'');
              input = input.replace(/\]$/,'');

              //change the delimiter to 
              input = input.replace(/},{/g,'};;;{');

              // preserve newlines, etc - use valid JSON
              //https://stackoverflow.com/questions/14432165/uncaught-syntaxerror-unexpected-token-with-json-parse
            input = input.replace(/\\n/g, "\\n")  
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f");
            // remove non-printable and other non-valid JSON chars
            input = input.replace(/[\u0000-\u0019]+/g,""); 

              input = input.split(';;;');

              input.forEach(function(element) {
                // console.log(JSON.stringify(element));

                result.push(JSON.parse(element));
              }, this);

              return result;
            }

    
  

class LaundryDetails extends Component{

  
  constructor(props) {
    super(props);

    this.state = {

      open: false,
      amount: '',
      password: '',
      weight: '',
      perfume: '',
      starch: '',
      id:'',
      imageSrcArray:[],
      todo:'',
      tempSrc:[],
      
     
      
    };

    

    

  }
 

  previewlist = null;

 componentDidMount(){
  this.props.setLoader(true);
  const id = {id: this.props.id};
    this.props.requestDetail(id);

 }

 
 



  render(){

    const { classes } = this.props;

    const handleClickOpen = (todo) => {
    
     this.setState({
      ...this.state, 
      open:true, todo:todo });
       console.log(this.state.open)
  };

  const handleClose = () => {
    
     this.setState({
      ...this.state, 
      open:false });
      console.log(this.state.open)
  };
  


   

      let templist = this.props.laundries.kleanaryinput !=undefined?(
         stringToJson(this.props.laundries.kleanaryinput.slice(0, this.props.laundries.kleanaryinput.length-1)).map(row=>{
       
        return (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.kname}
            </TableCell>
            <TableCell align="right">{row.qty}</TableCell>
            <TableCell align="right">{row.kprice}</TableCell>
            <TableCell align="right">{row.kprice * row.qty}</TableCell>
          </TableRow>
        );
        
      })

      ):("")
      



   const todoHandler = (todo) =>{
    
    handleClickOpen(todo);
    
            
         
        
    
    }

   
 const todoImage = this.props.laundries.laundryimg !=undefined?(
         stringToJson(this.props.laundries.laundryimg.slice(0, this.props.laundries.laundryimg.length-1)).map(imgSrc =>{
           var style = "greyy";
console.log(imgSrc)
 console.log(this.state.todo)
        switch (this.state.todo) {
          
          case "iron":
            console.log(this.state.todo)
             //  var iron = this.props.laundries.todoiron.split(',');
             var iron = this.props.laundries.todoiron;
         // console.log(iron)
         iron= iron.slice(0, iron.length-1);
              iron = stringToJson(iron);
            for (let y = 0; y < iron.length; y++) {
          const element = iron[y];
          console.log(element)
          if (imgSrc.filename ==element.filename) {
            style="greenn";
            break;
          }
        }
         console.log(style)
         //data ={filename:imgSrc};
         return(
        <Grid item xs={4} md={3} lg={2}  key={imgSrc.filename}>
          <div>
          <a  ><img className={style}  id={imgSrc.filename} width="150" height="150" src={imgSrc.filename}   /></a>
          </div>
           </Grid> 
         );
            break;

              case "hang":
               //  var iron = this.props.laundries.todoiron.split(',');
             var iron = this.props.laundries.todostarch;
         // console.log(iron)
         iron= iron.slice(0, iron.length-1);
              iron = stringToJson(iron);
            for (let y = 0; y < iron.length; y++) {
          const element = iron[y];
          console.log(element)
          if (imgSrc.filename ==element.filename) {
            style="greenn";
            break;
          }
        }
         console.log(style)
         //data ={filename:imgSrc};
         return(
        <Grid item xs={4} md={3} lg={2}  key={imgSrc.filename}>
          <div>
          <a  ><img className={style}  id={imgSrc.filename} width="150" height="150" src={imgSrc.filename}   /></a>
          </div>
           </Grid> 
         );
            break;

              case "perfume":
                //  var iron = this.props.laundries.todoiron.split(',');
             var iron = this.props.laundries.todoperfume;
         // console.log(iron)
         iron= iron.slice(0, iron.length-1);
              iron = stringToJson(iron);
            for (let y = 0; y < iron.length; y++) {
          const element = iron[y];
          console.log(element)
          if (imgSrc.filename ==element.filename) {
            style="greenn";
            break;
          }
        }
         console.log(style)
         //data ={filename:imgSrc};
         return(
        <Grid item xs={4} md={3} lg={2}  key={imgSrc.filename}>
          <div>
          <a  ><img className={style}  id={imgSrc.filename} width="150" height="150" src={imgSrc.filename}   /></a>
          </div>
           </Grid> 
         );
        
        
            break;
        
          default:
            break;
        }
      
          
        })
       // template = <div>{template}</div> ;
        //  let tempSrc = [...this.state.tempSrc, data];
         // console.log(tempSrc)
       // this.setState({tempSrc})
     ///   console.log(this.state.tempSrc)
      //  return template;
        
):("")



    

    

    

    const laundry =
      this.props.laundries != "" ? (
        <div className="form">
          <div className="detail-header">
            <span className="detail-header__item-number">
              {this.props.laundries.totalnum}
            </span>

            <div className="detail-header__item-content">
              <h2 className="detail-header__item-content__title">
                {this.props.laundries.txref}
              </h2>
              <p className="detail-header__item-content__subheader">
                {this.props.laundries.created_at}
              </p>
            </div>

            <span className="detail-header__item-price">
              &#8358;{this.props.laundries.totalprice}
            </span>
          </div>

          <div classNmae="detail-content">
            <List className={classes.root}>
              <ListItem>
                <ListItemText
                  primary="Laundry Status"
                  secondary={this.props.laundries.lstatus}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Country"
                  secondary={this.props.laundries.country}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="State"
                  secondary={this.props.laundries.state}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Local Government Area"
                  secondary={this.props.laundries.localgov}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Address"
                  secondary={this.props.laundries.addr}
                />
              </ListItem>
            </List>

            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Laundry Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{templist}</TableBody>
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
                {this.props.laundries.favperf
                  ? stringToJson(this.props.laundries.favperf).map(item => {
                      return (
                        <span>
                          <p className="request-favorite__name">
                            {" "}
                            {item.perfname}
                          </p>
                          <p className="request-favorite__price">
                            &#8358;{item.perfprice}
                          </p>
                        </span>
                      );
                    })
                  : ""}
              </div>

              <div className="request-favorite__box">
                <h5 className="request-favorite__box-title">Starch</h5>
                {this.props.laundries.favstarch
                  ? stringToJson(this.props.laundries.favstarch).map(item => {
                      return (
                        <span>
                          <p className="request-favorite__name">
                            {item.starchname}
                          </p>

                          <p className="request-favorite__price">
                            &#8358;{item.starchprice}
                          </p>
                        </span>
                      );
                    })
                  : ""}
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
                    label={this.props.laundries.pickup_at}
                  />
                </div>

                <div className="request-favorite__box">
                  <h5 className="request-time__box-title">Delivery Date</h5>
                  <Chip
                    variant="contained"
                    color="primary"
                    size="large"
                    label={this.props.laundries.delivery_at}
                  />
                </div>
              </Grid>
            </fieldset>
          </div>
          <div className="detail-action">
            <p> {this.props.laundries.shortnote} </p>
            <div>
              {this.props.laundries.lstatus == "PICKING" ? (
                
                  <Button
                    className="btn btn--white u-margin-top-big u-center-text"
                    onClick={() =>
                      this.props.confirmStatus({
                        status: "PICKED",
                        id: this.props.laundries.id
                      })
                    }
                  >
                    Confirm Pickup
                  </Button>
                
              ) : null
                
             }

              {this.props.laundries.lstatus == "DELIVERING" ? (
                
                  <Button
                    className="btn btn--white u-margin-top-big u-center-text"
                    onClick={() =>{
                       this.props.setLoader(true);
                        this.props.confirmStatus({
                          status: "DELIVERED",
                          id: this.props.laundries.id
                        });
                    }
                     
                    }
                  >
                    Confirm Delivery
                  </Button>
                
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <p>loading</p>
      );
    
console.log(this.props);
 


  
  return (
    <div className="container">
      <section className="detail">
        {this.props.loader ? (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        ) : (
          laundry
        )}

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
                Laundry images
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                Ok
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container spacing={3}>
            {todoImage}
          </Grid>
        </Dialog>
      </section>
    </div>
  );};
  
}
const mapDispatchToProps = dispatch =>{
    return{
        ...bindActionCreators({
          requestDetail,
           setLoader,
           confirmStatus,
        },dispatch)
    }
}

const mapStateToProps = (state,ownProps) =>{
    return{
         
         laundries: state.LaundryReducer.singleLaundry,
         id: ownProps.match.params.laundry_id,
         loader: state.LaundryReducer.loader,
         
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LaundryDetails));
