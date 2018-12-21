import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { ListItem } from "react-native-elements";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import sha256 from "crypto-js/sha256";
var CryptoJS = require("crypto-js");
import FirebaseApi from "../helpers/FirebaseApi";
import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      uid: null,
      messages: [],
      currentUser: FirebaseApi.getCurrentUser()
    };
  }

  componentDidMount() {
    this.setState({
      uid: this.props.navigation.state.params.uid
    });
    this.getMessages();
  }

  getMessages() {
    var count = 0;
    FirebaseApi.getMsgsRef(this.props.navigation.state.params.uid).on(
      "value",
      snapshot => {
        // gets around Redux panicking about actions in reducers
        setTimeout(() => {
          var items = [];
          snapshot.forEach(child => {
            if (child.val().system == true) {
              items.push({
                _id: count++,
                text: child.val().text,
                system: true
                // Any additional custom parameters are passed through
              });
            } else {
              var bytes = CryptoJS.AES.decrypt(
                child.val().text,
                sha256(child.val().user.id + child.val().user.email).toString()
              );
              items.push({
                _id: count++,
                text: bytes.toString(CryptoJS.enc.Utf8),
                createdAt: new Date(child.val().createdAt),
                user: {
                  _id: child.val().user.id,
                  name: child.val().user.email,
                  avatar: child.val().user.avatar
                },
                image: child.val().image
              });
            }
          });
          this.setState({ messages: items });
        }, 0);
      }
    );
  }

  onSend(messages = []) {
    FirebaseApi.sendMessage(this.state.currentUser, this.state.uid, messages);
  }

  getColor(username) {
    let sumChars = 0;
    for (let i = 0; i < username.length; i++) {
      sumChars += username.charCodeAt(i);
    }

    const colors = [
      "#ef9a9a", // carrot
      "#ce93d8", // emerald
      "#81d4fa", // peter river
      "#80deea", // wisteria
      "#80cbc4", // alizarin
      "#90caf9", // turquoise
      "#ffab91" // midnight blue
    ];
    return colors[sumChars % colors.length];
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <Toolbar
          centerElement={this.state.uid}
          iconSet="MaterialCommunityIcons"
          leftElement={"arrow-left"}
          onLeftElementPress={() => {
            Router.goBack(this.props.navigation);
          }}
        />
        <View style={styles.container}>
          <GiftedChat
            inverted={true}
            renderBubble={props => {
              let username = props.currentMessage.user.name;
              let color = this.getColor(username);
              return (
                <Bubble
                  {...props}
                  textStyle={{
                    right: {
                      color: "white"
                    },
                    left: {
                      color: "white"
                    }
                  }}
                  wrapperStyle={{
                    left: {
                      backgroundColor: color
                    },
                    right: {
                      backgroundColor: "#52C98E"
                    }
                  }}
                />
              );
            }}
            messages={this.state.messages.reverse()}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.state.currentUser.uid
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#00a6ff"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
