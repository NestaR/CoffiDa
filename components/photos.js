import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Image, Alert, AsyncStorage, TextInput } from 'react-native';

class PhotoScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      TextInputDisableStatus: false
    }
  }
  storePhotoLocation = async (locId) =>{
    const { storeRevId }  = this.state ;
    try {
    await AsyncStorage.setItem('photoloc', locId)
  } catch(e) {

  }
    this.storePhotoReview(storeRevId);
  }
  storePhotoReview = async (revId) =>{
    const navigation = this.props.navigation;
    try {
    await AsyncStorage.setItem('photorev', revId)
  } catch(e) {

  }
    navigation.navigate("Camera");
  }

  componentDidMount(){
  }
  render(){
    const { storeLocId }  = this.state ;
    const { storeRevId }  = this.state ;
    return(
        <View style={styles.container}>
          <Text>
            Enter the location and review id for the review you would like to add a picture to
          </Text>
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
          <View style={styles.space} />
          <TouchableOpacity style={styles.buttonStyle}>
          <Button
            title="Submit"
            disabled={!storeLocId}
            disabled={!storeRevId}
            onPress={() => this.storePhotoLocation(storeLocId)}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  space: {
    width: 10, // or whatever size you need
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
