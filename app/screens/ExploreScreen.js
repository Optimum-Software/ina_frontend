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
  Easing
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProjectApi from "../helpers/ProjectApi.js";
import Api from "../helpers/Api.js";
import Router from "../helpers/Router.js";
import User from "../helpers/User.js";
import Swiper from "react-native-deck-swiper";
import LinearGradient from "react-native-linear-gradient";
import { Toolbar } from "react-native-material-ui";

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

  renderCard = (card, index) => {
    const width = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [400, 50]
    });
    const height = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [600, 400, 200]
    });

    const top = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 15]
    });
    const left = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 15]
    });

    const borderRadius = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50]
    });

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.9, 1],
      outputRange: [0, 0, 1]
    });

    const opacityRev = this.animatedValue.interpolate({
      inputRange: [0, 0, 1],
      outputRange: [1, 0, 0]
    });
    if (card != null) {
      return (
        <View style={styles.card}>
          <Animated.Image
            style={{
              height: height,
              width: "100%",
              resizeMode: "cover",
              justifyContent: "center",
              position: "absolute"
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
              position: "absolute"
            }}
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
          <View style={{ height: "100%", width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                height: 450
              }}
            >
              <Animated.View
                style={{
                  flexDirection: "column",
                  padding: 15,
                  marginTop: 200,

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
                    margin: 10
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  eleifend mauris ut sapien convallis, et aliquet libero
                  gravida. Maecenas varius feugiat purus vitae porta. Vestibulum
                  malesuada ultricies enim, vel elementum quam dictum ut. Nunc
                  nec nisi pretium, cursus sem a, hendrerit ipsum. Curabitur
                  dapibus lectus ut magna lacinia elementum. Fusce tempor, mi in
                  sodales fermentum, sapien lacus iaculis turpis, in aliquet
                  nisl ex vel lacus. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas.
                </Text>
              </Animated.View>
            </View>
            <Animated.View
              style={{
                opacity: opacityRev,
                width: "100%",
                height: "100%",
                alignItems: "flex-end"
              }}
              onPress={() => this.animate()}
            >
              <LinearGradient
                colors={["#00000000", "#000000cc"]}
                style={{
                  width: "100%",
                  height: "15%",
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
                  <View style={{ flexDirection: "column", width: "85%" }}>
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
                      {card.creator.firstName + " " + card.creator.lastName}
                    </Text>
                  </View>
                  <Icon
                    name="information"
                    color="white"
                    size={30}
                    style={{}}
                    onPress={() => this.animate()}
                  />
                </View>
              </LinearGradient>
            </Animated.View>
          </View>
        </View>
      );
    }
  };

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
          style={{
            container: {
              position: "absolute",
              top: 0,
              width: "100%"
            }
          }}
        />
        <Swiper
          backgroundColor="transparent"
          marginTop={60}
          marginBottom={70}
          ref={swiper => {
            this.swiper = swiper;
          }}
          //onSwipedAll={this.updateStack}
          onSwipedLeft={() => this.onSwiped("left")}
          onSwipedRight={() => this.onSwiped("right")}
          onSwipedTop={() => this.onSwiped("top")}
          onSwipedBottom={() => this.onSwiped("bottom")}
          onTapCard={() => {
            this.state.showDetails ? this.animateRev() : this.animate();
          }}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={0}
          renderCard={this.renderCard}
          animateCardOpacity
          goBackToPreviousCardOnSwipeBottom={true}
          verticalSwipe={false}
          showSecondCard
          stackSize={3}
          stackSeparation={15}
        />
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
    justifyContent: "center",
    backgroundColor: "white"
  },
  card: {
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 20,
    overflow: "hidden",
    borderColor: "grey",
    backgroundColor: "white",
    borderWidth: 1,
    elevation: 5,
    width: "100%",
    marginTop: 10,
    height: "90%"
  },
  textField: {
    flexDirection: "column"
  },
  text: {
    textAlign: "center",
    backgroundColor: "transparent",
    color: "white"
  },
  bigButtonStyle: {
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },
  mediumButtonStyle: {
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },
  smallButtonStyle: {
    borderRadius: 100
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    height: "10%",
    position: "absolute",
    bottom: 10
  },
  header: {
    position: "absolute",
    top: 10,
    width: "100%",
    height: "5%"
  }
});
