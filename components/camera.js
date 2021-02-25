import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, AsyncStorage, Alert, LogBox } from 'react-native';
import { RNCamera } from 'react-native-camera';
LogBox.ignoreAllLogs();
class CameraScreen extends Component {

  constructor(props) {
    super(props);
}
  getData = async () => {
    try {//get the users token from storage for authorisation when
      //uploading a picture
      const currentUser = await AsyncStorage.getItem('userkey')
      if (currentUser !== null) {
        const getToken = JSON.parse(currentUser);
        this.setState({ storeToken: getToken.token })
        this.getPhotoData();
      }
    } catch(e) {
      console.log("error reading value");
    }
  }
  getPhotoData = async () => {
    try {//get the location and review id that the user submitted in
      //the previous screen
      const loc = await AsyncStorage.getItem('photoloc')
      this.setState({ storeLocId: loc});
      console.log(loc);
      const rev = await AsyncStorage.getItem('photorev')
      this.setState({ storeRevId: rev});
      console.log(rev);
    } catch(e) {
      console.log("error reading value");
    }
  }
  componentDidMount(){//get the users token as soon as the components mounts
    this.getData();
  }
  sendToServer = (data) => {//passes the data of the image taken with the
    //camera to the server
    const { storeToken }  = this.state ;
    const { storeLocId }  = this.state ;
    const { storeRevId }  = this.state ;
    const navigation = this.props.navigation;
    console.log(data.uri);
    console.log(storeToken);
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+storeLocId+"/review/"+storeRevId+"/photo",
    {//sends a post request to the review of choice using the values stored in
      //asyncstorage
      method: 'POST',
      headers: { "Content-Type": "image/jpeg",
      "X-Authorization": storeToken
    },
    body: data//the data of the image taken
  })
    .then((response) => {//if succesful then the location is added to the
      //users favourites and is sent back to the main screen if chosen
      Alert.alert(
     'Success!',
     'Picture added! Would you like to go back to the main screen?',
     [
       {
         text: 'Yes',
         onPress: () => {navigation.navigate("Main");}
       },
       {
         text: 'No'
       }
     ])
    })
    .catch((error) => {
      console.error(error);
    });
  }
  takePicture = async() => {
    if (this.camera) {//when the button is pressed a picture will be taken
      //and the data will be passed to a function that can post the image
      //to the database
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.sendToServer(data);
    }
  }

  render() {
    return (
      <View style={styles.container} accessible={true}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
        />
        <View>
          <TouchableOpacity//when this button is pressed an image will be taken
            accessible={true}
            accessibilityLabel="Take Picture"
            accessibilityHint="Take a picture for a review"
            onPress={() => this.takePicture()}
            style={styles.capture}
           >
            <Text style={{ fontSize: 13,  textAlign: 'center' }}>
            CAPTURE
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    borderColor: 'black',
    margin: 4,
    alignSelf: 'stretch',
    backgroundColor: '#2196F3'
  }
});

export default CameraScreen
