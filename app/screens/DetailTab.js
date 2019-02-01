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

  getMembers(){
    ProjectApi.getProjectMembersById(this.state.project.id).then(result => {
      if (result["bool"]) {
        this.setState({
          projectMembers: result["members"],
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
          this.setState({ member: true,   });
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
          this.setState({ member: false, });
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
        <View style={styles.personCard}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
          {this.state.project.creator.profilePhotoPath != "" && (
            <CachedImage
              source={{
                uri: Api.getFileUrl(this.state.project.creator.profilePhotoPath)
              }}
              resizeMode="cover"
              style={{
                marginRight: 10,
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "white"
              }}
              imageStyle={{
                width: "100%",
                height: "100%",
                borderRadius: 200
              }}
            />)}
            {this.state.project.creator.profilePhotoPath == "" && (<Icon
              name="account-circle"
              size={45}
              style={{
                marginRight: 10,

              }} />)}

            <View style={{ paddingLeft: 0, width: Dimensions.get('window').width * 0.7 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", }}>
                {this.state.project.name}
              </Text>
              <Text>
                {this.state.project.creator.firstName +
                  " " +
                  this.state.project.creator.lastName}
              </Text>
            </View>
          </View>
          {this.state.userId == this.state.project.creator.id && (
            <Icon
              name="square-edit-outline"
              size={36}
              onPress={() => {
                Router.goTo(
                  this.props.navigation,
                  "ProjectStack",
                  "ProjectEditFirstScreen",
                  {
                    id: this.state.project.id,
                    name: this.state.project.name,
                    desc: this.state.project.desc,
                    start_date: this.state.project.start_date,
                    end_date: this.state.project.end_date,
                    location: this.state.project.location,
                    thumbnail: this.state.project.thumbnail,
                    images: this.state.project.images,
                    files: this.state.project.files,
                    tags: this.state.tags
                  }
                );
              }}
            />
          )}
          {this.state.userId != this.state.project.creator.id && (
            <Ripple
              rippleColor="#fff"
              onPress={() =>
                User.getUserId().then(id => {
                  ProjectApi.likeProject(this.state.project.id, id).then(res =>
                    this.setState({ likeCount: res["likedCount"], liked: true })
                  );
                })
              }
            >
              {this.state.liked && <Icon name="heart" size={36} color={"red"} />}
              {!this.state.liked && <Icon name="heart-outline" size={36} color={"red"} />}
            </Ripple>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 65,
            paddingBottom: this.state.projectMembers.length > 0 ? 0 : 15
          }}
        >
          <Icon name="heart-outline" color="grey" size={16} />
          <Text>{this.state.likeCount} likes</Text>

          <Icon
            style={{ paddingLeft: 5 }}
            name="account-outline"
            color="grey"
            size={16}
          />
          <Text>{this.state.followCount} volgers</Text>
        </View>
        {this.state.projectMembers.length > 0 && (
          <Text style={{ paddingLeft: 65, paddingBottom: 15, paddingTop: 5 }}>
            Deelnemers:
          </Text>
        )}
        <View>
          <TouchableOpacity
            style={{ paddingLeft: 60 }}
            onPress={() =>
              Router.goTo(
                this.props.navigation,
                "ProjectStack",
                "ProjectMembersScreen",
                { persons: this.state.projectMembers, differentStack: true }
              )
            }
          >
            <FlatList
              data={this.state.projectMembers}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View
                  style={{ paddingLeft: 5, paddingBottom: 15, elevation: 5 }}
                >
                {item.profilePhotoPath != "" && (
                  <Image
                    source={{
                      uri: Api.getFileUrl(item.profilePhotoPath)
                    }}
                    resizeMode="cover"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                      elevation: 5
                    }}
                  />)}
                {item.profilePhotoPath == "" && (
                  <Icon
                    name="account-circle"
                    size={45}
                    style={{
                      marginRight: 10,

                    }} />)}
                </View>
              )}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            opacity: 0.3,
            backgroundColor: "#b5babf",
            marginBottom: 15,
            marginLeft: 15,
            marginRight: 15,
            width: "90%",
            alignSelf: "center"
          }}
        />
        <Text
          style={{
            marginLeft: 15,
            marginRight: 15
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
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 10
              }}
            >
              <Icon name="file-document-outline" size={48} color={"grey"} />
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold" }}>
                  {item.split("/")[item.split("/").length - 1]}
                </Text>
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
            flexDirection: "column",
            justifyContent: "space-evenly",
            margin: 10,
            marginLeft: 35,
            marginRight: 35
          }}
        >
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.startChat()}
          >
            <Text style={styles.textStyle}>Verstuur een bericht</Text>
          </TouchableOpacity>
          {!this.state.member == true && (
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.joinProject()}
            >
              <Text style={styles.textStyle}>Deelnemen</Text>
            </TouchableOpacity>
          )}
          {this.state.member == true && (
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.leaveProject()}
            >
              <Text style={styles.textStyle}>Verlaten</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.login()}
          >
            <Text style={styles.textStyle}>Volgen</Text>
          </TouchableOpacity>
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
              flexDirection: "row",
              alignItems: "flex-start",
              paddingTop: 10,
              paddingBottom: 10,
              marginLeft: 15,
              marginRight: 15
            }}
          >
            <Icon name="tag" size={24} color={"grey"} />
            <View
              style={{ flexDirection: "row", flexGrow: 0, flexWrap: "wrap" }}
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
                      backgroundColor: "grey"
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
