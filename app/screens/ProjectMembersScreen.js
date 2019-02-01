import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";
import { ListItem } from "react-native-elements";
import Api from "../helpers/Api";
import ProfileParameters from "../helpers/ProfileParameters";

export default class ProjectMembersScreen extends Component {
  constructor() {
    super();
    this.state = {
      enableScrollViewScroll: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack.bind(this))
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack.bind(this))
  }

  handleBack() {
    Router.goBack(this.props.navigation, this.props.navigation.getParam("differentStack", false))
    return true
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    const personList = this.props.navigation.getParam("persons", "");
    return (
      <View style={styles.container}>
        <Toolbar
          leftElement={"chevron-left"}
          onLeftElementPress={() => Router.goBack(this.props.navigation , this.props.navigation.getParam("differentStack", false))}
          centerElement="Leden"
        />
        <ScrollView>
          <View>
            <FlatList
              data={personList}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={this.renderSeparator}
              renderItem={({ item }) => (
                <ListItem
                  title={item.firstName + " " + item.lastName}
                  subtitle={item.organisation}
                  leftAvatar={{
                    source: { uri: Api.getFileUrl(item.profilePhotoPath) }
                  }}
                  chevronColor="white"
                  chevron
                  onPress={() =>
                    {
                      ProfileParameters.storeUserId(item.id)
                      Router.goTo(this.props.navigation, 'ProfileScreen', 'ProfileScreen')
                    }
                  }
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
