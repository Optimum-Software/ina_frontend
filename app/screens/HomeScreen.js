import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  TouchableHighlight,
  RefreshControl
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";
import { Input, Icon } from "react-native-elements";
import line from "../assets/images/Line.png";
import homeBackground from "../assets/images/homeBackground.jpg";
import Api from "../helpers/Api";
import GroupApi from "../helpers/GroupApi";
import ProjectApi from "../helpers/ProjectApi";
import User from "../helpers/User";
import LinearGradient from "react-native-linear-gradient";
import HomepageApi from "../helpers/HomepageApi";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      topics: [],
      projects: [],
      searchTerm: '',
      user: null,
      loggedIn: false,
      dateNow: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getTags()
    this.getTrendingProjects()
    this.getUserIfLoggedIn()
  }

  getTags() {
    Api.callApiGet("getAllTags").then( response => {
      if(response['bool']) {        
        this.setState({topics: response['tags']})
      }
    })
  }

  getTrendingProjects() {
    ProjectApi.mostLikedProjects().then(response => {
      if(response['bool']) {        
        this.setState({projects: response['projects']})
      }
    })
  }

  getUserIfLoggedIn() {
    User.getUserId().then(id => {
      if(id != null) {
        dateNow = new Date().toLocaleDateString("nl-NL", {weekday: 'long', day: 'numeric', month: 'long'})
        Api.callApiGet('getUserById/' + id).then(res => {
          if(res['bool']) {
            this.setState({user: res['user'], loggedIn: true, dateNow: dateNow})
          }
        })
      } else {
        this.setState({loggedIn: false, user: null, dateNow: null})
      }
    })
  }

  goToProjectFilterByTag(tag) {
    Router.goTo(this.props.navigation, "ProjectStack", "ProjectOverviewScreen", {tag: tag})
  }

  search(term) {
    HomepageApi.searchTags(term).then( res => {
      if(res['bool']){
        this.setState({topics: res['tags']})
      }
    });

    HomepageApi.searchProjects(term).then( res => {
      if(res['bool']){
        this.setState({projects: res['projects']})
      }
    });
    this.setState({searchTerm: ''})
  }

  handelEnd = () => {};

  onRefresh = () => {
    this.setState({ refreshing: true, searchTerm: '' })
    this.getTags()
    this.getTrendingProjects()
    this.getUserIfLoggedIn()
    this.setState({ refreshing: false })
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={{ height: Header.HEIGHT }}>
            <Toolbar
              centerElement="Home"
              iconSet="MaterialCommunityIcons"
              leftElement={"menu"}
              style={{ container: { backgroundColor: "#00A6FF" } }}
              onLeftElementPress={() => {
                this.props.navigation.openDrawer();
              }}
            />
          </View>
          <ScrollView
            refreshControl={
                <RefreshControl
                  colors={["#94D600"]}
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
          >
          <View>
            {this.state.loggedIn && (
              <View style={styles.welcomeContainer}>
              <ImageBackground 
                style={styles.welcomeBackground}
                source={homeBackground}
                resizeMode="cover"
                >
                <View style={styles.welcomeBox}>
                  <Image
                    source={{uri: Api.getFileUrl(this.state.user.profilePhotoPath)}}
                    resizeMode="cover"
                    style={{
                      width: 85,
                      height: 85,
                      borderRadius: 100,
                      backgroundColor: "white"
                    }}
                    imageStyle={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 200,
                    }}
                  />
                  <View style={{marginLeft: 20}}>
                    <Text style={styles.textTitle}>Welkom {this.state.user.firstName},</Text>
                    <Text style={styles.textSubTitle}>Het is vandaag {this.state.dateNow}.</Text>
                  </View>
                </View>
              </ImageBackground>
              <Image
                source={line}
                resizeMode="stretch"
                style={{width: "100%", height: "2%"}}
              />
              </View>

            )}
            <View style={styles.searchBar}>
              <Input
                placeholder="Begin met zoeken.."
                placeholderTextColor="#000000"
                containerStyle={styles.searchBarContainerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                value={this.state.searchTerm}
                leftIcon={{
                  type: "font-awesome",
                  name: "search",
                  color: "#000000"
                }}
                onChangeText={searchTerm => this.setState({ searchTerm })}
                onSubmitEditing={() => this.search(this.state.searchTerm)}
                shake={true}
              />
            </View>
            <View style={styles.separator}/>
            <Text style={styles.title}>Onderwerpen</Text>
            <FlatList
              data={this.state.topics}
              onEndReached={() => this.handelEnd()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <ImageBackground
                    style={styles.topicContainer}
                    imageStyle={{borderRadius: 2}}
                    source={{uri: Api.getFileUrl(item.thumbnail)}}
                    key={item.id}
                  >
                    <TouchableOpacity
                      key={item.id}
                      style={styles.topicContainer}
                      activeOpacity={0.8}
                      onPress={() =>
                        this.goToProjectFilterByTag(item.name)
                      }
                    >
                      <LinearGradient
                        colors={["#00000000", "#000000cc"]}
                        style={styles.topicContainer}
                      >
                        <Text
                          style={{
                                  fontWeight: 'bold',
                                  textAlignVertical: "bottom",
                                  textAlign: "center",
                                  color: 'white'}}>
                          {item.name}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </ImageBackground>
              )}}
            />
          </View>
          <View style={styles.separator}/>
          <View>
            <Text style={styles.title}>Top trending</Text>
            <FlatList
              data={this.state.projects}
              onEndReached={() => this.handelEnd()}
              numColumns={2}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
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
                            url: item.thumbnail,
                            desc: item.desc,
                            start_date: item.start_date,
                            end_date: item.end_date,
                            created_at: item.created_at,
                            like_count: item.like_count,
                            follower_count: item.follower_count,
                            location: item.location
                          }
                        )
                      }
                    >
                      <View style={styles.card}>
                        <View style={styles.cardImage}>
                          <Image
                            source={{uri: Api.getFileUrl(item.thumbnail)}}
                            resizeMode="cover"
                            style={styles.image}
                          />
                        </View>
                        <Image
                          source={line}
                          resizeMode="stretch"
                          style={{width: "100%", height: "2%"}}
                        />
                        <Text numberOfLines={2} style={styles.cardTitle}>
                          {item.name}
                        </Text>
                      </View>
                  </TouchableOpacity>
              )}}
            />
          </View>
          </ScrollView>
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

  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },

  topicContainer: {
    height: 150,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 2
  },

  card: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    width: "100%",
    height: 180,
    marginBottom: 10,
    elevation: 3
  },

  imageBackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },

  cardImage: {
    height: "70%",
    width: "100%"
  },

  cardTitle: {
    margin: 5,
    fontSize: 15,
    fontWeight: "bold"
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  },

  separator: {
    height: 1,
    backgroundColor: '#b5babf',
    marginTop: 15,
    marginBottom: 15,
    width: '80%',
    alignSelf: 'center'
  },

  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  searchBar: {
    marginTop: 10
  },

  searchBarContainerStyle: {
    width: "75%",
    alignSelf: "center",
    backgroundColor: "transparent",
    borderColor: 'black',
    borderWidth: 2
  },

  inputContainerStyle: {
    borderBottomColor: "#FFFFFF",
    alignSelf: 'center'
  },

  inputStyle: {
    color: "#000000"
  },

  welcomeBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  welcomeBackground: {
    height: 125,
  },

  welcomeContainer: {
    width: '100%',
    marginBottom: 5,
  },

  textTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black'
  },

  textSubTitle: {
    fontSize: 15,
    color: 'black'
  }
});
