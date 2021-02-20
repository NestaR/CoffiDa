import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';

class MainScreen extends Component{
  static navigationOptions = {
      header: null
  }
  render(){
    const navigation = this.props.navigation;

    return(
        <View style={styles.container}>
          <Text style={styles.text}>Main</Text>
          <TouchableOpacity style={styles.buttonStyle}>
          <Button
            title="Map"
            onPress={() => {
              navigation.navigate('Map');
            }}
          />
          </TouchableOpacity>
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
export default MainScreen;
