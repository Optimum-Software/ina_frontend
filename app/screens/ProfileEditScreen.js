import React, { Component, Fragment } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  Alert
} from "react-native";
import { Toolbar } from "react-native-material-ui";
import UserApi from "../helpers/UserApi";
import { Header } from "react-navigation";
import Router from "../helpers/Router";
import User from "../helpers/User";
import Api from "../helpers/Api";
import { Input, Icon } from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import { CachedImage } from "react-native-cached-image";
import BlueButton from "../components/BlueButton";

export default class ProfileEditScreen extends Component {
  constructor() {
    super();
    this.state = {
      profilePhoto: {
        uri: ""
      },
      loading: false,
      email: "",
      mobile: "",
      firstName: "",
      lastName: "",
      bio: "",
      organisation: "",
      _function: "",

      textAreaHeight: 40
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    User.getUserId().then(id => {
      if (id != null) {
        Api.callApiGetSafe("getUserById/" + id).then(res => {
          if (res["bool"]) {
            this.setState({
              profilePhoto: { uri: Api.getFileUrl(res.user.profilePhotoPath) },
              firstName: res.user.firstName,
              lastName: res.user.lastName,
              bio: res.user.bio,
              organisation: res.user.organisation,
              _function: res.user.function,
              email: res.user.email,
              mobile: res.user.mobile
            });
          }
          this.setState({ loading: false });
        });
      }
    });
  }

  pickImageHandler() {
    ImagePicker.showImagePicker({ title: "Kies een profiel photo" }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          profilePhoto: { uri: res.uri }
        });
      }
    });
  }

  saveInfo() {
    this.setState({ loading: true });
    User.getUserId().then(id => {
      UserApi.updateUser(
        id,
        this.state.firstName,
        this.state.lastName,
        this.state.bio,
        this.state.organisation,
encodeURIComponent(this.state._function),
        this.state.profilePhoto.uri
      ).then(res => {
        if (res["bool"]) {
          Alert.alert(res["msg"], "Je veranderingen zijn opgeslagen");
          Router.switchLogin(this.props.navigation);
        } else {
          alert(res["msg"]);
        }
        this.setState({ loading: false });
      });
    });
  }

  updateSize = textAreaHeight => {
    this.setState({
      textAreaHeight
    });
  };

  render() {
    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#00a6ff" }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <ScrollView>
          <View style={{ height: Header.HEIGHT }}>
            <Toolbar
              centerElement="Profiel aanpassen"
              iconSet="MaterialCommunityIcons"
              leftElement={"arrow-left"}

              style={{ container: { backgroundColor: "#00a6ff", elevation: 0 } }}
              onLeftElementPress={() => {
                Router.goTo(
                  this.props.navigation,
                  "ProfileScreen",
                  "ProfileScreen"
                );
              }}
            />
          </View>
          {!this.state.loading && (
            <View
              style={{
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingBottom: "5%"
              }}
            >
              <View style={styles.inputFieldContainer}>
                <View
                  style={{ flexDirection: "row", justifyContent: "center", margin: '5%' }}
                >
                  <CachedImage
                    source={this.state.profilePhoto}
                    resizeMode="cover"
                    style={styles.profilePhoto}
                  >
                  <Icon
                    name="edit"
                    type="MaterialIcons"
                    size={30}
                    color="white"
                    containerStyle={{height: 100,
                    width: 100,
                    borderRadius: 50,
                    marginBottom: '6%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  backgroundColor: '#00000055'}}
                    underlayColor="transparent"
                    onPress={() => this.pickImageHandler()}
                  />
                  </CachedImage>

                </View>

                <Text style={[styles.labelStyle, { marginBottom: 0 }]}>
                  VASTE INFORMATIE
                </Text>
                <View style={styles.immutableInfoContainer}>
                  <View style={styles.immutableInfoRow}>
                    <Icon
                      name="email"
                      type= "material-community"
                      size={25}
                      color="#4a6572"
                    />
                    <Text style={styles.immutableInfoLabel}>
                      {this.state.email}
                    </Text>
                  </View>

                  <View style={styles.immutableInfoRow}>
                    <Icon
                      name="cellphone"
                      type="material-community"
                      size={25}
                      color="#4a6572"
                    />
                    <Text style={styles.immutableInfoLabel}>
                      {this.state.mobile}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.labelStyle, { marginBottom: '5%', marginTop: '5%' }]}>
                  TE BEWERKEN
                </Text>
                <Input
                  placeholder="Voornaam"
                  placeholderTextColor="#a8a8a8"
                  maxLength={30}
                  containerStyle={styles.containerStyle}
                  inputStyle={styles.inputStyle}
                  value={this.state.firstName}
                  leftIcon={{
          type: "material-community",
                    name: "account",
                    color: "#4a6572"
                  }}
                  onChangeText={firstName => this.setState({ firstName })}
                />

                <Input
                  placeholder="Achternaam"
                  placeholderTextColor="#a8a8a8"
                  maxLength={30}
                  containerStyle={styles.containerStyle}
                  inputStyle={styles.inputStyle}
                  value={this.state.lastName}
                  leftIcon={{
                    type: "material-community",
                              name: "account",
                    color: "#4a6572"
                  }}
                  onChangeText={lastName => this.setState({ lastName })}
                />
                <Input
                  placeholder="Organisatie"
                  placeholderTextColor="#a8a8a8"
                  maxLength={50}
                  containerStyle={styles.containerStyle}
                  inputStyle={styles.inputStyle}
                  value={this.state.organisation}
                  leftIcon={{
                    type: "material-community",
                    name: "office-building",
                    color: "#4a6572"
                  }}
                  onChangeText={organisation => this.setState({ organisation })}
                />

                <Input
                  placeholder="Functie"
                  placeholderTextColor="#a8a8a8"
                  maxLength={50}
                  containerStyle={styles.containerStyle}
                  inputStyle={styles.inputStyle}
                  value={this.state._function}
                  leftIcon={{
                    type: "material-community",
                    name: "account-card-details",
                    color: "#4a6572"
                  }}
                  onChangeText={_function => this.setState({ _function })}
                />

                <Input
                  placeholder="Begin hier met het typen van je biografie.."
                  placeholderTextColor="#a8a8a8"
                  multiline={true}
                  editable={true}
                  maxLength={2000}
                  containerStyle={styles.containerStyle}
                  inputStyle={styles.inputStyle}
                  value={this.state.bio}
                  onChangeText={bio => this.setState({ bio })}
                  onContentSizeChange={e =>
                    this.updateSize(e.nativeEvent.contentSize.height)
                  }
                  leftIcon={{
                    type: "material-community",
                    name: "text-subject",
                    color: "#4a6572"
                  }}
                  textAlignVertical={"top"}
                />
              </View>
              <View
                style={{
                  paddingLeft: "10%",
                  paddingRight: "10%",
                  justifyContent: "center"
                }}
              >
              <BlueButton
          label='Opslaan'
          onPress={() => this.saveInfo()}
        />

              </View>
            </View>
          )}
        </ScrollView>
        {this.state.loading && (
          <View
            style={{
              height: "92.5%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
      </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    width: "100%"
  },
  immutableInfoContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 5
  },

  immutableInfoRow: {
    flexDirection: "row",
    alignItems: "center"
  },

  immutableInfoLabel: {
    fontSize: 18,
    color: "#4a6572",
    marginLeft: 20
  },

  inputFieldContainer: {
    width: "90%",
    paddingTop: "5%",
    alignItems: "center",
    alignSelf: "center"
  },

  profilePhoto: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: "5%",
    justifyContent: 'center',
    alignItems: 'center'
  },

  editPhotoContainer: {
    width: "10%",
    height: "20%",

    alignSelf: "flex-end"
  },

  buttonStyle: {
    backgroundColor: "#00a6ff",
    borderRadius: 15,
    height: 50,
    justifyContent: "center"
  },

  saveText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 20
  },

  containerStyle: {
    width: "100%",
    backgroundColor: "transparent",
    marginBottom: 20
  },

  infoStyle: {
    width: "100%",
    backgroundColor: "transparent"
  },

  inputStyle: {
    color: "#4a6572",
    height: undefined
  },
  labelStyle: {
    alignSelf: "flex-start",
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a6572"
  },
  labelWithBorder: {
    paddingBottom: "2%",
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#a8a8a8",
    borderBottomWidth: 1,
    borderBottomColor: "#4a6572"
  }
});
