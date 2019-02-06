import React, { PureComponent } from 'react';
import Router from "../helpers/Router";
import Ripple from "react-native-material-ripple";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import { CachedImage } from "react-native-cached-image";
import line2 from "../assets/images/line3.png";
import { ifIphoneX, isIphoneX } from "react-native-iphone-x-helper";
import Api from "../helpers/Api";
export default class ProjectComponent extends PureComponent {
	render() {
		return (
		<Ripple
      rippleColor="#fff"
      style={styles.cardContainer}
      key={this.props.item.id}
      onPress={() =>
        Router.goTo(
          this.props.dispatcher,
          "ProjectStack",
          "ProjectDetailScreen",
          {
            id: this.props.item.id,
            name: this.props.item.name,
            desc: this.props.item.desc,
            start_date: this.props.item.startDate,
            end_date: this.props.item.endDate,
            created_at: this.props.item.createdAt,
            like_count: this.props.item.likeCount,
            follower_count: this.props.item.followerCount,
            location: this.props.item.location,
            thumbnail: Api.getFileUrl(this.props.item.thumbnail),
            creator: this.props.item.creator,
            images: this.props.item.images,
            files: this.props.item.files,
            liked: this.props.item.liked,
            member: this.props.item.member,
            followed: this.props.item.followed,
            differentStack: this.props.differentStack
          }
        )
      }
    >
      {this.props.index != this.props.projects.length - 1 && (
        //not last card
        <View style={[styles.card, { marginBottom: this.props.index == this.props.projects.length -2 ? 20 : 0}]}>
          <View style={styles.cardImage}>
            <CachedImage
              source={{ uri: Api.getFileUrl(this.props.item.thumbnail) }}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <Image
            source={line2}
            resizeMode="stretch"
            style={{ width: "100%", height: "2%" }}
          />
          <Text numberOfLines={2} style={styles.cardTitle}>
            {this.props.item.name}
          </Text>
        </View>
      )}
      {this.props.index == this.props.projects.length - 1 &&
        (this.props.index + 1) % 2 == 0 && (
          //last card but even index
          <View style={[styles.card, { marginBottom: this.props.index == this.props.projects.length -1 ? 20 : 0}]}>
            <View style={styles.cardImage}>
              <CachedImage
                source={{ uri: Api.getFileUrl(this.props.item.thumbnail) }}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
            <Image
              source={line2}
              resizeMode="stretch"
              style={{ width: "100%", height: "2%" }}
            />
            <Text numberOfLines={2} style={styles.cardTitle}>
              {this.props.item.name}
            </Text>
          </View>
        )}
      {this.props.index == this.props.projects.length - 1 &&
        (this.props.index + 1) % 2 != 0 && (
          //last card but uneven index
          <View style={styles.cardUneven}>
            <View style={styles.cardImage}>
              <CachedImage
                source={{ uri: Api.getFileUrl(this.props.item.thumbnail) }}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
            <Image
              source={line2}
              resizeMode="stretch"
              style={{ width: "100%", height: "2%" }}
            />
            <Text numberOfLines={2} style={styles.cardTitle}>
              {this.props.item.name}
            </Text>
          </View>
        )}
    </Ripple>
   )
	}
}
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginLeft: Dimensions.get("window").width * 0.024,
    marginRight: Dimensions.get("window").width * 0.024,
    marginTop: Dimensions.get("window").width * 0.05,
    width: Dimensions.get("window").width * 0.43,
    height: (Dimensions.get("window").height - 90) * 0.35,
    ...ifIphoneX({
      height: (Dimensions.get("window").height - 150) * 0.24
    }),
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    borderRadius: 4
  },

  cardImage: {
    height: "70%",
    width: "100%"
  },

  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: "hidden"
  },

  cardTitle: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a6572"
  },

  cardUneven: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    width: Dimensions.get("window").width * 0.9,
    marginLeft: Dimensions.get("window").width * 0.024,
    marginRight: Dimensions.get("window").width * 0.024,
    marginTop: Dimensions.get("window").width * 0.05,
    height: (Dimensions.get("window").height - 90) * 0.35,
    ...ifIphoneX({
      height: (Dimensions.get("window").height - 150) * 0.24
    }),
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    borderRadius: 4
  },
});
