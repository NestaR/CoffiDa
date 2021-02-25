import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, AsyncStorage, TextInput, FlatList, LogBox } from 'react-native';
LogBox.ignoreAllLogs();
class UserScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      TextInputDisableStatus: false,
      myId: "",
      myFirstName: "",
      myLastName: "",
      myEmail: "",
      myPassword: "",
      myFavouriteLocations: [],
      myReviews: [],
      myLikedReviews: []
    }
  }
  getData = async () => {
    try {//get a users authorisation token
      const currentUser = await AsyncStorage.getItem('userkey')
      if (currentUser !== null) {
        const getToken = JSON.parse(currentUser);
        this.setState({ storeId: getToken.id })
        this.setState({ storeToken: getToken.token })
        this.getUser();
      }
    } catch(e) {
      console.log("error reading value");
    }
  }
  componentDidMount(){
    this.getData();//get the users authorisation token on mount
  }
  storeUserInfo = (uId,fname,lname,email,favlocations,userreviews,likedreviews) =>{
    const USERINFO = {
      user_id: uId,
      first_name: fname,
      last_name: lname,
      email: email,
      favourite_locations: favlocations,
      reviews: userreviews,
      liked_reviews: likedreviews
    }
    //store values in state to be updated
    this.setState({myId: uId})
    this.setState({myFirstName: fname})
    this.setState({myLastName: lname})
    this.setState({myEmail: email})
    this.setState({myFavouriteLocations: favlocations})
    this.setState({myReviews: userreviews})
    this.setState({myLikedReviews: likedreviews})
  }
  getUser() {
    const { storeId }  = this.state ;
    const { storeToken }  = this.state ;
    const navigation = this.props.navigation;
    console.log(storeToken);
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+storeId,
    {//send a request using the users id and token to get their information
         method: 'GET',
         headers: { 'Content-Type': 'application/json' ,
         "X-Authorization": storeToken
       }
     })
     .then((response) => response.json())
     .then((responseData) => {//update the state with their information
       this.storeUserInfo(responseData.user_id, responseData.first_name, responseData.last_name, responseData.email,
         responseData.favourite_locations, responseData.review, responseData.liked_reviews);
       })
       .catch((error) => {
         console.error(error);
       });
   }
   updateInfo() {
     const { storeId }  = this.state ;
     const { storeToken }  = this.state ;
     const { storeFirstName }  = this.state ;
     const { storeLastName }  = this.state ;
     const { storeEmail }  = this.state ;
     const { storePassword }  = this.state ;
     const navigation = this.props.navigation;
     console.log(storeFirstName);
     this.setState({ TextInputDisableStatus: false });

       return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+storeId,
       {//update users information with new values entered
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' ,
            "X-Authorization": storeToken
          },
          body: JSON.stringify({
            first_name: storeFirstName,
            last_name: storeLastName,
            email: storeEmail,
            password: storePassword,
          })
        })
        .then((response) => {
          Alert.alert("User Updated!");
        })
          .catch((error) => {
            console.error(error);
          });
    }
  render(){
    const navigation = this.props.navigation;

    return(
      <ScrollView style={styles.scrollView}>
        <View style={styles.container} accessible={true}>
          <Text>
          First Name:
          </Text>
          <TextInput
          style={styles.input}
          editable={this.state.TextInputDisableStatus}
          onChangeText={storeFirstName => this.setState({storeFirstName})}
          >
          {this.state.myFirstName}
          </TextInput>

          <Text>
          Last Name:
          </Text>
          <TextInput
          style={styles.input}
          editable={this.state.TextInputDisableStatus}
          onChangeText={storeLastName => this.setState({storeLastName})}
          >
          {this.state.myLastName}
          </TextInput>

          <Text>
          Email:
          </Text>
          <TextInput
          style={styles.input}
          editable={this.state.TextInputDisableStatus}
          onChangeText={storeEmail => this.setState({storeEmail})}
          >
          {this.state.myEmail}
          </TextInput>

          <Text>
          Password:
          </Text>
          <TextInput
          style={styles.input}
          editable={this.state.TextInputDisableStatus}
          onChangeText={storePassword => this.setState({storePassword})}
          secureTextEntry={true}
          >
          </TextInput>
          <View style={styles.space} />
          <TouchableOpacity style={styles.buttonStyle}>
          <Button
            title={this.state.TextInputDisableStatus ? "Confirm Update" : "Update Info"}
            onPress={() => { this.state.TextInputDisableStatus
              ? this.updateInfo()
              : this.setState({ TextInputDisableStatus: true })
            }}
          />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  output: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  scrollView: {
    backgroundColor: 'orange'
  },
  space: {
    width: 10, // or whatever size you need
    height: 10,
  },
  input: {
    width: 150,
    height: 39,
    borderWidth: 1,
    borderColor: 'black',

  }
})
export default UserScreen;
