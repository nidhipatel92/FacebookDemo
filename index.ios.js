/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
const FBSDK = require('react-native-fbsdk');
import React, { Component } from 'react';
const {
  LoginButton,
   LoginManager,
   GraphRequest,
   GraphRequestManager,
   FBSDKGraphRequest,
} = FBSDK;

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,TouchableOpacity,
} from 'react-native';

export default class ReactFBDemo extends Component {

  state = {profile: ""}

  getData()
  {
    console.log('cdhsghfgdhgsh');
    var fetchProfileRequest = new GraphRequest('/me',{
          parameters: {
            fields: {
              string: 'email,name,first_name,middle_name,last_name,gender,id' // what you want to get
            },
          }
        },
    (error, result) =>
    {
        console.log('str');
        if (error) {
          alert('Error making request.');
        } else {
          // Data from request is in result
          console.log(result);
          this.setState({ profile: JSON.stringify(result) });
        }
    });
    // // Start the graph request.
    new GraphRequestManager().addRequest(fetchProfileRequest).start();
  }

  onButtonPress()
  {
    LoginManager.logInWithReadPermissions(['public_profile','email','public_profile'])
    .then(
      function(result)
      {
        if (result.isCancelled)
        {
          alert('Login was cancelled');
        }
        else
        {
          alert('successful Login');
          this.getData()
        }
      }.bind(this),
      function(error) {
        alert('Login failed with error: ' + error);
      }
    );
  }

  render() {
    return (
      <View>
        <Button
          onPress={this.onButtonPress.bind(this)}
          title="Click"
          color="#841584"
          accessibilityLabel="Learn more about purple"
        />
        <Text>{this.state.profile}</Text>

      </View>
    );
  }
}
AppRegistry.registerComponent('ReactFBDemo', () => ReactFBDemo);
