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
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
import Api from "../helpers/Api";
import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";

class ProjectEditThirdScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documents: [],

      id: this.props.navigation.getParam("id", ""),
      name: this.props.navigation.getParam("name", ""),
      desc: this.props.navigation.getParam("desc", ""),
      start_date: this.props.navigation.getParam("start_date", ""),
      end_date: this.props.navigation.getParam("end_date", ""),
      location: this.props.navigation.getParam("location", ""),
      thumbnail: this.props.navigation.getParam("thumbnail", ""),
      images: this.props.navigation.getParam("images", ""),
      files: this.props.navigation.getParam("files", ""),
      tags: this.props.navigation.getParam("tags", ""),

      totalSize: 0
    };
  }

  componentDidMount() {
    console.log("HI ");
    console.log(this.state);
    for (let document of this.state.images) {
      console.log("IMAGES");
      console.log(document);
      this.setState({
        documents: [...this.state.documents, Api.getFileUrl(document)]
      });
    }

    for (let document of this.state.files) {
      console.log("FILES");
      console.log(document);

      this.setState({
        documents: [...this.state.documents, Api.getFileUrl(document)]
      });
    }
  }

  goToNextPart() {
    Router.goTo(
      this.props.navigation,
      "ProjectStack",
      "ProjectCreateFourthScreen",
      {
        documents: this.state.documents,
        thumbnail: this.state.thumbnail,
        imgUri: this.state.imgUri,
        name: this.state.name,
        desc: this.state.desc,
        location: this.state.location,
        beginDate: this.state.beginDate,
        endDate: this.state.endDate,
        tags: this.state.tags
      }
    );
  }

  pickDocument() {
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (error, res) => {
        try {
          let file = {
            uri: res.uri,
            name: res.fileName,
            type: res.type,
            size: res.fileSize
          };
          // check if new total size is lower than 100 mb
          if (this.state.totalSize + file.size < 104857600) {
            this.setState({
              documents: [...this.state.documents, file],
              totalSize: this.state.totalSize + file.size
            });
          } else {
            alert("Het totale uploadlimiet voor documenten is 100 mb");
          }
        } catch {
          console.log(error);
        }
      }
    );
  }

  deleteItem(data) {
    let allItems = [...this.state.documents];
    let filteredItems = allItems.filter(item => item.index != data.index);
    this.setState({ documents: filteredItems });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <Toolbar
          centerElement="Project aanpassen"
          iconSet="MaterialCommunityIcons"
          leftElement={"chevron-left"}
          onLeftElementPress={() => Router.goBack(this.props.navigation)}
        />
        <View style={{ height: "80%", width: "100%" }}>
          <View style={styles.inputFieldContainer}>
            <Text style={styles.labelStyle}>BESTANDEN TOEVOEGEN</Text>

            <Icon
              name="file-plus"
              size={120}
              color="#dee5e8"
              style={{ alignSelf: "center" }}
              onPress={() => this.pickDocument()}
            />
            <Text style={styles.textStyle}>
              Voeg een bestand toe aan je project door op bovenstaande knop te
              drukken.
            </Text>

            <View style={styles.documentContainer}>
              <Text style={styles.documentText}>
                {"Toegevoegde documenten: "}
              </Text>
              <FlatList
                data={this.state.documents}
                renderItem={({ item, index }) => (
                  <View style={{ flexDirection: "row" }}>
                    <Text numberOfLines={1} style={styles.documentName}>
                      {++index + " -  " + item.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.documentSize}>
                      {item.size + " kb"}
                    </Text>
                    <Icon
                      name="close-circle"
                      size={24}
                      color="#f44336"
                      onPress={item => {
                        this.deleteItem(item);
                      }}
                    />
                  </View>
                )}
              />
            </View>
          </View>
        </View>
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
            <Text style={styles.buttonTextStyle}>Maak project</Text>
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
    width: "90%",
    paddingTop: "5%",
    paddingBottom: "5%",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center"
  },
  textStyle: {
    fontSize: 14,
    color: "#a8a8a8",
    fontWeight: "100",
    textAlign: "center"
  },
  labelStyle: {
    paddingBottom: "2%",
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#a8a8a8",
    borderBottomWidth: 1,
    borderBottomColor: "#4a6572"
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
  documentText: {
    fontSize: 18,
    marginTop: "5%",
    marginBottom: "2%",
    fontWeight: "bold",
    color: "#a8a8a8"
  },
  documentContainer: {
    height: "50%",
    width: "90%",
    paddingTop: "2%",
    alignSelf: "center"
  },
  documentName: {
    color: "#4a6572",
    fontWeight: "200",
    width: "60%",
    fontSize: 18
  },
  documentSize: {
    color: "#4a6572",
    fontWeight: "200",
    width: "30%",
    fontSize: 18
  }
});

export default ProjectEditThirdScreen;
