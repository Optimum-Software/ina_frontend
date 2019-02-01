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
import { ListItem, Icon } from "react-native-elements";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import FirebaseApi from "../helpers/FirebaseApi";
import Api from "../helpers/Api";
import Router from "../helpers/Router";
import User from "../helpers/User";
import { Fragment } from "react";

export default class ChatCollection extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      refreshing: false,
      chats: [],
      notLoggedIn: true
    };
  }

  componentDidMount() {
    this.getChats();
    User.getUserId().then(userId => {
      if (userId != null) {
        this.setState({ notLoggedIn: false });
      }
    });
  }

  getChats() {
    User.getUserId().then(id => {
      FirebaseApi.getChats(id).then(res => {
        chats = [];
        for (index in res.chatList) {
          let chat = res.chatList[index];
          let title = "";
          let photo = "";
          let uid = "";
          if (!chat.group) {
            uid = chat.chatUid;
            console.log(chat);
            if (chat.user1.id == id) {
              title = chat.user2.firstName + " " + chat.user2.lastName;
              console.log(chat.user2.profilePhotoPath);
              photo = Api.getFileUrl(chat.user2.profilePhotoPath);
            } else if (chat.user2.id == id) {
              title = chat.user1.firstName + " " + chat.user1.lastName;
              photo = Api.getFileUrl(chat.user1.profilePhotoPath);
            }
          } else {
            title = chat.name;
            photo = Api.getFileUrl(chat.thumbnail);
            uid = chat.name;
          }

          chatItem = {
            title: title,
            photo: photo,
            uid: uid,
            chatId: chat.id
          };
          chats.push(chatItem);
        }
        this.setState({ chats: chats, loading: false });
      });
    });
  }

  refreshList() {
    this.setState({ refreshing: true });
    this.getChats();
    this.setState({ refreshing: false });
  }

  goToChat(chatId, uid, title) {
    Router.goTo(this.props.navigation, "ChatStack", "Chat", {
      uid: uid,
      title: title,
      chatId: chatId
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "95%",
          alignSelf: "center",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  render() {
    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#00a6ff" }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <StatusBar
            backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
            barStyle="light-content"
          />
          <View style={{ height: Header.HEIGHT }}>
            <Toolbar
              centerElement="Chat"
              iconSet="MaterialCommunityIcons"
              leftElement={"menu"}
              style={{ container: { backgroundColor: "#00A6FF" } }}
              onLeftElementPress={() => {
                this.props.navigation.openDrawer();
              }}
            />
          </View>
          <View style={styles.containerMargin}>
            {!this.state.loading && (
              <FlatList
                data={this.state.chats}
                refreshing={this.state.refreshing}
                onRefresh={() => this.refreshList()}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({ item }) => (
                  <ListItem
                    key={item.uid}
                    title={item.title}
                    titleStyle={styles.chatTitle}
                    subtitle={"Het laatste chatbericht..."}
                    subtitleStyle={styles.chatSubTitle}
                    leftAvatar={{ rounded: true, source: { uri: item.photo } }}
                    chevron={
                      <Icon
                        name="chevron-right"
                        type="font-awesome"
                        size={20}
                        color="#4a6572"
                      />
                    }
                    badge={{
                      value: 4,
                      textStyle: { color: "#fff" }
                    }}
                    onPress={() => {
                      console.log(item.photo);

                      this.goToChat(item.chatId, item.uid, item.title);
                    }}
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
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  containerMargin: {
    flex: 1,
    backgroundColor: "transparent"
  },

  chatBoxContainer: {
    backgroundColor: "#fff"
  },

  chatBoxItem: {
    backgroundColor: "#fff",
    alignSelf: "center"
  },

  chatTitle: {
    color: "#4a6572",
    fontWeight: "bold"
  },

  chatSubTitle: {
    color: "#4a6572"
  },

  separator: {
    height: 2,
    backgroundColor: "#4a6572"
  }
});
