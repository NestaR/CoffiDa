import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/login';
import About from './components/about';
import Contact from './components/contact';

const Stack = createStackNavigator();

class App extends Component{
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Log In" component={Home} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Contact" component={Contact} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
