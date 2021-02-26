import React, { Component } from 'react'
import { View, Button, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native'

class SignUpScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  }

  userSignUp () { // stores the values of the users information in
    // state so it can be updated
    const navigation = this.props.navigation
    const { storeFirstName } = this.state
    const { storeLastName } = this.state
    const { storeEmail } = this.state
    const { storePassword } = this.state
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (storePassword.length <= 5) { // makes sure that the password is longer than
      // 5 characters
      Alert.alert('Please enter a password longer than 5 characters!')
    } else if (reg.test(storeEmail) === false) { // makes sure that the email entered is valid
      Alert.alert('Email is invalid!')
    } else {
      return fetch('http://10.0.2.2:3333/api/1.0.0/user',
        { // make a new account with the information entered
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name: storeFirstName,
            last_name: storeLastName,
            email: storeEmail,
            password: storePassword
          })
        })
        .then((response) => {
          Alert.alert('User Added!')
          navigation.navigate('Home')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  render () {
    const navigation = this.props.navigation
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={storeFirstName => this.setState({ storeFirstName })}
          placeholder='First Name:'
        />
        <TextInput
          style={styles.input}
          onChangeText={storeLastName => this.setState({ storeLastName })}
          placeholder='Last Name:'
        />
        <TextInput
          style={styles.input}
          onChangeText={storeEmail => this.setState({ storeEmail })}
          placeholder='Email:'
        />
        <TextInput
          style={styles.input}
          onChangeText={storePassword => this.setState({ storePassword })}
          placeholder='Password:'
          secureTextEntry
        />
        <TouchableOpacity style={styles.buttonStyle}>
          <Button
            title='Sign Up'
            onPress={() => {
              this.userSignUp()
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00FFFF'
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10
  },
  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10
  }
})
export default SignUpScreen
