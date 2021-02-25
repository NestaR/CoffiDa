import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native';

class MainScreen extends Component{
  state = {
    myToken: ""
  }
  getData = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('userkey')
      if (currentUser !== null) {
        const getToken = JSON.parse(currentUser);
        this.setState({ storeToken: getToken.token })
      }
    } catch(e) {
      console.log("error reading value");
    }
  }
  componentDidMount(){
    this.getData();
  }
  userLogout() {
    const { storeToken }  = this.state ;
    const navigation = this.props.navigation;
    console.log(storeToken);
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout",
    {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' ,
         "X-Authorization": storeToken
       }
     })
       .then((response) =>
       {
         Alert.alert("User has been logged out!")
         navigation.navigate('Home');
       })
       .catch((error) => {
         console.error(error);
       });
   }
  render(){
    const navigation = this.props.navigation;

    return(
        <View style={styles.container}>
        <TouchableOpacity
          onPress={() => Alert.alert(
          'Location',
          'Would you like to view a location or view the map?',
          [
            {
              text: 'Get Location',
              onPress: () => {navigation.navigate("Get Location")}
            },
            {
              text: 'Find Location',
              onPress: () => {navigation.navigate("Get Location")}
            },
            {
              text: 'View Map',
              onPress: () => {navigation.navigate("Map")}
            }
          ])}
          style={styles.buttonImageStyle}
        >
        <Image style={styles.buttonImageIconStyle}
          source={require('./globeicon.png')}
        />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {navigation.navigate('Photo');}}
          style={styles.buttonImageStyle}
        >
        <Image style={styles.buttonImageIconStyle}
          source={require('./cameraicon.png')}
        />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {navigation.navigate('User Info');}}
          style={styles.buttonImageStyle}
        >
        <Image style={styles.buttonImageIconStyle}
          source={require('./usericon.png')}
        />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert(
          'Review',
          'Would you like to make a new review or update/delete an existing one?',
          [
            {
              text: 'New Review',
              onPress: () => {navigation.navigate("New Review")}
            },
            {
              text: 'Update Review',
              onPress: () => {navigation.navigate("Update Review")}
            }
          ])}
          style={styles.buttonImageStyle}
        >
        <Image style={styles.buttonImageIconStyle}
          source={require('./reviewicon.png')}
        />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {this.userLogout();}}
          style={styles.buttonImageStyle}
        >
        <Image style={styles.buttonImageIconStyle}
          source={require('./exiticon.png')}
        />
        </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  buttonImageStyle: {
    backgroundColor: '#2196F3',
    borderRadius: 125 / 3,
    overflow: "hidden",
    borderWidth: 2,
    height: 135,
    margin: 5,
  },
  buttonImageIconStyle: {
    padding: 5,
    margin: 5,
    height: 125,
    width: 125,
    resizeMode: 'stretch',
  }
})
export default MainScreen;
