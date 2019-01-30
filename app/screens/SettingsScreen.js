import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  TouchableHighlight
} from "react-native";
import { Toolbar } from "react-native-material-ui";
import { Header } from "react-navigation";
import User from "../helpers/User";
import UserApi from "../helpers/UserApi";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canNotificate: null
    };
  }

  componentDidMount() {
    this.props.navigation.addListener("willFocus", this.onLoad);
  }

  onLoad = () => {
    User.getUserId().then(id => {
      UserApi.getUserSettings(id).then(res => {
        if (res["bool"]) {
          this.setState({
            canNotificate: res["settings"].canNotificate
          });
        }
      });
    });
  };

  saveSettings() {
    User.getUserId().then(id => {
      UserApi.saveUserSettings(id, this.state.canNotificate).then(res => {
        if (res["bool"]) {
          alert(res["msg"]);
        }
      });
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Toolbar
          centerElement="Instellingen"
          iconSet="MaterialCommunityIcons"
          leftElement={"menu"}
          onLeftElementPress={() => {
            this.props.navigation.openDrawer();
          }}
        />
        <View style={styles.container}>
          <View style={styles.tabel}>
            <View style={styles.labels}>
              <Text style={styles.labelText}>Notificaties</Text>
            </View>
            <View style={styles.items}>
              <Switch
                style={[{ marginTop: 5 }]}
                value={this.state.canNotificate}
                onValueChange={bool => this.setState({ canNotificate: bool })}
              />
            </View>
          </View>
          <TouchableHighlight
            underlayColor="#009ef2"
            style={styles.buttonStyle}
            onPress={() => this.saveSettings()}
          >
            <Text style={styles.safeText}>Opslaan</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },

  container: {
    flex: 1
  },

  tabel: {
    paddingHorizontal: "20%",
    paddingTop: "10%",
    marginBottom: "10%",
    flexDirection: "row"
  },

  labelText: {
    color: '#4a6572',
    fontSize: 24,
    fontWeight: '100'
  },

  labels: {
    width: "50%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },

  items: {
    width: "50%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },

  buttonStyle: {
    backgroundColor: "#00a6ff",
    borderRadius: 15,
    height: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },

  safeText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 20
  }
});
