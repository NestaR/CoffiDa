import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Image, Alert, AsyncStorage, TextInput, ScrollView, FlatList } from 'react-native';

class GetLocationScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      getLocId: 0,
      getLocName: "",
      getLocTown: "",
      getLat: "",
      getLong: "",
      getPhotoPath: "",
      getAvgOverall: 0,
      getAvgPrice: 0,
      getAvgQuality: 0,
      getAvgClenliness: 0,
      getReviews: []
    }
  }

  getData = async () => {
    try {//get the users token from storage for authorisation when
      //uploading a picture
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
  componentDidMount(){//get the users token as soon as the components mounts
    this.getData();
  }
  storeLocationInfo = (locationId,locationName,locationTown,latitudeDisplay,
    longitudeDisplay,photoPath,avgOverall,avgPrice,avgQuality,
    avgClenliness, reviews) =>{//stores all the information of the location
    const USERINFO = {
      location_id: locationId,
      location_name: locationName,
      location_town: locationTown,
      latitude: latitudeDisplay,
      longitude: longitudeDisplay,
      photo_path: photoPath,
      avg_overall_rating: avgOverall,
      avg_price_rating: avgPrice,
      avg_quality_rating: avgQuality,
      avg_clenliness_rating: avgClenliness,
      location_reviews: reviews
    }
    this.setState({getLocId: locationId})
    this.setState({getLocName: locationName})
    this.setState({getLocTown: locationTown})
    this.setState({getLat: latitudeDisplay})
    this.setState({getLong: longitudeDisplay})
    this.setState({getPhotoPath: photoPath})
    this.setState({getAvgOverall: avgOverall})
    this.setState({getAvgPrice: avgPrice})
    this.setState({getAvgQuality: avgQuality})
    this.setState({getAvgClenliness: avgClenliness})
    this.setState({getReviews: reviews})
  }
  getLocation() {//when the user picks a location id all of the states are
    //updated to contain relevant information
    const { getLocId }  = this.state ;
    const { storeToken }  = this.state ;
    const navigation = this.props.navigation;
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+getLocId,
    {
         method: 'GET',
         headers: { 'Content-Type': 'application/json'}
     })
     .then((response) => response.json())
     .then((responseData) => {//response of the get request is passed to a
       //function that updates the state
       this.storeLocationInfo(responseData.location_id, responseData.location_name, responseData.location_town, responseData.latitude,
         responseData.longitude, responseData.photo_path, responseData.avg_overall_rating, responseData.avg_price_rating,
       responseData.avg_quality_rating, responseData.avg_clenliness_rating, responseData.location_reviews);
       })
       .catch((error) => {
         console.error(error);
       });
   }
   favouriteLocation() {//the user can favourite a location by pressing
     //a button once an id has been entered
     const { storeToken }  = this.state ;
     const { getLocId }  = this.state ;
     const navigation = this.props.navigation;
     if (getLocId > 0)//makes sure that the id is valid
       return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+getLocId+"/favourite/",
       {//sends a post request with the users location choice
            method: 'Post',
            headers: { 'Content-Type': 'application/json' ,
            "X-Authorization": storeToken
          }
        })
        .then((response) => {//if successful then the location is added to the
          //users favourites and is sent back to the main screen if chosen
          Alert.alert(
         'Success!',
         'Location added to favourites! Would you like to go back to the main screen?',
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
          else
          {//if an invalid value is entered an alert pops up
            Alert.alert("Please enter valid numbers for the id")
          }
    }
    unfavouriteLocation() {//function allows the user to remove a location
      //from their favourites
      const { storeToken }  = this.state ;
      const { getLocId }  = this.state ;
      const navigation = this.props.navigation;
      if (getLocId > 0)
        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+getLocId+"/favourite/",
        {//same as the favouriteLocation function but with delete instead
             method: 'Delete',
             headers: { 'Content-Type': 'application/json' ,
             "X-Authorization": storeToken
           }
         })
         .then((response) => {
           Alert.alert(
          'Success!',
          'Location removed from favourites! Would you like to go back to the main screen?',
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
           else
           {
             Alert.alert("Please enter valid numbers for the id")
           }
     }
  render(){
    const navigation = this.props.navigation;
    const { getLocId } = this.state;
    return(
      <ScrollView style={styles.scrollView}>
        <View style={styles.container} accessible={true}>
          <Text>
          Location Id:
          </Text>
          <TextInput style={styles.number}
          onChangeText={getLocId => this.setState({getLocId})}
          keyboardType={'numeric'}>
          {/*keyboard allows numbers only since only numbers are needed*/}
          </TextInput>
          <Text>
          Location Name:
          </Text>
          <Text style={styles.output}>
          {this.state.getLocName}
          </Text>

          <Text>
          Location Town:
          </Text>
          <Text style={styles.output}>
          {this.state.getLocTown}
          </Text>

          <Text>
          Latitude:
          </Text>
          <Text style={styles.output}>
          {this.state.getLat}
          </Text>

          <Text>
          Longitude:
          </Text>
          <Text style={styles.output}>
          {this.state.getLong}
          </Text>

          <Text>
          Photo Path:
          </Text>
          <Text style={styles.output}>
          {this.state.getPhotoPath}
          </Text>

          <Text>
          Average Overall Rating:
          </Text>
          <Text style={styles.output}>
          {this.state.getAvgOverall}
          </Text>

          <Text>
          Average Price Rating:
          </Text>
          <Text style={styles.output}>
          {this.state.getAvgPrice}
          </Text>

          <Text>
          Average Quality Rating:
          </Text>
          <Text style={styles.output}>
          {this.state.getAvgQuality}
          </Text>

          <Text>
          Average Clenliness:
          </Text>
          <Text style={styles.output}>
          {this.state.getAvgClenliness}
          </Text>
          <View style={styles.space} />

          <FlatList//buttons are disabled till a location id is entered
            data={this.state.getReviews}
            keyExtractor={({ review_id }, index) => review_id}
            renderItem={({ item }) => (
            <Text style={styles.output}>
            Review Id:
            {item.review_id},
            Overall Rating:
            {item.overall_rating},
            Price Rating:
            {item.price_rating},
            Quality Rating:
            {item.quality_rating},
            Clenliness Rating:
            {item.clenliness_rating},
            Review Body:
            {item.review_body},
            Likes:
            {item.likes}
            </Text>)}
            />
            <View style={styles.space} />
          <TouchableOpacity style={styles.buttonStyle}>
          <Button
            title="Get Location"
            accessibilityLabel="Get Location"
            accessibilityHint="Get location information"
            disabled={!getLocId}//buttons are disabled till
            //a location id is entered
            onPress={() => this.getLocation()}
          />
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity style={styles.buttonStyle}>
          <Button
            title="Favourite Location"
            accessibilityLabel="Favourite Location"
            accessibilityHint="Adds a location to your favourites"
            disabled={!getLocId}
            onPress={() => this.favouriteLocation()}
          />
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity style={styles.buttonStyle}>
          <Button
            title="Unfavourite Location"
            accessibilityLabel="Unfavourite location"
            accessibilityHint="Removes a location from your favourites"
            disabled={!getLocId}
            onPress={() => this.unfavouriteLocation()}
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
  number: {
    width: 40,
    height: 39,
    borderWidth: 1,
    borderColor: 'black',
  },
  space: {
    width: 10,
    height: 10,
  },
  scrollView: {
    backgroundColor: 'orange'
  },
})
export default GetLocationScreen;
