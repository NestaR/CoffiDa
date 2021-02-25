import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, AsyncStorage, Alert, TextInput } from 'react-native';
import { RNCamera } from 'react-native-camera';

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    myToken: ""
  }
}
  getData = async () => {
    try {
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
    try {
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
  componentDidMount(){
    this.getData();

  }
  sendToServer = (data) => {
    const { storeToken }  = this.state ;
    const { storeLocId }  = this.state ;
    const { storeRevId }  = this.state ;
    const navigation = this.props.navigation;
    console.log(data.uri);
    console.log(storeToken);
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+storeLocId+"/review/"+storeRevId+"/photo",
    {
      method: 'POST',
      headers: { "Content-Type": "image/jpeg",
      "X-Authorization": storeToken
    },
    body: data
  })
    .then((response) => {
      Alert.alert("Picture Added!");
      navigation.navigate("Main");
    })
    .catch((error) => {
      console.error(error);
    });
  }
  takePicture = async() => {
    if (this.camera) {
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
          <TouchableOpacity
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
