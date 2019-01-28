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
import Ripple from "react-native-material-ripple";
import { CachedImage } from "react-native-cached-image";

export default class DetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project.project,
      tags: []
    };

    console.log("PROPS");
    console.log(props);
    console.log("STATE");
    console.log(this.state);
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
      <FlatList

        data={this.state.project.images}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Ripple
              rippleColor="#fff"
              style={{
                width: this.state.project.images.length > 1 ? Dimensions.get("window").width * 0.5 : Dimensions.get("window").width * 0.9,
                height: Dimensions.get("window").width * 0.4,
                marginTop: 25,

                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginLeft:
                  index == 0
                    ? Dimensions.get("window").width * 0.045
                    : Dimensions.get("window").width * 0.024,
                    marginRight:
                      index == this.state.project.images.length -1
                        ? Dimensions.get("window").width * 0.045
                        : Dimensions.get("window").width * 0.024,
              }}
            >
              <CachedImage
                source={{ uri: Api.getFileUrl(item) }}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 5,
                  elevation: 5,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
{item.includes("videoThumbnail_") && (
<View
style={{
backgroundColor: "rgba(0, 0, 0, 0.8)",
justifyContent: "center",
alignItems: "center",
height: 55,
width: 55,
borderRadius: 75,
elevation: 6,
zIndex: 5,
}}
>
<Icon name="play" size={36} color={"white"} />
</View>)}
                </CachedImage>
            </Ripple>
          );
        }}
      />

        <View style={{paddingLeft: 30, paddingRight: 30}}>
        <Text style={{fontFamily: 'Montserrat-Regular',}}>{this.state.project.desc}</Text>

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
