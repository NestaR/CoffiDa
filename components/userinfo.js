import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Image, Alert, AsyncStorage, TextInput } from 'react-native';

class UserScreen extends Component{
  constructor(props) {
    super(props);
    this.state = { TextInputDisableStatus: false }
  }
  state = {
    myId: "Nothing yet",
    myFirstName: "Nothing yet",
    myLastName: "Nothing yet",
    myEmail: "Nothing yet",
    myPassword: "",
    myFavouriteLocations: "Nothing yet",
    myReviews: "Nothing yet",
    myLikedReviews: "Nothing yet"
  }
  getData = async () => {
    try {
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
    this.getData();
  }
  storeUserID = (uId,fname,lname,email,favlocations,userreviews,likedreviews) =>{
    const USERINFO = {
      user_id: uId,
      first_name: fname,
      last_name: lname,
      email: email,
      favourite_locations: favlocations,
      reviews: userreviews,
      liked_reviews: likedreviews
    }
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
    {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' ,
         "X-Authorization": storeToken
       }
     })
     .then((response) => response.json())
     .then((responseData) => {
       this.storeUserID(responseData.user_id, responseData.first_name, responseData.last_name, responseData.email,
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
       {
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
        <View style={styles.container}>
          <Text>
          User Id:
          </Text>
          <TextInput
          style={styles.input}
          editable={false}
          >
          {this.state.myId}
          </TextInput>

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

          <Text>
            Favourite Locations: {this.state.myFavouriteLocations}
          </Text>
          <Text>
            My Reviews: {this.state.myReviews}
          </Text>
          <Text>
            Liked Reviews: {this.state.myLikedReviews}
          </Text>
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
  input: {
    width: 150,
    height: 39,
    borderWidth: 1,
    borderColor: 'black',

  }
})
export default UserScreen;
