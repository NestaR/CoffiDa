import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, Alert, TouchableOpacity, AsyncStorage } from 'react-native';

class LoginScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  storeUserID = async (uId,uToken) =>{
    const USERLOGIN = {//create an object for asyncstorage
    id: uId,
    token: uToken,
  }
    //store the users authorisation token in asyncstorage
    await AsyncStorage.setItem('userkey', JSON.stringify(USERLOGIN));

  }
   userLogin() {
      const navigation = this.props.navigation;
      const { storeEmail }  = this.state ;
      const { storePassword }  = this.state ;
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(reg.test(storeEmail) === false){//makes sure that the email a user
        //is entering is valid
        Alert.alert("Email is invalid!")
      }
      else if(storePassword.length <= 5){//makes sure that the password is
        //greater than 5 characters
        Alert.alert("Please enter a password longer than 5 characters!")
      }
      else
      {//send the email and password to the database to login
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/login",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: storeEmail,
            password: storePassword,
          })
        })
        .then((response) => response.json())
        .then((responseData) => {//store the users authorisation token for
          //future use
        this.storeUserID(responseData.id, responseData.token);
          navigation.navigate('Main');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  render(){
    return(
        <View style={styles.container} accessible={true}>
          <TextInput
            style={styles.input}
            keyboardType={'email-address'}
            onChangeText={storeEmail => this.setState({storeEmail})}
            placeholder="Email:"
          />
          <TextInput
            style={styles.input}
            onChangeText={storePassword => this.setState({storePassword})}
            placeholder="Password:"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.buttonStyle}>
          <Button
            title="Log In"
            accessibilityLabel="Log In"
            accessibilityHint="Logs the user in"
            onPress={() => {this.userLogin();}}
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
    backgroundColor: '#00FFFF',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign:'center',
    fontWeight:'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
})
export default LoginScreen;
