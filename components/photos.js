import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Image, Alert, AsyncStorage, TextInput } from 'react-native';

class PhotoScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      TextInputDisableStatus: false
    }
  }
  state = {
    myId: "",
    myFirstName: "",
    pic: ""
    //pic: require('./components/usericon.png'),
  }
  getData = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('userkey')
      if (currentUser !== null) {
        const getToken = JSON.parse(currentUser);
        this.setState({ storeId: getToken.id })
        this.setState({ storeToken: getToken.token })
      }
    } catch(e) {
      console.log("error reading value");
    }
  }
  componentDidMount(){
    this.getData();
  }
   updateInfo() {
     const { storeLocId }  = this.state ;
     const { storeRevId }  = this.state ;
     const { pic }  = this.state ;
     const navigation = this.props.navigation;
     //this.setState({ TextInputDisableStatus: false });
     console.log(storeLocId+storeRevId);
       return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+storeLocId+"/review/"+storeRevId+"/photo",
       {
            method: 'GET',
            headers: { 'Content-Type': 'image/png'
          }
        })
        .then((response) => {
          //Alert.alert("User has logged in!");
          this.setState({ pic: response });
          //this.setState({ pic: require(responseData) });
          Alert.alert("User Updated!");
        })
          .catch((error) => {
            console.error(error);
          });
    }
    deleteReview() {
      const { storeToken }  = this.state ;
      const { storeLocId }  = this.state ;
      const { storeRevId }  = this.state ;
      const navigation = this.props.navigation;
      if (storeLocId > 0 && storeRevId > 0)
        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+storeLocId+"/review/"+storeRevId,
        {
             method: 'Delete',
             headers: { 'Content-Type': 'application/json' ,
             "X-Authorization": storeToken
           }
         })
         .then((response) => {
           Alert.alert("Image Deleted!");
           navigation.navigate("Main");
         })
           .catch((error) => {
             console.error(error);
           });
           else
           {
             Alert.alert("Please enter valid numbers for the id")
           }
     }
  render(){
    const navigation = this.props.navigation;

    return(
        <View style={styles.container}>

          <Text>
          Location Id:
          </Text>
          <TextInput
          style={styles.input}
          onChangeText={storeLocId => this.setState({storeLocId})}
          >
          </TextInput>
          <Text>
          Review Id:
          </Text>
          <TextInput
          style={styles.input}
          onChangeText={storeRevId => this.setState({storeRevId})}
          >
          </TextInput>

          <TouchableOpacity style={styles.buttonStyle}>
          <Button
            title="Check"
            onPress={() => this.updateInfo()}
          />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
          <Button
            title="Delete Photo"
            //disabled={!storeReviewBody}
            onPress={() => {
              this.deleteReview();
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  tinyLogo: {
  width: 50,
  height: 50,
},
  input: {
    width: 50,
    height: 39,
    borderWidth: 1,
    borderColor: 'black',

  }
})
export default PhotoScreen;
