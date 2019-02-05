import React, { Component } from "react";
import { View, Text, BackHandler } from "react-native";
import VideoPlayer from "react-native-video-player";
import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";

class Videoplayer extends Component {
  constructor(props) {
    super(props);
    this.state = { url: this.props.navigation.getParam("url", "") };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack.bind(this))
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack.bind(this))
  }

  handleBack() {
    Router.goBack(this.props.navigation, this.props.navigation.getParam("differentStack", false))
    return true
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "black",
          height: "100%",
          width: "100%",
          justifyContent: "flex-start"
        }}
      >
        <Toolbar
          style={{
            container: { backgroundColor: "transparent", elevation: 0 }
          }}
          iconSet="MaterialCommunityIcons"
          leftElement={"close"}
          onLeftElementPress={() => {
            Router.goBack(this.props.navigation);
          }}
        />
        <View
          style={{ justifyContent: "center", height: "100%", width: "100%" }}
        >
          <VideoPlayer
            video={{
              uri: this.props.navigation
                .getParam("url", "")
                .replace(" ", "%20")
                .replace("videoThumbnail_", "")
            }}
            ref={r => (this.player = r)}
            autoplay={true}
          />
        </View>
      </View>
    );
  }
}

export default Videoplayer;
