import React, {Component}  from 'react';
import {
  Text, 
  View,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image
} from 'react-native';
import Router from "../helpers/Router";
import { Icon } from "react-native-elements";
import User from "../helpers/User";
import UserApi from "../helpers/UserApi";
import Api from "../helpers/Api";
import moment from "moment/min/moment-with-locales";
import { Toolbar } from "react-native-material-ui"
import Ripple from "react-native-material-ripple";
import { decode, encode } from 'he';
import { CachedImage } from "react-native-cached-image";

export default class NotificationScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      notificationList: null,
      refreshing: false
    }
  }

  componentDidMount() {
    User.getUserId().then(id => {
      UserApi.getNotifications(id).then(res => {
        if(res['bool']) {
          this.setState({notificationList: res['notifications']})
        }
      })
    });
  }

  handelEnd() {}

  onRefresh() {
    User.getUserId().then(id => {
      UserApi.getNotifications(id).then(res => {
        if(res['bool']) {
          this.setState({notificationList: res['notifications']})
        }
      })
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <Toolbar
          centerElement="Meldingen"
          iconSet="MaterialCommunityIcons"
          leftElement={"menu"}
          onLeftElementPress={() => {
            this.props.navigation.openDrawer();
          }}
        />
          <FlatList
            data={this.state.notificationList}
            keyExtractor={item => "" + item.id}
            onEndReached={() => this.handelEnd()}
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
            renderItem={({ item }) => {
              moment.locale('nl');
              if(item.type==0) {
                let sender = null
                if(item.user.id == item.chat.user1.id) {
                  sender = item.chat.user2
                } else {
                  sender = item.chat.user1
                }
                return (
                  <View>
                    <Ripple
                      onPress={() => {
                        UserApi.markAsRead(item.id).then(res => {
                          Router.goTo(this.props.navigation, 'ChatStack', 'Chat', 
                            {
                              uid: item.chat.chatUid,
                              title: sender.firstName,
                              chatId: item.chat.id
                            }
                          );
                        }
                        );
                      }}
                      style={styles.box}>
                      <CachedImage 
                        source={{uri: Api.getFileUrl(sender.profilePhotoPath)}}
                        resizeMode="cover"
                        style={styles.image}
                        imageStyle={styles.imageStyle}
                      />
                      {item.read && (
                        <Text style={[styles.textStyle, {color: '#4a6572'}]}>Nieuw bericht van {sender.firstName}</Text>
                      )}
                      {!item.read && (
                        <Text style={[styles.textStyle, {color: '#232f34'}]}>Nieuw bericht van {sender.firstName}</Text>
                      )}
                    </Ripple>
                    <View style={styles.separator}/>
                  </View>
                );
              } else if(item.type==1) {
                return (
                  <View>
                    <Ripple 
                      onPress={() => {
                        Router.goTo(this.props.navigation, "ProjectStack","ProjectDetailScreen",
                        {
                            id: item.project.id,
                            name: item.project.name,
                            desc: item.project.desc,
                            start_date: item.project.startDate,
                            end_date: item.project.endDate,
                            created_at: item.project.createdAt,
                            like_count: item.project.likeCount,
                            follower_count: item.project.followerCount,
                            location: item.project.location,
                            thumbnail: item.project.thumbnail,
                            creator: item.project.creator,
                            images: item.project.images,
                            files: item.project.files
                          }
                      )}}
                      style={styles.box}>
                      <CachedImage 
                        source={{uri: Api.getFileUrl(item.project.thumbnail)}}
                        resizeMode="cover"
                        style={styles.projectImage}
                        imageStyle={styles.projectImageStyle}
                      />
                      <Text style={styles.textStyle}>Update voor project: {item.project.name}</Text>
                    </Ripple>
                    <View style={styles.separator}/>
                  </View>
                );
              }       
            }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  box: {
    height: 90,
    flexDirection: 'row',
  },

  image: {
    marginLeft: "5%",
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: "white",
    marginRight: "10%",
    marginVertical: 5
  },

  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 100
  },

  projectImage: {
    marginLeft: "5%",
    width: 75,
    height: 75,
    borderRadius: 5,
    backgroundColor: "white",
    marginRight: "10%",
    marginVertical: 5
  },

  projectImageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 5
  },

  textStyle: {
    alignSelf: 'center',
    paddingVertical: '5%',
    fontSize: 16,
  },

  separator: {
    height: 1,
    backgroundColor: "#b5babf",
    marginTop: 3,
    marginBottom: 3,
    width: "90%",
    alignSelf: "center"
  },
})

