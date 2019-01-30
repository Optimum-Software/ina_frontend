import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Api from "../helpers/Api";
import ProjectApi from "../helpers/ProjectApi";

export default class DetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project.project,
      tags: []
    };
    this.tags(this.state.project.id);
  }

  tags(id) {
    let response = ProjectApi.getAllTags(id).then(result => {
      if (result["bool"]) {
        this.setState({
          tags: result["tags"]
        });
        console.log("STATE TAGS SHI");
        console.log(this.state.tags);
      } else {
        alert(result["msg"]);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.personCard}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Image
              source={{
                uri: Api.getFileUrl(this.state.project.creator.profilePhotoPath)
              }}
              resizeMode="cover"
              style={{
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
            />
            <View style={{ paddingLeft: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {this.state.project.name}
              </Text>
              <Text>
                {this.state.project.creator.firstName +
                  " " +
                  this.state.project.creator.lastName}
              </Text>
            </View>
          </View>
          <Icon name="heart-outline" size={36} color={"red"} />
        </View>
        <View
          style={{
            height: 1,
            opacity: 0.3,
            backgroundColor: "#b5babf",
            marginTop: 15,
            marginBottom: 15,
            width: "100%",
            alignSelf: "center"
          }}
        />
        <Text>{this.state.project.desc}</Text>

        <View
          style={{
            height: 1,
            opacity: 0.3,

            backgroundColor: "#b5babf",
            marginTop: 15,
            marginBottom: 15,
            width: "100%",
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
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 15,
                paddingBottom: 10
              }}
            >
              <Icon name="file-document-outline" size={48} color={"grey"} />
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold" }}>
                  {item.split("/")[item.split("/").length - 1]}
                </Text>
                <Text>3.04 Mb</Text>
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
              marginTop: 10,
              marginBottom: 15,
              width: "100%",
              alignSelf: "center"
            }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            margin: 10
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#00a6ff",
              borderRadius: 10,
              width: 100,
              elevation: 5,
              justifyContent: "center",
              alignItems: "center",
              padding: 10
            }}
          >
            <Text style={{ color: "white" }}>Volgen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#00a6ff",
              borderRadius: 10,
              width: 100,
              elevation: 5,
              justifyContent: "center",
              alignItems: "center",
              padding: 10
            }}
          >
            <Text style={{ color: "white" }}>Contact</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            opacity: 0.3,
            backgroundColor: "#b5babf",
            marginTop: 15,
            marginBottom: 15,
            width: "100%",
            alignSelf: "center"
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            paddingTop: 10
          }}
        >
          <Icon name="tag" size={24} color={"grey"} />
          <View style={{ flexDirection: "row", flexGrow: 0, flexWrap: "wrap" }}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  personCard: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
