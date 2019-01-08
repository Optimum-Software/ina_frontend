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
      this.getChats()
      //debug only, make sure logged in on firebase
      //FirebaseApi.login("jelmer.haarman@xs4all.nl", "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92")
      //
      //FirebaseApi.createChat("19:21")
    }

    getChats() {
      //debug to make sure there is a user
      //User.storeUserId(19);
      //
      User.getUserId().then(id => {
        FirebaseApi.getChats(id).then(res => {
          chats = []
          for(index in res.chatList) {
            let chat = res.chatList[index]
            let title = ""
            let photo = ""
            let uid = ""
            if(!chat.group) {
              uid = chat.chatUid
              if(chat.user1.id == id) {
                title = chat.user2.firstName + " " + chat.user2.lastName
                photo = Api.getFileUrl(chat.user2.profilePhotoPath)
              }else if(chat.user2.id == id) {
                title = chat.user1.firstName + " " + chat.user1.lastName
                photo = Api.getFileUrl(chat.user1.profilePhotoPath)
              }
            } else {
              title = chat.name
              photo = Api.getFileUrl(chat.photo_path)
              uid = chat.name
            }
            
            chatItem = {
              title: title,
              photo: photo,
              uid: uid
            }
            console.log(chatItem)
            chats.push(chatItem)
          }
          this.setState({chats: chats, loading: false})
        })
      })
    }

  refreshList() {
    this.setState({"refreshing": true})
    this.getChats()
    this.setState({"refreshing": false})
  }

  goToChat(uid, title) {
    Router.goTo(this.props.navigation, 'ChatStack', 'Chat', {uid: uid, title: title})
  }

  renderItemSeparator() {
    return (<View style={styles.separator}/>)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <View style={{ height: Header.HEIGHT}}>
            <Toolbar
              centerElement="Chat"
              iconSet="MaterialCommunityIcons"
              leftElement={"menu"}
              style={{container: {"backgroundColor": "#009EF2"}}}
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
              ItemSeparatorComponent={() => this.renderItemSeparator()}
              renderItem={({ item }) => (
                <ListItem
                  key={item.uid}
                  title={item.title}
                  underlayColor={"#00A6FF"}
                  leftAvatar={{ rounded: true, source: { uri: item.photo } }}
                  chevron={<Icon
                    name="chevron-right"
                    type="font-awesome"
                    size={20}
                    color="#FFFFFF"
                  />}
                  containerStyle={styles.chatBoxContainer}
                  contentContainerStyle={styles.chatBoxItem}
                  titleStyle={styles.chatTitle}
                  subtitleStyle={styles.chatSubTitle}
                  onPress={() => this.goToChat(item.uid, item.title)}
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
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  containerMargin: {
    flex: 1,
    backgroundColor: "transparent",
  },

  chatBoxContainer: {
    backgroundColor: "#00A6FF",
  },

  chatBoxItem: {
    backgroundColor: '#00A6FF',
    alignSelf: 'center',
  },

  chatTitle: {
    color: '#FFFFFF', 
    fontWeight: 'bold'
  },

  chatSubTitle: {
    color: '#FFFFFF'
  },

  separator: {
    height: 2,
    backgroundColor: '#1497DD'
  }
});
