import React, { Component } from "react";
import {
	SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { Toolbar } from "react-native-material-ui";
import UserApi from "../helpers/UserApi";
import { Header } from "react-navigation";
import Router from "../helpers/Router";
import User from "../helpers/User";
import ProfileParameters from "../helpers/ProfileParameters";
import Api from "../helpers/Api";
import line from "../assets/images/Line.png";
import { Icon } from "react-native-elements";
import { CachedImage } from "react-native-cached-image";

export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      profilePhoto: {uri: ''},
      id: null,
      firstName: '',
      lastName: '',
      organisation: '',
      _function: '',
      bio: '',
      admin: false
    };

  }

  componentDidMount() {
    ProfileParameters.getUserId().then(id => {
      if(id != null) {
        ProfileParameters.storeUserId(null)
        Api.callApiGetSafe('getUserById/' + id).then(res => {
          this.setState({
            id: res.user.id,
            firstName: res.user.firstName,
            lastName: res.user.lastName,
            organisation: res.user.organisation,
            _function: res.user.function,
            bio: res.user.bio,
            profilePhoto: {uri: Api.getFileUrl(res.user.profilePhotoPath)},
          })
        })
      } else {
        User.getUserId().then(id => {
          Api.callApiGetSafe('getUserById/' + id).then(res => {
            this.setState({
              id: res.user.id,
              firstName: res.user.firstName,
              lastName: res.user.lastName,
              organisation: res.user.organisation,
              _function: res.user.function,
              bio: res.user.bio,
              profilePhoto: {uri: Api.getFileUrl(res.user.profilePhotoPath)},
              admin: true
            })
          })
        })
      }
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <View style={{ height: Header.HEIGHT }}>
          <Toolbar
            centerElement="Profiel"
            iconSet="MaterialCommunityIcons"
            leftElement={"chevron-left"}
            style={{container: {"backgroundColor": "#009EF2"}}}
            onLeftElementPress={() => {
              Router.goTo(this.props.navigation, 'LoggedIn', 'LoggedIn');
            }}
          />
        </View>
        <ScrollView >
          <CachedImage
            source={this.state.profilePhoto}
            resizeMode="cover"
            style={styles.profilePhoto}
          />
          <View style={{height: Dimensions.get("window").height * 0.7}}>
            <CachedImage
              source={line}
              resizeMode="stretch"
              style={{width: "100%", height: 3}}
            />
            <View style={styles.personalInfoBox}>
              <View style={styles.labels}>
                <Text style={styles.label}>Naam</Text>
                <Text style={styles.label}>Organisatie</Text>
                <Text style={styles.label}>Functie</Text>
              </View>
              <View style={styles.items}>
                <Text>{this.state.firstName + ' ' + this.state.lastName}</Text>
                <Text>{this.state.organisation}</Text>
                <Text>{this.state._function}</Text>
              </View>
            </View>
            <View style={styles.separator}/>
            <View style={{paddingLeft: '10%', paddingRight: '10%'}}>
              <Text>{this.state.bio}</Text>
            </View>
          </View>
        </ScrollView>
        { this.state.admin && (
          <TouchableHighlight
            underlayColor="#009ef2"
            style={styles.buttonStyle}
            onPress={() => {
              Router.goTo(this.props.navigation, "ProfileEdit", "ProfileEditScreen")
            }}
          >
            <Icon
              name="edit"
              type="entypo"
              size={30}
              color="#FFF"
            />
          </TouchableHighlight>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },

  buttonStyle: {
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: '#00a6ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 200,
    right: 15
  },

  profilePhoto: {
    width: '100%',
    height: Dimensions.get("window").height * 0.3
  },
  personalInfoBox: {
    marginTop: 30,
    paddingLeft: '10%',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  labels: {
    width: '30%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  label: {
    fontWeight: 'bold'
  },

  items: {
    width: '70%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  separator: {
    height: 1,
    backgroundColor: '#b5babf',
    marginTop: 15,
    marginBottom: 15,
    width: '80%',
    alignSelf: 'center'
  },
})