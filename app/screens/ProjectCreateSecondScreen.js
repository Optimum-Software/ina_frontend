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
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { ListItem, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";
import DatePicker from "react-native-datepicker";
import AutoTags from "react-native-tag-autocomplete";
import ProjectApi from "../helpers/ProjectApi";

class ProjectCreateSecondScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Groningen",
      beginDate: "",
      endDate: "",

      suggestions: [],
      tagsSelected: [],

      thumbnail: this.props.navigation.getParam("thumbnail", ""),
      imgUri: this.props.navigation.getParam("imgUri", ""),
      name: this.props.navigation.getParam("name", ""),
      desc: this.props.navigation.getParam("desc", "")
    };

    ProjectApi.getAllTag().then(result => {
      console.log(result);
      if (result["bool"]) {
        let tagList = [];
        result["tags"].forEach(tag => {
          tagList.push({ name: tag.name });
        });
        this.setState({
          suggestions: tagList
        });
        console.log(this.state.suggestions);
      } else {
        alert(result["msg"]);
      }
      //  });
    });
  }

  handleDelete = index => {
    let tagsSelected = this.state.tagsSelected;
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
  };

  handleAddition = suggestion => {
    let name = suggestion.name;
    if (!this.selectedTagExists(name)) {
      this.setState({
        tagsSelected: this.state.tagsSelected.concat([{ name: name }])
      });
    }
  };

  handleCustomTagCreated = input => {
    if (!this.selectedTagExists(input)) {
      this.setState({
        tagsSelected: this.state.tagsSelected.concat([{ name: input }])
      });
    }
  };

  selectedTagExists(tag) {
    return this.state.tagsSelected.some(element => {
      return element.name === tag;
    });
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
        endDate: this.state.endDate,
        tags: this.state.tagsSelected
      }
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <Toolbar
          centerElement="Optionele informatie 2/3"
          iconSet="MaterialCommunityIcons"
          leftElement={"chevron-left"}
          onLeftElementPress={() => Router.goBack(this.props.navigation)}
        />
        <ScrollView style={{ height: "85%", width: "100%" }}>
          <View style={styles.inputFieldContainer}>
            <Text style={styles.labelStyle}>TAGS</Text>
            <AutoTags
              suggestions={this.state.suggestions}
              tagsSelected={this.state.tagsSelected}
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
              onCustomTagCreated={this.handleCustomTagCreated}
              createTagOnSpace={true}
              placeholder="Voeg een tag toe.."
            />

            <Text style={styles.labelStyle}>LOCATIE</Text>

            <Input
              placeholder="Locatie"
              placeholderTextColor="#4a6572"
              maxLength={200}
              containerStyle={styles.containerStyle}
              inputStyle={styles.inputStyle}
              value={this.state.location}
              onChangeText={text => this.setState({ location: text })}
              errorStyle={{ color: "red" }}
              errorMessage={this.state.locationError}
            />

            <Text style={styles.labelStyle}>BEGIN DATUM</Text>

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
              onDateChange={date => {
                this.setState({ beginDate: date });
              }}
            />

            <Text style={styles.labelStyle}>EIND DATUM</Text>

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
              onDateChange={date => {
                this.setState({ endDate: date });
              }}
            />
          </View>
        </ScrollView>

        <View
          style={{
            width: "100%",
            height: "10%"
          }}
        >
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.goToNextPart()}
          >
            <Text style={styles.buttonTextStyle}>Verder</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    width: "100%"
  },
  inputFieldContainer: {
    width: "85%",
    paddingTop: "5%",
    paddingBottom: "5%",

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
    marginTop: 20
  },

  inputContainerStyle: {
    borderBottomColor: "#4a6572"
  },

  inputStyle: {
    color: "#4a6572"
  },
  labelStyle: {
    marginTop: "5%",
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#a8a8a8"
  }
});

export default ProjectCreateSecondScreen;
