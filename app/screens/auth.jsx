import { View, Text } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';
import Login from './Login';
import Home from './Home';

const Auth = ({ user }) => {
    
  return (
        !user ? <Login/> : <Home />
  )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
  });
  
  export default connect(mapStateToProps)(Auth);