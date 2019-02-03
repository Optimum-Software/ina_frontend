import React, {Component}  from 'react';
import {
  Text, 
  View,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
  ActivityIndicator
} from 'react-native';
import Router from "../helpers/Router";
import { Icon } from "react-native-elements";
import User from "../helpers/User";
import UserApi from "../helpers/UserApi";
import Api from "../helpers/Api";
import moment from "moment/min/moment-with-locales";
import { Toolbar } from "react-native-material-ui";
import Ripple from "react-native-material-ripple";
import { decode, encode } from 'he';
import { CachedImage } from "react-native-cached-image";

export default class NotificationScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      notificationList: [],
      refreshing: false,
      loading: false
    }
  }

  componentDidMount() {
    this.props.navigation.addListener("willFocus", this.onLoad);
    this.setState({loading: true})
    User.getUserId().then(id => {
      UserApi.getNotifications(id).then(res => {
        if(res['bool']) {
          this.setState({notificationList: res['notifications']})
        }
        this.setState({loading: false})
      })
    });
  }

  onLoad = () => {
    this.onRefresh()
  }

  handelEnd() {}

  onRefresh() {
    this.setState({loading: true})
    User.getUserId().then(id => {
      UserApi.getNotifications(id).then(res => {
        if(res['bool']) {
          this.setState({notificationList: res['notifications']})
        }
        this.setState({loading: false})
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
        {this.state.notificationList.length > 0 && !this.state.loading && (
          <FlatList
            data={this.state.notificationList}
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
                  <View key={item.id}>
                  {item.read && (
                    <Ripple
                      onPress={() => {
                          Router.goTo(this.props.navigation, 'ChatStack', 'Chat', 
                            {
                              uid: item.chat.chatUid,
                              title: sender.firstName,
                              chatId: item.chat.id
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
                      <Text style={[styles.textStyle, {color: '#4a6572'}]}>Nieuw bericht van {sender.firstName}</Text>
                    </Ripple>
                  )}
                  {!item.read && (
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
                      style={[styles.box, {backgroundColor: '#00a6ff'}]}>
                      <CachedImage 
                        source={{uri: Api.getFileUrl(sender.profilePhotoPath)}}
                        resizeMode="cover"
                        style={styles.image}
                        imageStyle={styles.imageStyle}
                      />
                      <Text style={[styles.textStyle, {color: '#4a6572'}]}>Nieuw bericht van {sender.firstName}</Text>
                    </Ripple>
                  )} 
                    <View style={styles.separator}/>
                  </View>
                );
              } else if(item.type==1) {
                return (
                  <View key={item.id}>
                  {item.read && (
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
                        );
                      }}
                      style={styles.box}>
                      <CachedImage 
                        source={{uri: Api.getFileUrl(item.project.thumbnail)}}
                        resizeMode="cover"
                        style={styles.projectImage}
                        imageStyle={styles.projectImageStyle}
                      />
                      <Text style={[styles.textStyle, {color: '#4a6572'}]}>Update voor project: {item.project.name}</Text>
                    </Ripple>
                  )}
                  {!item.read && (
                    <Ripple 
                      onPress={() => {
                        UserApi.markAsRead(item.id).then(res => {
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
                          )
                        })
                      }}
                      style={[styles.box, {backgroundColor: '#00a6ff'}]}>
                      <CachedImage 
                        source={{uri: Api.getFileUrl(item.project.thumbnail)}}
                        resizeMode="cover"
                        style={styles.projectImage}
                        imageStyle={styles.projectImageStyle}
                      />
                      <Text style={[styles.textStyle, {color: '#4a6572'}]}>Update voor project: {item.project.name}</Text>
                    </Ripple>
                  )}
                    <View style={styles.separator}/>
                  </View>
                );
              }       
            }}
          />
        )}
        {this.state.notificationList.length == 0 && !this.state.loading && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              Er zijn geen meldingen gevonden
            </Text>
            <Ripple
              rippleColor="#00a6ff"
              style={styles.refreshButton}
              onPress={() => this.onRefresh()}
            >
              <Icon
                name="refresh"
                type="font-awesome"
                size={25}
                color="#FFF"
              />
            </Ripple>
          </View>
        )}
        {this.state.loading && (
          <View
            style={{
              height: "92.5%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size="large" color="#00A6FF" />
          </View>
        )}
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
    width: "100%",
    alignSelf: "center"
  },

  emptyBox: {
    alignItems: "center",
    marginTop: "25%"
  },

  emptyText: {
    color: "#4a6572",
    fontSize: 24,
    fontWeight: "bold"
  },

  refreshButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: "#009ef2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  }
})

