import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Alert, AsyncStorage, TextInput, ScrollView, LogBox } from 'react-native';
import Filter from 'bad-words';
LogBox.ignoreAllLogs();
class NewReviewScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {//store all the values to be updated in state
      newLocId: "",
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
        //this.getUser();
      }
    } catch(e) {
      console.log("error reading value");
    }
  }
  componentDidMount(){
    this.getData();//get the users authorisation token on mount
  }
   newReview() {
     var filter = new Filter();//add a filter function to censor certain words
     const { storeToken }  = this.state ;
     const { storeLocId }  = this.state ;
     const { storeOverallRating }  = this.state ;
     const { storePriceRating }  = this.state ;
     const { storeQualityRating }  = this.state ;
     const { storeClenlinessRating }  = this.state ;
     const { storeReviewBody }  = this.state ;
     //list of words to be censored
     var newBadWords = ['tea', 'cake', 'cakes', 'pastry', 'pastries'];
     filter.addWords(...newBadWords);

     const navigation = this.props.navigation;
     //makes sure that only values between 0 and 5 are entered
     if (storeLocId > 0 && storeOverallRating >= 0 && storeOverallRating <= 5 && storePriceRating >= 0 && storePriceRating <= 5
     && storeQualityRating >= 0 && storeQualityRating <= 5 && storeClenlinessRating >= 0 && storeClenlinessRating <= 5)
       return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+storeLocId+"/review",
       {//Send a post request to add a new review with the values entered
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
            "X-Authorization": storeToken
          },
          body: JSON.stringify({
            overall_rating: parseInt(storeOverallRating),
            price_rating: parseInt(storePriceRating),
            quality_rating: parseInt(storeQualityRating),
            clenliness_rating: parseInt(storeClenlinessRating),
            review_body: filter.clean(storeReviewBody)//censor certain words
          })
        })
        .then((response) => {
          Alert.alert(
         'Success!',
         'Review created! Would you like to go back to the main screen?',
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
            Alert.alert("Please enter ratings between 0-5!")
          }
    }
  render(){
    const navigation = this.props.navigation;
    const { storeReviewBody } = this.state;
    return(
      <ScrollView style={styles.scrollView}>
        <View style={styles.container} accessible={true}>

        <Text>
        Location Id:
        </Text>
        <TextInput
        style={styles.inputNumber}
        numeric
        maxLength={1} //Limits the number of characters entered to 1
        keyboardType={'numeric'} //Opens a numeric keyboard so only numbers
        //can be entered
        onChangeText={storeLocId => this.setState({storeLocId})}
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

          <TouchableOpacity style={styles.buttonStyle}>
          <Button
            title="Send Review"
            disabled={!storeReviewBody}//disables the button if a review body
            //isn't entered
            onPress={() => {
              this.newReview();
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
    //flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  inputNumber: {
    width: 50,
    height: 39,
    borderWidth: 1,
    borderColor: 'black',
  },
  scrollView: {
    //marginHorizontal: 20,
    backgroundColor: 'orange'
  },
  inputReview: {
    width: 150,
    height: 90,
    borderWidth: 1,
    borderColor: 'black',
  }

})
export default NewReviewScreen;
