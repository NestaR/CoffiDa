import 'react-native-gesture-handler'

import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './components/login'
import Home from './components/home'
import Signup from './components/signup'
import Main from './components/main'
import UserInfo from './components/userinfo'
import NewReview from './components/newreview'
import UpdateReview from './components/updatereview'
import Map from './components/map'
import GetLocation from './components/getlocation'
import Photo from './components/photos'
import Camera from './components/camera'
const Stack = createStackNavigator()

class App extends Component {
  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
          <Stack.Screen name='Log In' component={Login} />
          <Stack.Screen name='Sign Up' component={Signup} />
          <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
          <Stack.Screen name='User Info' component={UserInfo} />
          <Stack.Screen name='New Review' component={NewReview} />
          <Stack.Screen name='Update Review' component={UpdateReview} />
          <Stack.Screen name='Map' component={Map} />
          <Stack.Screen name='Get Location' component={GetLocation} />
          <Stack.Screen name='Photo' component={Photo} />
          <Stack.Screen name='Camera' component={Camera} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App
