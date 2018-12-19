import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator
} from "react-native";
import { ListItem } from "react-native-elements";

import FirebaseApi from "../helpers/FirebaseApi";
import Api from "../helpers/Api";
import Router from "../helpers/Router";

export default class ChatCollection extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            refreshing: false,
            chats: []
        };
    }

    componentDidMount() {
      this.getMsgs()
    }

    getMsgs() {
      // debug only, make sure logged in on firebase
      FirebaseApi.login("mail@grombouts.nl", "123456")
      //
      FirebaseApi.getChats().then(chats => {
        this.setState({chats: chats, loading: false})
      })
    }

    refreshList() {
      this.setState({"refreshing": true})
      console.log("refreshing")
      this.setState({"refreshing": false})
    }

    goToChat(uid) {
      Router.goTo(this.props.navigation, 'ChatStack', 'Chat', {uid: uid})
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
              refreshing={this.state.refreshing}
              onRefresh={() => this.findLatestMsg()}
              renderItem={({ item }) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  leftAvatar={{ rounded: true, source: { uri: item.uri } }}
                  chevron
                  containerStyle={styles.chatBoxContainer}
                  contentContainerStyle={styles.chatBoxItem}
                  titleStyle={styles.chatTitle}
                  subtitleStyle={styles.chatSubTitle}
                  onPress={() => this.goToChat(item.title)}
                />
              )}
            />
          )}
          {this.state.loading && (
            <View
              style={{
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%"
              }}
            >
              <ActivityIndicator size="large" color="#00A6FF" />
            </View>
          )}
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
    backgroundColor: "#00A6FF",
    borderRadius: 5,
    margin: '3%',
  },

  chatBoxItem: {
    backgroundColor: '#00A6FF',
    alignSelf: 'center',
    marginBottom: '3%'
  },

  chatTitle: {
    color: '#FFFFFF', 
    fontWeight: 'bold'
  },

  chatSubTitle: {
    color: '#FFFFFF' 
  }
});
