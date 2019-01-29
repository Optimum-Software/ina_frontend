import React, { Component } from "react";
import { View, Image } from "react-native";
import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";

class Imageviewer extends Component {
  constructor(props) {
    super(props);
    this.state = { url: this.props.navigation.getParam("url", "") };
    console.log(this.props.navigation.getParam("url", "").replace(" ", "%20"));
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
          <Image
            style={{ height: "100%", width: "100%" }}
            resizeMode="contain"
            source={{
              uri: this.props.navigation
                .getParam("url", "")
                .replace(" ", "%20")
                .replace("videoThumbnail_", "")
            }}
          />
        </View>
      </View>
    );
  }
}

export default Imageviewer;
