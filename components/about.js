import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

class AboutScreen extends Component{
  static navigationOptions = {
      header: null
  }
  render(){
    const navigation = this.props.navigation;

    return(
        <View style={styles.container}>
          <Text style={styles.text}>About</Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
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
export default AboutScreen;
