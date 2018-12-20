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

import FirebaseApi from "../helpers/FirebaseApi";
import Router from "../helpers/Router";

export default class ChatCollection extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      chats: []
    };
  }

  componentDidMount() {
    // debug only, make sure logged in on firebase
    FirebaseApi.login("mail@grombouts.nl", "123456");
    //
    FirebaseApi.getChats().then(chats => {
      this.setState({ chats: chats, loading: false });
    });
  }

  goToChat(uid) {
    Router.goTo(this.props.navigation, "ChatStack", "Chat", { uid: uid });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <View>
          {!this.state.loading && (
            <FlatList
              data={this.state.chats}
              renderItem={({ item }) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  subtitle={"20 december 2019"}
                  leftAvatar={{
                    source: {
                      uri:
                        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                    }
                  }}
                  chevron
                  containerStyle={styles.chatBoxContainer}
                  contentContainerStyle={styles.chatBoxItem}
                  onPress={() => this.goToChat(item.title)}
                />
              )}
            />
          )}
          {this.state.loading && <Text>Loading</Text>}
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
  },
  chatBoxContainer: {
    flex: 1,
    backgroundColor: "red",
    borderRadius: 5,
    margin: "3%"
  },

  chatBoxItem: {
    backgroundColor: "yellow",
    alignSelf: "center"
  }
});
