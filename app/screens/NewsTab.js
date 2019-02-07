import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
  ActivityIndicator
} from "react-native";
import Router from "../helpers/Router";
import { Icon } from "react-native-elements";
import User from "../helpers/User";
import ProjectApi from "../helpers/ProjectApi";
import moment from "moment/min/moment-with-locales";
import line from "../assets/images/Line.png";
import Ripple from "react-native-material-ripple";
import { decode, encode } from "he";

export default class NewsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project.project,
      updateList: [],
      refreshing: false,
      loading: false,
      userId: null
    };
    User.getUserId().then(userId => {
      this.setState({ userId: userId });
    });
  }

  componentDidMount() {
    this.setState({ loading: true });
    ProjectApi.getUpdatesForProject(this.props.project.project.id).then(res => {
      if (res["bool"]) {
        this.setState({ updateList: res["updates"] });
      }
    });
    User.getUserId().then(id => {
      if (id == this.props.project.creator.id) {
        this.setState({ admin: true });
      }
    });
    this.setState({ loading: false });
  }

  handelEnd() {}

  onRefresh() {
    this.setState({ loading: true });
    ProjectApi.getUpdatesForProject(this.props.project.project.id).then(res => {
      if (res["bool"]) {
        this.setState({ updateList: res["updates"] });
      }
      this.setState({ refreshing: false, loading: false });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.updateList.length > 0 &&
          !this.state.loading && (
            <View>
              <FlatList
                data={this.state.updateList}
                keyExtractor={item => "" + item.id}
                onEndReached={() => this.handelEnd()}
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
                renderItem={({ item }) => {
                  moment.locale("nl");
                  return (
                    <View>
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.iconContainer}>
                          <Icon
                            name="caret-right"
                            type="font-awesome"
                            style={{ alignSelf: "flex-start" }}
                            size={25}
                            color="#009ef2"
                          />
                        </View>
                        <View style={styles.box}>
                          <View style={styles.boxDate}>
                            <Text style={styles.dateStyle}>
                              {moment(item.created_at).fromNow()}
                            </Text>
                          </View>
                          <View style={styles.boxTitle}>
                            <Text style={styles.titleStyle}>
                              {decode(item.title)}
                            </Text>
                          </View>
                          <View style={styles.boxContent}>
                            <Text>{decode(item.content)}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.separator} />
                    </View>
                  );
                }}
              />
            </View>
          )}
        {this.state.updateList.length == 0 &&
          !this.state.loading && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                Er zijn geen updates gevonden
              </Text>
              <Ripple
                rippleColor="#00a6ff"
                style={styles.refreshButton}
                onPress={() => this.onRefresh()}
              >
                <Icon
                  name="refresh"
                  type="font-awesome"
                  size={25}
                  color="#FFF"
                />
              </Ripple>
            </View>
          )}
        {this.state.loading && (
          <View
            style={{
              height: "92.5%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size="large" color="#00A6FF" />
          </View>
        )}
        {this.state.userId == this.state.project.creator.id && (
          <TouchableHighlight
            underlayColor="#009ef2"
            style={styles.buttonStyle}
            onPress={() =>
              Router.goTo(
                this.props.navigation,
                "ProjectStack",
                "ProjectUpdateCreate",
                { project: this.props.project }
              )
            }
          >
            <Icon name="plus" type="entypo" size={30} color="#FFF" />
          </TouchableHighlight>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: "#00a6ff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 5,
    right: 15
  },

  container: {
    flex: 1
  },

  titleStyle: {
    fontSize: 24,
    fontWeight: "bold"
  },

  contentStyle: {
    fontSize: 18,
    color: "#4a6572"
  },

  dateStyle: {
    fontSize: 16,
    color: "#009ef2"
  },

  box: {
    marginVertical: 5,
    marginLeft: "7.5%",
    width: '78%'
  },

  iconContainer: {
    marginLeft: "7.5%",
    paddingTop: 5
  },

  boxTitle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: "5%"
  },

  boxContent: {
    paddingLeft: "2.5%",
    paddingBottom: 10,
    marginHorizontal: "2.5%",
    marginBottom: "2.5%"
  },

  boxDate: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: "5%"
  },

  separator: {
    height: 1,
    backgroundColor: "#b5babf",
    marginTop: 15,
    marginBottom: 5,
    width: "80%",
    alignSelf: "center"
  },

  emptyBox: {
    alignItems: "center",
    marginTop: "25%"
  },

  emptyText: {
    color: "#4a6572",
    fontSize: 24,
    fontWeight: "bold"
  },

  refreshButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: "#009ef2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  }
});
