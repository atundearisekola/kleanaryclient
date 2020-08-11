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

import '../App.css';


const styles=(theme) => ({
  root: {
    width: '100%',
  },
  cardheader:{
    backgroundColor: "#007bff",
    color: "#fff",

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
         stringToJson(this.props.laundries.kleanaryinput.slice(0, this.props.laundries.kleanaryinput.length-1)).map(klists=>{
       
        return(
        
              <tr>
                <td>{klists.kname}</td>
                <td>{klists.qty}</td>
                <td>{klists.kprice}</td>
                <td>{klists.qty*klists.kprice }</td>
               
                </tr>
        )
        
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



    

    

    

    const laundry = this.props.laundries !=""  ? (
      
       <div className={classes.root+" body"}>
         
       
   <div className="container">
           <Card className={classes.card}>
      <CardHeader 
      className={classes.cardheader}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {this.props.laundries.totalnum}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            Total Price  &#8358;{this.props.laundries.totalprice}
          </IconButton>
        }
        title={this.props.laundries.txref}
        subheader={this.props.laundries.created_at}
      
      />
    
      <CardContent>
      <table className="table table-striped   table-hover td-left">
     
     <tr ><td className="td-left  blue-text"> Laundry Status </td><td >{this.props.laundries.lstatus } </td></tr>
      
            <tr><td className="blue-text"> Country</td><td> {this.props.laundries.country}  </td></tr>
           <tr ><td className="blue-text"> State </td><td >{this.props.laundries.state}   </td></tr>
           <tr ><td className="blue-text"> LGA</td> <td>{this.props.laundries.localgov}  </td></tr>
       <tr ><td className="blue-text"> Delivery Address </td><td> {this.props.laundries.addr}  </td></tr>
        
      
         
     </table>
        <table class="table table-striped table-bordered table-hover"  id="kv">
              <tr>
                <th>Laundry</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                
                </tr>
              {templist}
               
           </table>
           <hr />
             <div className={classes.chi}>

            
             <dt class="list-group-item active">Favorite</dt>

            <Grid container justify="space-around">
                 <span>
               <h5>Starch</h5>
              {this.props.laundries.favstarch? (stringToJson(this.props.laundries.favstarch).map(item=>{

                return(
                   <p>{item.starchname } &#8358;{item.starchprice }</p>
                )
                 
              })):"" }
             
            
             </span>
            
             <span>
                <h5>Perfume</h5>
                {this.props.laundries.favperf? (stringToJson(this.props.laundries.favperf).map(item=>{

                return(
                   <p>{item.perfname } &#8358;{item.perfprice }</p>
                )
                 
              })):"" }
                   
             </span>
        
            </Grid>

             </div>

              <dt class="list-group-item active">Todo</dt>
             <ButtonGroup
              color="primary"
              size="large"
              variant="outlined"
              aria-label="large outlined primary button group"
            >
              <Button onClick={()=>{todoHandler('iron')}}>Iron</Button>
              <Button onClick={()=>{todoHandler('hang')}}>Hang</Button>
              <Button onClick={()=>{todoHandler('perfume')}}>Perfume</Button>
            </ButtonGroup>
            <hr/>
            <fieldset> 
        <legend> Pickup Date and Delivery Date</legend>
       
       <Grid container justify="space-around">
                 <span>
               <h5>Pickup Date</h5>
               <p> {this.props.laundries.pickup_at} </p>
             
             </span>
             
             <span>
                <h5>Delivery Date</h5>
                <p> {this.props.laundries.delivery_at} </p>
                   
             </span>
        
            </Grid>
      </fieldset>
      
      
      </CardContent>
      <CardActions >
        <p> { this.props.laundries.shortnote} </p>
        <div >
{this.props.laundries.lstatus == "picked"? 
<Button onClick={()=>this.props.confirmStatus("yes_picked")}>Confirm Pickup</Button> : null
}

{this.props.laundries.lstatus == "delivered"? 
<Button onClick={()=>this.props.confirmStatus("yes_picked")}>Confirm Delivery</Button> : null
}
        </div>
      </CardActions>
    
    </Card>


        </div>
        </div>

    ) :
     (

     <p>loading</p>
      

    )
    
console.log(this.props);
 


  
  return (
    <div>
        {
          this.props.loader?(
     <div className={classes.loader}>
               <CircularProgress/>
            </div>
    ):(laundry)
        }

          <Dialog fullScreen open={this.state.open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
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
      
     
      </div>
  )};
  
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
