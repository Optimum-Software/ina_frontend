import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableHighlight
} from "react-native";
import { Icon } from "react-native-elements";
import ProjectApi from "../helpers/ProjectApi.js";
import Api from "../helpers/Api.js";
import Router from "../helpers/Router.js";
import Swiper from "react-native-deck-swiper";
import LinearGradient from "react-native-linear-gradient";
import { Toolbar } from "react-native-material-ui";

export default class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
      showDetails: false
    };
    ProjectApi.getAllProjects().then(response => {
      this.setState({cards: response['projects']})
    })
  }

  componentDidMount() {
    this.updateStack()
  }

  updateStack = () => {
    console.log("updating")
    ProjectApi.getAllProjects().then(response => {
      this.setState({cards: response['projects']})
    })
  }

  undoSwipe() {
    this.swiper.swipeBottom()
  }

  ignore() {
    this.swiper.swipeLeft()
  }

  startChat() {
    console.log("start chat")
  }

  like() {
    this.swiper.swipeRight()
  }

  renderCard = (card, index) => {
    if(card != null) {
      return (
        <View style={styles.card}>
        {!this.state.showDetails &&
          <ImageBackground
            source={{ uri: Api.getFileUrl(card.thumbnail) }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%",flexDirection: 'column',}}
            imageStyle={{ borderRadius: 20}}
          >
            <LinearGradient
              colors={["#00000000", "#000000cc"]}
              style={{
                width: "100%",
                height: "22%",
                marginTop: '127%',
                borderRadius: 20
              }}
            >
              <View style={styles.textField}>
                <Text style={[styles.text, {fontSize: 40}]}>{card.name}</Text>
                <Text style={[styles.text, {fontSize: 30}]}>Door {card.creator.firstName}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        }
        </View>
      )
    } 
  }

  onSwiped = (type) => {
    console.log(`on swiper ${type}`)
  }

  tapCard() {
    this.setState({showDetails: !this.showDetails})
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <Toolbar
          centerElement={this.state.title}
          iconSet="MaterialCommunityIcons"
          leftElement={"arrow-left"}
          onLeftElementPress={() => {
            Router.goBack(this.props.navigation);
          }}
          style={{container: {
            position: 'absolute',
            top:0,
            width: '100%',
          }}}
        />
        <Swiper
          backgroundColor= 'transparent'
          marginTop={60}
          marginBottom={70}
          containerStyle={{height: "100%"}}
          ref={swiper => {this.swiper = swiper}}
          onSwiped={() => this.onSwiped('general')}
          //onSwipedAll={this.updateStack}
          onSwipedLeft={() => this.onSwiped('left')}
          onSwipedRight={() => this.onSwiped('right')}
          onSwipedTop={() => this.onSwiped('top')}
          onSwipedBottom={() => this.onSwiped('bottom')}
          onTapCard={() => this.tapCard()}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={0}
          renderCard={this.renderCard}
          stackSeparation={15}
          overlayLabels={{
            left: {
              title: 'Negeer',
              style: {
                label: {
                  backgroundColor: 'red',
                  borderColor: 'red',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30
                }
              }
            },
            right: {
              title: 'Like',
              style: {
                label: {
                  backgroundColor: 'green',
                  borderColor: 'green',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            },
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          goBackToPreviousCardOnSwipeBottom={true}
          showSecondCard={false}
          verticalSwipe={false}
        />
        <View style={styles.footer}>
            <TouchableHighlight
              underlayColor="#efc137ad"
              style={[styles.bigButtonStyle, {backgroundColor: '#efc137'}]}
              onPress={() => this.undoSwipe()}
            >
              <Icon
                name="undo"
                type="font-awesome"
                iconStyle={{padding: 5}}
                size={50}
                color="white"/>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#f44336ad"
              style={[styles.bigButtonStyle, {backgroundColor: '#f44336'}]}
              onPress={() => this.ignore()}
            >
              <Icon
                name="close"
                type="font-awesome"
                iconStyle={{padding: 5}}
                size={50}
                color="white"/>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#03a9f4ad"
              style={[styles.bigButtonStyle, {backgroundColor: '#03a9f4'}]}
              onPress={() => this.startChat()}
            >
              <Icon
                name="message"
                size={50}
                iconStyle={{padding: 5}}
                color="white"/>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#64dd17ad"
              style={[styles.bigButtonStyle, {backgroundColor: '#64dd17'}]}
              onPress={() => this.like()}
            >
              <Icon
                name="heart-o"
                size={50}
                iconStyle={{padding: 5}}
                type="font-awesome"
                color="white"/>
            </TouchableHighlight>
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  card: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
  },
  textField: {
    flexDirection: 'column'
  },
  text: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'white'
  },
  bigButtonStyle: {
    borderRadius: 100,
    width: '20%',
    height: '90%',
  },
  smallButtonStyle: {
    borderRadius: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    height: '10%',
    position: 'absolute',
    bottom: 10,
  },
  header: {
    position: 'absolute',
    top: 10,
    width: '100%',
    height: '5%'
  }
});
