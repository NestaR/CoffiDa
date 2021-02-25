import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Alert, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';

async function requestLocationPermission(){
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {//request permission to acccess the users location
        title: 'Location Permission',
        message:
          'This app requires access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access location');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}

class MapScreen extends Component{
  static navigationOptions = {
      header: null
  }
  constructor(props){
    super(props);
    this.state = {
      location: null,
      locationPermission: false,
      isLoading: true
    }

  }

  findCoordinates(){
    console.log("state", this.state);
    if(!this.state.locationPermission){//if the location permission is
      //false then request permission

      this.state.locationPermission = requestLocationPermission();
    }

    Geolocation.getCurrentPosition((position) => {
        const location = position;
        console.log("LOCATION 1: ", location.coords);
        this.setState({location: {//get the users current location and stores
          //the longitude and latitude in state so the map will display
          //the users actual location
          longitude: location.coords.longitude,
          latitude: location.coords.latitude
        }});
        this.setState({ isLoading: false });
      }, (error) => {
        Alert.alert(error.message)
      }, {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      });
  }
  componentDidMount(){
    this.findCoordinates();//find the users coordinates on mount
  }

  render(){
    if(this.state.isLoading){
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }else{
      console.log("LOCATION 2: ", this.state.location);
      const navigation = this.props.navigation;
      return(
          <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude:this.state.location.latitude,
              longitude:this.state.location.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}
          >
            <Marker
              coordinate={this.state.location}
              title="My location"
              description="Here I am"
              />
            </MapView>
          </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 25
  },
  map: {
  ...StyleSheet.absoluteFillObject,
  }
})
export default MapScreen;
