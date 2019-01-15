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
  TouchableHighlight,
  Animated,
  TouchableOpacity,
  Easing,
  Dimensions,
  PixelRatio,
  TouchableWithoutFeedback
} from "react-native";
import { Fragment } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProjectApi from "../helpers/ProjectApi.js";
import Api from "../helpers/Api.js";
import Router from "../helpers/Router.js";
import User from "../helpers/User.js";
import CardStack, { Card } from "react-native-card-stack-swiper";
import LinearGradient from "react-native-linear-gradient";
import { Toolbar } from "react-native-material-ui";
import { ifIphoneX, isIphoneX } from "react-native-iphone-x-helper";

const { fullWidth, fullHeight } = Dimensions.get("window");

export default class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      swipedAllCards: false,
      swipeDirection: "",
      cardIndex: 0,
      showDetails: false
    };
    ProjectApi.getAllProjects().then(response => {
      this.setState({ cards: response["projects"] });
    });
    this.animatedValue = new Animated.Value(0);
    console.log(fullWidth);
  }

  componentDidMount() {
    this.updateStack();
  }

  updateStack = () => {
    ProjectApi.getAllProjects().then(response => {
      this.setState({ cards: response["projects"] });
      console.log(response);
    });
  };

  undoSwipe() {
    this.setState({ cardIndex: this.state.cardIndex - 1 });
  }

  ignore() {
    this.swiper.swipeLeft();
  }

  startChat() {
    User.getUserId().then(id => {
      let creatorId = this.state.cards[this.state.cardIndex].creator.id;
      let uid = "";
      if (creatorId > id) {
        uid = id + ":" + creatorId;
      } else {
        uid = creatorId + ":" + id;
      }
      let title =
        this.state.cards[this.state.cardIndex].creator.firstName +
        " " +
        this.state.cards[this.state.cardIndex].creator.lastName;
      Router.goTo(this.props.navigation, "ChatStack", "Chat", {
        uid: uid,
        title: title
      });
    });
  }

  addLike() {
    console.log("like");
  }

  like() {
    this.swiper.swipeRight();
  }

  animate() {
    //console.log(this.state);
    this.setState({
      showDetails: true
    });
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      extrapolate: "clamp"
    }).start();
  }

  animateRev() {
    this.setState({
      showDetails: false
    });
    this.animatedValue.setValue(1);
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      extrapolate: "clamp"
    }).start();
  }

  onSwiped = type => {
    this.setState({ cardIndex: this.state.cardIndex + 1 });
    switch (type) {
      case "right":
        this.addLike();
        break;
    }
  };

  tapCard() {
    this.setState({ showDetails: !this.showDetails });
  }

  render() {
    const height = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [
        isIphoneX()
          ? (Dimensions.get("window").height - 150) * 0.8
          : (Dimensions.get("window").height - 90) * 0.8,
        isIphoneX()
          ? (Dimensions.get("window").height - 150) * 0.6
          : (Dimensions.get("window").height - 90) * 0.6,
        isIphoneX()
          ? (Dimensions.get("window").height - 150) * 0.4
          : (Dimensions.get("window").height - 90) * 0.4
      ]
    });

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.9, 1],
      outputRange: [0, 0, 1]
    });

    const opacityRev = this.animatedValue.interpolate({
      inputRange: [0, 0, 1],
      outputRange: [1, 0, 0]
    });

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <Toolbar
          centerElement="Ontdekken"
          iconSet="MaterialCommunityIcons"
          leftElement={"arrow-left"}
          onLeftElementPress={() => {
            Router.goBack(this.props.navigation);
          }}
        />
          <CardStack
            style={styles.container}
            renderNoMoreCards={() => (
              <Text style={{ fontWeight: "700", fontSize: 18, color: "gray" }}>
                No more cards :(
              </Text>
            )}
            ref={swiper => {
              this.swiper = swiper;
            }}
            onSwiped={() => console.log("onSwiped")}
            onSwipedLeft={() => console.log("onSwipedLeft")}
          >
            {this.state.cards.map(card => {
              return (
                  <Card
                    elevation={5}
                    style={{
                      elevation: 5,
                      backgroundColor: "white",
                      shadowColor: "#000000",
                      shadowOpacity: 0.6,
                      shadowRadius: 2,
                      shadowOffset: {
                        height: 1,
                        width: 1
                      },
                      borderColor: "grey",
                      borderWidth: 0,
                      alignItems: "flex-end",
                      borderRadius: 15,
                      width: Dimensions.get("window").width - 20,
                      height: (Dimensions.get("window").height - 90) * 0.8,
                      ...ifIphoneX({
                        height: (Dimensions.get("window").height - 150) * 0.8
                      })
                    }}
                  >
                    <Animated.Image
                      style={{
                        height: height,
                        width: "100%",
                        resizeMode: "cover",
                        justifyContent: "center",
                        position: "absolute",
                        borderRadius: 15
                      }}
                      source={{
                        uri: Api.getFileUrl(card.thumbnail)
                      }}
                    />
                    <Animated.View
                      style={{
                        opacity: opacity,
                        top: 10,
                        left: 10,
                        position: "absolute",
                        zIndex: 3
                      }}
                      onPress={() => this.animateRev()}
                    >
                      <TouchableOpacity onPress={() => this.animateRev()}>
                        <Icon
                          name="close"
                          color="white"
                          size={30}
                          style={{}}
                          onPress={() => this.animateRev()}
                        />
                      </TouchableOpacity>
                    </Animated.View>
                    {this.state.showDetails && (
                      <Animated.View
                        style={{
                          flexDirection: "column",
                          padding: 15,
                          marginTop: isIphoneX()
                            ? (Dimensions.get("window").height - 150) * 0.4
                            : (Dimensions.get("window").height - 90) * 0.4,

                          opacity: opacity
                        }}
                      >
                        <Text
                          style={{
                            marginLeft: 10,
                            marginRight: 10,
                            fontSize: 24,
                            fontWeight: "bold"
                          }}
                          numberOfLines={1}
                        >
                          {card.name}
                        </Text>
                        <Text
                          style={{
                            marginLeft: 10,
                            marginRight: 10,
                            marginBottom: 10,
                            fontSize: 16,
                            fontWeight: "bold"
                          }}
                        >
                          {card.creator.firstName + " " + card.creator.lastName}
                        </Text>
                        <Text
                          style={{
                            margin: 10,
                            height: isIphoneX()
                              ? (Dimensions.get("window").height - 150) * 0.2
                              : (Dimensions.get("window").height - 90) * 0.2
                          }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Duis eleifend mauris ut sapien convallis, et
                          aliquet libero gravida. Maecenas varius feugiat purus
                          vitae porta. Vestibulum malesuada ultricies enim, vel
                          elementum quam dictum ut. Nunc nec nisi pretium,
                          cursus sem a, hendrerit ipsum.
                        </Text>
                      </Animated.View>
                    )}
                    <Animated.View
                      style={{
                        opacity: opacityRev,
                        width: "100%",
                        height: "100%",
                        alignItems: "flex-end",
                        justifyContent: "flex-end"
                      }}
                    >
                      <LinearGradient
                        colors={["#00000000", "#000000cc"]}
                        style={{
                          width: "100%",
                          height: "25%",
                          borderRadius: 15,
                          justifyContent: "flex-end"
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <View
                            style={{ flexDirection: "column", width: "85%" }}
                          >
                            <Text
                              style={{
                                marginLeft: 10,
                                marginRight: 10,
                                fontSize: 24,
                                fontWeight: "bold",
                                color: "white"
                              }}
                              numberOfLines={1}
                            >
                              {card.name}
                            </Text>
                            <Text
                              style={{
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10,
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "white"
                              }}
                            >
                              {card.creator.firstName +
                                " " +
                                card.creator.lastName}
                            </Text>
                          </View>

                          <Icon
                            name="information"
                            color="white"
                            size={30}
                            style={{ zIndex: 0, elevation: 5, }}
                            elevation={5}
                            onPress={() => this.animate()}
                          />
                        </View>
                      </LinearGradient>
                    </Animated.View>
                  </Card>
              );
            })}
          </CardStack>

          <View style={styles.footer}>
            <TouchableHighlight
              underlayColor="#efc137ad"
              style={[styles.mediumButtonStyle, { backgroundColor: "#efc137" }]}
              onPress={() => this.undoSwipe()}
            >
              <Icon
                name="undo"
                type="font-awesome"
                iconStyle={{ padding: 5 }}
                size={25}
                color="white"
              />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#f44336ad"
              style={[styles.bigButtonStyle, { backgroundColor: "#f44336" }]}
              onPress={() => this.ignore()}
            >
              <Icon
                name="close"
                type="font-awesome"
                iconStyle={{ padding: 5 }}
                size={35}
                color="white"
              />
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor="#64dd17ad"
              style={[styles.bigButtonStyle, { backgroundColor: "#64dd17" }]}
              onPress={() => this.like()}
            >
              <Icon
                name="heart-outline"
                size={35}
                iconStyle={{ padding: 5 }}
                type="font-awesome"
                color="white"
              />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#03a9f4ad"
              style={[styles.mediumButtonStyle, { backgroundColor: "#03a9f4" }]}
              onPress={() => this.startChat()}
            >
              <Icon
                name="message-outline"
                size={25}
                iconStyle={{ padding: 5 }}
                color="white"
              />
            </TouchableHighlight>
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginTop: 10
  },

  bigButtonStyle: {
    borderRadius: 100,
    width: Dimensions.get("window").height * 0.085,
    height: Dimensions.get("window").height * 0.085,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  mediumButtonStyle: {
    borderRadius: 100,
    width: Dimensions.get("window").height * 0.07,
    height: Dimensions.get("window").height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  footer: {
    paddingLeft: 25,
    paddingRight: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 25
  }
});
