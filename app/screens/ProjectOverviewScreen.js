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
  ActivityIndicator
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import line from "../assets/images/line3.png";
import Router from "../helpers/Router";
import User from "../helpers/User";
import ProjectApi from "../helpers/ProjectApi";
import Api from "../helpers/Api";
import { CachedImage } from "react-native-cached-image";
import Ripple from "react-native-material-ripple";
import { Icon } from "react-native-elements";

export default class ProjectOverview extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      refreshing: false,
      loading: false,
      loggedIn: false
    };

    ProjectApi.getAllProjects().then(result => {
      if (result["bool"]) {
        this.setState({
          data: result["projects"]
        });
      }
    });
  }

  componentDidMount() {
    this.props.navigation.addListener("willFocus", this.onLoad);
  }

  handelEnd = () => {};

  onLoad = () => {
    this.setState({refreshing: true, loading: true})

    User.getUserId().then(id => {
      if(id != null) {
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
      this.setState({refreshing: false, loading: false})
    });

    tagToFilter = this.props.navigation.getParam("tag", "")
    if(tagToFilter != null) {
      ProjectApi.getProjectByTag(tagToFilter).then(res => {
        console.log(res)
        if(res['bool']) {
          this.setState({data: res["projects"]})
          this.props.navigation.setParams({ tag: null})
        }
        this.setState({refreshing: false, loading: false})
      });
    } else {
      ProjectApi.getAllProjects().then(result => {
        if (result["bool"]) {
          this.setState({
            data: result["projects"]
          });
        }
        this.setState({refreshing: false, loading: false})
      });
    }

  }

  onRefresh() {
    this.onLoad()
  }

  render() {  
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={{ height: Header.HEIGHT }}>
          {this.state.loggedIn && (
            <Toolbar
              centerElement="Projecten"
              iconSet="MaterialCommunityIcons"
              leftElement={"menu"}
              onLeftElementPress={() => {
                this.props.navigation.openDrawer();
              }}
              rightElement={"plus"}
              onRightElementPress={() => {
                Router.goTo(
                  this.props.navigation,
                  "ProjectStack",
                  "ProjectCreateFirstScreen",
                  {}
                );
              }}
            />
          )}
          {!this.state.loggedIn && (
            <Toolbar
              centerElement="Projecten"
              iconSet="MaterialCommunityIcons"
              leftElement={"menu"}
              onLeftElementPress={() => {
                this.props.navigation.openDrawer();
              }}
            />
          )}  
          </View>
          <View>
          {this.state.data.length > 0 && !this.state.refreshing &&(
              <FlatList
              data={this.state.data}
              onEndReached={() => this.handelEnd()}
              numColumns={2}
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => {
                return (
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
              }}
            />
            )
          }
          {this.state.data.length == 0 && !this.state.loading && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Er zijn geen projecten gevonden</Text>
              <Ripple
                rippleColor='#00a6ff'
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
                height: '92.5%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}
          </View>
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
    backgroundColor: "#ffffff"
  },

  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },

  card: {
    backgroundColor: "#FFF",
    margin: 10,
    width: "100%",
    height: 180,
    marginBottom: 10,
    elevation: 3,
    borderRadius: 4
  },

  cardImage: {
    height: "70%",
    width: "100%"
  },
  cardTitle: {
    margin: 5,
    fontSize: 16,
    fontWeight: "medium",
    color: '#4a6572'
  },

  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },

  emptyBox: {
    alignItems: 'center', 
    marginTop: '25%'
  },

  emptyText: {
    color: "#4a6572",
    fontSize: 24,
    fontWeight: 'medium'
  },

  refreshButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: '#009ef2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  }
});
