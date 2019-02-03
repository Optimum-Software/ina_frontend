import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableHighlight
} from "react-native";
import {
  NavigationActions,
  Header,
  createMaterialTopTabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Api from "../helpers/Api";
import ProjectApi from "../helpers/ProjectApi";
import User from "../helpers/User";
import Router from "../helpers/Router";
import Ripple from "react-native-material-ripple";
import FirebaseApi from "../helpers/FirebaseApi";
import { CachedImage } from "react-native-cached-image";

export default class DetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project.project,
      tags: [],
      userId: null,
      projectMembers: [],
      likeCount: props.project.project.like_count,
      followCount: props.project.project.follower_count,
      liked: false
    };
    User.getUserId().then(userId => {
      this.setState({ userId: userId });
      ProjectApi.checkIfMember(userId, this.state.project.id).then(result => {
        if (result["bool"]) {
          this.setState({ member: true });
        } else {
          this.setState({ member: false });
        }
      });
    });
    this.tags(this.state.project.id);
    this.getMembers();
  }

  getMembers() {
    ProjectApi.getProjectMembersById(this.state.project.id).then(result => {
      if (result["bool"]) {
        this.setState({
          projectMembers: result["members"]
        });
      } else {
        alert("Er zijn geen deelnemers aan dit project");
      }
    });
  }

  tags(id) {
    let response = ProjectApi.getAllTags(id).then(result => {
      if (result["bool"]) {
        this.setState({
          tags: result["tags"]
        });
      }
    });
  }
  startChat() {
    User.getUserId().then(id => {
      let creatorId = this.state.project.creator.id;
      let uid = "";
      if (creatorId > id) {
        uid = id + ":" + creatorId;
      } else {
        uid = creatorId + ":" + id;
      }
      let title =
        this.state.project.creator.firstName +
        " " +
        this.state.project.creator.lastName;
      FirebaseApi.createChat(uid);
      Router.goTo(this.props.navigation, "ChatStack", "Chat", {
        uid: uid,
        title: title,
        differentStack: true
      });
    });
  }

  joinProject() {
    User.getUserId().then(id => {
      ProjectApi.joinProject(id, this.state.project.id).then(result => {
        if (result["bool"]) {
          this.setState({ member: true });
          this.getMembers();
        } else {
          alert(result["msg"]);
        }
      });
    });
  }

  leaveProject() {
    User.getUserId().then(id => {
      ProjectApi.leaveProject(id, this.state.project.id).then(result => {
        if (result["bool"]) {
          this.setState({ member: false });
          this.getMembers();
        } else {
          alert(result["msg"]);
        }
      });
    });
  }

  render() {
    return (
      <ScrollView>
        <Text
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: 15
          }}
        >
          {this.state.project.desc}
        </Text>
        <View
          style={{
            height: 1,
            opacity: 0.3,

            backgroundColor: "#b5babf",
            marginTop: 15,
            marginBottom: 15,
            marginLeft: 15,
            marginRight: 15,
            width: "90%",
            alignSelf: "center"
          }}
        />
        {this.state.project.files.length > 0 && (
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              width: Dimensions.get("window").width
            }}
          >
            <Icon name="file" size={24} color={"#4C6873"} />
            <Text
              style={{ paddingLeft: 5, color: "#4C6873", fontWeight: "bold" }}
            >
              Bestanden
            </Text>
          </View>
        )}
        <FlatList
          data={this.state.project.files}
          style={{ flexGrow: 0 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                Linking.canOpenURL(Api.getFileUrl(item)).then(supported => {
                  if (supported) {
                    Linking.openURL(Api.getFileUrl(item));
                  } else {
                    console.log(
                      "Don't know how to open URI: " + Api.getFileUrl(item)
                    );
                  }
                })
              }
              style={{
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 40,
                paddingBottom: 10
              }}
            >
              <Icon name="file-document-outline" size={48} color={"#4C6873"} />
              <View style={{ flexDirection: "column" }}>
                <Text>{item.split("/")[item.split("/").length - 1]}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        {this.state.project.files.length > 0 && (
          <View
            style={{
              height: 1,
              opacity: 0.3,
              backgroundColor: "#b5babf",
              marginTop: 15,
              marginBottom: 15,
              marginLeft: 15,
              marginRight: 15,
              width: "90%",
              alignSelf: "center"
            }}
          />
        )}
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            width: Dimensions.get("window").width
          }}
        >
          <Icon name="information-outline" size={24} color={"#4C6873"} />
          <Text
            style={{ paddingLeft: 5, color: "#4C6873", fontWeight: "bold" }}
          >
            Extra info
          </Text>
        </View>

        <View style={{ paddingHorizontal: 40 }}>
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              width: Dimensions.get("window").width
            }}
          >
            <Icon name="map-marker" size={24} color={"#4C6873"} />
            <Text style={{ paddingLeft: 5, color: "#4C6873" }}>
              {this.state.project.location}
            </Text>
          </View>

          {this.state.project.start_date != null && (
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                width: Dimensions.get("window").width
              }}
            >
              <Icon name="calendar-range" size={24} color={"#4C6873"} />
              <Text style={{ paddingLeft: 5, color: "#4C6873" }}>
                {this.state.project.start_date.substring(0, 10) +
                  " / " +
                  this.state.project.end_date.substring(0, 10)}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            height: 1,
            opacity: 0.3,
            backgroundColor: "#b5babf",
            marginTop: 15,
            marginBottom: 15,
            marginLeft: 15,
            marginRight: 15,
            width: "90%",
            alignSelf: "center"
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
            marginLeft: 35,
            marginRight: 35
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 100,
                backgroundColor: "#00a6ff",
                height: 60,
                width: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => this.startChat()}
            >
              <Icon name="message-outline" size={24} color={"white"} />
            </TouchableOpacity>
            <Text style={{ paddingTop: 10 }}>Contact</Text>
          </View>
          {!this.state.member == true && (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 100,
                  backgroundColor: "#00a6ff",
                  height: 60,
                  width: 60,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.joinProject()}
              >
                <Icon name="account-multiple-plus" size={24} color={"white"} />
              </TouchableOpacity>
              <Text style={{ paddingTop: 10 }}>Deelnemen</Text>
            </View>
          )}
          {this.state.member == true && (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 100,
                  backgroundColor: "#00a6ff",
                  height: 60,
                  width: 60,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.leaveProject()}
              >
                <Icon name="account-multiple-minus" size={24} color={"white"} />
              </TouchableOpacity>
              <Text style={{ paddingTop: 10 }}>Verlaten</Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 100,
                backgroundColor: "#00a6ff",
                height: 60,
                width: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => this.startChat()}
            >
              <Icon name="bookmark-plus-outline" size={24} color={"white"} />
            </TouchableOpacity>
            <Text style={{ paddingTop: 10 }}>Volgen</Text>
          </View>
        </View>
        {this.state.tags.length > 0 && (
          <View
            style={{
              height: 1,
              opacity: 0.3,
              backgroundColor: "#b5babf",
              marginTop: 15,
              marginBottom: 15,
              marginLeft: 15,
              marginRight: 15,
              width: "90%",
              alignSelf: "center"
            }}
          />
        )}
        {this.state.tags.length > 0 && (
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              paddingBottom: 10
            }}
          >
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                width: Dimensions.get("window").width
              }}
            >
              <Icon name="tag" size={24} color={"#4C6873"} />
              <Text
                style={{ paddingLeft: 5, color: "#4C6873", fontWeight: "bold" }}
              >
                Tags
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexGrow: 0,
                flexWrap: "wrap",
                paddingHorizontal: 35
              }}
            >
              {this.state.tags.map(tag => {
                return (
                  <View
                    style={{
                      paddingTop: 2,
                      paddingBottom: 3,
                      marginBottom: 5,
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderRadius: 5,
                      marginLeft: 10,
                      backgroundColor: "#4C6873"
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "white" }}>
                      {tag.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  personCard: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    width: Dimensions.get("window").width - 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textStyle: {
    padding: "5%",
    fontSize: 16,
    color: "white",
    textAlign: "center"
  },

  buttonStyle: {
    marginBottom: 15,
    backgroundColor: "#00a6ff",
    borderRadius: 25
  }
});
