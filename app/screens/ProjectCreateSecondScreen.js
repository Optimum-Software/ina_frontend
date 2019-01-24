"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  FlatList
} from "react-native";
import { ListItem, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";
import DatePicker from "react-native-datepicker";

class ProjectCreateSecondScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Groningen",
      beginDate: "",
      endDate: "",

      thumbnail: this.props.navigation.getParam("thumbnail", ""),
      imgUri: this.props.navigation.getParam("imgUri", ""),
      name: this.props.navigation.getParam("name", ""),
      desc: this.props.navigation.getParam("desc", "")
    };
  }

  goToNextPart() {
    Router.goTo(
      this.props.navigation,
      "ProjectStack",
      "ProjectCreateThirdScreen",
      {
        thumbnail: this.state.thumbnail,
        imgUri: this.state.imgUri,
        name: this.state.name,
        desc: this.state.desc,
        location: this.state.location,
        beginDate: this.state.beginDate,
        endDate: this.state.endDate
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          centerElement="Optionele informatie"
          iconSet="MaterialCommunityIcons"
          leftElement={"chevron-left"}
          onLeftElementPress={() => Router.goBack(this.props.navigation)}
        />
        <View style={styles.inputFieldContainer}>
          <Text
            style={{
              color: "#4a6572",
              marginLeft: "5%"
            }}
          >
            Deze informatie is niet verplicht om in te vullen. De informatie kan
            echter wel helpen om uw project meer inhoud te geven.
          </Text>
          <Input
            placeholder="Locatie"
            placeholderTextColor="#4a6572"
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            value={this.state.location}
            onChangeText={text => this.setState({ location: text })}
            leftIcon={<Icon name="map-marker" size={24} color="#4a6572" />}
            shake={true}
            errorStyle={{ color: "red" }}
            errorMessage={this.state.locationError}
          />
          <DatePicker
            style={{
              width: "100%",
              marginBottom: "3%",
              marginTop: "3%"
            }}
            date={this.state.beginDate}
            mode="date"
            placeholder="Selecteer begin datum"
            format="YYYY-MM-DD"
            minDate="2019-01-01"
            maxDate="2050-06-01"
            confirmBtnText="Bevestig"
            cancelBtnText="Annuleren"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({ beginDate: date });
            }}
          />
          <DatePicker
            style={{
              width: "100%"
            }}
            date={this.state.endDate}
            mode="date"
            placeholder="Selecteer eind datum"
            format="YYYY-MM-DD"
            minDate="2019-01-01"
            maxDate="2050-06-01"
            confirmBtnText="Bevestig"
            cancelBtnText="Annuleren"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={date => {
              this.setState({ endDate: date });
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.goToNextPart()}
        >
          <Text style={styles.buttonTextStyle}>Verder</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  },
  inputFieldContainer: {
    height: "80%",
    width: "90%",
    paddingTop: "5%",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center"
  },
  textStyle: {
    fontSize: 14,
    color: "#4a6572",
    textAlign: "center"
  },
  buttonTextStyle: {
    padding: "4%",
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  buttonStyle: {
    width: "50%",
    alignSelf: "center",
    backgroundColor: "#00a6ff",
    borderRadius: 25
  },

  containerStyle: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "transparent",
    marginTop: "5%"
  },

  inputContainerStyle: {
    borderBottomColor: "#4a6572"
  },

  inputStyle: {
    color: "#4a6572"
  }
});

export default ProjectCreateSecondScreen;
