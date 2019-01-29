
import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import line from "../assets/images/line3.png";
import Router from "../helpers/Router";
import SavedApi from "../helpers/SavedApi";
import Api from "../helpers/Api";
import User from "../helpers/User";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { CachedImage } from "react-native-cached-image";
import Ripple from "react-native-material-ripple";

export default class SavedProjects extends Component {
  constructor() {
    super();
    this.state = {
        index: 0,
        routes: [
          {key: 'membered', title: "Deelnemend"},
          {key: 'followed', title: "Gevolgd"},
          {key: 'liked', title: "Geliked"}
        ],
        memberedProjects: [],
        followedProjects: [],
        likedProjects: []
     };
  }

  componentDidMount() {
    User.getUserId().then(userId => {
      SavedApi.getAllFollows(userId).then(res => {
        if(res['bool']) {
          if(res['found']) {
            this.setState({followedProjects: res['projects']})
          } else {
            alert(res['msg'])
          }
          
        }
      });
      SavedApi.getAllMembered(userId).then(res => {
        if(res['bool']) {
          if(res['found']) {
            this.setState({memberedProjects: res['projects']})
          } else {
            alert(res['msg'])
          }
          
        }
      });
      SavedApi.getAllLiked(userId).then(res => {
        if(res['bool']) {
          if(res['found']) {
            this.setState({likedProjects: res['projects']})
          } else {
            alert(res['msg'])
          }
          
        }
      });
    });
  }

  handelEnd = () => {}

  _renderItem = ({item}) => (
    <Ripple
      rippleColor="#FFF"
      style={styles.cardContainer}
      key={item.id}
      onPress={() =>
      Router.goTo(
      this.props.navigation,
        "ProjectStack",
        "ProjectDetailScreen",
          {
            id: item.id,
            name: item.name,
            desc: item.desc,
            start_date: item.start_date,
            end_date: item.end_date,
            created_at: item.created_at,
            like_count: item.like_count,
            follower_count: item.follower_count,
            location: item.location,
            thumbnail: item.thumbnail,
            creator: item.creator,
            images: item.images,
            files: item.files
          }
      )}
    >  
      <View style={styles.card}>
          <View style={styles.cardImage}>
            <CachedImage
              source={{ uri: Api.getFileUrl(item.thumbnail)}}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
            <Image
              source={line}
              resizeMode="stretch"
              style={{ width: "100%", height: "2%" }}
            />
            <Text numberOfLines={2} style={styles.cardTitle}>
              {item.name}
            </Text>
          </View>
    </Ripple>
  )

  render() {
    const membersRoute = () => (
      <FlatList
        data={this.state.memberedProjects}
        onEndReached={() => this.handelEnd()}
        numColumns={2}
        renderItem={this._renderItem}
      />
    )

    const followedRoute = () => (
      <FlatList
        data={this.state.followedProjects}
        onEndReached={() => this.handelEnd()}
        numColumns={2}
        renderItem={this._renderItem}
      />
    )

    const likedRoute = () => (
      <FlatList
        data={this.state.likedProjects}
        onEndReached={() => this.handelEnd()}
        numColumns={2}
        renderItem={this._renderItem}
      />
    )

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <View style={{ height: Header.HEIGHT }}>
          <Toolbar
            centerElement="Mijn projecten"
            iconSet="MaterialCommunityIcons"
            leftElement={"arrow-left"}
            onLeftElementPress={() => {
              Router.goBack(this.props.navigation);
            }}
          />
        </View>
        <TabView
          navigationState={this.state}
          indicatorStyle={{ backgroundColor: "grey" }}
          tabStyle={{ backgroundColor: "white" }}
          renderScene={SceneMap({
            membered: membersRoute,
            followed: followedRoute,
            liked: likedRoute
          })}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={styles.tabbar}
              indicatorStyle={styles.indicator}
              labelStyle={{ color: "#FFF" }}
            />
          )}
          onIndexChange={index => this.setState({ index })}
/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },

  card: {
    backgroundColor: "#F1F1F1",
    margin: 10,
    width: "100%",
    height: 180,
    marginBottom: 10,
    elevation: 3,
    borderRadius: 4,
  },

  cardImage: {
    height: "70%",
    width: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  tabbar: {
    backgroundColor: '#009EF2'
  },

  indicator: {
    backgroundColor: '#00a6ff'
  }
});
