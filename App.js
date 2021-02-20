import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';

import Login from './components/login';
import Home from './components/home';
import Signup from './components/signup';
import Main from './components/main';
import Map from './components/map';
const Stack = createStackNavigator();

class App extends Component{
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Log In" component={Login} />
          <Stack.Screen name="Sign Up" component={Signup} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
