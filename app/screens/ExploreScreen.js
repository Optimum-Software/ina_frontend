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
import FirebaseApi from "../helpers/FirebaseApi";
import Api from "../helpers/Api.js";
import Router from "../helpers/Router.js";
import User from "../helpers/User.js";
import Card from "../swipe-plugin/Card.js";
import CardStack from "../swipe-plugin/CardStack.js";
import LinearGradient from "react-native-linear-gradient";
import { Toolbar } from "react-native-material-ui";
import { ifIphoneX, isIphoneX } from "react-native-iphone-x-helper";
import TimerMixin from "react-timer-mixin";

const { fullWidth, fullHeight } = Dimensions.get("window");

export default class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      swipedAllCards: false,
      swipeDirection: "",
      cardIndex: 0,
      showDetails: false,
      left: false,
      right: false
    };
    User.getUserId().then(id => {
      ProjectApi.getSwipeProjects(id).then(response => {
        this.setState({ cards: response["projects"] });
      });
    });
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.updateStack();
    this.props.navigation.addListener("willFocus", this.updateStack);
  }

  updateStack = () => {
    User.getUserId().then(id => {
      ProjectApi.getSwipeProjects(id).then(response => {
        this.setState({ cards: response["projects"] });
        setTimeout(() => this.swiper.triggerRight(), 2000);
      });
    });
  };

  startChat() {
    User.getUserId().then(id => {
      let creatorId = this.state.cards[this.swiper.state.sindex - 2].creator.id;
      let uid = "";
      if (creatorId > id) {
        uid = id + ":" + creatorId;
      } else {
        uid = creatorId + ":" + id;
      }
      let title =
        this.state.cards[this.swiper.state.sindex - 2].creator.firstName +
        " " +
        this.state.cards[this.swiper.state.sindex - 2].creator.lastName;
      FirebaseApi.createChat(uid);
      Router.goTo(this.props.navigation, "ChatStack", "Chat", {
        uid: uid,
        title: title,
        differentStack: true
      });
    });
  }

  addLike(index) {
    User.getUserId().then(id => {
      ProjectApi.likeProject(this.state.cards[index].id, id).then(res =>
        console.log(res)
      );
    });
    this.setState({ swipeDirection: "right", cardIndex: index + 1 });
  }

  dislike(index) {
    this.setState({ swipeDirection: "left", cardIndex: index + 1 });
  }

  animate() {
    //console.log(this.state);
    this.setState({
      showDetails: true
    });
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 250,
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
      duration: 250,
      easing: Easing.ease,
      extrapolate: "clamp"
    }).start();
  }

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
          ? (Dimensions.get("window").height - 150) * 0.7
          : (Dimensions.get("window").height - 90) * 0.7,
        isIphoneX()
          ? (Dimensions.get("window").height - 150) * 0.6
          : (Dimensions.get("window").height - 90) * 0.6
      ]
    });

    const width = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        Dimensions.get("window").width * 0.95,
        Dimensions.get("window").width
      ]
    });

    const marginBottom = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0,
        isIphoneX()
          ? (Dimensions.get("window").height - 150) * 0.4
          : (Dimensions.get("window").height - 90) * 0.4
      ]
    });

    const detailTop = this.animatedValue.interpolate({
      inputRange: [0, 0.25, 1],
      outputRange: [
        Dimensions.get("window").height - 90,
        (Dimensions.get("window").height - 90) * 0.75,
        (Dimensions.get("window").height - 90) * 0.5
      ]
    });

    const fabSize = this.animatedValue.interpolate({
      inputRange: [0, 0.85, 1],
      outputRange: [0, 0, 60]
    });

    const marginTop = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 0]
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
          verticalSwipe={false}
          onSwipeStart={e => console.log(e)}
          swipeRight={() => this.setState({ right: true })}
          horizontalSwipe={!this.state.showDetails ? true : false}
          renderNoMoreCards={() => (
            <View
              style={{
                height: Dimensions.get("window").height,
                width: Dimensions.get("window").width,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 18,
                  color: "gray",
                  alignSelf: "center"
                }}
              >
                Er zijn geen nieuwe projecten
              </Text>
            </View>
          )}
          ref={swiper => {
            this.swiper = swiper;
          }}
          onSwipedRight={index => this.addLike(index)}
          onSwipedLeft={index => this.dislike(index)}
        >
          {this.state.cards.map(card => {
            return (
              <TouchableWithoutFeedback
                key={card.id}
                style={{ backgroundColor: "black" }}
                onPress={() => (this.state.showDetails ? null : this.animate())}
              >
                <Animated.View style={{ marginTop: marginTop }}>
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
                      alignItems: "center",
                      borderRadius: 15,
                      width: Dimensions.get("window").width - 20,
                      height: (Dimensions.get("window").height - 90) * 0.8,
                      ...ifIphoneX({
                        height: (Dimensions.get("window").height - 150) * 0.8
                      })
                    }}
                  >
                    {this.state.left && (
                      <View
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          elevation: 5,
                          width: 150,
                          height: 150,
                          backgroundColor: "red"
                        }}
                      />
                    )}
                    {this.state.right && (
                      <View
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          elevation: 5,
                          width: 150,
                          height: 150,
                          backgroundColor: "green"
                        }}
                      />
                    )}

                    <Animated.Image
                      style={{
                        height: height,
                        width: width,
                        resizeMode: "cover",
                        justifyContent: "center",
                        position: "absolute",
                        borderRadius: marginTop
                      }}
                      source={{
                        uri: Api.getFileUrl(card.thumbnail)
                      }}
                    />

                    {!this.state.showDetails && (
                      <Animated.View
                        style={{
                          width: "100%",
                          height: "100%",
                          opacity: opacityRev,
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
                            <Animated.View
                              style={{
                                flexDirection: "column",
                                width: "85%"
                              }}
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
                            </Animated.View>

                            <Icon
                              name="information"
                              color="white"
                              size={30}
                              style={{ zIndex: 0, elevation: 5 }}
                              elevation={5}
                              onPress={() => this.animate()}
                            />
                          </View>
                          <Text
                            numberOfLines={2}
                            style={{
                              color: "white",
                              paddingLeft: 22,
                              paddingRight: 40,
                              paddingBottom: 15
                            }}
                          >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Duis eleifend mauris ut sapien convallis, et
                            aliquet libero gravida. Maecenas varius feugiat
                            purus vitae porta. Vestibulum malesuada ultricies
                            enim, vel elementum quam dictum ut. Nunc nec nisi
                            pretium, cursus sem a, hendrerit ipsum.
                          </Text>
                        </LinearGradient>
                      </Animated.View>
                    )}
                    <Animated.View
                      style={{
                        backgroundColor: "white",
                        width: Dimensions.get("window").width,
                        position: "absolute",
                        top: detailTop,
                        padding: 25,
                        alignItems: "center"
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Animated.View
                          style={{
                            flexDirection: "column",
                            width: "100%"
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
                            {card.creator.firstName +
                              " " +
                              card.creator.lastName}
                          </Text>
                        </Animated.View>
                      </View>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: "#b5babf",
                          marginTop: 15,
                          marginBottom: 15,
                          width: "95%",
                          alignSelf: "center"
                        }}
                      />
                      <Text
                        style={{
                          width: Dimensions.get("window").width - 75,
                          height: Dimensions.get("window").height
                        }}
                      >
                        {card.desc.substring(0, 225)}
                      </Text>
                    </Animated.View>
                    <Animated.View
                      style={{
                        backgroundColor: "#00a6ff",
                        height: fabSize,
                        width: fabSize,
                        borderRadius: 60,
                        position: "absolute",
                        top: (Dimensions.get("window").height - 90) * 0.5 - 30,
                        right: 25,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Icon
                        name="arrow-down-bold-outline"
                        type="font-awesome"
                        iconStyle={{ padding: 5 }}
                        size={25}
                        color="white"
                        onPress={() => this.animateRev()}
                      />
                    </Animated.View>
                  </Card>
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          })}
        </CardStack>

        {this.state.showDetails && (
          <TouchableOpacity
            style={{
              position: "absolute",
              width: "100%",
              bottom: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() =>
              Router.goTo(
                this.props.navigation,
                "HomeStack",
                "ProjectDetailScreen",
                {
                  id: this.state.cards[this.swiper.state.sindex - 2].id,
                  name: this.state.cards[this.swiper.state.sindex - 2].name,
                  desc: this.state.cards[this.swiper.state.sindex - 2].desc,
                  start_date: this.state.cards[this.swiper.state.sindex - 2].start_date,
                  end_date: this.state.cards[this.swiper.state.sindex - 2].end_date,
                  created_at: this.state.cards[this.swiper.state.sindex - 2].created_at,
                  like_count: this.state.cards[this.swiper.state.sindex - 2].like_count,
                  follower_count: this.state.cards[this.swiper.state.sindex - 2]
                    .follower_count,
                  location: this.state.cards[this.swiper.state.sindex - 2].location,
                  thumbnail: Api.getFileUrl(
                    this.state.cards[this.swiper.state.sindex - 2].thumbnail
                  ),
                  creator: this.state.cards[this.swiper.state.sindex - 2].creator,
                  images: this.state.cards[this.swiper.state.sindex - 2].images,
                  files: this.state.cards[this.swiper.state.sindex - 2].files,
                  liked: this.state.cards[this.swiper.state.sindex - 2].liked,
                  member: this.state.cards[this.swiper.state.sindex - 2].member,
                  followed: this.state.cards[this.swiper.state.sindex - 2].followed
                }
              )
            }
          >
            <Text
              style={{
                paddingTop: 25,
                fontSize: 18,
                fontWeight: "bold",
                color: "#00a6ff"
              }}
            >
              Meer informatie
            </Text>
          </TouchableOpacity>
        )}
        {!this.state.showDetails && (
          <View style={styles.footer}>
            <Animated.View style={{ opacity: opacityRev }}>
              <TouchableHighlight
                underlayColor="#efc137ad"
                style={[
                  styles.mediumButtonStyle,
                  { backgroundColor: "#efc137" }
                ]}
                onPress={() =>
                  this.state.swipeDirection == "right"
                    ? this.swiper.goBackFromRight(
                        this.state.cards[this.state.cardIndex].id - 1
                      )
                    : this.swiper.goBackFromLeft()
                }
              >
                <Icon
                  name="undo"
                  type="font-awesome"
                  iconStyle={{ padding: 5 }}
                  size={25}
                  color="white"
                />
              </TouchableHighlight>
            </Animated.View>
            <Animated.View style={{ opacity: opacityRev }}>
              <TouchableHighlight
                underlayColor="#f44336ad"
                style={[styles.bigButtonStyle, { backgroundColor: "#f44336" }]}
                onPress={() => this.swiper.swipeLeft()}
              >
                <Icon
                  name="close"
                  type="font-awesome"
                  iconStyle={{ padding: 5 }}
                  size={35}
                  color="white"
                />
              </TouchableHighlight>
            </Animated.View>
            <Animated.View style={{ opacity: opacityRev }}>
              <TouchableHighlight
                underlayColor="#64dd17ad"
                style={[styles.bigButtonStyle, { backgroundColor: "#64dd17" }]}
                onPress={() => this.swiper.swipeRight()}
              >
                <Icon
                  name="heart-outline"
                  size={35}
                  iconStyle={{ padding: 5 }}
                  type="font-awesome"
                  color="white"
                />
              </TouchableHighlight>
            </Animated.View>
            <Animated.View style={{ opacity: opacityRev }}>
              <TouchableHighlight
                underlayColor="#03a9f4ad"
                style={[
                  styles.mediumButtonStyle,
                  { backgroundColor: "#03a9f4" }
                ]}
                onPress={() => this.startChat()}
              >
                <Icon
                  name="message-outline"
                  size={25}
                  iconStyle={{ padding: 5 }}
                  color="white"
                />
              </TouchableHighlight>
            </Animated.View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white"
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
