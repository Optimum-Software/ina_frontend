import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";
import { ListItem } from "react-native-elements";

export default class ProjectMembersScreen extends Component {
  constructor() {
    super();
    this.state = {
      enableScrollViewScroll: false
    };
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
    const { navigation } = this.props;
    const personList = navigation.getParam("persons", "");
    return (
      <View style={styles.container}>
        <Toolbar
          leftElement={"chevron-left"}
          onLeftElementPress={() => Router.goBack(this.props.navigation)}
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
                    source: { uri: item.profilePhotoPath }
                  }}
                  chevronColor="white"
                  chevron
                  onPress={() =>
                    alert("Ga naar " + item.firstName + "'s profiel")
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
