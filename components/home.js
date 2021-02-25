import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, Image } from 'react-native'

class HomeScreen extends Component {
  render () {
    const navigation = this.props.navigation

    return (// displays welcome screen with options to either login or make
    // a new account
      <View style={styles.container}>
        <Text style={styles.text}>CoffiDa</Text>
        <Image style={styles.imageStyle} source={require('./coffee.png')} />
        <Button
          title='Log In'
          onPress={() => { navigation.navigate('Log In') }}
        />
        <View style={styles.space} />
        <Button
          title='Sign Up'
          onPress={() => { navigation.navigate('Sign Up') }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'orange'
  },
  space: {
    width: 10,
    height: 10
  },
  text: {
    alignSelf: 'flex-start',
    color: 'black',
    fontSize: 50
  },
  imageStyle: {
    padding: 10,
    margin: 10,
    height: 300,
    width: 300,
    resizeMode: 'stretch'
  }
})
export default HomeScreen
