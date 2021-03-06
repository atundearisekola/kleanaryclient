import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const AuthRoute = ({component:Component, ...res})=>{
 console.log({...res});

    return(

        <Route
        {...res}
        render={props=>
           res.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect 
                to={{
                    pathname:'/login',
                    state:{from:props.location}
                }}
                
                />
            )

        }

        

        />

    );
}

const mapStateToProps = (state) =>{
    return{
        isAuthenticated: state.AuthReducer.isAuthenticated,
    }
}

export default connect(mapStateToProps) (AuthRoute);