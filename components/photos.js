import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Image, Alert, AsyncStorage, TextInput, LogBox } from 'react-native';
LogBox.ignoreAllLogs();
class PhotoScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      newLocId: 0,
      newRevId: 0,
    }
  }
  getData = async () => {
    try {//get the users authorisation token
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
  storePhotoLocation = async (locId) =>{
    const { storeRevId }  = this.state ;
    try {//store the id of location to be accessed in asyncstorage
    await AsyncStorage.setItem('photoloc', locId)
  } catch(e) {

  }
    this.storePhotoReview(storeRevId);
  }
  storePhotoReview = async (revId) =>{
    const navigation = this.props.navigation;
    try {//store id of review to be accessed in asyncstorage
    await AsyncStorage.setItem('photorev', revId)
  } catch(e) {

  }
    navigation.navigate("Camera");
  }
  deletePhoto() {
    const { storeToken }  = this.state ;
    const { storeLocId }  = this.state ;
    const { storeRevId }  = this.state ;
    const navigation = this.props.navigation;
    if (storeLocId > 0 && storeRevId > 0)
      return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+storeLocId+"/review/"+storeRevId+"/photo",
      {//using the location and review id provided send a delete request for
        //that photo
           method: 'Delete',
           headers: { 'Content-Type': 'application/json' ,
           "X-Authorization": storeToken
         }
       })
       .then((response) => {
         Alert.alert("Photo Deleted!");
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
  render() {
    const { storeLocId } = this.state;
    const { storeRevId } = this.state;
    return(
        <View style={styles.container}>
          <Text>
          Enter the location and review id for the review you would like to add a picture to or delete
          </Text>
          <Text>
          Location Id:
          </Text>
          <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          onChangeText={storeLocId => this.setState({storeLocId})}
          >
          </TextInput>
          <Text>
          Review Id:
          </Text>
          <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          onChangeText={storeRevId => this.setState({storeRevId})}
          >
          </TextInput>
          <View style={styles.space} />
          <TouchableOpacity style={styles.buttonStyle}>
          <Button
            title="Submit"
            disabled={!storeLocId}
            disabled={!storeRevId}//disables the button if no values are entered
            onPress={() => this.storePhotoLocation(storeLocId)}
          />
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity style={styles.buttonStyle}>
          <Button
            title="Delete"
            disabled={!storeLocId}
            disabled={!storeRevId}//disables the button if no values are entered
            onPress={() => this.deletePhoto()}
          />
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  space: {
    width: 10,
    height: 10,
  },
  input: {
    width: 50,
    height: 39,
    borderWidth: 1,
    borderColor: 'black',

  }
})
export default PhotoScreen;
