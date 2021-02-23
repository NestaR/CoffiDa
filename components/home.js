import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

class HomeScreen extends Component{
  static navigationOptions = {
      header: null
  }
  render(){
    const navigation = this.props.navigation;

    return(
        <View style={styles.container}>
          <Text style={styles.text}>CoffiDa</Text>
          <Button
            title="Log In"
            onPress={() => { navigation.navigate('Log In');}}
          />
          <Button
            title="Sign Up"
            onPress={() => { navigation.navigate('Sign Up');}}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  text: {
    color: 'white',
    fontSize: 25
  }
})
export default HomeScreen;
