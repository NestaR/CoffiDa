import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Image, Alert, AsyncStorage, TextInput, ScrollView } from 'react-native';

class UpdateReviewScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      newLocId: 0,
      newRevId: 0,
      newOverallRating: 0,
      newPriceRating: 0,
      newQualityRating: 0,
      newClenlinessRating: 0,
      newReviewBody: ""
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
   updateReview() {//store or the information in state so it can be updated
     const { storeToken }  = this.state ;
     const { storeLocId }  = this.state ;
     const { storeRevId }  = this.state ;
     const { storeOverallRating }  = this.state ;
     const { storePriceRating }  = this.state ;
     const { storeQualityRating }  = this.state ;
     const { storeClenlinessRating }  = this.state ;
     const { storeReviewBody }  = this.state ;
     const navigation = this.props.navigation;
     //make sure that the values entered are greater than 0 and less than 5
     if (storeLocId > 0 && storeRevId > 0 && storeOverallRating >= 0 && storeOverallRating <= 5 && storePriceRating >= 0 && storePriceRating <= 5
     && storeQualityRating >= 0 && storeQualityRating <= 5 && storeClenlinessRating >= 0 && storeClenlinessRating <= 5)
       return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+storeLocId+"/review/"+storeRevId,
       {//update a review with the information provided
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' ,
            "X-Authorization": storeToken
          },
          body: JSON.stringify({
            overall_rating: parseInt(storeOverallRating),
            price_rating: parseInt(storePriceRating),
            quality_rating: parseInt(storeQualityRating),
            clenliness_rating: parseInt(storeClenlinessRating),
            review_body: storeReviewBody
          })
        })
        .then((response) => {
          Alert.alert("Review Updated!");
          navigation.navigate("Main");
        })
          .catch((error) => {
            console.error(error);
          });
          else
          {
            Alert.alert("Please enter ratings between 0-5!")
          }
    }
    deleteReview() {
      const { storeToken }  = this.state ;
      const { storeLocId }  = this.state ;
      const { storeRevId }  = this.state ;
      const navigation = this.props.navigation;
      if (storeLocId > 0 && storeRevId > 0)
        return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+storeLocId+"/review/"+storeRevId,
        {//using the location and review id provided send a delete request for
          //that review
             method: 'Delete',
             headers: { 'Content-Type': 'application/json' ,
             "X-Authorization": storeToken
           }
         })
         .then((response) => {
           Alert.alert("Review Deleted!");
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
     likeReview() {
       const { storeToken }  = this.state ;
       const { storeLocId }  = this.state ;
       const { storeRevId }  = this.state ;
       const navigation = this.props.navigation;
       if (storeLocId > 0 && storeRevId > 0)
         return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+storeLocId+"/review/"+storeRevId+"/like",
         {//using the location and review id provided send a post request to
           //like that review
              method: 'Post',
              headers: { 'Content-Type': 'application/json' ,
              "X-Authorization": storeToken
            }
          })
          .then((response) => {
            Alert.alert("Review Liked!");
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
      dislikeReview() {
        const { storeToken }  = this.state ;
        const { storeLocId }  = this.state ;
        const { storeRevId }  = this.state ;
        const navigation = this.props.navigation;
        if (storeLocId > 0 && storeRevId > 0)
          return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+storeLocId+"/review/"+storeRevId+"/like",
          {//using the location and review id provided send a post request to
            //unlike that review
               method: 'Delete',
               headers: { 'Content-Type': 'application/json' ,
               "X-Authorization": storeToken
             }
           })
           .then((response) => {
             Alert.alert("Review Disliked!");
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
    const { storeReviewBody } = this.state;
    const { storeLocId } = this.state;
    const { storeRevId } = this.state;
    return(
      <ScrollView style={styles.scrollView}>
        <View style={styles.container} accessible={true}>

        <Text>
        Location Id:
        </Text>
        <TextInput
        style={styles.inputNumber}
        numeric
        maxLength={1} // This prop makes the input to get numeric only
        keyboardType={'numeric'} // This prop help to open numeric keyboard
        onChangeText={storeLocId => this.setState({storeLocId})}
        >
        </TextInput>
        <Text>
        Review Id:
        </Text>
        <TextInput
        style={styles.inputNumber}
        numeric
        maxLength={2} // This prop makes the input to get numeric only
        keyboardType={'numeric'} // This prop help to open numeric keyboard
        onChangeText={storeRevId => this.setState({storeRevId})}
        >
        </TextInput>
          <Text>
          Overall Rating:
          </Text>
          <TextInput
          style={styles.inputNumber}
          maxLength={1}
          numeric
          keyboardType={'numeric'}
          onChangeText={storeOverallRating => this.setState({storeOverallRating})}
          >
          </TextInput>

          <Text>
          Price Rating:
          </Text>
          <TextInput
          style={styles.inputNumber}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={storePriceRating => this.setState({storePriceRating})}
          >
          </TextInput>

          <Text>
          Quality Rating:
          </Text>
          <TextInput
          style={styles.inputNumber}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={storeQualityRating => this.setState({storeQualityRating})}
          >
          </TextInput>

          <Text>
          Clenliness Rating:
          </Text>
          <TextInput
          style={styles.inputNumber}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={storeClenlinessRating => this.setState({storeClenlinessRating})}
          >
          </TextInput>

          <Text>
          Review:
          </Text>
          <TextInput
          style={styles.inputReview}
          multiline={true}
          onChangeText={storeReviewBody => this.setState({storeReviewBody})}
          >
          </TextInput>
          </View>

          <View style={styles.container2}>
            <TouchableOpacity >
            <Button
              title="Update Review"
              disabled={!storeLocId}
              disabled={!storeRevId}
              disabled={!storeReviewBody}//if no values are entered the button is disabled
              accessibilityLabel="Update Review"
              accessibilityHint="Update a review"
              onPress={() => {
                this.updateReview();
              }}
            />
            </TouchableOpacity>
             <View style={styles.space} />
            <TouchableOpacity>
            <Button
              title="Delete Review"
              disabled={!storeLocId}
              disabled={!storeRevId}
              accessibilityLabel="Delete Review"
              accessibilityHint="Delete a review"
              onPress={() => Alert.alert(
                'Delete Review',
                'Are you sure you would like to delete this review?',
                [
                  {
                    text: 'No',
                    onPress: () => {navigation.navigate("Update Review")}
                  },
                  {
                    text: 'Yes',
                      onPress: () => {this.deleteReview();}
                    }
                  ])}
                  />
            </TouchableOpacity>
          </View>

          <View style={styles.container2}>
            <TouchableOpacity>
            <Button
              title="Like Review"
              disabled={!storeLocId}
              disabled={!storeRevId}
              accessibilityLabel="Like Review"
              accessibilityHint="Like a review"
              onPress={() => {
                this.likeReview();
              }}
            />
            </TouchableOpacity>
             <View style={styles.space} />
            <TouchableOpacity>
            <Button
              title="Dislike Review"
              disabled={!storeLocId}
              disabled={!storeRevId}
              accessibilityLabel="Dislike Review"
              accessibilityHint="Dislike a review"
              onPress={() => {
                this.dislikeReview();
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
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  container2: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  space: {
    width: 10,
    height: 10,
  },
  inputNumber: {
    width: 50,
    height: 39,
    borderWidth: 1,
    borderColor: 'black',
  },
  scrollView: {
    backgroundColor: 'orange'
  },
  inputReview: {
    width: 150,
    height: 90,
    borderWidth: 1,
    borderColor: 'black',
  }

})
export default UpdateReviewScreen;
