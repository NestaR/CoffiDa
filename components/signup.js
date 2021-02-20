import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, Alert, TouchableOpacity, AsyncStorage } from 'react-native';

class SignUpScreen extends Component{
  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };
  }
  state = {
    myFirstName: ""
  }
  handleFirstNameChange = (inputText) => {
    this.setState({ myFirstName: inputText })
  }
  state = {
    myLastName: ""
  }
  handleLastNameChange = (inputText) => {
    this.setState({ myLastName: inputText })
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

  userSignUp(){
    const navigation = this.props.navigation;
    const { storeFirstName }  = this.state ;
    const { storeLastName }  = this.state ;
    const { storeEmail }  = this.state ;
    const { storePassword }  = this.state ;
    return fetch("http://10.0.2.2:3333/api/1.0.0/user",
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: storeFirstName,
        last_name: storeLastName,
        email: storeEmail,
        password: storePassword,
      })
    })
    .then((response) => {
      Alert.alert("User Added!");
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
          <TextInput
            style={styles.input}
            onChangeText={storeFirstName => this.setState({storeFirstName})}
            placeholder="First Name:"
          />
          <TextInput
            style={styles.input}
            onChangeText={storeLastName => this.setState({storeLastName})}
            placeholder="Last Name:"
          />
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
            title="Sign Up"
            onPress={() => {
              this.userSignUp();
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
export default SignUpScreen;
