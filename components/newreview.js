import React, { Component } from 'react';
import { Text, SafeAreaView, Button, StyleSheet, TouchableOpacity, Image, Alert, AsyncStorage, TextInput, ScrollView } from 'react-native';

class NewReviewScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      newLocId: "",
      newOverallRating: 0,
      newPriceRating: 0,
      newQualityRating: 0,
      newClenlinessRating: 0,
      newReviewBody: ""
    }
  }

  getData = async () => {
    try {
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
    this.getData();
  }
  // storeUserInfo = (uId,fname,lname,email,favlocations,userreviews,likedreviews) =>{
  //   const USERINFO = {
  //     loc_id: uId,
  //     overall_rating: fname,
  //     price_rating: lname,
  //     quality_rating: email,
  //     clenliness_rating: favlocations,
  //     review_body: userreviews,
  //   }
  //   this.setState({loc_id: uId})
  //   this.setState({overall_rating: fname})
  //   this.setState({price_rating: lname})
  //   this.setState({quality_rating: email})
  //   this.setState({cleanliness_rating: favlocations})
  //   this.setState({review_body: userreviews})
  // }
   newReview() {
     const { storeToken }  = this.state ;
     const { storeLocId }  = this.state ;
     const { storeOverallRating }  = this.state ;
     const { storePriceRating }  = this.state ;
     const { storeQualityRating }  = this.state ;
     const { storeClenlinessRating }  = this.state ;
     const { storeReviewBody }  = this.state ;
     const navigation = this.props.navigation;
     if (storeLocId > 0 && storeOverallRating >= 0 && storeOverallRating <= 5 && storePriceRating >= 0 && storePriceRating <= 5
     && storeQualityRating >= 0 && storeQualityRating <= 5 && storeClenlinessRating >= 0 && storeClenlinessRating <= 5)
       return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+storeLocId+"/review",
       {
            method: 'POST',
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
          Alert.alert("Review Created!");
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
  render(){
    const navigation = this.props.navigation;
    const { storeReviewBody } = this.state;
    return(
<ScrollView style={styles.scrollView}>
        <SafeAreaView style={styles.container}>

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
            disabled={!storeReviewBody}
            onPress={() => {
              this.newReview();
            }}
          />
          </TouchableOpacity>

        </SafeAreaView>
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
