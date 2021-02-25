import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Image, Alert, AsyncStorage, TextInput, ScrollView, FlatList } from 'react-native';

class LocationScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      getLocId: "",
      getLocName: "",
      getLocTown: "",
      getLat: "",
      getLong: "",
      getPhotoPath: "",
      getAvgOverall: "",
      getAvgPrice: "",
      getAvgQuality: "",
      getAvgClenliness: "",
      getReviews: []
    }
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
  storeLocationInfo = (locationId,locationName,locationTown,latitudeDisplay,longitudeDisplay,photoPath,
    avgOverall,avgPrice,avgQuality,avgClenliness, reviews) =>{
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
  getLocation() {
    const { getLocId }  = this.state ;
    const { storeToken }  = this.state ;
    const navigation = this.props.navigation;
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+getLocId,
    {
         method: 'GET',
         headers: { 'Content-Type': 'application/json'}
     })
     .then((response) => response.json())
     .then((responseData) => {
       this.storeLocationInfo(responseData.location_id, responseData.location_name, responseData.location_town, responseData.latitude,
         responseData.longitude, responseData.photo_path, responseData.avg_overall_rating, responseData.avg_price_rating,
       responseData.avg_quality_rating, responseData.avg_clenliness_rating, responseData.location_reviews);
       })
       .catch((error) => {
         console.error(error);
       });
   }
   favouriteLocation() {
     const { storeToken }  = this.state ;
     const { getLocId }  = this.state ;
     const navigation = this.props.navigation;
     if (getLocId > 0)
       return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+getLocId+"/favourite/",
       {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' ,
            "X-Authorization": storeToken
          }
        })
        .then((response) => {
          Alert.alert("Location added to favourites!");
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
    unfavouriteLocation() {
      const { storeToken }  = this.state ;
      const { getLocId }  = this.state ;
      const navigation = this.props.navigation;
      if (getLocId > 0)
        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+getLocId+"/favourite/",
        {
             method: 'Delete',
             headers: { 'Content-Type': 'application/json' ,
             "X-Authorization": storeToken
           }
         })
         .then((response) => {
           Alert.alert("Location removed from favourites!");
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
      <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text>
        Location Id:
        </Text>
        <TextInput style={styles.number} onChangeText={getLocId => this.setState({getLocId})} keyboardType={'numeric'}>
        {this.state.getLocId}
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
        <FlatList
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
          onPress={() => this.getLocation()}
        />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
        <Button
          title="Favourite Location"
          onPress={() => this.favouriteLocation()}
        />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
        <Button
          title="Unfavourite Location"
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
    width: 10, // or whatever size you need
    height: 10,
  },
  scrollView: {
    backgroundColor: 'orange'
  },
})
export default LocationScreen;
