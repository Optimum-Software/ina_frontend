import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class DetailTab extends Component {
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
                uri:
                  "https://avatars3.githubusercontent.com/u/1271226?s=460&v=4"
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
                Co-discovery learning
              </Text>
              <Text>Davey Schippers</Text>
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
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend
          mauris ut sapien convallis, et aliquet libero gravida. Maecenas varius
          feugiat purus vitae porta. Vestibulum malesuada ultricies enim, vel
          elementum quam dictum ut. Nunc nec nisi pretium, cursus sem a,
          hendrerit ipsum.
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 10
          }}
        >
          <Icon name="tag" size={24} color={"grey"} />
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                paddingTop: 2,
                paddingBottom: 3,
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 5,
                marginLeft: 10,
                backgroundColor: "grey"
              }}
            >
              <Text style={{ fontSize: 12, color: "white" }}>HBO</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                paddingTop: 2,
                paddingBottom: 3,
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 5,
                marginLeft: 10,
                backgroundColor: "grey"
              }}
            >
              <Text style={{ fontSize: 12, color: "white" }}>ICT</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                paddingTop: 2,
                paddingBottom: 3,
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 5,
                marginLeft: 10,
                backgroundColor: "grey"
              }}
            >
              <Text style={{ fontSize: 12, color: "white" }}>Technologie</Text>
            </View>
          </View>
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
            alignItems: "center",
            paddingLeft: 15,
            paddingBottom: 10
          }}
        >
          <Icon name="file-document-outline" size={48} color={"grey"} />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontWeight: "bold" }}>Handleiding.pdf</Text>
            <Text>3.04 Mb</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 15
          }}
        >
          <Icon name="file-document-outline" size={48} color={"grey"} />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontWeight: "bold" }}>
              Research_Co_Discovery.pdf
            </Text>
            <Text>3.04 Mb</Text>
          </View>
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
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
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