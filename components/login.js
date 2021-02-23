import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, Alert, TouchableOpacity, AsyncStorage } from 'react-native';

class LoginScreen extends Component{
  static navigationOptions = {
      header: null

  }
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  state = {
    myEmail: ""
  }
  SampleFunction1(StringHolder){
      Alert.alert(StringHolder);
    }
  handleUsernameChange = (inputText) => {
    this.setState({ myEmail: inputText })
  }
  state = {
    myPassword: ""
  }
  handlePasswordChange = (inputText) => {
    this.setState({ myPassword: inputText })
  }

  storeUserID = async (uId,uToken) =>{


    const USERLOGIN = {
    id: uId,
    token: uToken,
  }

    await AsyncStorage.setItem('userkey', JSON.stringify(USERLOGIN))
    const currentUser = await AsyncStorage.getItem('userkey')
    console.log(currentUser);

  }
   userLogin() {

      const navigation = this.props.navigation;
      const { storeEmail }  = this.state ;
      const { storePassword }  = this.state ;
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
        .then((responseData) => {
          //Alert.alert("User has logged in!");
        this.storeUserID(responseData.id, responseData.token);
          navigation.navigate('Main');

        })
        .catch((error) => {
          console.error(error);
        });
    }
  render(){
    const navigation = this.props.navigation;
    return(
        <View style={styles.container}>
          <TextInput
            style={styles.input}
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
            onPress={() => {
              this.userLogin();
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
