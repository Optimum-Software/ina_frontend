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
  Platform
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";
import { Button } from "react-native-elements";
import line from "../assets/images/Line.png";
import Api from "../helpers/Api";
import GroupApi from "../helpers/GroupApi";
import LinearGradient from "react-native-linear-gradient";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      topics: [],
      
    };
  }

  componentDidMount() {
    this.getTags()
  }

  getTags() {
    Api.callApiGet("getAllTags").then( response => {
      console.log(response)
      if(response['bool']) {        
        this.setState({topics: response['tags']})
      }
    })
  }

  goToProjectFilterByTag(tag) {
    Router.goTo(this.props.navigation, "ProjectStack", "ProjectOverviewScreen", {tag: tag})
  }

  handelEnd = () => {};

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
              style={{ container: { backgroundColor: "#009EF2" } }}
              onLeftElementPress={() => {
                this.props.navigation.openDrawer();
              }}
            />
          </View>
          <View>
            <Text style={styles.title}>Onderwerpen</Text>
            <FlatList
              data={this.state.topics}
              onEndReached={() => this.handelEnd()}
              horizontal={true}
              renderItem={({ item }) => {
                console.log(item.thumbnail)
                return (
                  <ImageBackground
                    style={styles.topicContainer}
                    imageStyle={{borderRadius: 2}}
                    source={{uri: Api.getFileUrl(item.thumbnail)}}
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
            <Text style={styles.title}>Mijn groepen</Text>
            <FlatList
              data={this.state.groups}
              onEndReached={() => this.handelEnd()}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableHighlight
                  key={item.id}
                  style={styles.cardContainer}
                  onPress={() =>
                    Router.goTo(
                      this.props.navigation,
                      "GroupStack",
                      "GroupHomeScreen",
                      {
                        name: item.name,
                        desc: item.desc,
                        photo_path: item.photo_path,
                        created_at: item.created_at,
                        member_count: item.member_count,
                        public: item.public
                      }
                    )
                  }
                >
                  <View style={styles.card}>
                    <View style={styles.cardImage}>
                      <Image
                        source={{ uri: item.photo_path }}
                        resizeMode="cover"
                        style={{ width: "100%", height: "100%" }}
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
                </TouchableHighlight>
              )}
            />
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
    backgroundColor: "#F1F1F1",
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
  }
});
