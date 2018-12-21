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
      // debug only, make sure logged in on firebase
      FirebaseApi.login("j.j.haarman@st.hanze.nl", "123456")
      //
      //FirebaseApi.createChat("19:20")
    }

    getChats() {
       //debug to make sure there is a user
      User.storeUserId(19);
      //
      User.getUserId().then(id => {
        FirebaseApi.getChats(id).then(res => {
          chats = []
          for(index in res.chatList) {
            let chat = res.chatList[index]
            let title = ""
            let photo = ""
            if(!chat.group) {
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
            }
            
            chatItem = {
              title: title,
              photo: photo,
              uid: chat.uid
            }
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

  goToChat(uid) {
    Router.goTo(this.props.navigation, 'ChatStack', 'Chat', {uid: uid})
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
